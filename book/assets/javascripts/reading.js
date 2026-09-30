// Last card read, kept cards, and the symptom index filter. Needs account.js.

(function () {
  const account = window.BuildHereAccount;
  const { KEYS, read, write, list } = account;

  // On a card: save it as the resume point, and the Keep button.

  const button = document.querySelector("[data-keep]");

  if (button) {
    const url = button.dataset.url;
    const title = button.dataset.title;
    const key = account.card(url);
    let isKept = false;
    let state = null;

    const mark = () => {
      button.setAttribute("aria-pressed", String(isKept));
      button.title = isKept ? button.dataset.remove : button.dataset.keepLabel;
      button.setAttribute("aria-label", button.title);
    };

    account.me().then(function (e) {
      state = e;
      if (state) {
        if (key) account.call("PUT", "/me/resume", { url: url, title: title }).catch(() => {});
        isKept = state.kept.some((k) => k.card === key);
      } else {
        write(KEYS.resume, { url: url, title: title });
        isKept = list(KEYS.kept).some((e) => e.url === url);
      }
      mark();
    });

    button.addEventListener("click", function () {
      isKept = !isKept;
      mark();
      if (state) {
        const send = isKept
          ? account.call("POST", "/me/kept", { url: url, title: title })
          : account.call("DELETE", "/me/kept/" + key);
        send.catch(() => {
          isKept = !isKept;
          mark();
        });
        return;
      }
      const l = list(KEYS.kept);
      const i = l.findIndex((e) => e.url === url);
      if (i > -1) l.splice(i, 1);
      if (isKept) l.unshift({ url: url, title: title });
      write(KEYS.kept, l);
    });
  }

  // On the home page: resume link and kept cards.

  const resume = document.getElementById("resume");

  if (resume) {
    account.me().then(function (state) {
      const last = state
        ? state.resume && { url: state.resume.url, title: state.resume.title }
        : read(KEYS.resume, null);
      const kept = state ? state.kept.map((k) => ({ url: k.url, title: k.title })) : list(KEYS.kept);
      const link = resume.querySelector("[data-resume]");
      const block = resume.querySelector("[data-kept]");

      if (last && last.url && last.title) {
        link.href = last.url;
        link.querySelector("[data-title]").textContent = last.title;
        link.hidden = false;
      }

      if (kept.length) {
        const ul = block.querySelector("ul");
        kept.forEach(function (e) {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = e.url;
          a.textContent = e.title;
          li.appendChild(a);
          ul.appendChild(li);
        });
        block.hidden = false;
      }

      if (!link.hidden || !block.hidden) resume.hidden = false;
    });
  }

  // On the symptom index: filter field.

  const index = document.querySelector("[data-filter-symptoms]");

  if (index) {
    const field = document.createElement("input");
    field.type = "search";
    field.className = "filter-symptoms";
    field.placeholder = index.dataset.filterSymptoms;
    field.setAttribute("aria-label", index.dataset.filterSymptoms);

    const empty = document.createElement("p");
    empty.className = "filter-empty";
    empty.textContent = index.dataset.filterEmpty;
    empty.hidden = true;

    const zone = index.querySelector(".container") || index;
    const first = zone.querySelector("h2");

    const target = document.querySelector("[data-filter-target]");
    if (target) {
      target.appendChild(field);
      if (first) zone.insertBefore(empty, first);
    } else if (first) {
      zone.insertBefore(field, first);
      zone.insertBefore(empty, first);
    }

    // Ignore accents: "reunion" matches "réunion".
    const flat = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

    const groups = Array.from(zone.querySelectorAll("h2")).map((h) => ({
      title: h,
      list: h.nextElementSibling,
    }));

    field.addEventListener("input", function () {
      const q = flat(field.value.trim());
      let visible = 0;

      groups.forEach(function (g) {
        if (!g.list) return;
        let remaining = 0;

        Array.from(g.list.children).forEach(function (li) {
          const ok = !q || flat(li.textContent).indexOf(q) > -1;
          li.hidden = !ok;
          if (ok) remaining++;
        });

        g.title.hidden = remaining === 0;
        g.list.hidden = remaining === 0;
        visible += remaining;
      });

      empty.hidden = visible > 0;
    });
  }
})();
