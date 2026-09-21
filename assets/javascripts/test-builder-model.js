/* Données et règles du parcours de lecture, sans score ni transmission. */
(function (scope) {
  "use strict";
  const questions = [
  {
    "id": "mindset-1",
    "capabilityId": "mindset",
    "text": "Repense à une petite difficulté que tu as remarquée. As-tu pu clarifier ce que tu pouvais essayer et ce qui demandait un accord ?"
  },
  {
    "id": "mindset-2",
    "capabilityId": "mindset",
    "text": "Repense à une explication ou une consigne que tu ne comprenais pas. Comment as-tu pu obtenir la précision utile, sur le moment ou plus tard ?"
  },
  {
    "id": "mindset-3",
    "capabilityId": "mindset",
    "text": "Repense à un fait qui a changé ton avis. Quelle décision ou manière de faire as-tu pu réexaminer ?"
  },
  {
    "id": "craft-1",
    "capabilityId": "craft",
    "text": "Repense à quelque chose que tu voulais mieux savoir faire. Quelle pratique précise as-tu choisie de travailler ?"
  },
  {
    "id": "craft-2",
    "capabilityId": "craft",
    "text": "Repense à une méthode que tu as apprise. As-tu pu examiner une source, un exemple ou l'explication d'une personne qui la connaît ?"
  },
  {
    "id": "craft-3",
    "capabilityId": "craft",
    "text": "Repense à un travail dont tu voulais améliorer la qualité. Quel retour t'a aidé à voir ce qui tenait et ce qui restait à travailler ?"
  },
  {
    "id": "autonomy-1",
    "capabilityId": "autonomy",
    "text": "Repense à une demande, même dans un projet personnel. As-tu pu préciser le problème auquel elle devait répondre ?"
  },
  {
    "id": "autonomy-2",
    "capabilityId": "autonomy",
    "text": "Repense à un moment où tu attendais une information, une aide ou une décision. Comment as-tu rendu visible ce qui manquait pour continuer ?"
  },
  {
    "id": "autonomy-3",
    "capabilityId": "autonomy",
    "text": "Repense à une découverte qui changeait le travail prévu. As-tu pu en discuter ou revoir ton engagement avant de poursuivre ?"
  },
  {
    "id": "understanding-1",
    "capabilityId": "understanding",
    "text": "Repense à une personne que tu voulais aider. Qu'as-tu pu apprendre de sa situation réelle, directement ou par un retour accessible ?"
  },
  {
    "id": "understanding-2",
    "capabilityId": "understanding",
    "text": "Repense à une amélioration qui pouvait déplacer du travail vers quelqu'un d'autre. Comment as-tu examiné cet effet avec les personnes concernées ?"
  },
  {
    "id": "understanding-3",
    "capabilityId": "understanding",
    "text": "Repense à quelque chose d'utile que tu préparais. As-tu pu vérifier comment les personnes concernées y accéderaient et s'en serviraient ?"
  },
  {
    "id": "delivery-1",
    "capabilityId": "delivery",
    "text": "Repense à une idée encore incertaine. As-tu pu choisir un essai assez petit pour apprendre quelque chose sans exposer inutilement les autres ?"
  },
  {
    "id": "delivery-2",
    "capabilityId": "delivery",
    "text": "Repense à un travail que tu voulais mettre à disposition. Comment as-tu distingué ce qui pouvait attendre des protections à garder ?"
  },
  {
    "id": "delivery-3",
    "capabilityId": "delivery",
    "text": "Repense à un retour reçu pendant la préparation. Qu'as-tu pu en faire : continuer, modifier, réduire ou arrêter le travail ?"
  },
  {
    "id": "ownership-1",
    "capabilityId": "ownership",
    "text": "Repense à une aide ou un travail terminé de ton côté. As-tu pu revenir voir ce qu'il avait permis, ou convenir de qui le ferait ?"
  },
  {
    "id": "ownership-2",
    "capabilityId": "ownership",
    "text": "Repense à un résultat différent de ce que tu espérais. Qu'as-tu pu apprendre des faits, y compris ce qui restait inconnu ?"
  },
  {
    "id": "ownership-3",
    "capabilityId": "ownership",
    "text": "Repense à un passage de relais, même modeste. Comment les personnes concernées ont-elles confirmé qui reprenait quoi et avec quels moyens ?"
  },
  {
    "id": "systems-1",
    "capabilityId": "systems",
    "text": "Repense à une difficulté revenue plusieurs fois. As-tu pu comparer les cas avant de décider s'il fallait changer quelque chose ?"
  },
  {
    "id": "systems-2",
    "capabilityId": "systems",
    "text": "Repense à une façon de faire qui semblait compliquée. As-tu pu comprendre le rôle d'une étape avant de proposer de la modifier ?"
  },
  {
    "id": "systems-3",
    "capabilityId": "systems",
    "text": "Repense à une activité qui dépendait d'un savoir peu partagé. As-tu pu préparer ou essayer un relais avec une personne d'accord pour le prendre ?"
  },
  {
    "id": "leverage-1",
    "capabilityId": "leverage",
    "text": "Repense à plusieurs demandes qui se ressemblaient. As-tu pu vérifier si elles avaient une cause commune ou seulement la même apparence ?"
  },
  {
    "id": "leverage-2",
    "capabilityId": "leverage",
    "text": "Repense à un outil, un modèle ou une ressource que tu pouvais réutiliser. Comment as-tu vérifié son utilité dans ton cas, avec ses coûts et ses limites ?"
  },
  {
    "id": "leverage-3",
    "capabilityId": "leverage",
    "text": "Repense à une tâche que tu voulais accélérer ou répéter plus largement. As-tu pu examiner les erreurs possibles et les vérifications à garder ?"
  },
  {
    "id": "leadership-1",
    "capabilityId": "leadership",
    "text": "Repense à quelqu'un que tu voulais aider à agir. As-tu pu lui demander quel appui ou quelle condition lui manquait ?"
  },
  {
    "id": "leadership-2",
    "capabilityId": "leadership",
    "text": "Repense à une relecture ou une aide donnée à quelqu'un. As-tu pu expliquer ton raisonnement tout en lui laissant une place pour décider ?"
  },
  {
    "id": "leadership-3",
    "capabilityId": "leadership",
    "text": "Repense à un apprentissage ou une responsabilité partagée. Comment avez-vous convenu du temps, des limites et de l'aide disponible ?"
  },
  {
    "id": "reference-1",
    "capabilityId": "reference",
    "text": "Repense à une réponse qui pourrait resservir. As-tu pu choisir avec ses destinataires une forme et un endroit où la retrouver ?"
  },
  {
    "id": "reference-2",
    "capabilityId": "reference",
    "text": "Repense à une expérience que tu voulais transmettre. Comment as-tu rendu compréhensibles le contexte, le raisonnement et les limites ?"
  },
  {
    "id": "reference-3",
    "capabilityId": "reference",
    "text": "Repense à une ressource ou une explication partagée, même en privé. Quel retour t'a permis de voir comment une autre personne pouvait s'en servir ?"
  }
];
  const capabilities = [
  {
    "id": "mindset",
    "name": "L'état d'esprit",
    "seed": "Préciser une question utile et qui peut répondre ou autoriser la suite.",
    "cards": [
      {
        "title": "Pose la question naïve tout de suite",
        "url": "/chapters/01-02-pose-la-question-naive-tout-de-suite.html",
        "type": "pratique"
      },
      {
        "title": "Prends l'initiative, clarifie les limites",
        "url": "/chapters/01-03-lownership-commence-la-ou-la-fiche-de-poste-sarrete.html",
        "type": "principe"
      },
      {
        "title": "⇄ Donne une suite aux questions",
        "url": "/chapters/01-09-leader-personne-ne-demande-deux-fois.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "craft",
    "name": "Le métier",
    "seed": "Choisir un détail du métier à travailler et une source ou une relecture accessible.",
    "cards": [
      {
        "title": "Choisis ce que tu veux mieux maîtriser",
        "url": "/chapters/02-03-douze-ans-dexperience-ou-douze-fois-la-meme-annee.html",
        "type": "diagnostic"
      },
      {
        "title": "Ton métier a une littérature",
        "url": "/chapters/02-04-ton-metier-a-une-litterature.html",
        "type": "principe"
      },
      {
        "title": "⇄ Apprendre sur son temps à soi, c'est un filtre que tu n'as pas voulu poser",
        "url": "/chapters/02-12-leader-apprendre-sur-son-temps-a-soi-cest-un-filtre-que-tu-nas-pas-voulu-poser.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "autonomy",
    "name": "L'autonomie",
    "seed": "Écrire le problème visé et la décision ou l'information qui manque.",
    "cards": [
      {
        "title": "N'apporte pas la tâche. Apporte le problème",
        "url": "/chapters/03-01-napporte-pas-la-tache-apporte-le-probleme.html",
        "type": "pratique"
      },
      {
        "title": "Quand tu bloques, rends la suite explicite",
        "url": "/chapters/03-04-etre-bloque-est-une-decision.html",
        "type": "diagnostic"
      },
      {
        "title": "⇄ Donne une suite réelle aux objections",
        "url": "/chapters/03-08-leader-tu-ne-peux-pas-demander-de-la-franchise-et-garder-le-dernier-mot.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "understanding",
    "name": "La compréhension",
    "seed": "Reconstituer une situation d'usage avec un retour accessible, puis noter une inconnue.",
    "cards": [
      {
        "title": "Parle à la personne qui a le problème",
        "url": "/chapters/04-01-parle-a-la-personne-qui-a-le-probleme.html",
        "type": "pratique"
      },
      {
        "title": "Une demande de fonctionnalité n'est pas le problème",
        "url": "/chapters/04-02-une-demande-de-feature-nest-pas-le-probleme.html",
        "type": "diagnostic"
      },
      {
        "title": "⇄ Organise un accès utile aux retours du terrain",
        "url": "/chapters/04-13-leader-lacces-au-client-est-un-budget-pas-une-valeur.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "delivery",
    "name": "La livraison",
    "seed": "Définir un essai limité, ce qu'il pourrait apprendre et les protections à garder.",
    "cards": [
      {
        "title": "Livrer permet d'apprendre",
        "url": "/chapters/05-01-shipper-cree-de-linformation.html",
        "type": "principe"
      },
      {
        "title": "Rapide ne veut pas dire précipité",
        "url": "/chapters/05-02-rapide-ne-veut-pas-dire-precipite.html",
        "type": "pratique"
      },
      {
        "title": "⇄ Organise un rythme de livraison utile",
        "url": "/chapters/05-05-leader-le-rythme-de-livraison-cest-une-decision-que-tu-as-prise.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "ownership",
    "name": "L'ownership",
    "seed": "Convenir d'un retour sur un résultat, de la personne qui le fait et de la fin de son engagement.",
    "cards": [
      {
        "title": "Fini de ton côté ne veut pas dire réglé",
        "url": "/chapters/06-01-fini-de-ton-cote-ne-veut-pas-dire-regle.html",
        "type": "diagnostic"
      },
      {
        "title": "Prévois quand vérifier le résultat",
        "url": "/chapters/06-02-reviens-voir-un-mois-plus-tard.html",
        "type": "pratique"
      },
      {
        "title": "⇄ Relie la revue d'activité aux résultats",
        "url": "/chapters/06-07-leader-tu-demandes-des-resultats-et-tu-passes-en-revue-de-lactivite.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "systems",
    "name": "Les systèmes",
    "seed": "Comparer deux occurrences et le rôle d'une étape, sans présumer qu'il faut ajouter un contrôle.",
    "cards": [
      {
        "title": "La deuxième fois est une information",
        "url": "/chapters/07-01-la-deuxieme-fois-est-une-information.html",
        "type": "diagnostic"
      },
      {
        "title": "Comprends l'étape avant de la simplifier",
        "url": "/chapters/07-02-supprime-letape-avant-de-la-documenter.html",
        "type": "pratique"
      },
      {
        "title": "Confie un problème avec les appuis nécessaires",
        "url": "/chapters/09-03-confie-un-probleme-pas-une-tache.html",
        "type": "pratique"
      }
    ]
  },
  {
    "id": "leverage",
    "name": "Le levier",
    "seed": "Comparer une réutilisation possible avec la pratique actuelle, coûts et vérifications compris.",
    "cards": [
      {
        "title": "Regroupe les cas, puis vérifie les causes",
        "url": "/chapters/08-01-range-les-par-cause-pas-par-sujet.html",
        "type": "diagnostic"
      },
      {
        "title": "Examine ce que tu as avant d'ajouter un outil",
        "url": "/chapters/08-03-le-levier-le-moins-cher-est-deja-paye.html",
        "type": "principe"
      },
      {
        "title": "⇄ Reconnais aussi le travail évité et le service préservé",
        "url": "/chapters/08-05-leader-tu-paies-des-heures-tu-obtiens-des-heures.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "leadership",
    "name": "Le leadership",
    "seed": "Demander à une personne l'appui qu'elle souhaite et convenir d'une contribution limitée.",
    "cards": [
      {
        "title": "Explique ce que ta relecture a vérifié",
        "url": "/chapters/09-04-une-relecture-qui-dit-seulement-oui-napprend-rien.html",
        "type": "principe"
      },
      {
        "title": "Confie un problème avec les appuis nécessaires",
        "url": "/chapters/09-03-confie-un-probleme-pas-une-tache.html",
        "type": "pratique"
      },
      {
        "title": "⇄ Donne des moyens à la transmission",
        "url": "/chapters/09-08-leader-tu-es-la-reference-qui-manque-et-tu-nas-rien-laisse.html",
        "type": "systeme"
      }
    ]
  },
  {
    "id": "reference",
    "name": "La référence",
    "seed": "Adapter une réponse pour un destinataire volontaire, dans un espace de partage autorisé.",
    "cards": [
      {
        "title": "Donne au lecteur de quoi examiner ton raisonnement",
        "url": "/chapters/10-02-un-avis-nest-pas-un-artefact.html",
        "type": "diagnostic"
      },
      {
        "title": "Rends une réponse utile retrouvable",
        "url": "/chapters/10-04-reponds-a-la-question-en-public.html",
        "type": "pratique"
      },
      {
        "title": "⇄ Clarifie les conditions du partage",
        "url": "/chapters/10-09-leader-labsence-de-regle-est-une-interdiction.html",
        "type": "systeme"
      }
    ]
  }
];
  const answerOptions = [
  {
    "id": "revisit",
    "label": "J'ai un exemple et je voudrais revoir cette pratique."
  },
  {
    "id": "deepen",
    "label": "J'ai un exemple qui m'aide et je veux approfondir cette pratique."
  },
  {
    "id": "discover",
    "label": "Je n'ai pas encore rencontré cette situation."
  },
  {
    "id": "blocked",
    "label": "Des conditions manquent pour que je puisse essayer ou observer."
  },
  {
    "id": "outside",
    "label": "Ce sujet ne correspond pas à ce que je cherche maintenant."
  },
  {
    "id": "skip",
    "label": "Je préfère passer, ou je ne sais pas encore."
  }
];
  const chapter = (slug) => `/chapters/${slug}.html`;
  const beginner = { title: "Un premier essai utile", url: chapter("a6-un-premier-essai-utile") };
  const templates = { title: "Modèles pour agir et revoir", url: chapter("a9-modeles-pour-agir-et-revoir") };
  const method = { title: "Comment fonctionne le test", url: chapter("a2-comment-fonctionne-le-test") };
  const intentions = [
    { id: "start", label: "Commencer par un essai utile", anchor: "commencer", resource: beginner,
      guidance: "Un exemple personnel, associatif ou d'apprentissage suffit. Tu peux commencer par préparer une proposition, sans avoir déjà livré un projet." },
    { id: "deepen", label: "Approfondir ma pratique", anchor: "progresser",
      resource: { title: "Améliorer sans tout reprendre", url: chapter("a7-ameliorer-sans-tout-reprendre") },
      guidance: "Garde ce qui fonctionne déjà. Choisis une limite, un cas plus exigeant ou un retour qui pourrait enrichir ta pratique." },
    { id: "team", label: "Développer les pratiques d'un groupe", anchor: "equipe",
      resource: { title: "Faire tourner ça dans ton équipe", url: chapter("00-faire-tourner-ca-dans-ton-equipe") },
      guidance: "Propose à des participants volontaires d'examiner une situation commune. Confirme le temps, les décisions ouvertes et la personne qui peut autoriser l'essai. Chacun peut passer ; les réponses individuelles restent les siennes." },
    { id: "support", label: "Soutenir des builders", anchor: "soutenir",
      resource: { title: "Six semaines pour apprendre ensemble", url: chapter("a8-six-semaines-pour-apprendre-ensemble") },
      guidance: "Demande quel appui serait utile, propose une contribution précise dans tes moyens, et attends l'accord des personnes concernées. Soutenir ne signifie pas prendre la direction de leur travail." }
  ];
  const conditions = [
    { id: "time", label: "Temps ou priorité", guidance: "Quel temps faudrait-il réserver, et quel travail déplacer ? Qui peut l'accorder ?" },
    { id: "access", label: "Accès aux personnes ou aux informations", guidance: "Quel retour ou accès limité suffirait ? Qui peut l'autoriser ou proposer une autre source ?" },
    { id: "authority", label: "Accord ou droit de décision", guidance: "Quelle décision attend un accord, et de qui ? Une proposition n'est pas encore une autorisation." },
    { id: "help", label: "Appui ou compétence disponible", guidance: "Quel appui précis demander, à une personne disponible et d'accord ?" },
    { id: "other", label: "Autre condition, ou je préfère ne pas préciser", guidance: "Quelle condition faudrait-il clarifier avant de poursuivre ?" }
  ];
  const modes = ["revisit", "deepen", "discover", "blocked"];
  const modeLabels = { revisit: "Revoir une pratique", deepen: "Approfondir un appui", discover: "Préparer un premier essai", blocked: "Clarifier les conditions" };
  const memoryNotice = "Tes réponses restent dans la mémoire de cette page et ne sont pas envoyées au service d'évaluation. Elles disparaissent quand tu quittes ou recharges la page. Copie ta piste pour la garder.";
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
    const actions = {
      revisit: "Reprends ton exemple. Choisis un seul ajustement à proposer ou à essayer dans ton périmètre.",
      deepen: "Pars de ce qui t'aide déjà. Avec une personne volontaire, examine une limite ou un autre cas où cette pratique pourrait demander une adaptation.",
      discover: "Lis d'abord un exemple construit. Prépare ensuite cette pratique sur une situation personnelle ou fictive. Si un essai réel est possible, limite-le avec les personnes concernées.",
      blocked: "Commence par la condition manquante avant d'essayer de changer la pratique. Lis la carte sur les conditions, puis prépare une demande précise si tu peux la porter."
    };
    const observations = {
      revisit: "Quel fait permettrait de voir si cet ajustement aide ? Conviens d'un retour et arrête ou réduis l'essai si ses conditions ne tiennent plus.",
      deepen: "Note ce qui reste utile et ce qui change dans cet autre cas. Une observation contraire est un apprentissage, pas une perte de niveau.",
      discover: "Distingue ce que l'exercice t'a aidé à formuler de ce qui a été observé en situation réelle. Tu peux terminer après la lecture ou la préparation.",
      blocked: "Observe si un accord ou un appui concret arrive. Sans lui, garde la proposition en attente, réduis-la avec accord ou suspends-la. Un refus ne mesure pas ta capacité."
    };
    const resources = [intent.resource];
    if (mode === "discover" && intent.id !== "start") resources.push(beginner);
    resources.push(templates, method);
    return {
      title: `Une piste que tu as choisie : ${capability.name}`,
      intent: intent.label,
      reason: q ? `Tu as retenu « ${q.text} » et « ${answerOptions.find((a) => a.id === mode).label} ». Voici une proposition à adapter à ta situation.`
        : `Tu as choisi ce sujet directement, sans déduction à partir des réponses : ${modeLabels[mode].toLowerCase()}.`,
      appui: mode === "deepen" && q ? `Appui que tu souhaites approfondir : ${q.text}` : null,
      fields: [
        ["Sujet à adapter à ton exemple", capability.seed],
        ["Prochain geste", actions[mode]],
        ["Dans ton parcours", intent.guidance],
        ["Conditions et accord", details.length ? details.map((c) => `${c.label} : ${c.guidance}`).join("\n")
          : mode === "blocked" ? "Quelle condition faudrait-il clarifier avant de poursuivre ? Tu peux la nommer pour toi, sans la saisir ici."
          : "Clarifie ce qui dépend de toi et ce qui demande un accord avant d'essayer. Une proposition n'est pas encore une autorisation."],
        ["Temps et travail déplacé", "Choisis une durée réaliste, ce qu'elle déplace et une date de retour adaptée. Si cela ne tient pas dans le temps disponible, réduis ou reporte l'essai."],
        ["Observation et retour", observations[mode]],
        ["Fin ou relais", "Clarifie qui décide de poursuivre et qui accepte la suite. Tu n'as pas à assurer un suivi indéfini."]
      ],
      cards: mode === "blocked" ? [capability.cards[2], ...capability.cards.slice(0, 2)] : capability.cards,
      resources,
      disclaimer: "Cette piste est une suggestion de lecture et de pratique, pas un niveau ni une évaluation de tes capacités."
    };
  }
  function copyText(result, origin) {
    return [result.title, result.intent, result.reason, result.appui,
      ...result.fields.map(([title, body]) => `${title}\n${body}`),
      "Lectures : une seule carte peut suffire",
      ...[...result.cards, ...result.resources].map((c) => `${c.title}\n${new URL(c.url, origin).href}`), result.disclaimer
    ].filter(Boolean).join("\n\n");
  }
  const api = { questions, capabilities, answerOptions, intentions, conditions, modes, modeLabels, memoryNotice,
    initialState, setIntent, answer, candidates, select, plan, copyText };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else scope.BuilderTest = api;
})(globalThis);
