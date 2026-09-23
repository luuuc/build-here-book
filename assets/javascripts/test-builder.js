(function () {
  "use strict";
  const root = document.querySelector("[data-builder-test]");
  // Les regles viennent du modele, les phrases du contenu de la langue chargee.
  const model = window.BuilderTestModele.creer(window.BuilderTestContenu);
  if (!root || !model) return;
  const ui = model.ui;
  const el = (name) => root.querySelector(`[data-test-${name}]`);
  const landing = document.querySelector("[data-test-landing]");
  const screen = el("screen");
  const TOTAL = model.capabilities.length;
  // Les quatre intentions portent la couleur de leur parcours. La cle est
  // stable d'une langue a l'autre, comme dans _data/<lang>/interface.yml.
  const COULEUR = { start: "commencer", deepen: "progresser", team: "equipe", support: "soutenir" };
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
  function button(label, parent, action, className = "bouton bouton--contour") {
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

  /* La progression en segments : un par capacite. Une barre continue dit une
     fraction, dix segments disent combien il reste d'ecrans. */
  function renderProgress(parent, current, nb) {
    const wrap = node("div", "", parent, "progression");
    wrap.setAttribute("role", "progressbar");
    wrap.setAttribute("aria-label", ui.progression);
    wrap.setAttribute("aria-valuenow", String(current));
    wrap.setAttribute("aria-valuemin", "1");
    wrap.setAttribute("aria-valuemax", String(TOTAL));
    node("p", ui.etape(current, TOTAL, nb), wrap, "progression-etape");
    const track = node("ul", "", wrap, "progression-piste");
    for (let i = 1; i <= TOTAL; i++) {
      const segment = node("li", "", track);
      if (i < current) segment.dataset.etat = "fait";
      if (i === current) segment.dataset.etat = "courant";
    }
    return wrap;
  }

  /* L'echelle : six pastilles rondes, les plus grandes aux extremites. Les
     deux reponses a part passent dessous, elles ne sont pas une septieme
     position. Les six libelles complets restent en aria-label. */
  const TAILLE = ["large", "moyen", "", "", "moyen", "large"];
  function renderScale(parent, key, statement) {
    const group = node("fieldset", "", parent, "echelle");
    node("legend", statement, group, "echelle-question");
    const row = node("div", "", group, "echelle-rangee");
    model.scale.forEach((label, position) => {
      const cote = position < 3 ? "desaccord" : "accord";
      const taille = TAILLE[position] ? ` echelle-position--${TAILLE[position]}` : "";
      const item = node("label", "", row, `echelle-position${taille} echelle-position--${cote}`);
      const input = node("input", "", item);
      input.type = "radio";
      input.name = key;
      input.value = String(position + 1);
      input.checked = responses[key] === position + 1;
      input.setAttribute("aria-label", label);
      input.addEventListener("change", () => { responses[key] = position + 1; parent.dispatchEvent(new Event("reponse", { bubbles: true })); });
    });
    const bornes = node("div", "", group, "echelle-bornes");
    node("span", model.scale[0], bornes);
    node("span", model.scale[model.scale.length - 1], bornes);
    const apart = node("div", "", group, "echelle-apart");
    [["unseen", ui.nonRencontree], ["blocked", ui.conditionsManquantes]].forEach(([value, label]) => {
      const item = node("label", "", apart);
      const input = node("input", "", item);
      input.type = "radio";
      input.name = key;
      input.value = value;
      input.checked = responses[key] === value;
      input.addEventListener("change", () => { responses[key] = value; parent.dispatchEvent(new Event("reponse", { bubbles: true })); });
      node("span", label, item);
    });
  }

  function renderStep() {
    const capability = model.capabilities[step];
    const statements = model.statements[capability.id];
    screenTitle(capability.name);
    renderProgress(screen, step + 1, statements.length);
    node("p", ui.consigne, screen, "builder-test-consigne");
    const forms = node("div", "", screen, "builder-test-statements");
    statements.forEach((statement, index) => {
      renderScale(forms, `${capability.id}-${index + 1}`, statement);
    });
    const nav = node("div", "", screen, "builder-test-nav");
    const previous = button(ui.precedent, nav, () => { step--; renderStep(); });
    previous.disabled = step === 0;
    const right = node("div", "", nav, "builder-test-nav-suite");
    const status = node("p", "", right, "builder-test-compteur");
    const next = button(step === TOTAL - 1 ? ui.voirPistes : ui.continuer, right, () => {
      if (step === TOTAL - 1) renderResults(); else { step++; renderStep(); }
    }, "bouton");
    function update() {
      const count = statements.filter((_, index) => responses[`${capability.id}-${index + 1}`] !== undefined).length;
      next.disabled = count !== statements.length;
      status.textContent = ui.reponses(count, statements.length);
    }
    forms.addEventListener("reponse", update);
    update();
  }

  function renderResults() {
    screenTitle(ui.resultatTitre);
    node("p", ui.resultatLede, screen, "builder-test-lede");
    const intentGroup = node("fieldset", "", screen, "builder-test-intentions");
    node("legend", ui.intentionLegende, intentGroup);
    const choix = node("div", "", intentGroup, "grille");
    model.intentions.forEach((option) => {
      const label = node("label", "", choix, `carte-parcours parcours--${COULEUR[option.id] || "progresser"}`);
      node("span", "", label, "carte-parcours-pastille").setAttribute("aria-hidden", "true");
      const radio = node("input", "", label);
      radio.type = "radio";
      radio.name = "intent";
      radio.value = option.id;
      radio.checked = intent === option.id;
      radio.addEventListener("change", () => { intent = option.id; renderResults(); });
      node("span", option.label, label, "carte-parcours-titre");
    });
    const list = node("div", "", screen, "grille");
    model.profile(responses).forEach((item) => {
      const group = node("section", "", list, "carte");
      node("h3", item.capability.name, group);
      node("p", ui.directions[item.direction], group);
      if (item.unexplored) node("p", ui.nonRencontrees(item.unexplored), group, "carte-note");
      if (item.blocked) node("p", ui.conditionsOntManque(item.blocked), group, "carte-note");
      const actions = node("div", "", group, "carte-actions");
      const mode = item.direction === "explore" ? "revisit" : item.direction;
      button(ui.explorer, actions, () => renderPlan(item.capability, mode));
      if (item.blocked) button(ui.clarifier, actions, () => renderPlan(item.capability, "blocked"));
    });
    const bas = node("div", "", screen, "builder-test-actions");
    button(ui.revoir, bas, () => { step = 0; renderStep(); });
  }

  function renderPlan(capability, mode) {
    const state = model.select(model.setIntent(model.initialState(), intent), { capabilityId: capability.id, mode });
    const result = model.plan(state);
    result.reason = ui.planRaison(capability.name.toLowerCase());
    screenTitle(result.title);
    if (landing) landing.hidden = false;
    node("p", ui.planLede, screen, "builder-test-lede");
    const fields = node("div", "", screen, "builder-test-practice");
    result.fields.forEach(([title, body]) => { node("h3", title, fields); node("p", body, fields); });
    node("h3", ui.troisCartes, screen);
    const cards = node("div", "", screen, "grille grille--trois");
    result.cards.forEach((card) => {
      const link = node("a", "", cards, "carte-livre");
      link.href = card.url;
      node("span", card.type, link, "carte-livre-type");
      node("span", card.title, link, "carte-livre-titre");
      node("span", ui.lire, link, "carte-livre-meta");
    });
    const resources = node("ul", "", screen, "builder-test-ressources");
    result.resources.forEach((resource) => {
      const link = node("a", resource.title, node("li", "", resources));
      link.href = resource.url;
    });
    node("p", model.memoryNotice, screen, "builder-test-disclaimer");
    const actions = node("div", "", screen, "builder-test-actions");
    button(ui.autrePiste, actions, renderResults);
    const status = node("p", "", screen); status.setAttribute("role", "status");
    const fallback = node("div", "", screen); fallback.hidden = true;
    const label = node("label", ui.copierLabel, fallback);
    const textarea = node("textarea", "", label); textarea.readOnly = true; textarea.rows = 12;
    textarea.value = model.copyText(result, location.origin);
    const generation = copyGeneration;
    button(ui.copier, actions, async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(textarea.value);
        if (copyGeneration === generation) status.textContent = ui.copiee;
      } catch (_) {
        if (copyGeneration !== generation) return;
        status.textContent = ui.copieEchouee;
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
