// "Did this help?" block. Sends on every click; the server dedupes by client id.

(function () {
  const block = document.getElementById("note");
  if (!block) return;

  const API = block.dataset.api;
  const page = block.dataset.page;
  const KEY = "build-here:note:" + page;

  const values = block.querySelector(".note-values");
  const next = block.querySelector(".note-next");
  const thanks = block.querySelector(".note-thanks");
  const free = block.querySelector(".note-free textarea");
  const send = block.querySelector(".note-send");

  let state = { value: null, reason: null };

  function client() {
    try {
      let c = localStorage.getItem("build-here:client");
      if (!c) {
        c = crypto.randomUUID();
        localStorage.setItem("build-here:client", c);
      }
      return c;
    } catch (e) {
      return "";
    }
  }

  async function sendNote() {
    const c = client();
    if (!c) return; // storage blocked: can't dedupe, so don't send

    try {
      await fetch(`${API}/feedbacks`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          page,
          title: block.dataset.title,
          value: state.value,
          reason: state.reason,
          comment: free.value.trim() || null,
          client: c,
        }),
      });
    } catch (e) {
      // Fail silently.
    }
  }

  function mark() {
    values.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.value === state.value))
    );
    next.querySelectorAll("[data-reason]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.reason === state.reason))
    );
  }

  function remember() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }

  values.querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", function () {
      // Clear the comment so it isn't sent with the new answer.
      state = { value: b.dataset.value, reason: null };
      free.value = "";
      send.disabled = false;
      mark();
      remember();
      sendNote();

      const detail = state.value !== "yes";
      next.hidden = !detail;
      thanks.hidden = detail;
    })
  );

  next.querySelectorAll("[data-reason]").forEach((b) =>
    b.addEventListener("click", function () {
      state.reason = state.reason === b.dataset.reason ? null : b.dataset.reason;
      mark();
      remember();
      sendNote();
    })
  );

  send.addEventListener("click", async function () {
    send.disabled = true;
    await sendNote();
    next.hidden = true;
    thanks.hidden = false;
  });

  // byTry is set by try.js when the reader answered while closing a try: hide the block.
  let byTry = false;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved && saved.value) {
      state = { value: saved.value, reason: saved.reason };
      byTry = Boolean(saved.byTry);
      mark();
    }
  } catch (e) {}

  block.hidden = byTry;
})();
