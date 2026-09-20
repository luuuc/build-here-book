// Le test du builder, version 2. Brouillon, non publie.
//
//   donnees   : questions.js, produit depuis docs/questions-test-du-builder.md
//   apercu    : apercu.html, a ouvrir directement dans un navigateur
//   conception: docs/conception-test-du-builder.md
//
// Ce qui change par rapport a la version en ligne :
//   - le test mesure le travail, pas la personne ;
//   - une seule ligne de 0 a 100, affichee en bande, jamais en score ponctuel ;
//   - trois facettes de douze questions au lieu de dix scores de trois ;
//   - l'ordre des options est tire au hasard a chaque question ;
//   - plus aucun seuil : la recommandation vient des reponses, pas d'un score ;
//   - le resultat cite les reponses qui l'ont produit.
//
// Les valeurs des options restent provisoires tant que les praticiens n'ont
// pas note la cle. Tant que c'est le cas, ce fichier ne doit pas partir en ligne.

(function () {
  const racine = document.querySelector("[data-builder-test]");
  if (!racine) return;

  const questions = window.QUESTIONS || [];
  const marge = window.MARGE || [];
  if (!questions.length) return;

  const etapes = [
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
      ["Principe", "Livrer permet d'apprendre", "/chapters/05-01-shipper-cree-de-linformation.html"],
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
      ["Diagnostic", "On fabrique l'environnement dont on se plaint", "/chapters/09-01-les-dirigeants-fabriquent-lenvironnement-dont-ils-se-plaignent.html"],
      ["Principe", "Le filtre que tu fais tourner", "/chapters/09-02-le-filtre-que-tu-fais-tourner.html"],
      ["Pratique", "Confie un problème, pas une tâche", "/chapters/09-03-confie-un-probleme-pas-une-tache.html"]
    ]},
    { n: 10, name: "La référence", line: "Ton travail laisse une trace dont quelqu'un peut apprendre sans t'avoir dans la pièce.", practice: "Publie un artefact qui répond à une question réelle : décision, méthode, incident, exemple ou outil réutilisable.", cards: [
      ["Diagnostic", "Un avis n'est pas un artefact", "/chapters/10-02-un-avis-nest-pas-un-artefact.html"],
      ["Principe", "Une trace n'est pas forcément du code", "/chapters/10-03-une-trace-nest-pas-forcement-du-code.html"],
      ["Pratique", "Réponds à la question en public", "/chapters/10-04-reponds-a-la-question-en-public.html"]
    ]}
  ];
  const facettes = [
    { cle: "lance", nom: "Ce que tu lances" },
    { cle: "ferme", nom: "Ce que tu fermes" },
    { cle: "laisse", nom: "Ce que tu laisses" },
  ];

  // Quatre zones de vingt-cinq points. Chaque texte doit etre faux pour
  // quelqu'un situe trente points plus loin : c'est la regle qui evite
  // l'effet Barnum, ou n'importe qui se reconnait dans n'importe quoi.
  const zones = [
    {
      max: 25,
      titre: "Presque tout ce que tu fais s'arrête quand tu t'arrêtes.",
      absence:
        "Si tu pars deux semaines, la plupart de tes sujets attendent ton retour. Rien n'est cassé. Personne d'autre n'a de raison de s'en saisir, parce que rien n'a été posé ailleurs que dans ta tête et dans ta file.",
    },
    {
      max: 50,
      titre: "Ton travail tient quelques jours, pas deux semaines.",
      absence:
        "Si tu pars deux semaines, l'exécution continue un moment, puis elle bute sur la première décision. On t'appelle, ou on attend. Ce que tu as construit fonctionne ; ce que tu sais n'est écrit nulle part.",
    },
    {
      max: 75,
      titre: "Ce que tu construis survit à ton absence. Ton jugement, non.",
      absence:
        "Si tu pars deux semaines, presque tout continue. Ce qui s'arrête, ce sont les arbitrages : les cas qui ne ressemblent pas aux précédents remontent, et ils attendent que tu tranches.",
    },
    {
      max: 100,
      titre: "Ton travail continue, décisions comprises.",
      absence:
        "Si tu pars deux semaines, tu apprends au retour des décisions prises sans toi, et tu es d'accord avec la plupart. Ce qui te reste à faire n'est plus de tenir, c'est de rendre cette façon de travailler transmissible.",
    },
  ];

  const el = (s) => racine.querySelector(s);
  const intro = el("[data-test-intro]");
  const cours = el("[data-test-run]");
  const resultat = el("[data-test-result]");

  // Les trente-six questions notees, puis les quatre de marge. Le changement
  // de registre est annonce : on passe de ce que tu fais a ce que le poste
  // autorise.
  const parcours = questions
    .map((q, i) => ({ q, i, type: "notee" }))
    .concat(marge.map((q, i) => ({ q, i, type: "marge" })));

  let position = 0;
  const reponses = new Array(questions.length).fill(undefined);
  const bords = new Array(marge.length).fill(undefined);

  // L'ordre des options est tire une fois par question et par passage, puis
  // garde : revenir en arriere ne doit pas redistribuer les reponses.
  const ordres = parcours.map((p) =>
    melanger(p.q.options.map((_, i) => i))
  );

  function melanger(t) {
    for (let i = t.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [t[i], t[j]] = [t[j], t[i]];
    }
    return t;
  }

  function etiquette(option) {
    return typeof option === "string" ? option : option.t;
  }

  function afficherQuestion() {
    const { q, i, type } = parcours[position];
    const choisi = type === "notee" ? reponses[i] : bords[i];

    el("[data-test-count]").textContent = `${position + 1} sur ${parcours.length}`;
    el("[data-test-progress]").style.width = `${((position + 1) / parcours.length) * 100}%`;
    el("[data-test-stage]").textContent =
      type === "marge"
        ? "Sur ton poste"
        : q.type === "evenement"
        ? "Un fait, pas une impression"
        : "Que ferais-tu";

    const titre = el("[data-test-question]");
    titre.textContent = q.enonce;

    const boite = el("[data-test-answers]");
    boite.innerHTML = "";
    ordres[position].forEach((index) => {
      const bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "builder-test-answer";
      bouton.textContent = etiquette(q.options[index]);
      bouton.setAttribute("aria-pressed", String(choisi === index));
      bouton.addEventListener("click", function () {
        if (type === "notee") reponses[i] = index;
        else bords[i] = index;
        Array.from(boite.children).forEach((b, rang) =>
          b.setAttribute("aria-pressed", String(ordres[position][rang] === index))
        );
        el("[data-test-next]").disabled = false;
      });
      boite.appendChild(bouton);
    });

    el("[data-test-back]").disabled = position === 0;
    el("[data-test-next]").disabled = choisi === undefined;
    el("[data-test-next]").textContent =
      position === parcours.length - 1 ? "Voir mon résultat" : "Suivante";
    titre.focus();
  }

  function valeur(q, index) {
    return q.options[index].v;
  }

  function calculer() {
    const somme = (liste) =>
      liste.reduce((n, { q, i }) => n + valeur(q, reponses[i]), 0);
    const notees = questions.map((q, i) => ({ q, i }));

    const total = Math.round((somme(notees) / (3 * notees.length)) * 100);

    const parFacette = facettes.map((f) => {
      const siennes = notees.filter(({ q }) => q.facette === f.cle);
      return {
        ...f,
        score: Math.round((somme(siennes) / (3 * siennes.length)) * 100),
      };
    });

    // La recommandation vient des reponses, pas d'un score. On regarde, pour
    // chaque etape, la PART de reponses basses, et non leur nombre : les
    // etapes ne portent pas toutes le meme nombre de questions, et compter
    // brut ferait toujours gagner la plus fournie. A egalite, l'etape la plus
    // basse gagne, ce qui applique l'hypothese du livre sans la deguiser en
    // mesure.
    const parEtape = {};
    notees
      .filter(({ q }) => q.etape > 0)
      .forEach(({ q, i }) => {
        const e = (parEtape[q.etape] = parEtape[q.etape] || { basses: [], valeurs: [] });
        e.valeurs.push(valeur(q, reponses[i]));
        if (valeur(q, reponses[i]) <= 1) e.basses.push({ q, i });
      });

    const moyenne = (l) => l.reduce((x, y) => x + y, 0) / l.length;
    const numeros = Object.keys(parEtape).map(Number);
    const part = (n) => parEtape[n].basses.length / parEtape[n].valeurs.length;

    let etape;
    if (numeros.some((n) => part(n) > 0)) {
      etape = numeros.sort((a, b) => part(b) - part(a) || a - b)[0];
    } else if (numeros.every((n) => moyenne(parEtape[n].valeurs) === 3)) {
      // Rien a redire nulle part : il reste la transmission.
      etape = 10;
    } else {
      etape = numeros.sort(
        (a, b) => moyenne(parEtape[a].valeurs) - moyenne(parEtape[b].valeurs) || a - b
      )[0];
    }
    const aDesBasses = parEtape[etape].basses.length > 0;

    const citations = (aDesBasses
      ? parEtape[etape].basses
      : notees.filter(({ q }) => q.etape === etape))
      .slice()
      .sort((a, b) => valeur(a.q, reponses[a.i]) - valeur(b.q, reponses[b.i]))
      .slice(0, 2)
      .map(({ q, i }) => ({
        enonce: q.enonce,
        reponse: etiquette(q.options[reponses[i]]),
      }));

    const moyenneMarge =
      bords.reduce((n, index) => n + (index === undefined ? 0 : index), 0) /
      (bords.length || 1);

    return {
      total,
      bande: [Math.max(0, total - 5), Math.min(100, total + 5)],
      facettes: parFacette,
      etape,
      citations,
      aDesBasses,
      margeBasse: moyenneMarge < 1.5,
    };
  }

  function afficherResultat() {
    const r = calculer();
    const zone = zones.find((z) => r.total <= z.max);
    const etape = etapes[r.etape - 1];

    cours.hidden = true;
    resultat.hidden = false;

    el("[data-result-band]").textContent = `entre ${r.bande[0]} et ${r.bande[1]} sur 100`;
    el("[data-result-title]").textContent = zone.titre;
    el("[data-result-absence]").textContent = zone.absence;

    const facettes_ = el("[data-result-facettes]");
    facettes_.innerHTML = "";
    r.facettes.forEach((f) => {
      const ligne = document.createElement("div");
      ligne.className = "builder-test-scale-row";
      ligne.innerHTML = `<span>${f.nom}</span><span class="builder-test-score"><i style="width:${f.score}%"></i></span><b>${f.score}</b>`;
      facettes_.appendChild(ligne);
    });

    el("[data-result-citations-note]").textContent = r.aDesBasses
      ? "Deux situations où tu t'es placé en bas. Ce sont elles qui ont produit la recommandation."
      : "Aucune de tes réponses ne te place en bas. Voici deux situations de la marche qui reste la plus faible.";

    const citations = el("[data-result-citations]");
    citations.innerHTML = "";
    r.citations.forEach((c) => {
      const bloc = document.createElement("blockquote");
      bloc.innerHTML = `<small>${c.enonce}</small><p>« ${c.reponse} »</p>`;
      citations.appendChild(bloc);
    });

    el("[data-result-marge]").textContent = r.margeBasse
      ? "Tes réponses disent que ton poste te laisse peu de latitude : peu de décisions sans permission, peu de travail entier, ou peu de temps qui ne soit pas déjà pris. Une partie de ce résultat est un fait sur ce poste, pas sur toi."
      : "Tes réponses disent que ton poste te laisse de la latitude. Ce que montre ce résultat dépend donc surtout de ce que tu en fais.";

    el("[data-result-next]").textContent = `${etape.name}. ${etape.line}`;
    el("[data-result-practice]").textContent = etape.practice;

    const route = el("[data-result-route]");
    route.innerHTML = "";
    etape.cards.forEach((carte) => {
      const a = document.createElement("a");
      a.href = carte[2];
      a.className = "builder-test-card";
      a.innerHTML = `<small>${carte[0]}</small><strong>${carte[1]}</strong><span>Lire →</span>`;
      route.appendChild(a);
    });

    resultat.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  el("[data-test-start]").addEventListener("click", function () {
    intro.hidden = true;
    cours.hidden = false;
    afficherQuestion();
  });
  el("[data-test-back]").addEventListener("click", function () {
    if (position > 0) {
      position--;
      afficherQuestion();
    }
  });
  el("[data-test-next]").addEventListener("click", function () {
    const { i, type } = parcours[position];
    if ((type === "notee" ? reponses[i] : bords[i]) === undefined) return;
    if (position < parcours.length - 1) {
      position++;
      afficherQuestion();
    } else afficherResultat();
  });
})();
