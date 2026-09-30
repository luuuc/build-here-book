// Reader's private notes on a page, on a selected passage or on the whole page.
// They stay out of the way: a passage note is a highlight and a small mark in
// the text, and sits in the margin on a wide screen. All notes open in a sheet
// from the line at the bottom. One note opens in a popup, to write or edit it.

(function () {
  const block = document.getElementById("notebook");
  const sheet = document.getElementById("notes-sheet");
  const pop = document.getElementById("note-pop");
  const text = document.querySelector("main.content .container");
  const account = window.BuildHereAccount;
  if (!block || !sheet || !pop || !text || !account) return;

  const url = block.dataset.url;
  const title = block.dataset.title;
  const key = account.card(url);
  if (!key) return;

  const ul = sheet.querySelector(".notebook-list");
  const openButton = block.querySelector("[data-notebook-open]");
  // The bottom line and the sheet share their count, add button and sign-in hint.
  const both = (selector) => document.querySelectorAll("#notebook " + selector + ", #notes-sheet " + selector);

  const popQuote = pop.querySelector(".note-pop-passage");
  const popLabel = pop.querySelector("label");
  const popField = pop.querySelector("textarea");
  const popRemove = pop.querySelector("[data-pop-remove]");

  const phone = window.matchMedia("(max-width: 767px)");
  // Room for the margin next to the 40rem column.
  const wide = window.matchMedia("(min-width: 1200px)");
  // Not in every browser yet: without it, the marks still show.
  const highlights = window.CSS && CSS.highlights;

  // Outside the text, so the notes' own words never match a passage.
  const margin = document.createElement("div");
  margin.className = "note-margin";
  document.body.appendChild(margin);

  let state = null;
  let list = []; // this page's notes, read once per render: for a guest, each read gives new objects
  let ranges = new Map(); // note -> its passage in the text
  let marks = new Map(); // note -> its mark button
  let editing = null; // the note open in the popup, null for a new one
  let draft = ""; // the passage of a new note, empty for a note on the whole page
  let popAnchor = null; // what the popup opens under; none docks it at the bottom

  const notes = () =>
    (state ? state.notes : account.list(account.KEYS.notes)).filter((n) => (n.card || account.card(n.url)) === key);

  // Saving: to the account when signed in, else to this browser.
  // Local notes have no id, their creation time stands in for one.

  async function add(fields) {
    const note = Object.assign({ url: url, title: title, passage: null }, fields);
    if (state) {
      try {
        state = await account.call("POST", "/me/notes", note);
        return true;
      } catch (e) {
        return false;
      }
    }
    const list = account.list(account.KEYS.notes);
    list.push(Object.assign(note, { created_at: new Date().toISOString() }));
    return account.write(account.KEYS.notes, list);
  }

  async function update(n, value) {
    if (state) {
      try {
        state = await account.call("PATCH", "/me/notes/" + n.id, { text: value });
        return true;
      } catch (e) {
        return false;
      }
    }
    const list = account.list(account.KEYS.notes);
    list.forEach((x) => {
      if (x.created_at === n.created_at) x.text = value;
    });
    return account.write(account.KEYS.notes, list);
  }

  async function remove(n) {
    if (!window.confirm(block.dataset.confirm)) return false;
    if (state) {
      try {
        state = await account.call("DELETE", "/me/notes/" + n.id);
        return true;
      } catch (e) {
        return false;
      }
    }
    return account.write(account.KEYS.notes, account.list(account.KEYS.notes).filter((x) => x.created_at !== n.created_at));
  }

  // Finding a passage in the text. Whitespace is ignored on both sides: the
  // saved passage has its line breaks collapsed, the page has hard wraps.

  function index() {
    const walker = document.createTreeWalker(text, NodeFilter.SHOW_TEXT);
    let flat = "";
    const at = [];
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const s = node.data;
      for (let i = 0; i < s.length; i++) {
        if (/\s/.test(s[i])) continue;
        flat += s[i];
        at.push([node, i]);
      }
    }
    return { flat: flat, at: at };
  }

  function locate(idx, passage) {
    const needle = passage.replace(/\s+/g, "");
    const i = needle ? idx.flat.indexOf(needle) : -1;
    if (i < 0) return null;
    const start = idx.at[i];
    const end = idx.at[i + needle.length - 1];
    const range = document.createRange();
    range.setStart(start[0], start[1]);
    range.setEnd(end[0], end[1] + 1);
    return range;
  }

  function paint(name, list) {
    if (!highlights) return;
    if (list.length) highlights.set(name, new Highlight(...list));
    else highlights.delete(name);
  }

  // A passage no longer in the text (the page was edited) counts as a page note.
  function markPassages() {
    marks.forEach((b) => b.remove());
    ranges = new Map();
    marks = new Map();

    const idx = index();
    list.forEach(function (n) {
      const range = n.passage && locate(idx, n.passage);
      if (range) ranges.set(n, range);
    });

    // Insert after locating: each mark splits a text node. Live ranges follow, the index doesn't.
    ranges.forEach(function (range, n) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "note-mark";
      b.setAttribute("aria-label", block.dataset.mark);
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        openPop(n, range, "");
      });
      const end = range.cloneRange();
      end.collapse(false);
      end.insertNode(b);
      marks.set(n, b);
    });
    paint("notes", Array.from(ranges.values()));
  }

  const pageNotes = () => list.filter((n) => !ranges.has(n)).reverse();
  const textNotes = () =>
    list.filter((n) => ranges.has(n)).sort((a, b) => ranges.get(a).compareBoundaryPoints(Range.START_TO_START, ranges.get(b)));

  function trash(n) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "note-trash";
    b.setAttribute("aria-label", block.dataset.remove);
    b.title = block.dataset.remove;
    b.addEventListener("click", async function (e) {
      e.stopPropagation();
      if (await remove(n)) render();
    });
    return b;
  }

  // The sheet: page notes first, newest first, then passage notes in the order of the text.
  function renderSheet() {
    ul.replaceChildren();
    pageNotes().concat(textNotes()).forEach(function (n) {
      const li = document.createElement("li");
      const item = document.createElement("button");
      item.type = "button";
      item.className = "notes-item";
      if (n.passage) {
        const q = document.createElement("blockquote");
        q.textContent = n.passage;
        item.appendChild(q);
      }
      const p = document.createElement("p");
      p.textContent = n.text;
      item.appendChild(p);
      item.addEventListener("click", function () {
        sheet.close();
        if (ranges.has(n)) goTo(n);
        else openPop(n, null, "");
      });
      li.append(item, trash(n));
      ul.appendChild(li);
    });
  }

  // The margin, on a wide screen: page notes at the top, each passage note level
  // with its passage, pushed down when the one above takes its place.
  function renderMargin() {
    margin.replaceChildren();
    if (!wide.matches || !list.length) return;

    const column = text.getBoundingClientRect();
    const left = column.right + window.scrollX + 40;
    let floor = column.top + window.scrollY;
    const place = function (el, top) {
      el.style.left = left + "px";
      margin.appendChild(el);
      top = Math.max(top, floor);
      el.style.top = top + "px";
      floor = top + el.offsetHeight + 12;
    };

    const onPage = pageNotes();
    if (onPage.length) {
      const group = document.createElement("div");
      group.className = "note-margin-page";
      const heading = document.createElement("p");
      heading.className = "note-margin-title";
      heading.textContent = block.dataset.pageNotes;
      group.appendChild(heading);
      onPage.forEach((n) => group.appendChild(marginNote(n)));
      place(group, floor);
    }
    textNotes().forEach((n) => place(marginNote(n), ranges.get(n).getBoundingClientRect().top + window.scrollY));
  }

  function marginNote(n) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "note-margin-item";
    b.textContent = n.text;
    const range = ranges.get(n);
    b.addEventListener("click", () => openPop(n, range || b, ""));
    if (range) {
      b.addEventListener("mouseenter", () => paint("note-focus", [range]));
      b.addEventListener("mouseleave", () => paint("note-focus", []));
    }
    return b;
  }

  function render() {
    list = notes();
    markPassages();
    both("[data-notebook-count]").forEach((c) => (c.textContent = list.length ? "· " + list.length : ""));
    both("[data-notebook-local]").forEach((s) => (s.hidden = Boolean(state)));
    openButton.hidden = !list.length;
    renderSheet();
    renderMargin();
  }

  // The passage goes to the top quarter, clear of the popup's bottom sheet on a phone.
  function goTo(n) {
    const rect = ranges.get(n).getBoundingClientRect();
    window.scrollTo({ top: rect.top + window.scrollY - window.innerHeight / 4, behavior: "smooth" });
    openPop(n, ranges.get(n), "");
  }

  // The popup: under its anchor on a wide screen, docked at the bottom on a
  // phone or without an anchor.

  function placePop() {
    const docked = phone.matches || !popAnchor;
    pop.classList.toggle("note-pop--docked", docked);
    if (docked) {
      pop.style.top = pop.style.left = "";
      return;
    }
    const rect = popAnchor.getBoundingClientRect();
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - pop.offsetWidth - 8));
    pop.style.top = rect.bottom + 8 + window.scrollY + "px";
    pop.style.left = left + window.scrollX + "px";
  }

  function openPop(n, anchor, passage) {
    editing = n;
    draft = passage;
    popAnchor = anchor;
    const quote = n ? n.passage : passage;
    popQuote.textContent = quote || "";
    popQuote.hidden = !quote;
    popLabel.textContent = quote ? pop.dataset.labelPassage : pop.dataset.labelCard;
    popField.value = n ? n.text : "";
    popField.defaultValue = popField.value;
    popRemove.hidden = !n;
    pop.hidden = false;
    placePop();
    paint("note-draft", !n && passage ? [anchor] : []);
    // Only a new note gets the keyboard: reading an old one shouldn't pop it up on a phone.
    if (!n) popField.focus({ preventScroll: true });
  }

  function closePop() {
    pop.hidden = true;
    editing = null;
    draft = "";
    popAnchor = null;
    paint("note-draft", []);
  }

  pop.addEventListener("submit", async function (e) {
    e.preventDefault();
    const value = popField.value.trim();
    if (!value) return;
    const saved = editing ? await update(editing, value) : await add({ passage: draft || null, text: value });
    if (!saved) return;
    closePop();
    render();
  });

  pop.querySelector("[data-pop-cancel]").addEventListener("click", closePop);

  popRemove.addEventListener("click", async function () {
    if (!editing || !(await remove(editing))) return;
    closePop();
    render();
  });

  // A click elsewhere closes the popup, unless it holds unsaved words.
  document.addEventListener("mousedown", function (e) {
    if (pop.hidden || pop.contains(e.target) || e.target.closest(".note-mark, .share")) return;
    if (popField.value !== popField.defaultValue) return;
    closePop();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !pop.hidden) closePop();
  });

  // The sheet. A native dialog: it traps focus and closes on Escape.

  // WebKit paints text highlights through the dialog: drop them while it's open.
  openButton.addEventListener("click", function () {
    paint("notes", []);
    sheet.showModal();
  });
  sheet.addEventListener("close", () => paint("notes", Array.from(ranges.values())));
  sheet.querySelector("[data-sheet-close]").addEventListener("click", () => sheet.close());

  // A click on the backdrop lands on the dialog itself, outside its box.
  sheet.addEventListener("click", function (e) {
    if (e.target !== sheet) return;
    const r = sheet.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) sheet.close();
  });

  both("[data-notebook-add]").forEach(function (b) {
    b.addEventListener("click", function () {
      const inSheet = sheet.contains(b);
      if (inSheet) sheet.close();
      openPop(null, inSheet ? null : b, "");
    });
  });

  // Anything that moves the text moves the margin and the popup: a resize, a
  // font or an image arriving.
  let queued = false;
  function relayout() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      renderMargin();
      if (!pop.hidden) placePop();
    });
  }
  window.addEventListener("resize", relayout);
  if (window.ResizeObserver) new ResizeObserver(relayout).observe(document.body);

  // Called by the selection bar in share.js, whose selection is still on the page.
  window.buildHereRate = function (passage) {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    const range = selection.getRangeAt(0).cloneRange();
    // Dropping the selection keeps the phone's copy menu off the sheet.
    selection.removeAllRanges();
    openPop(null, range, passage);
  };

  account.me().then(function (e) {
    state = e;
    render();
    block.hidden = false;
  });
})();
