(function () {
  "use strict";
  const root = document.querySelector("[data-builder-test]");
  const model = window.BuilderTest;
  if (!root || !model) return;
  const el = (name) => root.querySelector(`[data-test-${name}]`);
  const landing = document.querySelector("[data-test-landing]");
  const screen = el("screen");
  let responses = {};
  let intent = "start";
  let step = 0;
  let copyGeneration = 0;
  try { localStorage.removeItem("build-here:test-builder"); } catch (_) { /* Optional storage. */ }

  function node(tag, content, parent, className) {
    const element = document.createElement(tag);
    if (content) element.textContent = content;
    if (className) element.className = className;
    if (parent) parent.appendChild(element);
    return element;
  }
  function button(label, parent, action, className = "builder-test-answer") {
    const element = node("button", label, parent, className);
    element.type = "button";
    element.addEventListener("click", action);
    return element;
  }
  function screenTitle(title) {
    copyGeneration++;
    screen.replaceChildren();
    el("intro").hidden = true;
    el("workspace").hidden = false;
    if (landing) landing.hidden = true;
    const heading = node("h2", title, screen);
    heading.tabIndex = -1;
    heading.focus();
  }
  function renderStep() {
    const capability = model.capabilities[step];
    screenTitle(capability.name);
    node("p", `Étape ${step + 1} sur 10 · 6 affirmations`, screen, "builder-test-eyebrow");
    const progress = node("div", "", screen, "builder-test-progress");
    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-label", "Progression du test");
    progress.setAttribute("aria-valuenow", String(step + 1));
    progress.setAttribute("aria-valuemin", "1");
    progress.setAttribute("aria-valuemax", "10");
    const track = node("span", "", progress, "builder-test-progress-track");
    node("span", "", track).style.width = `${(step + 1) * 10}%`;
    node("p", "Pense à ce que tu fais aujourd'hui, dans tes études, ton activité, une association ou un projet personnel. Choisis une position sur l'échelle ; si tu n'as pas rencontré la situation, indique-le à part.", screen);
    const forms = node("div", "", screen, "builder-test-statements");
    model.statements[capability.id].forEach((statement, index) => {
      const key = `${capability.id}-${index + 1}`;
      const group = node("fieldset", "", forms, "builder-test-statement");
      node("legend", statement, group);
      const scale = node("div", "", group, "builder-test-scale");
      model.scale.forEach((label, position) => {
        const item = node("label", "", scale);
        const input = node("input", "", item);
        input.type = "radio"; input.name = key; input.value = String(position + 1);
        input.checked = responses[key] === position + 1;
        input.setAttribute("aria-label", label);
        input.addEventListener("change", () => { responses[key] = position + 1; updateNext(); });
        node("span", String(position + 1), item);
      });
      const labels = node("div", "", group, "builder-test-scale-labels");
      node("span", "Pas du tout d'accord", labels);
      node("span", "Tout à fait d'accord", labels);
      const unseen = node("label", "", group, "builder-test-unseen");
      const input = node("input", "", unseen);
      input.type = "radio"; input.name = key; input.value = "unseen";
      input.checked = responses[key] === "unseen";
      input.addEventListener("change", () => { responses[key] = "unseen"; updateNext(); });
      node("span", "Je n'ai pas encore rencontré cette situation", unseen);
      const blocked = node("label", "", group, "builder-test-unseen");
      const blockedInput = node("input", "", blocked);
      blockedInput.type = "radio"; blockedInput.name = key; blockedInput.value = "blocked";
      blockedInput.checked = responses[key] === "blocked";
      blockedInput.addEventListener("change", () => { responses[key] = "blocked"; updateNext(); });
      node("span", "Les conditions m'ont manqué pour essayer", blocked);
    });
    const nav = node("div", "", screen, "builder-test-nav");
    button("Précédent", nav, () => { step--; renderStep(); }).disabled = step === 0;
    const next = button(step === 9 ? "Voir mes pistes" : "Continuer", nav, () => {
      if (step === 9) renderResults(); else { step++; renderStep(); }
    });
    const status = node("p", "", screen, "builder-test-eyebrow");
    function updateNext() {
      const count = model.statements[capability.id].filter((_, index) => responses[`${capability.id}-${index + 1}`] !== undefined).length;
      next.disabled = count !== 6;
      status.textContent = `${count} réponse${count > 1 ? "s" : ""} sur 6`;
    }
    updateNext();
  }
  function renderResults() {
    screenTitle("Comment construis-tu aujourd'hui ?");
    node("p", "Tes réponses ouvrent des pistes de lecture. Elles ne décident pas si tu es un builder et ne mesurent pas tes capacités. Choisis le sujet qui t'aiderait maintenant.", screen);
    const intentGroup = node("fieldset", "", screen, "builder-test-intentions");
    node("legend", "Pour adapter la suite, que veux-tu faire ?", intentGroup);
    model.intentions.forEach((option) => {
      const label = node("label", "", intentGroup);
      const radio = node("input", "", label);
      radio.type = "radio"; radio.name = "intent"; radio.value = option.id;
      radio.checked = intent === option.id;
      radio.addEventListener("change", () => { intent = option.id; renderResults(); });
      node("span", option.label, label);
    });
    const list = node("div", "", screen, "builder-test-result-list");
    model.profile(responses).forEach((item) => {
      const group = node("section", "", list, "builder-test-result-item");
      node("h3", item.capability.name, group);
      const descriptions = {
        deepen: "Tu reconnais ces gestes dans ta pratique : explore leurs limites ou un autre contexte.",
        revisit: "Tu reconnais moins ces gestes : choisis un premier ajustement si ce sujet t'intéresse.",
        explore: "Tes réponses varient selon les situations : choisis un cas concret à examiner.",
        discover: "Tu as peu de situations vécues sur ce sujet : commence par un exemple ou un premier essai."
      };
      node("p", descriptions[item.direction], group);
      if (item.unexplored) node("p", `${item.unexplored} situation${item.unexplored > 1 ? "s" : ""} non rencontrée${item.unexplored > 1 ? "s" : ""}, sans jugement.`, group);
      if (item.blocked) node("p", `${item.blocked} situation${item.blocked > 1 ? "s" : ""} où les conditions ont manqué.`, group);
      const mode = item.direction === "explore" ? "revisit" : item.direction;
      button("Explorer cette piste →", group, () => renderPlan(item.capability, mode), "builder-test-primary");
      if (item.blocked) button("Clarifier les conditions →", group, () => renderPlan(item.capability, "blocked"));
    });
    button("Revoir les réponses", screen, () => { step = 0; renderStep(); });
  }
  function renderPlan(capability, mode) {
    const state = model.select(model.setIntent(model.initialState(), intent), { capabilityId: capability.id, mode });
    const result = model.plan(state);
    result.reason = `Tu as choisi ${capability.name.toLowerCase()} après avoir parcouru les affirmations. Voici une proposition à adapter à ta situation.`;
    screenTitle(result.title);
    if (landing) landing.hidden = false;
    node("p", "Tu as choisi cette piste à partir de tes réponses. Le test ne pose aucun diagnostic.", screen);
    const fields = node("div", "", screen, "builder-test-practice");
    result.fields.forEach(([title, body]) => { node("h3", title, fields); node("p", body, fields); });
    node("h3", "Trois cartes pour aller plus loin", screen);
    const cards = node("div", "", screen, "builder-test-route");
    result.cards.forEach((card) => {
      const link = node("a", "", cards, "builder-test-card");
      link.href = card.url;
      node("small", card.type, link); node("strong", card.title, link); node("span", "Lire →", link);
    });
    const resources = node("ul", "", screen);
    result.resources.forEach((resource) => {
      const link = node("a", resource.title, node("li", "", resources));
      link.href = resource.url;
    });
    node("p", model.memoryNotice, screen, "builder-test-disclaimer");
    const actions = node("div", "", screen, "builder-test-actions");
    button("Choisir une autre piste", actions, renderResults);
    const status = node("p", "", screen); status.setAttribute("role", "status");
    const fallback = node("div", "", screen); fallback.hidden = true;
    const label = node("label", "Texte de ta piste à copier", fallback);
    const textarea = node("textarea", "", label); textarea.readOnly = true; textarea.rows = 12;
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
        fallback.hidden = false; textarea.focus(); textarea.select();
      }
    });
  }
  function reset() {
    responses = {}; intent = "start"; step = 0; copyGeneration++;
    screen.replaceChildren(); el("workspace").hidden = true; el("intro").hidden = false;
    if (landing) landing.hidden = false;
    el("start").focus();
  }
  el("start").hidden = false;
  el("start").addEventListener("click", renderStep);
  el("restart").addEventListener("click", reset);
  window.addEventListener("pagehide", reset);
})();
