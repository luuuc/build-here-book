// Try a card: start a try, or log one already done, with its outcome.

(function () {
  const block = document.getElementById("try");
  const account = window.BuildHereAccount;
  if (!block || !account) return;

  const url = block.dataset.url;
  const title = block.dataset.title;
  const key = account.card(url);
  if (!key) return;

  // Move the block to the end of the "try this" section (heading ids, FR and EN).
  const SECTIONS = ["à-essayer", "try-this", "à-vérifier", "check-this", "la-décision", "the-decision"];
  const section = SECTIONS.map((id) => document.getElementById(id)).find(Boolean);
  if (section) {
    let next = section.nextElementSibling;
    while (next && next.tagName !== "H2") next = next.nextElementSibling;
    section.parentNode.insertBefore(block, next);
  }

  const buttons = block.querySelector(".try-buttons");
  const inProgress = block.querySelector(".try-in-progress");
  const form = block.querySelector(".try-form");
  const thanks = block.querySelector(".try-thanks");
  const lang = document.documentElement.lang || "fr";

  let state = null;
  // "summary" closes the open try, "done" logs one already done.
  let mode = null;

  const tries = () => (state ? state.tries : account.list(account.KEYS.tries));
  const onThisCard = (e) => (e.card || account.card(e.url)) === key;
  const open = () =>
    tries()
      .filter((e) => onThisCard(e) && !e.outcome)
      .sort((a, b) => (a.started_at < b.started_at ? 1 : -1))[0];

  function show() {
    const e = open();
    form.hidden = true;
    buttons.hidden = Boolean(e);
    inProgress.hidden = !e;
    if (e) {
      const date = new Date(e.started_at).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" });
      inProgress.querySelector("[data-try-since]").textContent = block.dataset.since.replace("[date]", date);
    }
  }

  function openForm(m) {
    mode = m;
    form.reset();
    buttons.hidden = true;
    inProgress.hidden = true;
    thanks.hidden = true;
    form.hidden = false;
    form.querySelector("input").focus();
  }

  function thank() {
    thanks.querySelector("[data-try-thanks]").textContent = state ? block.dataset.thanks : block.dataset.thanksLocal;
    thanks.querySelector("[data-try-dashboard]").hidden = !state;
    thanks.querySelector("[data-try-login]").hidden = Boolean(state);
    thanks.hidden = false;
  }

  // Also answers note.js's "Did this help?". Signed out we post it here; signed in
  // the server does it. Either way the note block is hidden.
  function helped(value) {
    if (!value) return;
    const note = document.getElementById("note");
    if (!state && note && note.dataset.api) {
      const client = account.client();
      if (client) {
        fetch(note.dataset.api + "/feedbacks", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ page: url, title: title, value: value, client: client }),
        }).catch(() => {});
      }
    }
    account.write("build-here:note:" + url, { value: value, reason: null, byTry: true });
    if (note) note.hidden = true;
  }

  block.querySelector("[data-try-start]").addEventListener("click", async function () {
    const now = new Date().toISOString();
    if (state) {
      try {
        state = await account.call("POST", "/me/tries", { url: url, title: title, source: "card" });
      } catch (e) {
        return;
      }
    } else {
      const list = account.list(account.KEYS.tries);
      list.push({ url: url, title: title, source: "card", started_at: now });
      account.write(account.KEYS.tries, list);
    }
    show();
  });

  block.querySelector("[data-try-done]").addEventListener("click", () => openForm("done"));
  block.querySelector("[data-try-summary]").addEventListener("click", () => openForm("summary"));

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const issue = data.get("outcome");
    const lesson = String(data.get("lesson") || "").trim();
    const help = data.get("helped");
    const e0 = open();
    const now = new Date().toISOString();

    if (state) {
      const body = { outcome: issue, lesson: lesson, helped: help };
      try {
        state = mode === "summary" && e0
          ? await account.call("PATCH", "/me/tries/" + e0.id, body)
          : await account.call("POST", "/me/tries", Object.assign({ url: url, title: title, source: "card" }, body));
      } catch (err) {
        return;
      }
    } else {
      const list = account.list(account.KEYS.tries);
      const closed = { outcome: issue, lesson: lesson, ended_at: now };
      const i = mode === "summary" && e0 ? list.findIndex((x) => x.started_at === e0.started_at && onThisCard(x)) : -1;
      if (i > -1) Object.assign(list[i], closed);
      else list.push(Object.assign({ url: url, title: title, source: "card", started_at: now }, closed));
      account.write(account.KEYS.tries, list);
    }

    helped(help);
    show();
    thank();
  });

  account.me().then(function (e) {
    state = e;
    show();
    block.hidden = false;
  });
})();
