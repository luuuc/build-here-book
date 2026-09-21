(function () {
  "use strict";
  const root = document.querySelector("[data-builder-test]");
  const model = window.BuilderTest;
  if (!root || !model) return;
  const el = (name) => root.querySelector(`[data-test-${name}]`);
  const landing = document.querySelector("[data-test-landing]");
  const screen = el("screen");
  let state = model.initialState();
  let activeCapability = null;
  let questionIndex = 0;
  let copyGeneration = 0;
  try { localStorage.removeItem("build-here:test-builder"); } catch (_) { /* Storage is optional. */ }

  function node(tag, text, parent, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    if (parent) parent.appendChild(element);
    return element;
  }
  function button(text, parent, handler, className = "builder-test-answer") {
    const element = node("button", text, parent, className);
    element.type = "button";
    element.addEventListener("click", handler);
    return element;
  }
  function link(resource, parent) {
    const element = node("a", resource.title, parent);
    element.href = resource.url;
    return element;
  }
  function startScreen(title, showLanding = false) {
    copyGeneration++;
    screen.replaceChildren();
    el("intro").hidden = true;
    el("workspace").hidden = false;
    if (landing) landing.hidden = !showLanding;
    el("topics").disabled = el("pistes").disabled = !state.intent;
    const intention = model.intentions.find((i) => i.id === state.intent);
    el("context").textContent = intention ? `Ton intention : ${intention.label}` : "";
    el("direct").href = "/chapters/00-choisir-ton-parcours.html" + (intention ? `#parcours-${intention.anchor}` : "");
    const heading = node("h2", title, screen);
    heading.tabIndex = -1;
    heading.focus();
  }
  function showIntentions() {
    startScreen("Que veux-tu faire maintenant ?");
    const list = node("div", "", screen, "builder-test-answers");
    model.intentions.forEach((intent) => {
      const b = button(intent.label, list, () => { state = model.setIntent(state, intent.id); showCapabilities(); });
      b.setAttribute("aria-pressed", String(state.intent === intent.id));
    });
    node("p", "Tu peux aussi rejoindre directement l'un des quatre parcours de lecture, sans répondre aux questions.", screen);
  }
  function showCapabilities() {
    startScreen("Quel sujet veux-tu explorer ?");
    node("p", "L'ordre suit le sommaire, pas une priorité. Choisis trois questions ou une piste directe sur un sujet.", screen);
    if (["team", "support"].includes(state.intent)) node("p", "Pars d'une contribution de ta part, pas d'une évaluation des capacités d'une autre personne.", screen);
    const list = node("div", "", screen, "builder-test-topics");
    model.capabilities.forEach((capability) => {
      const group = node("section", "", list);
      node("h3", capability.name, group);
      button(`Explorer : ${capability.name}`, group, () => { activeCapability = capability.id; questionIndex = 0; showQuestion(); });
      button(`Choisir directement : ${capability.name}`, group, () => showManual(capability));
    });
  }
  function showManual(capability) {
    startScreen(`Quelle piste pour ${capability.name.toLowerCase()} ?`);
    node("p", "Ce choix ne déduit rien de tes réponses. Choisis ce que tu veux faire maintenant.", screen);
    const list = node("div", "", screen, "builder-test-answers");
    model.modes.forEach((mode) => button(model.modeLabels[mode], list, () => {
      state = model.select(state, { capabilityId: capability.id, mode }); showPlan();
    }));
  }
  function showQuestion() {
    const questions = model.questions.filter((q) => q.capabilityId === activeCapability);
    const q = questions[questionIndex];
    const capability = model.capabilities.find((c) => c.id === activeCapability);
    startScreen(q.text);
    node("p", `Question ${questionIndex + 1} sur 3 · ${capability.name}`, screen, "builder-test-eyebrow");
    const count = node("p", "", screen);
    const updateCount = () => { count.textContent = `${Object.keys(state.answers).length} situation${Object.keys(state.answers).length === 1 ? " renseignée" : "s renseignées"} sur 30 disponibles. Tu peux t'arrêter ici.`; };
    updateCount();
    node("p", "Pense à un exemple assez récent pour pouvoir en retrouver les faits : études, association, activité personnelle, emploi ou entraide. Garde le même contexte pour ces trois questions si possible. Inutile de saisir ou de publier ton exemple. S'il n'y en a pas, indique-le.", screen);
    if (["team", "support"].includes(state.intent)) node("p", "Réponds pour une contribution de ta part, sans évaluer une autre personne.", screen);
    const group = node("fieldset", "", screen, "builder-test-answers");
    node("legend", "Où en es-tu avec cette pratique, dans la situation choisie ?", group);
    const conditionGroup = node("fieldset", "", screen, "builder-test-conditions");
    node("legend", "Quelle condition manque ? (facultatif, plusieurs choix possibles)", conditionGroup);
    const conditionInputs = model.conditions.map((condition) => {
      const label = node("label", "", conditionGroup);
      const input = node("input", "", label);
      input.type = "checkbox";
      input.value = condition.id;
      input.checked = (state.answers[q.id]?.conditions || []).includes(condition.id);
      node("span", condition.label, label);
      input.addEventListener("change", () => {
        state = model.answer(state, q.id, "blocked", conditionInputs.filter((i) => i.checked).map((i) => i.value));
      });
      return input;
    });
    conditionGroup.hidden = state.answers[q.id]?.mode !== "blocked";
    const nav = node("div", "", screen, "builder-test-nav");
    button("Précédente", nav, () => { questionIndex--; showQuestion(); }).disabled = questionIndex === 0;
    const next = button(questionIndex === 2 ? "Voir mes pistes" : "Suivante", nav, () => {
      if (questionIndex === 2) showCandidates(); else { questionIndex++; showQuestion(); }
    });
    next.disabled = !state.answers[q.id];
    model.answerOptions.forEach((option) => {
      const b = button(option.label, group, () => {
        const details = option.id === "blocked" ? state.answers[q.id]?.conditions || [] : [];
        state = model.answer(state, q.id, option.id, details);
        group.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", String(item === b)));
        conditionGroup.hidden = option.id !== "blocked";
        if (option.id !== "blocked") conditionInputs.forEach((input) => { input.checked = false; });
        next.disabled = false;
        updateCount();
      });
      b.setAttribute("aria-pressed", String(state.answers[q.id]?.mode === option.id));
    });
  }
  function showCandidates() {
    startScreen("Quelle piste veux-tu retenir maintenant ?");
    const candidates = model.candidates(state);
    node("p", candidates.length ? "L'ordre suit le sommaire, pas une priorité. Chaque piste reprend ta réponse ; aucune n'est sélectionnée à ta place."
      : "Tes réponses ne suffisent pas à proposer une piste. Tu peux choisir un sujet ou rejoindre ton parcours de lecture.", screen);
    model.capabilities.forEach((capability) => {
      const matches = candidates.filter((c) => c.capabilityId === capability.id);
      if (!matches.length) return;
      node("h3", capability.name, screen);
      const list = node("div", "", screen, "builder-test-answers");
      matches.forEach((candidate) => {
        const q = model.questions.find((q) => q.id === candidate.questionId);
        const answer = model.answerOptions.find((a) => a.id === candidate.mode);
        const b = button("", list, () => { state = model.select(state, candidate); showPlan(); });
        node("strong", candidate.mode === "deepen" ? "Appui que tu souhaites approfondir" : model.modeLabels[candidate.mode], b);
        node("span", q.text, b);
        node("span", answer.label, b);
      });
    });
    const recap = node("details", "", screen, "builder-test-recap");
    node("summary", `Tes réponses · ${30 - Object.keys(state.answers).length} situations non renseignées`, recap);
    const list = node("ul", "", recap);
    model.questions.filter((q) => state.answers[q.id]).forEach((q) => {
      const a = state.answers[q.id];
      node("li", `${q.text} ${model.answerOptions.find((o) => o.id === a.mode).label}`, list);
    });
    button("Choisir un sujet directement", screen, showCapabilities);
  }
  function showPlan() {
    const result = model.plan(state);
    startScreen(result.title, true);
    node("p", result.reason, screen);
    if (result.appui) node("p", result.appui, screen);
    const fields = node("div", "", screen, "builder-test-practice");
    result.fields.forEach(([title, body]) => { node("h3", title, fields); node("p", body, fields); });
    node("h3", "Lectures : une seule carte peut suffire", screen);
    const cards = node("div", "", screen, "builder-test-route");
    result.cards.forEach((card) => {
      const a = node("a", "", cards, "builder-test-card");
      a.href = card.url;
      node("small", card.type, a); node("strong", card.title, a); node("span", "Lire →", a);
    });
    node("h3", "Exemples et supports facultatifs", screen);
    const resources = node("ul", "", screen);
    result.resources.forEach((resource) => link(resource, node("li", "", resources)));
    node("p", result.disclaimer, screen);
    node("p", model.memoryNotice, screen, "builder-test-disclaimer");
    const actions = node("div", "", screen, "builder-test-actions");
    button("Changer de piste", actions, showCandidates);
    const status = node("p", "", screen);
    status.setAttribute("role", "status");
    const fallback = node("div", "", screen);
    fallback.hidden = true;
    const label = node("label", "Texte de ta piste à copier", fallback);
    const textarea = node("textarea", "", label);
    textarea.readOnly = true;
    textarea.rows = 12;
    textarea.value = model.copyText(result, location.origin);
    const generation = copyGeneration;
    button("Copier ma piste", actions, async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(textarea.value);
        if (copyGeneration === generation) status.textContent = "Piste copiée.";
      } catch (_) {
        if (copyGeneration !== generation) return;
        status.textContent = "La copie automatique n'a pas abouti. Sélectionne et copie le texte ci-dessous.";
        fallback.hidden = false;
        textarea.focus(); textarea.select();
      }
    });
  }
  el("start").hidden = false;
  el("start").addEventListener("click", showIntentions);
  el("intent").addEventListener("click", showIntentions);
  el("topics").addEventListener("click", showCapabilities);
  el("pistes").addEventListener("click", showCandidates);
  el("restart").addEventListener("click", () => {
    state = model.initialState(); activeCapability = null; questionIndex = 0; copyGeneration++;
    screen.replaceChildren();
    el("workspace").hidden = true; el("intro").hidden = false;
    if (landing) landing.hidden = false;
    el("start").focus();
  });
  // Some browsers keep the page in memory when navigating away and back.
  // Reset then too, so the stated lifetime does not imply persistent saving.
  window.addEventListener("pagehide", () => el("restart").click());
})();
