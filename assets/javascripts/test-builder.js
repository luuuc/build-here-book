(function () {
  const root = document.querySelector("[data-builder-test]");
  if (!root) return;

  const stages = [
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
      ["Diagnostic", "Fini de ton côté ne veut pas dire réglé", "/chapters/06-02-fini-de-ton-cote-ne-veut-pas-dire-regle.html"],
      ["Principe", "Le mauvais résultat t'appartient aussi", "/chapters/06-05-le-mauvais-resultat-tappartient-aussi.html"],
      ["Pratique", "Reviens voir un mois plus tard", "/chapters/06-03-reviens-voir-un-mois-plus-tard.html"]
    ]},
    { n: 7, name: "Les systèmes", line: "Tu rends la prochaine fois plus facile et moins dépendante d'une mémoire individuelle.", practice: "Repère un problème apparu deux fois. Supprime une étape ou écris le contrôle qui empêchera la troisième.", cards: [
      ["Diagnostic", "La deuxième fois est une information", "/chapters/07-01-la-deuxieme-fois-est-une-information.html"],
      ["Principe", "Tout ne mérite pas de devenir un processus", "/chapters/07-04-tout-ne-merite-pas-de-devenir-un-processus.html"],
      ["Pratique", "Supprime l'étape avant de la documenter", "/chapters/07-02-supprime-letape-avant-de-la-documenter.html"]
    ]},
    { n: 8, name: "Le levier", line: "Tu multiplies un jugement solide au lieu de multiplier seulement l'activité.", practice: "Liste les demandes de la semaine. Regroupe celles qui se répètent et automatise seulement la partie dont tu sais vérifier la sortie.", cards: [
      ["Diagnostic", "Trente pour cent de ce qui arrive est la même chose", "/chapters/08-02-trente-pour-cent-de-ce-qui-arrive-est-la-meme-chose.html"],
      ["Principe", "Le levier le moins cher est déjà payé", "/chapters/08-04-le-levier-le-moins-cher-est-deja-paye.html"],
      ["Pratique", "L'IA est un levier, pas un raccourci", "/chapters/08-03-lia-est-un-levier-pas-un-raccourci.html"]
    ]},
    { n: 9, name: "Le leadership", line: "Tu fabriques un environnement où d'autres builders peuvent agir.", practice: "Prends la plainte que tu répètes le plus sur l'équipe. Change une règle ou une incitation qui rend ce comportement rationnel.", cards: [
      ["Diagnostic", "On fabrique l'environnement dont on se plaint", "/chapters/09-01-les-dirigeants-fabriquent-lenvironnement-dont-ils-se-plaignent.html"],
      ["Principe", "Le filtre que tu fais tourner", "/chapters/09-02-le-filtre-que-tu-fais-tourner.html"],
      ["Système", "L'absence de règle est une interdiction", "/chapters/09-03-leader-labsence-de-regle-est-une-interdiction.html"]
    ]},
    { n: 10, name: "La référence", line: "Ton travail laisse une trace dont quelqu'un peut apprendre sans t'avoir dans la pièce.", practice: "Publie un artefact qui répond à une question réelle : décision, méthode, incident, exemple ou outil réutilisable.", cards: [
      ["Diagnostic", "Un avis n'est pas un artefact", "/chapters/10-02-un-avis-nest-pas-un-artefact.html"],
      ["Principe", "Une trace n'est pas forcément du code", "/chapters/10-03-une-trace-nest-pas-forcement-du-code.html"],
      ["Pratique", "Réponds à la question en public", "/chapters/10-04-reponds-a-la-question-en-public.html"]
    ]}
  ];

  const questions = [
    [1,"Une règle interne ralentit tout le monde depuis des mois. Personne ne t'a demandé de la changer.",["Je m'y adapte, elle ne relève pas de moi.","Je la signale quand elle me bloque.","Je propose une correction à la personne responsable.","Je vérifie le problème, corrige la part réversible et montre le résultat."]],
    [1,"En réunion, un terme important t'échappe alors que les autres semblent le comprendre.",["Je laisse passer pour ne pas ralentir le groupe.","Je le cherche discrètement après la réunion.","Je demande une définition à la fin.","Je pose la question tout de suite et vérifie que la décision repose sur le même sens."]],
    [1,"Quelqu'un démontre que ton idée centrale est fausse.",["Je défends le contexte dans lequel elle était raisonnable.","Je cesse d'en parler et passe à autre chose.","Je reconnais l'erreur et corrige la décision.","Je corrige la décision, explique ce qui m'a trompé et change le contrôle qui manquait."]],
    [2,"Tu résous un problème technique ou métier nouveau pour ton équipe.",["J'essaie jusqu'à trouver quelque chose qui marche.","Je demande à la personne la plus expérimentée ici.","Je consulte documentation et exemples reconnus.","Je remonte aux sources primaires, compare plusieurs approches et garde une trace vérifiable."]],
    [2,"Ton travail fonctionne, mais tu ne progresses plus vraiment.",["C'est normal avec l'expérience.","J'attends un projet plus difficile.","Je choisis une compétence précise à approfondir.","Je cherche une pratique extérieure exigeante, produis un travail et demande une critique observable."]],
    [2,"Une bibliothèque, une méthode ou un fournisseur se comporte de façon inattendue.",["Je cherche un contournement rapide.","Je consulte les réponses les plus populaires.","Je lis la documentation complète liée au cas.","Je remonte à l'implémentation, au contrat ou aux données qui décident réellement du comportement."]],
    [3,"Un ticket décrit précisément une solution qui ne semble pas résoudre le problème.",["Je livre ce qui est écrit.","Je demande qu'on réécrive le ticket.","J'explique le doute avant de commencer.","Je vérifie le problème avec des faits, propose une meilleure coupe et livre ce qui est décidé."]],
    [3,"Tu es bloqué depuis deux heures par une dépendance extérieure.",["J'attends une réponse.","Je relance avec le même message.","Je documente le blocage et cherche une autre tâche.","Je formule la décision manquante, teste une voie réversible et escalade avec des options."]],
    [3,"En réalisant une tâche, tu découvres une cause plus profonde.",["Je finis la tâche, le reste dépasse le périmètre.","Je le mentionne oralement si j'y pense.","Je livre puis ajoute la découverte au suivi.","Je livre, apporte les preuves et propose la prochaine décision sans confondre analyse et résultat attendu."]],
    [4,"Une équipe demande une fonctionnalité urgente pour un client important.",["Je priorise selon l'importance du client.","Je demande une spécification plus détaillée.","Je demande quel problème le client cherche à résoudre.","Je parle à la personne concernée, reconstruis la séquence et sépare besoin, solution demandée et enjeu commercial."]],
    [4,"Ton choix améliore le produit mais complique fortement le support.",["Le support s'adaptera après la livraison.","J'envoie une documentation au support.","J'inclus le support dans la revue avant livraison.","Je chiffre l'effet complet, observe leurs cas réels et change la solution ou son coût assumé."]],
    [4,"On te demande pourquoi un projet compte pour l'entreprise.",["Je décris ce que l'équipe va construire.","Je cite l'objectif indiqué dans la feuille de route.","Je relie le projet à un comportement utilisateur attendu.","Je relie utilisateur, distribution, revenu ou coût et dis quelle hypothèse pourrait être fausse."]],
    [5,"Une fonctionnalité peut être livrée en trois semaines ou testée partiellement vendredi.",["Je préfère finir proprement dans trois semaines.","Je montre une maquette vendredi sans la confronter au réel.","Je livre une petite partie utilisable vendredi.","Je choisis la plus petite exposition qui tranche le risque principal et prépare ce que j'observerai."]],
    [5,"La date approche et plusieurs détails restent imparfaits.",["Je repousse jusqu'à ce que tout soit cohérent.","Je livre tout et corrige les plaintes ensuite.","Je sépare les défauts gênants des risques bloquants.","Je protège les garde-fous irréversibles, coupe le reste explicitement et fixe la boucle de retour."]],
    [5,"Après beaucoup de travail, des faits nouveaux contredisent la solution.",["Il est trop tard pour changer maintenant.","Je termine pour apprendre jusqu'au bout.","Je présente les faits et demande une décision.","Je rends visible le coût déjà engagé, l'ignore dans la décision et propose l'expérience la moins chère."]],
    [6,"Le travail est livré et personne ne vérifie son effet.",["Ma partie est terminée.","Je demande au responsable produit si cela fonctionne.","Je regarde les indicateurs disponibles.","Je définis le signal manquant, reviens à une date convenue et porte la conclusion jusqu'à une décision."]],
    [6,"Une décision raisonnable produit un mauvais résultat.",["Je rappelle que personne ne pouvait savoir.","Je cherche qui a mal exécuté.","Je sépare la qualité de la décision de celle du résultat.","Je rapporte le résultat sans l'embellir, garde ce qui était solide et change ce que les faits ont invalidé."]],
    [6,"Six personnes sont responsables d'un résultat transversal.",["Chacun doit faire sa part.","On ajoute un point de synchronisation.","On nomme un coordinateur.","Une personne porte la boucle complète, avec des décisions explicites pour les autres propriétaires."]],
    [7,"Le même incident revient pour la deuxième fois.",["On le résout plus vite cette fois.","On rappelle la procédure à l'équipe.","On documente la résolution.","On cherche pourquoi le système permet la répétition et ajoute le plus petit changement qui la rend visible ou impossible."]],
    [7,"Une procédure comporte douze étapes et génère des erreurs.",["Je rédige un guide plus détaillé.","J'ajoute une checklist.","J'automatise les étapes répétitives.","Je supprime d'abord les étapes sans valeur, puis contrôle ou automatise ce qui reste."]],
    [7,"Une opération importante ne fonctionne que grâce à une personne.",["Elle forme un remplaçant.","Elle écrit tout ce qu'elle sait.","Deux personnes exécutent ensemble la prochaine fois.","On rend le savoir observable, teste la relève sans elle et retire les permissions ou décisions implicites."]],
    [8,"Ton équipe reçoit trente demandes semblables chaque semaine.",["On travaille plus vite.","On recrute une personne de plus.","On crée des réponses modèles.","On mesure les répétitions, traite la cause dominante et automatise uniquement la partie vérifiable."]],
    [8,"Un outil d'IA produit en quelques minutes un travail qui prenait une journée.",["Je l'adopte pour toute l'équipe.","Je l'utilise seulement pour des brouillons.","Je compare sa sortie à quelques cas connus.","Je définis les erreurs coûteuses, un contrôle proportionné et les cas où aucun humain ne sait vérifier."]],
    [8,"Une automatisation promet de multiplier le débit par dix.",["Je calcule immédiatement le gain de temps.","Je lance un pilote sur un petit volume.","Je vérifie d'abord la qualité du processus actuel.","Je vérifie processus, contrôles invisibles et coût d'une erreur amplifiée avant de multiplier quoi que ce soit."]],
    [9,"Presque personne dans l'équipe ne prend d'initiative.",["Je recrute des profils plus autonomes.","Je rappelle que l'initiative est attendue.","Je demande ce qui les retient.","Je regarde décisions, récompenses et réactions passées, puis change une condition qui rend l'attente rationnelle."]],
    [9,"Un membre de l'équipe signale publiquement une erreur importante.",["Je corrige vite puis traite le sujet en privé.","Je le remercie avant d'examiner les responsabilités.","Je protège le signalement et organise l'analyse des faits.","Je rends visible que le signalement est récompensé, sépare erreur et dissimulation, puis change le système."]],
    [9,"Tu demandes une pratique importante mais elle n'arrive jamais.",["Je la rends obligatoire.","Je répète pourquoi elle compte.","Je demande ce qui empêche de la faire.","Je finance le temps, retire une priorité concurrente et montre dans la revue que cette pratique décide vraiment."]],
    [10,"Tu résous régulièrement un problème que d'autres rencontrent aussi.",["Je les aide quand ils me demandent.","Je garde des notes personnelles.","Je partage un résumé avec mon équipe.","Je publie un artefact trouvable, vérifiable et réutilisable là où la question est posée."]],
    [10,"Tu veux devenir une référence dans ton domaine.",["Je publie plus souvent sur les réseaux.","Je donne mon avis sur les sujets visibles.","Je documente mes projets réussis.","Je réponds à des questions réelles avec des preuves, y compris ce qui a échoué et les limites."]],
    [10,"Une méthode importante dépend encore de ta présence.",["Je forme les personnes les plus proches.","J'enregistre une présentation complète.","J'écris une documentation et demande une relecture.","Je produis un artefact qu'un inconnu peut appliquer, puis observe où il échoue sans moi."]]
  ];

  const el = (s) => root.querySelector(s);
  const intro = el("[data-test-intro]");
  const run = el("[data-test-run]");
  const result = el("[data-test-result]");
  const answersNode = el("[data-test-answers]");
  const questionNode = el("[data-test-question]");
  let index = 0;
  let answers = [];

  function showQuestion() {
    const q = questions[index];
    el("[data-test-count]").textContent = `Situation ${index + 1} sur ${questions.length}`;
    el("[data-test-progress]").style.width = `${((index + 1) / questions.length) * 100}%`;
    el("[data-test-stage]").textContent = `Étape ${q[0]} · ${stages[q[0] - 1].name}`;
    questionNode.textContent = q[1];
    answersNode.innerHTML = "";
    q[2].forEach(function (label, score) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "builder-test-answer";
      button.textContent = label;
      button.setAttribute("aria-pressed", String(answers[index] === score));
      button.addEventListener("click", function () {
        answers[index] = score;
        Array.from(answersNode.children).forEach((b, i) => b.setAttribute("aria-pressed", String(i === score)));
        el("[data-test-next]").disabled = false;
      });
      answersNode.appendChild(button);
    });
    el("[data-test-back]").disabled = index === 0;
    el("[data-test-next]").disabled = answers[index] === undefined;
    el("[data-test-next]").textContent = index === questions.length - 1 ? "Voir mon résultat" : "Suivante";
    questionNode.focus();
  }

  function compute() {
    const sums = Array(10).fill(0);
    const counts = Array(10).fill(0);
    questions.forEach(function (q, i) { sums[q[0] - 1] += answers[i]; counts[q[0] - 1]++; });
    const scores = sums.map((n, i) => Math.round((n / counts[i] / 3) * 100));
    let reached = 0;
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] >= 57 && reached === i) reached = i + 1;
      else break;
    }
    const next = Math.min(reached + 1, 10);
    const strongest = scores.indexOf(Math.max.apply(null, scores)) + 1;
    return { scores: scores, reached: reached, next: next, strongest: strongest };
  }

  function showResult() {
    const r = compute();
    const current = r.reached ? stages[r.reached - 1] : null;
    const next = stages[r.next - 1];
    const strongest = stages[r.strongest - 1];
    run.hidden = true;
    result.hidden = false;
    el("[data-result-title]").textContent = r.reached === 10
      ? "Tu laisses une référence derrière toi."
      : current
      ? `${current.name} est ton dernier appui solide.`
      : "L'état d'esprit est ta première marche.";
    el("[data-result-summary]").textContent = r.reached === 10
      ? "Les dix capacités tiennent ensemble. Ton enjeu n'est plus de monter : c'est de rendre cette façon de travailler transmissible."
      : `Tu peux montrer des forces plus loin dans le parcours, mais ${next.name.toLowerCase()} est aujourd'hui la marche qui limite leur effet.`;
    el("[data-result-strength]").textContent = `${strongest.name}. ${strongest.line}`;
    el("[data-result-next]").textContent = `${next.name}. ${next.line}`;
    el("[data-result-practice]").textContent = next.practice;
    const scale = el("[data-result-scale]");
    scale.innerHTML = "";
    stages.forEach(function (stage, i) {
      const row = document.createElement("div");
      row.className = "builder-test-scale-row" + (stage.n === r.next ? " is-next" : "");
      row.innerHTML = `<span>${stage.n}. ${stage.name}</span><span class="builder-test-score"><i style="width:${r.scores[i]}%"></i></span><b>${r.scores[i]}%</b>`;
      scale.appendChild(row);
    });
    const route = el("[data-result-route]");
    route.innerHTML = "";
    next.cards.forEach(function (card) {
      const a = document.createElement("a");
      a.href = card[2];
      a.className = "builder-test-card";
      a.innerHTML = `<small>${card[0]}</small><strong>${card[1]}</strong><span>Lire →</span>`;
      route.appendChild(a);
    });
    try { localStorage.setItem("build-here:test-builder", JSON.stringify({ date: Date.now(), result: r })); } catch (e) {}
    fetch(root.dataset.api, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: 1, scores: r.scores, niveau: r.reached, prochain: r.next }) }).catch(function () {});
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  el("[data-test-start]").addEventListener("click", function () { intro.hidden = true; run.hidden = false; showQuestion(); });
  el("[data-test-back]").addEventListener("click", function () { if (index > 0) { index--; showQuestion(); } });
  el("[data-test-next]").addEventListener("click", function () { if (answers[index] === undefined) return; if (index < questions.length - 1) { index++; showQuestion(); } else showResult(); });
  el("[data-test-restart]").addEventListener("click", function () { answers = []; index = 0; result.hidden = true; run.hidden = false; showQuestion(); });
  el("[data-test-copy]").addEventListener("click", function () {
    const text = `${el("[data-result-title]").textContent}\n${el("[data-result-next]").textContent}\n${location.origin}/test-builder/`;
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => { el("[data-test-copy]").textContent = "Résultat copié"; });
  });
})();
