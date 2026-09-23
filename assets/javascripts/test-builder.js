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
  // Les etapes cochees au debut, [] pour « aucune », "nsp" ou null sinon.
  let estimate = null;
  let mapOpen = false;
  let copyGeneration = 0;
  try { localStorage.removeItem("build-here:test-builder"); } catch (_) { /* Optional storage. */ }

  /* Les reponses ne sont gardees que si le lecteur le choisit, sur son
     appareil, sous une seule cle. Rien n'est envoye. Au passage suivant,
     le resultat dit ce qui a bouge. Le stockage peut manquer (navigation
     privee) : tout marche sans lui. */
  const CLE = "build-here:test-builder:reponses";
  function lireGarde() {
    try {
      const garde = JSON.parse(localStorage.getItem(CLE));
      return garde && garde.date && garde.responses ? garde : null;
    } catch (_) { return null; }
  }
  function garder() {
    try { localStorage.setItem(CLE, JSON.stringify({ date: new Date().toISOString().slice(0, 10), responses })); return true; } catch (_) { return false; }
  }
  function effacer() { try { localStorage.removeItem(CLE); } catch (_) { /* Optional storage. */ } }
  const precedent = lireGarde();
  let gardeActive = Boolean(precedent);

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

  /* Une question : ses options en liste, puis les deux reponses hors calcul
     dessous. L'ordre des habitudes, des « derniere fois » et des situations
     est tire au hasard une fois par passage : la bonne reponse ne se repere
     pas a sa place. Les echelles et les « a quand remonte » gardent leur
     ordre naturel. */
  const MELANGE = ["habitude", "derniere-fois", "situation"];
  let ordres = {};
  function melanger(liste) {
    const copie = [...liste];
    for (let i = copie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
  }
  function radio(parent, question, option) {
    const item = node("label", "", parent);
    const input = node("input", "", item);
    input.type = "radio";
    input.name = question.id;
    input.value = option.id;
    input.checked = responses[question.id] === option.id;
    input.addEventListener("change", () => { responses[question.id] = option.id; parent.dispatchEvent(new Event("reponse", { bubbles: true })); });
    node("span", option.label, item);
  }
  function renderQuestion(parent, question) {
    const group = node("fieldset", "", parent, "echelle");
    node("legend", question.text, group, "echelle-question");
    const options = model.options(question);
    if (MELANGE.includes(question.kind)) ordres[question.id] = ordres[question.id] || melanger(options);
    const liste = node("div", "", group, "echelle-choix");
    (ordres[question.id] || options).forEach((option) => radio(liste, question, option));
    if (question.kind === "situation") return;
    const apart = node("div", "", group, "echelle-apart");
    model.horsEchelle.forEach((option) => radio(apart, question, option));
  }

  function renderStep() {
    const capability = model.capabilities[step];
    const questions = model.questions.filter((q) => q.capabilityId === capability.id);
    screenTitle(capability.name);
    renderProgress(screen, step + 1, questions.length);
    node("p", ui.consigne, screen, "builder-test-consigne");
    const forms = node("div", "", screen, "builder-test-statements");
    questions.forEach((question) => renderQuestion(forms, question));
    const nav = node("div", "", screen, "builder-test-nav");
    button(ui.precedent, nav, () => { if (step === 0) renderEstimate(); else { step--; renderStep(); } });
    const right = node("div", "", nav, "builder-test-nav-suite");
    const status = node("p", "", right, "builder-test-compteur");
    const next = button(step === TOTAL - 1 ? ui.voirNiveau : ui.continuer, right, () => {
      if (step === TOTAL - 1) renderResults(); else { step++; renderStep(); }
    }, "bouton");
    function update() {
      const count = questions.filter((q) => responses[q.id] !== undefined).length;
      next.disabled = count !== questions.length;
      status.textContent = ui.reponses(count, questions.length);
    }
    forms.addEventListener("reponse", update);
    update();
  }

  /* Avant la premiere etape, le lecteur dit ou il pense etre. Le resultat
     compare : l'ecart entre ce qu'on croit faire et ce qu'on fait est ce
     qui surprend le plus. La question est facultative. */
  function renderEstimate() {
    const e = ui.estimation;
    screenTitle(e.titre);
    node("p", e.aide, screen, "builder-test-consigne");
    const group = node("fieldset", "", screen, "echelle");
    node("legend", e.question, group, "echelle-question");
    // Les etapes se cochent ensemble. « Aucune » et « je ne sais pas »
    // s'excluent entre elles et avec les etapes : en cocher une vide l'autre
    // cote. Rien de coche vaut « je ne sais pas ».
    const liste = node("div", "", group, "echelle-choix");
    const etapes = model.capabilities.map((c, i) => {
      const item = node("label", "", liste);
      const input = node("input", "", item);
      input.type = "checkbox";
      input.name = "estimation-etape";
      input.value = String(i + 1);
      input.checked = Array.isArray(estimate) && estimate.includes(i + 1);
      node("span", `${i + 1}. ${c.name} · ${c.phrase}`, item);
      return input;
    });
    const apart = node("div", "", group, "echelle-apart");
    const autres = [["aucune", e.aucune], ["nsp", e.nsp]].map(([valeur, label]) => {
      const item = node("label", "", apart);
      const input = node("input", "", item);
      input.type = "radio";
      input.name = "estimation-apart";
      input.value = valeur;
      input.checked = valeur === "aucune" ? Array.isArray(estimate) && !estimate.length : estimate === "nsp";
      node("span", label, item);
      return input;
    });
    etapes.forEach((input) => input.addEventListener("change", () => {
      autres.forEach((autre) => { autre.checked = false; });
      const cochees = etapes.filter((i) => i.checked).map((i) => Number(i.value));
      estimate = cochees.length ? cochees : null;
    }));
    autres.forEach((input) => input.addEventListener("change", () => {
      etapes.forEach((etape) => { etape.checked = false; });
      estimate = input.value === "aucune" ? [] : "nsp";
    }));
    const nav = node("div", "", screen, "builder-test-nav");
    node("span", "", nav);
    button(e.commencer, node("div", "", nav, "builder-test-nav-suite"), () => { step = 0; renderStep(); }, "bouton");
  }

  function dateLisible(date) {
    const d = typeof date === "string" ? new Date(`${date}T12:00:00`) : date;
    return d.toLocaleDateString(document.documentElement.lang || undefined, { day: "numeric", month: "long", year: "numeric" });
  }

  function copyButton(parent, label, text) {
    // Le message et le texte de secours vont sous la rangee de boutons.
    const status = node("p", "", screen); status.setAttribute("role", "status");
    const fallback = node("div", "", screen); fallback.hidden = true;
    const field = node("label", ui.copierLabel, fallback);
    const textarea = node("textarea", "", field); textarea.readOnly = true; textarea.rows = 10;
    textarea.value = text;
    const generation = copyGeneration;
    return button(label, parent, async () => {
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

  /* Le resultat repond a trois questions, dans l'ordre : ou j'en suis, ce
     qui me retient, quoi faire ensuite. La position d'abord, sur l'echelle
     entiere ; le nom du palier ensuite ; puis ce que tu fais deja, ce qui
     te retient, l'etape suivante en gestes, un seul geste propose, et le
     rendez-vous. Les dix etapes restent en bas, repliees. */
  function renderResults() {
    const r = model.level(responses);
    const nom = (s) => s.capability.name;
    const noms = (steps) => steps.map(nom).join(", ");
    screenTitle(ui.resultatTitre);

    // Ou j'en suis.
    const bloc = node("section", "", screen, "niveau");
    if (r.palier) {
      node("p", ui.niveau(r.palier.numero, model.paliers.length), bloc, "niveau-numero");
      node("p", r.palier.nom, bloc, "niveau-nom");
    }
    const echelle = node("ol", "", bloc, "niveau-echelle");
    r.steps.slice().reverse().forEach((s) => {
      const item = node("li", "", echelle);
      item.dataset.etat = s.status;
      node("span", String(s.step), item, "niveau-echelle-numero");
      const texte = node("span", "", item, "niveau-echelle-texte");
      node("span", nom(s), texte, "niveau-echelle-nom");
      node("span", ui.statuts[s.status], texte, "niveau-echelle-etat");
      if (r.niveau === s.step) node("span", ui.ici, item, "niveau-echelle-marque");
      if (r.suivante === s) node("span", ui.prochaineMarque, item, "niveau-echelle-marque niveau-echelle-marque--suivante");
    });
    if (r.palier) {
      node("p", ui.position(r.niveau, r.niveau ? nom(r.steps[r.niveau - 1]) : null), bloc, "niveau-texte");
      node("p", r.suivante ? ui.prochaine(r.suivante.step, nom(r.suivante)) : ui.sommet, bloc, "niveau-texte");
      node("p", r.palier.texte, bloc);
      const ecart = model.ecart(Array.isArray(estimate) ? estimate : null, r.steps);
      if (ecart) {
        if (ecart.surestimees.length) node("p", ui.ecart.trop(noms(ecart.surestimees)), bloc, "niveau-ecart");
        if (ecart.sousestimees.length) node("p", ui.ecart.pasAssez(noms(ecart.sousestimees)), bloc, "niveau-ecart");
        if (!ecart.surestimees.length && !ecart.sousestimees.length) node("p", ui.ecart.juste, bloc, "niveau-ecart");
      }
    } else {
      node("p", ui.sansNiveau, bloc, "niveau-texte");
    }
    if (r.trou && r.trou !== r.suivante) node("p", ui.trou(nom(r.trou)), bloc);
    if (r.bloquees.length) node("p", ui.bloquees(noms(r.bloquees)), bloc);
    const bouge = precedent && model.compare(precedent.responses, responses);
    if (bouge) {
      const depuis = node("div", "", bloc, "niveau-depuis");
      node("p", ui.depuisTitre, depuis, "niveau-numero");
      node("p", ui.depuis(dateLisible(precedent.date), bouge.avant, bouge.apres), depuis, "niveau-texte");
      if (bouge.gagnes.length) {
        node("p", ui.gagnes, depuis);
        const liste = node("ul", "", depuis, "builder-test-ressources");
        bouge.gagnes.slice(0, 5).forEach((g) => node("li", g, liste));
      }
    }

    // Ce que tu fais deja : avant ce qui retient, et pris ailleurs.
    const preuves = (parent, items) => {
      const liste = node("ul", "", parent, "niveau-preuves");
      items.forEach((i) => {
        const li = node("li", "", liste);
        node("strong", i.geste, li);
        node("span", ui.reponse(i.reponse), li);
      });
    };
    if (r.forces.length) {
      node("h3", ui.forcesTitre, screen);
      preuves(screen, r.forces);
    }
    if (!r.palier) { renderMap(r); return; }

    // Ce qui te retient : l'etape suivante en cinq gestes, ceux qui manquent
    // d'abord, chacun avec la reponse qui le montre.
    if (r.suivante) {
      node("h3", ui.freinsTitre(r.suivante.step, nom(r.suivante)), screen);
      const faits = r.prochaine.filter((g) => g.fait).length;
      node("p", ui.dejaLa(faits, r.prochaine.length), screen, "niveau-numero");
      const ordre = [...r.prochaine].sort((x, y) => (x.fait - y.fait) || ((x.valeur ?? 4) - (y.valeur ?? 4)));
      const liste = node("ul", "", screen, "niveau-gestes");
      ordre.forEach((g) => {
        const li = node("li", "", liste);
        li.dataset.fait = g.fait ? "oui" : "non";
        node("span", g.fait ? "✓" : "", li, "niveau-gestes-case").setAttribute("aria-hidden", "true");
        const texte = node("span", "", li, "niveau-gestes-texte");
        node("span", `${g.geste} (${g.fait ? ui.fait : ui.pasEncore})`, texte);
        if (!g.fait) node("span", g.reponse ? ui.reponse(g.reponse) : ui.freinsVides, texte, "niveau-gestes-reponse");
      });
    } else {
      node("p", ui.sommetTexte, screen);
    }

    // Un seul geste, propose par le test.
    const cible = r.suivante || r.steps[r.steps.length - 1];
    node("h3", ui.gesteTitre, screen);
    const geste = node("div", "", screen, "niveau-geste");
    node("p", cible.capability.plan, geste, "niveau-geste-plan");
    const carte = cible.capability.cards[0];
    const lien = node("a", "", geste, "carte-livre");
    lien.href = carte.url;
    node("span", ui.carteLiee, lien, "carte-livre-type");
    node("span", carte.title, lien, "carte-livre-titre");
    node("span", ui.lire, lien, "carte-livre-meta");

    // Le rendez-vous : une date, et les gestes a surveiller.
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    const quand = dateLisible(date);
    const aSurveiller = r.freins.length ? r.freins.map((f) => f.geste) : r.prochaine.filter((g) => !g.fait).map((g) => g.geste).slice(0, 3);
    node("h3", ui.retourTitre, screen);
    node("p", aSurveiller.length ? ui.retourEcran(quand) : ui.retourSansGestes(quand), screen);
    // Garder, sur demande. Deja coche si le lecteur avait garde un passage.
    if (gardeActive && !garder()) gardeActive = false;
    const garde = node("label", "", screen, "niveau-garder");
    const coche = node("input", "", garde);
    coche.type = "checkbox";
    coche.checked = gardeActive;
    coche.addEventListener("change", () => {
      gardeActive = coche.checked && garder();
      if (!coche.checked) effacer();
      coche.checked = gardeActive;
    });
    node("span", ui.garder, garde);
    const actions = node("div", "", screen, "builder-test-actions");
    const texte = [
      ui.resultatTitre,
      `${ui.niveau(r.palier.numero, model.paliers.length)} · ${r.palier.nom}`,
      ui.position(r.niveau, r.niveau ? nom(r.steps[r.niveau - 1]) : null),
      `${ui.gesteTitre}\n${cible.capability.plan}`,
      `${carte.title}\n${new URL(carte.url, location.origin).href}`,
      aSurveiller.length ? `${ui.retourTexte(quand)}\n${aSurveiller.map((g) => `- ${g}`).join("\n")}` : ui.retourSansGestes(quand),
      ui.prudence
    ].join("\n\n");
    copyButton(actions, ui.copierGeste, texte);
    button(ui.pisteComplete, actions, () => renderPlan(cible.capability, cible.mode));
    renderMap(r);
  }

  // Les dix etapes, repliees : pour choisir une autre piste.
  function renderMap(r) {
    const details = node("details", "", screen, "niveau-carte");
    details.open = mapOpen;
    details.addEventListener("toggle", () => { mapOpen = details.open; });
    node("summary", ui.carteTitre, details);
    const intentGroup = node("fieldset", "", details, "builder-test-intentions");
    node("legend", ui.intentionLegende, intentGroup);
    const choix = node("div", "", intentGroup, "grille");
    model.intentions.forEach((option) => {
      const label = node("label", "", choix, `carte-parcours parcours--${COULEUR[option.id] || "progresser"}`);
      node("span", "", label, "carte-parcours-pastille").setAttribute("aria-hidden", "true");
      const input = node("input", "", label);
      input.type = "radio";
      input.name = "intent";
      input.value = option.id;
      input.checked = intent === option.id;
      input.addEventListener("change", () => { intent = option.id; });
      node("span", option.label, label, "carte-parcours-titre");
    });
    const list = node("div", "", details, "grille");
    r.steps.forEach((item) => {
      const group = node("section", "", list, "carte");
      node("h3", `${item.step}. ${item.capability.name}`, group);
      node("p", ui.statuts[item.status], group, "carte-note");
      node("p", ui.directions[item.status], group);
      const actions = node("div", "", group, "carte-actions");
      button(item.status === "blocked" ? ui.clarifier : ui.explorer, actions, () => renderPlan(item.capability, item.mode));
      if (item.blocked && item.status !== "blocked") button(ui.clarifier, actions, () => renderPlan(item.capability, "blocked"));
    });
    node("p", ui.prudence, screen, "builder-test-disclaimer");
    const bas = node("div", "", screen, "builder-test-actions");
    button(ui.revoir, bas, () => { step = 0; renderStep(); });
  }

  function renderPlan(capability, mode) {
    const state = model.select(model.setIntent(model.initialState(), intent), { capabilityId: capability.id, mode });
    const result = model.plan(state);
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
    copyButton(actions, ui.copier, model.copyText(result, location.origin));
  }

  function reset() {
    responses = {}; ordres = {}; estimate = null; mapOpen = false; intent = "start"; step = 0; copyGeneration++;
    screen.replaceChildren(); el("workspace").hidden = true; el("intro").hidden = false;
    if (landing) landing.hidden = false;
    el("start").focus();
  }
  el("start").hidden = false;
  el("start").addEventListener("click", renderEstimate);
  el("restart").addEventListener("click", reset);
  window.addEventListener("pagehide", reset);
})();
