/* Les regles du test : un niveau de builder, puis une piste de lecture.
   Aucune phrase ici : le contenu vient de test-builder-contenu.js, ou de son
   jumeau anglais. Une seule implementation des regles, deux langues.

   Le calcul, dans l'ordre :
   1. Chaque reponse vaut de 0 a 3. « Pas rencontre » et « mon cadre ne le
      permettait pas » restent hors calcul.
   2. Une etape a besoin de trois reponses notees. Sinon elle est « pas
      rencontree » ou « bloquee », selon la reponse hors calcul la plus citee.
   3. Une etape est solide si sa moyenne atteint SOLIDE et si sa question
      « la derniere fois » n'est pas sous 2. Elle est en cours a partir de
      EN_COURS.
   4. Le niveau est l'etape solide la plus haute, avec au plus un trou en
      dessous. Une etape bloquee n'est pas un trou : le cadre n'est pas la
      personne.
   5. Le niveau se lit en cinq paliers de deux etapes. Dix niveaux distincts
      demanderaient une precision qu'un test en ligne n'a pas.
   Les seuils sont provisoires : ils seront recales sur des reponses reelles. */
(function (scope) {
  "use strict";
  const SOLIDE = 2.2;
  const EN_COURS = 1.2;
  const MINIMUM = 3;
  const BLOCAGES_MAX = 2;
  const modes = ["revisit", "deepen", "discover", "blocked"];
  const MODE = { solid: "deepen", partial: "revisit", open: "revisit", unseen: "discover", blocked: "blocked" };
  function creer(contenu) {
    const { questions, capabilities, recence, horsEchelle, paliers, intentions, modeLabels,
      memoryNotice, beginner, templates, method, textes, ui } = contenu;

    function options(question) { return question.kind === "recence" ? recence : question.options; }
    function valeur(question, reponse) {
      const option = options(question).find((o) => o.id === reponse);
      return option ? option.value : null;
    }

    function profile(responses) {
      return capabilities.map((capability, index) => {
        const items = questions.filter((q) => q.capabilityId === capability.id);
        const values = items.map((q) => valeur(q, responses[q.id])).filter((v) => v !== null);
        const unseen = items.filter((q) => responses[q.id] === "unseen").length;
        const blocked = items.filter((q) => responses[q.id] === "blocked").length;
        const average = values.length ? values.reduce((s, v) => s + v, 0) / values.length : null;
        const derniere = items.find((q) => q.kind === "derniere-fois");
        const preuve = derniere ? valeur(derniere, responses[derniere.id]) : null;
        let status;
        if (values.length < MINIMUM) status = blocked && blocked >= unseen ? "blocked" : "unseen";
        else if (average >= SOLIDE && (preuve === null || preuve >= 2)) status = "solid";
        else if (average >= EN_COURS) status = "partial";
        else status = "open";
        return { capability, step: index + 1, answered: values.length, unseen, blocked, average, status, mode: MODE[status] };
      });
    }

    function palier(niveau) { return paliers.find((p) => niveau >= p.min && niveau <= p.max); }

    function level(responses) {
      const steps = profile(responses);
      const bloquees = steps.filter((s) => s.status === "blocked");
      if (bloquees.length > BLOCAGES_MAX) return { steps, niveau: null, palier: null, bloquees, trou: null, frontiere: [], suivante: null, freins: [], prochaine: [], forces: [] };
      const manque = (s) => s.status !== "solid" && s.status !== "blocked";
      let niveau = 0;
      let trou = null;
      for (let k = steps.length; k >= 1; k--) {
        if (steps[k - 1].status !== "solid") continue;
        const trous = steps.slice(0, k - 1).filter(manque);
        if (trous.length <= 1) { niveau = k; trou = trous[0] || null; break; }
      }
      const frontiere = steps.slice(niveau).filter((s) => s.status === "solid" || s.status === "partial");
      // L'etape suivante : la premiere au-dessus du niveau qui manque, ou le
      // trou s'il ne reste que lui. Au sommet, il n'y en a pas.
      const suivante = steps.slice(niveau).find(manque) || trou;
      const lu = (q) => ({ id: q.id, geste: q.geste, valeur: valeur(q, responses[q.id]),
        reponse: [...options(q), ...horsEchelle].find((o) => o.id === responses[q.id])?.label || null });
      const de = (step) => questions.filter((q) => q.capabilityId === step.capability.id).map(lu);
      // Ce qui retient : les reponses les plus basses de l'etape suivante, trois au plus.
      const freins = suivante ? de(suivante).filter((r) => r.valeur !== null && r.valeur < 3)
        .sort((a, b) => a.valeur - b.valeur).slice(0, 3) : [];
      // L'etape suivante en gestes, coches quand ils sont deja la.
      const prochaine = suivante ? de(suivante).map((r) => ({ ...r, fait: r.valeur !== null && r.valeur >= 2 })) : [];
      // Ce que tu fais deja : les meilleures reponses, prises ailleurs que dans
      // l'etape suivante, les plus hautes d'abord.
      const ailleurs = steps.filter((s) => s !== suivante && s.status !== "blocked").reverse().flatMap(de);
      const top = ailleurs.filter((r) => r.valeur === 3);
      const forces = (top.length ? top : ailleurs.filter((r) => r.valeur === 2)).slice(0, 2);
      return { steps, niveau, palier: palier(niveau), bloquees, trou, frontiere, suivante, freins, prochaine, forces };
    }

    // Ce qui a bouge depuis un passage garde sur l'appareil : l'etape solide
    // avant et apres, et les gestes passes de « pas encore » a « fait ».
    function compare(avant, apres) {
      const a = level(avant);
      const b = level(apres);
      if (a.niveau === null || b.niveau === null) return null;
      const fait = (r, q) => { const v = valeur(q, r[q.id]); return v !== null && v >= 2; };
      const gagnes = questions.filter((q) => !fait(avant, q) && fait(apres, q)).map((q) => q.geste);
      return { avant: a.niveau, apres: b.niveau, gagnes };
    }

    // L'estimation du debut, etape par etape : ce que le lecteur croyait
    // solide sans que ses reponses le montrent, et l'inverse. `pensees` liste
    // les etapes cochees, vide pour « aucune », null pour « je ne sais pas ».
    // Une etape bloquee ou pas rencontree ne compte ni pour ni contre.
    function ecart(pensees, steps) {
      if (pensees === null) return null;
      const jugees = steps.filter((s) => s.status !== "blocked" && s.status !== "unseen");
      const cochee = (s) => pensees.includes(s.step);
      return {
        surestimees: jugees.filter((s) => cochee(s) && s.status !== "solid"),
        sousestimees: jugees.filter((s) => !cochee(s) && s.status === "solid")
      };
    }

    function initialState() { return { intent: null, selection: null }; }
    function setIntent(state, intent) {
      if (!intentions.some((i) => i.id === intent)) throw new Error("Intention inconnue");
      return { ...state, intent, selection: null };
    }
    function select(state, candidate) {
      const valid = capabilities.some((c) => c.id === candidate.capabilityId) && modes.includes(candidate.mode);
      if (!state.intent || !valid) throw new Error("Choisis une intention et une piste disponible");
      return { ...state, selection: { capabilityId: candidate.capabilityId, mode: candidate.mode } };
    }
    function plan(state) {
      if (!state.selection) return null;
      const { capabilityId, mode } = state.selection;
      const capability = capabilities.find((c) => c.id === capabilityId);
      const intent = intentions.find((i) => i.id === state.intent);
      const resources = [intent.resource];
      if (mode === "discover" && intent.id !== "start") resources.push(beginner);
      resources.push(templates, method);
      return {
        title: textes.titre(capability.name),
        intent: intent.label,
        reason: textes.raison(capability.name.toLowerCase(), modeLabels[mode].toLowerCase()),
        fields: [
          [textes.champs.sujet, capability.seed],
          [textes.champs.geste, textes.actions[mode]],
          [textes.champs.parcours, intent.guidance],
          [textes.champs.conditions, mode === "blocked" ? textes.conditionsBloque : textes.conditionsGenerales],
          [textes.champs.temps, textes.tempsTexte],
          [textes.champs.observation, textes.observations[mode]],
          [textes.champs.fin, textes.finTexte]
        ],
        cards: mode === "blocked" ? [capability.cards[2], ...capability.cards.slice(0, 2)] : capability.cards,
        resources,
        disclaimer: textes.disclaimer
      };
    }
    function copyText(result, origin) {
      return [result.title, result.intent, result.reason,
        ...result.fields.map(([title, body]) => `${title}\n${body}`),
        textes.lectures,
        ...[...result.cards, ...result.resources].map((c) => `${c.title}\n${new URL(c.url, origin).href}`), result.disclaimer
      ].filter(Boolean).join("\n\n");
    }
    return { questions, capabilities, recence, horsEchelle, paliers, intentions, modes, modeLabels,
      memoryNotice, ui, options, profile, level, compare, ecart, initialState, setIntent, select, plan, copyText };
  }
  const api = { creer, modes };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else scope.BuilderTestModele = api;
})(globalThis);
