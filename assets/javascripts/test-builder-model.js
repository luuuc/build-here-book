/* Les regles du parcours de lecture, sans score ni transmission.
   Aucune phrase ici : le contenu vient de test-builder-contenu.js, ou de son
   jumeau anglais. Une seule implementation des regles, deux langues. */
(function (scope) {
  "use strict";
  const modes = ["revisit", "deepen", "discover", "blocked"];
  function creer(contenu) {
    const { questions, capabilities, answerOptions, intentions, conditions, modeLabels,
      memoryNotice, statements, scale, beginner, templates, method, textes, ui } = contenu;
    function profile(responses) {
      return capabilities.map((capability) => {
        const values = (statements[capability.id] || []).map((_, index) => responses[`${capability.id}-${index + 1}`]);
        const answered = values.filter((value) => Number.isInteger(value) && value >= 1 && value <= 6);
        const unexplored = values.filter((value) => value === "unseen").length;
        const blocked = values.filter((value) => value === "blocked").length;
        const average = answered.length ? answered.reduce((sum, value) => sum + value, 0) / answered.length : null;
        return { capability, answered: answered.length, unexplored, blocked, average,
          direction: answered.length < 3 ? "discover" : average >= 4.5 ? "deepen" : average <= 2.5 ? "revisit" : "explore" };
      });
    }
    function initialState() { return { intent: null, answers: {}, selection: null }; }
    function setIntent(state, intent) {
      if (!intentions.some((i) => i.id === intent)) throw new Error("Intention inconnue");
      return { ...state, intent, selection: null };
    }
    function answer(state, questionId, mode, details = []) {
      if (!questions.some((q) => q.id === questionId) || !answerOptions.some((a) => a.id === mode)) throw new Error("Réponse inconnue");
      const selectedConditions = mode === "blocked" ? conditions.filter((c) => details.includes(c.id)).map((c) => c.id) : [];
      return { ...state, answers: { ...state.answers, [questionId]: { mode, conditions: selectedConditions } }, selection: null };
    }
    function candidates(state) {
      return questions.filter((q) => modes.includes(state.answers[q.id]?.mode))
        .map((q) => ({ questionId: q.id, capabilityId: q.capabilityId, mode: state.answers[q.id].mode }));
    }
    function select(state, candidate) {
      const valid = candidate.questionId
        ? candidates(state).some((c) => c.questionId === candidate.questionId && c.mode === candidate.mode && c.capabilityId === candidate.capabilityId)
        : capabilities.some((c) => c.id === candidate.capabilityId) && modes.includes(candidate.mode);
      if (!state.intent || !valid) throw new Error("Choisis une intention et une piste disponible");
      return { ...state, selection: { ...candidate } };
    }
    function plan(state) {
      if (!state.selection) return null;
      const selected = state.selection;
      const capability = capabilities.find((c) => c.id === selected.capabilityId);
      const intent = intentions.find((i) => i.id === state.intent);
      const q = questions.find((q) => q.id === selected.questionId);
      const details = conditions.filter((c) => (state.answers[q?.id]?.conditions || []).includes(c.id));
      const mode = selected.mode;
      const resources = [intent.resource];
      if (mode === "discover" && intent.id !== "start") resources.push(beginner);
      resources.push(templates, method);
      return {
        title: textes.titre(capability.name),
        intent: intent.label,
        reason: q ? textes.raison(q.text, answerOptions.find((a) => a.id === mode).label)
          : textes.raisonDirecte(modeLabels[mode].toLowerCase()),
        appui: mode === "deepen" && q ? textes.appui(q.text) : null,
        fields: [
          [textes.champs.sujet, capability.seed],
          [textes.champs.geste, textes.actions[mode]],
          [textes.champs.parcours, intent.guidance],
          [textes.champs.conditions, details.length ? details.map((c) => `${c.label} : ${c.guidance}`).join("\n")
            : mode === "blocked" ? textes.conditionsBloque : textes.conditionsGenerales],
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
      return [result.title, result.intent, result.reason, result.appui,
        ...result.fields.map(([title, body]) => `${title}\n${body}`),
        textes.lectures,
        ...[...result.cards, ...result.resources].map((c) => `${c.title}\n${new URL(c.url, origin).href}`), result.disclaimer
      ].filter(Boolean).join("\n\n");
    }
    return { questions, capabilities, answerOptions, intentions, conditions, modes, modeLabels,
      memoryNotice, statements, scale, ui, profile, initialState, setIntent, answer, candidates, select, plan, copyText };
  }
  const api = { creer, modes };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else scope.BuilderTestModele = api;
})(globalThis);
