// Reader state: saved to the account via /me when signed in, else to localStorage.
// On first sign-in, local data is synced to the account and cleared. The site loads this file too.

(function () {
  const KEYS = {
    resume: "build-here:resume",
    kept: "build-here:kept",
    notes: "build-here:notes",
    tries: "build-here:tries",
    goal: "build-here:goal",
    test: "build-here:test-builder:answers",
  };

  // localStorage can throw (private mode, full or blocked storage): fail silently.
  function read(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clear(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }

  const list = (key) => {
    const l = read(key, []);
    return Array.isArray(l) ? l : [];
  };

  // Moves readers' saved data from the old French localStorage keys and fields.
  function migrateOldKeys() {
    const retitle = (item) => {
      if (!item || typeof item !== "object" || !("titre" in item)) return item;
      const { titre, ...rest } = item;
      return { ...rest, title: titre };
    };
    [
      ["build-here:reprendre", KEYS.resume, retitle],
      ["build-here:gardees", KEYS.kept, (l) => (Array.isArray(l) ? l.map(retitle) : l)],
      ["build-here:test-builder:reponses", KEYS.test, (v) => v],
    ].forEach(([old, key, convert]) => {
      const v = read(old, null);
      if (v === null) return;
      if (read(key, null) === null) write(key, convert(v));
      clear(old);
    });
    try {
      Object.keys(localStorage).filter((k) => k.startsWith("build-here:note:")).forEach((k) => {
        const v = read(k, null);
        if (!v || typeof v !== "object" || !("valeur" in v)) return;
        write(k, { value: v.valeur, reason: v.raison, byTry: v.parEssai });
      });
    } catch (e) {}
  }
  migrateOldKeys();

  // Card key from its URL: 05-05-some-title.html gives "5.05".
  function card(url) {
    const m = /\/(\d{2})-(\d{2})-[a-z0-9-]+\.html$/.exec(url || "");
    return m ? Number(m[1]) + "." + m[2] : null;
  }

  async function call(method, path, body) {
    const answer = await fetch(path, {
      method: method,
      credentials: "same-origin",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!answer.ok) throw new Error(String(answer.status));
    return answer.status === 204 ? null : answer.json();
  }

  function result(model, answers, estimate, date) {
    const r = model.level(answers);
    const target = r.next || r.steps[r.steps.length - 1];
    return {
      taken_on: date || new Date().toISOString().slice(0, 10),
      answers: answers,
      estimate: Array.isArray(estimate) ? estimate : null,
      level: r.tier ? r.tier.number : null,
      level_name: r.tier ? r.tier.name : null,
      step: r.level,
      blocking_step: r.next ? r.next.step : null,
      blocking_name: r.next ? r.next.capability.name : null,
      move: r.tier ? target.capability.plan : null,
      cards: r.tier ? target.capability.cards.map((c) => ({ url: c.url, title: c.title })) : [],
    };
  }

  // Needs the test model scripts on the page (dashboard, test); otherwise answers wait.
  function testSaved() {
    const saved = read(KEYS.test, null);
    if (!saved || !saved.responses || !window.BuilderTestModel || !window.BuilderTestContent) return null;
    const model = window.BuilderTestModel.create(window.BuilderTestContent);
    return model ? result(model, saved.responses, null, saved.date) : null;
  }

  function toJoin() {
    const resume = read(KEYS.resume, null);
    const body = {
      resume: resume && resume.url ? { url: resume.url, title: resume.title } : null,
      kept: list(KEYS.kept).map((g) => ({ url: g.url, title: g.title })),
      notes: list(KEYS.notes),
      tries: list(KEYS.tries),
      goal: read(KEYS.goal, null),
      test_result: testSaved(),
    };
    const empty = !body.resume && !body.kept.length && !body.notes.length && !body.tries.length &&
      !body.goal && !body.test_result;
    return empty ? null : body;
  }

  async function join(state) {
    const body = state && toJoin();
    if (!body) return state;
    try {
      const fresh = await call("POST", "/me/sync", body);
      [KEYS.resume, KEYS.kept, KEYS.notes, KEYS.tries, KEYS.goal].forEach(clear);
      if (body.test_result) clear(KEYS.test);
      // The dashboard is server-rendered: reload to show synced data.
      // Only if local data is now empty, or it would reload forever.
      if (document.querySelector("[data-dashboard]") && !toJoin()) location.reload();
      return fresh;
    } catch (e) {
      return state;
    }
  }

  // Account state, or null when signed out. Fetched once per page.
  let promise = null;
  function me() {
    if (!promise) promise = call("GET", "/me").catch(() => null).then(join);
    return promise;
  }

  // Per-browser id so the feedback API replaces a reader's answer instead of adding one.
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

  window.BuildHereAccount = { KEYS, read, write, list, card, call, me, result, client };

  me();
})();
