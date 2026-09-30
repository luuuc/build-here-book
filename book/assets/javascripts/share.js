// Share bar: shows over a text selection, or for the whole page from the breadcrumb icon.

(function () {
  const bar = document.getElementById("share");
  const zone = document.querySelector("main.content");
  if (!bar || !zone) return; // pages without book text

  const channels = bar.querySelector(".share-channels");
  const row = bar.querySelector(".share-bar");
  const open = bar.querySelector("[data-open]");
  const signature = bar.dataset.signature;

  const buttonPage = document.querySelector("[data-share-page]");

  let passage = "";
  let anchoring = true;

  // Truncates the shared quote only; the anchor still uses the full selection.
  const LIMIT = 280;

  function quote() {
    return passage.length > LIMIT ? passage.slice(0, LIMIT).trimEnd() + "..." : passage;
  }

  // Text-fragment links (#:~:text=). Cut by characters, not words, so a long
  // selection without spaces (a URL) can't make a huge anchor.
  function startOf(s, n) {
    if (s.length <= n) return s;
    const t = s.slice(0, n);
    const i = t.lastIndexOf(" ");
    return i > 10 ? t.slice(0, i) : t;
  }

  function endOf(s, n) {
    if (s.length <= n) return s;
    const t = s.slice(-n);
    const i = t.indexOf(" ");
    return i > -1 && i < n - 10 ? t.slice(i + 1) : t;
  }

  function anchor() {
    if (!anchoring) return "";
    const enc = (s) => encodeURIComponent(s).replace(/-/g, "%2D");
    if (passage.length <= 90) return "#:~:text=" + enc(passage);
    // Long passages use "start,end". enc() escapes "-" and "," (fragment syntax).
    return "#:~:text=" + enc(startOf(passage, 40)) + "," + enc(endOf(passage, 40));
  }

  function link() {
    return location.origin + location.pathname + anchor();
  }

  function fullText() {
    return "« " + quote() + " »\n\n" + signature + "\n" + link();
  }

  function updateChannels() {
    const url = link();
    const withQuote = "« " + quote() + " »\n\n" + signature;

    bar.querySelector('[data-channel="whatsapp"]').href =
      "https://wa.me/?text=" + encodeURIComponent(fullText());

    bar.querySelector('[data-channel="x"]').href =
      "https://x.com/intent/post?text=" +
      encodeURIComponent(withQuote) +
      "&url=" +
      encodeURIComponent(url);

    // LinkedIn ignores prefilled text; it only reads `url` and its Open Graph tags.
    bar.querySelector('[data-channel="linkedin"]').href =
      "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
  }

  function close() {
    anchoring = true;
    if (buttonPage) buttonPage.setAttribute("aria-expanded", "false");
    bar.hidden = true;
    channels.hidden = true;
    row.hidden = false;
    row.dataset.state = "closed";
    open.textContent = open.dataset.label || open.textContent;
  }

  // Goes below the selection when above would sit under the fixed header.
  function place(rect) {
    const header = document.querySelector(".header");
    const ceiling = (header ? header.getBoundingClientRect().bottom : 0) + 8;

    bar.hidden = false;
    const h = bar.offsetHeight;
    const above = rect.top - h - 8;
    const below = rect.bottom + 8;
    const y = above < ceiling ? below : above;

    const center = rect.left + rect.width / 2 - bar.offsetWidth / 2;
    const x = Math.max(8, Math.min(center, window.innerWidth - bar.offsetWidth - 8));

    bar.style.top = y + window.scrollY + "px";
    bar.style.left = x + window.scrollX + "px";
  }

  function onSelection() {
    const sel = window.getSelection();
    // In page mode there is no selection, and that must not close the bar.
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return anchoring ? close() : undefined;

    const range = sel.getRangeAt(0);
    if (!zone.contains(range.commonAncestorContainer)) return anchoring ? close() : undefined;

    // The book uses hard_wrap: collapse the line breaks inside a selection.
    const text = sel.toString().replace(/\s+/g, " ").trim();
    if (text.length < 12) return close(); // a stray word

    passage = text;
    anchoring = true;
    updateChannels();
    place(range.getBoundingClientRect());
  }

  // Not selectionchange: it fires on every character while dragging.
  document.addEventListener("mouseup", () => setTimeout(onSelection, 10));
  document.addEventListener("touchend", () => setTimeout(onSelection, 10));

  // Keep the selection when clicking the bar.
  bar.addEventListener("mousedown", (e) => e.preventDefault());

  // buildHereRate comes from notebook.js, which must load before this file.
  const rate = bar.querySelector("[data-rate]");
  if (rate && typeof window.buildHereRate === "function") {
    rate.hidden = false;
    rate.addEventListener("click", function () {
      const text = passage;
      close();
      window.buildHereRate(text);
    });
  }

  open.addEventListener("click", function () {
    row.hidden = true;
    channels.hidden = false;
    row.dataset.state = "open";
  });

  bar.querySelector('[data-channel="copy"]').addEventListener("click", function () {
    const button = this;
    const label = button.textContent;
    const showCopied = () => {
      button.textContent = bar.dataset.copied;
      setTimeout(() => {
        button.textContent = label;
        close();
      }, 1200);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText()).then(showCopied, showCopied);
      return;
    }
    // Fallback for old Safari and non-HTTPS pages.
    const field = document.createElement("textarea");
    field.value = fullText();
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(field);
    showCopied();
  });

  channels.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setTimeout(close, 50)));

  if (buttonPage) {
    buttonPage.addEventListener("click", function (e) {
      e.stopPropagation(); // or the document click handler closes it
      if (!channels.hidden && !anchoring) return close();
      passage = buttonPage.dataset.sharePage;
      anchoring = false;
      updateChannels();
      row.hidden = true;
      channels.hidden = false;
      buttonPage.setAttribute("aria-expanded", "true");
      place(buttonPage.getBoundingClientRect());
    });
  }

  // Page mode stays open until a click elsewhere; passage mode closes on mouseup.
  document.addEventListener("click", function (e) {
    if (anchoring) return;
    if (bar.contains(e.target)) return;
    close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  window.addEventListener("scroll", close, { passive: true });
})();
