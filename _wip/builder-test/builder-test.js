// Builder test v2 draft. Open preview.html to try it; design in docs/conception-test-du-builder.md.
// Option values are provisional: do not ship until practitioners have scored them.

(function () {
  const root = document.querySelector("[data-builder-test]");
  if (!root) return;

  const questions = window.QUESTIONS || [];
  const margin = window.MARGIN || [];
  if (!questions.length) return;

  const steps = [
    { n: 1, name: "L'état d'esprit", line: "Tu rends les choses meilleures au lieu d'attendre qu'on t'y autorise.", practice: "Choisis une irritation que tout le monde contourne. Répare aujourd'hui la plus petite partie qui dépend de toi.", cards: [
      ["Pratique", "Pose la question naïve tout de suite", "/chapters/01-02-pose-la-question-naive-tout-de-suite.html"],
      ["Principe", "L'ownership commence là où la fiche de poste s'arrête", "/chapters/01-03-lownership-commence-la-ou-la-fiche-de-poste-sarrete.html"],
      ["Principe", "Avoir tort ne coûte rien. Le rester coûte cher", "/chapters/01-04-avoir-tort-ne-coute-rien-le-rester-coute-cher.html"]
    ]},
    { n: 2, name: "Le métier", line: "Tu construis un niveau qui ne dépend pas seulement de ton environnement immédiat.", practice: "Prends un problème résolu cette semaine et trouve une source primaire écrite par quelqu'un qui l'a déjà résolu ailleurs.", cards: [
      ["Diagnostic", "Douze ans d'expérience, ou douze fois la même année", "/chapters/02-03-douze-ans-dexperience-ou-douze-fois-la-meme-annee.html"],
      ["Principe", "Ton marché peut être local. Ton niveau, non", "/chapters/02-09-ton-marche-peut-etre-local-ton-niveau-non.html"],
      ["Pratique", "Lis le code source", "/chapters/02-02-lis-le-code-source.html"]
    ]},
    { n: 3, name: "L'autonomie", line: "Tu pars du problème et tu remontes ce que l'exécution t'apprend.", practice: "Sur ton prochain ticket, écris le problème en une phrase et ce que tu devras observer pour savoir qu'il est réglé.", cards: [
      ["Diagnostic", "Le ticket n'est pas le travail", "/chapters/03-02-le-ticket-nest-pas-le-travail.html"],
      ["Pratique", "N'apporte pas la tâche. Apporte le problème", "/chapters/03-01-napporte-pas-la-tache-apporte-le-probleme.html"],
      ["Diagnostic", "Être bloqué est une décision", "/chapters/03-04-etre-bloque-est-une-decision.html"]
    ]},
    { n: 4, name: "La compréhension", line: "Tu relies ton travail au client, au revenu et au reste de l'entreprise.", practice: "Parle vingt minutes à la personne la plus proche du client et note une chose que ton équipe croyait vraie à tort.", cards: [
      ["Diagnostic", "Une demande de fonctionnalité n'est pas le problème", "/chapters/04-02-une-demande-de-feature-nest-pas-le-probleme.html"],
      ["Principe", "La distribution fait partie du produit", "/chapters/04-08-la-distribution-fait-partie-du-produit.html"],
      ["Pratique", "Parle à la personne qui a le problème", "/chapters/04-01-parle-a-la-personne-qui-a-le-probleme.html"]
    ]},
    { n: 5, name: "La livraison", line: "Tu mets tôt quelque chose dans le réel pour produire de l'information.", practice: "Découpe ce que tu construis afin qu'une version observable rencontre le réel avant vendredi.", cards: [
      ["Diagnostic", "Plus tu peaufines, plus il devient difficile de changer d'avis", "/chapters/05-03-plus-tu-peaufines-plus-il-devient-difficile-de-changer-davis.html"],
      ["Principe", "Shipper crée de l'information", "/chapters/05-01-shipper-cree-de-linformation.html"],
      ["Pratique", "Rapide ne veut pas dire précipité", "/chapters/05-02-rapide-ne-veut-pas-dire-precipite.html"]
    ]},
    { n: 6, name: "L'ownership", line: "Tu fermes la boucle et réponds du résultat, y compris quand il te contredit.", practice: "Reviens sur une livraison vieille d'un mois. Écris ce qui s'est réellement passé et qui porte la prochaine décision.", cards: [
      ["Diagnostic", "Fini de ton côté ne veut pas dire réglé", "/chapters/06-01-fini-de-ton-cote-ne-veut-pas-dire-regle.html"],
      ["Principe", "Le mauvais résultat t'appartient aussi", "/chapters/06-04-le-mauvais-resultat-tappartient-aussi.html"],
      ["Pratique", "Reviens voir un mois plus tard", "/chapters/06-02-reviens-voir-un-mois-plus-tard.html"]
    ]},
    { n: 7, name: "Les systèmes", line: "Tu rends la prochaine fois plus facile et moins dépendante d'une mémoire individuelle.", practice: "Repère un problème apparu deux fois. Supprime une étape ou écris le contrôle qui empêchera la troisième.", cards: [
      ["Diagnostic", "La deuxième fois est une information", "/chapters/07-01-la-deuxieme-fois-est-une-information.html"],
      ["Principe", "Tout ne mérite pas de devenir un processus", "/chapters/07-04-tout-ne-merite-pas-de-devenir-un-processus.html"],
      ["Pratique", "Supprime l'étape avant de la documenter", "/chapters/07-02-supprime-letape-avant-de-la-documenter.html"]
    ]},
    { n: 8, name: "Le levier", line: "Tu multiplies un jugement solide au lieu de multiplier seulement l'activité.", practice: "Liste les demandes de la semaine. Regroupe celles qui se répètent et automatise seulement la partie dont tu sais vérifier la sortie.", cards: [
      ["Diagnostic", "Range-les par cause, pas par sujet", "/chapters/08-01-range-les-par-cause-pas-par-sujet.html"],
      ["Principe", "Le levier le moins cher est déjà payé", "/chapters/08-03-le-levier-le-moins-cher-est-deja-paye.html"],
      ["Pratique", "L'IA est un levier, pas un raccourci", "/chapters/08-02-lia-est-un-levier-pas-un-raccourci.html"]
    ]},
    { n: 9, name: "Le leadership", line: "Tu fabriques un environnement où d'autres builders peuvent agir.", practice: "Prends la plainte que tu répètes le plus sur l'équipe. Change une règle ou une incitation qui rend ce comportement rationnel.", cards: [
      ["Diagnostic", "Les dirigeants fabriquent l'environnement dont ils se plaignent", "/chapters/09-01-les-dirigeants-fabriquent-lenvironnement-dont-ils-se-plaignent.html"],
      ["Principe", "Le filtre que tu fais tourner", "/chapters/09-02-le-filtre-que-tu-fais-tourner.html"],
      ["Pratique", "Confie un problème, pas une tâche", "/chapters/09-03-confie-un-probleme-pas-une-tache.html"]
    ]},
    { n: 10, name: "La référence", line: "Ton travail laisse une trace dont quelqu'un peut apprendre sans t'avoir dans la pièce.", practice: "Publie un artefact qui répond à une question réelle : décision, méthode, incident, exemple ou outil réutilisable.", cards: [
      ["Diagnostic", "Un avis n'est pas un artefact", "/chapters/10-02-un-avis-nest-pas-un-artefact.html"],
      ["Principe", "Une trace n'est pas forcément du code", "/chapters/10-03-une-trace-nest-pas-forcement-du-code.html"],
      ["Pratique", "Réponds à la question en public", "/chapters/10-04-reponds-a-la-question-en-public.html"]
    ]}
  ];
  const facets = [
    { key: "lance", name: "Ce que tu lances" },
    { key: "closed", name: "Ce que tu fermes" },
    { key: "laisse", name: "Ce que tu laisses" },
  ];

  // Each zone text must be false for someone 30 points away (avoids the Barnum effect).
  const zones = [
    {
      max: 25,
      title: "Presque tout ce que tu fais s'arrête quand tu t'arrêtes.",
      absence:
        "Si tu pars deux semaines, la plupart de tes sujets attendent ton retour. Rien n'est cassé. Personne d'autre n'a de raison de s'en saisir, parce que rien n'a été posé ailleurs que dans ta tête et dans ta file.",
    },
    {
      max: 50,
      title: "Ton travail tient quelques jours, pas deux semaines.",
      absence:
        "Si tu pars deux semaines, l'exécution continue un moment, puis elle bute sur la première décision. On t'appelle, ou on attend. Ce que tu as construit fonctionne ; ce que tu sais n'est écrit nulle part.",
    },
    {
      max: 75,
      title: "Ce que tu construis survit à ton absence. Ton jugement, non.",
      absence:
        "Si tu pars deux semaines, presque tout continue. Ce qui s'arrête, ce sont les arbitrages : les cas qui ne ressemblent pas aux précédents remontent, et ils attendent que tu tranches.",
    },
    {
      max: 100,
      title: "Ton travail continue, décisions comprises.",
      absence:
        "Si tu pars deux semaines, tu apprends au retour des décisions prises sans toi, et tu es d'accord avec la plupart. Ce qui te reste à faire n'est plus de tenir, c'est de rendre cette façon de travailler transmissible.",
    },
  ];

  const el = (s) => root.querySelector(s);
  const intro = el("[data-test-intro]");
  const run = el("[data-test-run]");
  const result = el("[data-test-result]");

  const path = questions
    .map((q, i) => ({ q, i, type: "rated" }))
    .concat(margin.map((q, i) => ({ q, i, type: "margin" })));

  let position = 0;
  const answers = new Array(questions.length).fill(undefined);
  const edges = new Array(margin.length).fill(undefined);

  // Shuffled once per run so going back doesn't reorder the options.
  const orders = path.map((p) =>
    shuffle(p.q.options.map((_, i) => i))
  );

  function shuffle(t) {
    for (let i = t.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [t[i], t[j]] = [t[j], t[i]];
    }
    return t;
  }

  function label(option) {
    return typeof option === "string" ? option : option.t;
  }

  function showQuestion() {
    const { q, i, type } = path[position];
    const chosen = type === "rated" ? answers[i] : edges[i];

    el("[data-test-count]").textContent = `${position + 1} sur ${path.length}`;
    el("[data-test-progress]").style.width = `${((position + 1) / path.length) * 100}%`;
    el("[data-test-stage]").textContent =
      type === "margin"
        ? "Sur ton poste"
        : q.type === "event"
        ? "Un fait, pas une impression"
        : "Que ferais-tu";

    const title = el("[data-test-question]");
    title.textContent = q.prompt;

    const box = el("[data-test-answers]");
    box.innerHTML = "";
    orders[position].forEach((index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "builder-test-answer";
      button.textContent = label(q.options[index]);
      button.setAttribute("aria-pressed", String(chosen === index));
      button.addEventListener("click", function () {
        if (type === "rated") answers[i] = index;
        else edges[i] = index;
        Array.from(box.children).forEach((b, rank) =>
          b.setAttribute("aria-pressed", String(orders[position][rank] === index))
        );
        el("[data-test-next]").disabled = false;
      });
      box.appendChild(button);
    });

    el("[data-test-back]").disabled = position === 0;
    el("[data-test-next]").disabled = chosen === undefined;
    el("[data-test-next]").textContent =
      position === path.length - 1 ? "Voir mon résultat" : "Suivante";
    title.focus();
  }

  function value(q, index) {
    return q.options[index].v;
  }

  function compute() {
    const sum = (list) =>
      list.reduce((n, { q, i }) => n + value(q, answers[i]), 0);
    const rated = questions.map((q, i) => ({ q, i }));

    const total = Math.round((sum(rated) / (3 * rated.length)) * 100);

    const byFacet = facets.map((f) => {
      const own = rated.filter(({ q }) => q.facet === f.key);
      return {
        ...f,
        score: Math.round((sum(own) / (3 * own.length)) * 100),
      };
    });

    // Rank steps by the share of low answers, not the count: steps have different
    // question counts. Ties go to the lowest step.
    const byStep = {};
    rated
      .filter(({ q }) => q.step > 0)
      .forEach(({ q, i }) => {
        const e = (byStep[q.step] = byStep[q.step] || { lows: [], values: [] });
        e.values.push(value(q, answers[i]));
        if (value(q, answers[i]) <= 1) e.lows.push({ q, i });
      });

    const average = (l) => l.reduce((x, y) => x + y, 0) / l.length;
    const numbers = Object.keys(byStep).map(Number);
    const part = (n) => byStep[n].lows.length / byStep[n].values.length;

    let step;
    if (numbers.some((n) => part(n) > 0)) {
      step = numbers.sort((a, b) => part(b) - part(a) || a - b)[0];
    } else if (numbers.every((n) => average(byStep[n].values) === 3)) {
      // All answers maxed: suggest the last step.
      step = 10;
    } else {
      step = numbers.sort(
        (a, b) => average(byStep[a].values) - average(byStep[b].values) || a - b
      )[0];
    }
    const hasLows = byStep[step].lows.length > 0;

    const quotes = (hasLows
      ? byStep[step].lows
      : rated.filter(({ q }) => q.step === step))
      .slice()
      .sort((a, b) => value(a.q, answers[a.i]) - value(b.q, answers[b.i]))
      .slice(0, 2)
      .map(({ q, i }) => ({
        prompt: q.prompt,
        answer: label(q.options[answers[i]]),
      }));

    const averageMargin =
      edges.reduce((n, index) => n + (index === undefined ? 0 : index), 0) /
      (edges.length || 1);

    return {
      total,
      band: [Math.max(0, total - 5), Math.min(100, total + 5)],
      facets: byFacet,
      step,
      quotes,
      hasLows,
      marginLow: averageMargin < 1.5,
    };
  }

  function showResult() {
    const r = compute();
    const zone = zones.find((z) => r.total <= z.max);
    const step = steps[r.step - 1];

    run.hidden = true;
    result.hidden = false;

    el("[data-result-band]").textContent = `entre ${r.band[0]} et ${r.band[1]} sur 100`;
    el("[data-result-title]").textContent = zone.title;
    el("[data-result-absence]").textContent = zone.absence;

    const facets_ = el("[data-result-facets]");
    facets_.innerHTML = "";
    r.facets.forEach((f) => {
      const line = document.createElement("div");
      line.className = "builder-test-scale-row";
      line.innerHTML = `<span>${f.name}</span><span class="builder-test-score"><i style="width:${f.score}%"></i></span><b>${f.score}</b>`;
      facets_.appendChild(line);
    });

    el("[data-result-quotes-note]").textContent = r.hasLows
      ? "Deux situations où tu t'es placé en bas. Ce sont elles qui ont produit la recommandation."
      : "Aucune de tes réponses ne te place en bas. Voici deux situations de la marche qui reste la plus faible.";

    const quotes = el("[data-result-quotes]");
    quotes.innerHTML = "";
    r.quotes.forEach((c) => {
      const block = document.createElement("blockquote");
      block.innerHTML = `<small>${c.prompt}</small><p>« ${c.answer} »</p>`;
      quotes.appendChild(block);
    });

    el("[data-result-margin]").textContent = r.marginLow
      ? "Tes réponses disent que ton poste te laisse peu de latitude : peu de décisions sans permission, peu de travail entier, ou peu de temps qui ne soit pas déjà pris. Une partie de ce résultat est un fait sur ce poste, pas sur toi."
      : "Tes réponses disent que ton poste te laisse de la latitude. Ce que montre ce résultat dépend donc surtout de ce que tu en fais.";

    el("[data-result-next]").textContent = `${step.name}. ${step.line}`;
    el("[data-result-practice]").textContent = step.practice;

    const route = el("[data-result-route]");
    route.innerHTML = "";
    step.cards.forEach((card) => {
      const a = document.createElement("a");
      a.href = card[2];
      a.className = "builder-test-card";
      a.innerHTML = `<small>${card[0]}</small><strong>${card[1]}</strong><span>Lire →</span>`;
      route.appendChild(a);
    });

    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  el("[data-test-start]").addEventListener("click", function () {
    intro.hidden = true;
    run.hidden = false;
    showQuestion();
  });
  el("[data-test-back]").addEventListener("click", function () {
    if (position > 0) {
      position--;
      showQuestion();
    }
  });
  el("[data-test-next]").addEventListener("click", function () {
    const { i, type } = path[position];
    if ((type === "rated" ? answers[i] : edges[i]) === undefined) return;
    if (position < path.length - 1) {
      position++;
      showQuestion();
    } else showResult();
  });
})();
