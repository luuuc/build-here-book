// Reader's private notes on a card, on a selected passage or the whole card.

(function () {
  const block = document.getElementById("notebook");
  const account = window.BuildHereAccount;
  if (!block || !account) return;

  const url = block.dataset.url;
  const title = block.dataset.title;
  const key = account.card(url);
  if (!key) return;

  const ul = block.querySelector(".notebook-list");
  const form = block.querySelector(".notebook-form");
  const quote = block.querySelector(".notebook-passage");
  const label = block.querySelector("[data-notebook-label]");
  const field = form.querySelector("textarea");
  const noPassage = block.querySelector("[data-notebook-no-passage]");

  let state = null;
  let passage = "";

  const notes = () =>
    (state ? state.notes : account.list(account.KEYS.notes)).filter((n) => (n.card || account.card(n.url)) === key);

  function render() {
    ul.replaceChildren();
    notes().forEach(function (n) {
      const li = document.createElement("li");
      if (n.passage) {
        const q = document.createElement("blockquote");
        q.textContent = n.passage;
        li.appendChild(q);
      }
      const p = document.createElement("p");
      p.textContent = n.text;
      li.appendChild(p);
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = block.dataset.remove;
      removeButton.addEventListener("click", () => remove(n));
      li.appendChild(removeButton);
      ul.appendChild(li);
    });
    block.querySelector("[data-notebook-local]").hidden = Boolean(state);
  }

  function setPassage(text) {
    passage = text || "";
    quote.textContent = passage;
    quote.hidden = !passage;
    noPassage.hidden = !passage;
    label.textContent = passage ? block.dataset.labelPassage : block.dataset.label;
  }

  async function remove(n) {
    if (state) {
      try {
        state = await account.call("DELETE", "/me/notes/" + n.id);
      } catch (e) {
        return;
      }
    } else {
      account.write(account.KEYS.notes, account.list(account.KEYS.notes).filter((x) => x.created_at !== n.created_at));
    }
    render();
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const text = field.value.trim();
    if (!text) return;
    const note = { url: url, title: title, passage: passage || null, text: text };
    if (state) {
      try {
        state = await account.call("POST", "/me/notes", note);
      } catch (err) {
        return;
      }
    } else {
      const list = account.list(account.KEYS.notes);
      list.push(Object.assign(note, { created_at: new Date().toISOString() }));
      if (!account.write(account.KEYS.notes, list)) return;
    }
    field.value = "";
    setPassage("");
    render();
  });

  noPassage.addEventListener("click", () => setPassage(""));

  // Called by the selection bar in share.js.
  window.buildHereRate = function (text) {
    setPassage(text);
    block.scrollIntoView({ behavior: "smooth", block: "center" });
    field.focus({ preventScroll: true });
  };

  account.me().then(function (e) {
    state = e;
    render();
    block.hidden = false;
  });
})();
