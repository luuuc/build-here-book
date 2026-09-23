/* Le contenu francais du test : questions, etapes, paliers et textes de la
   piste. Les regles vivent dans test-builder-model.js et ne sont ecrites
   qu'une fois ; ce fichier a un jumeau anglais, test-builder-contenu-en.js,
   qui porte les memes cles.

   Cinq questions par etape, sans fenetre de temps fixe :
   - des habitudes liees a un moment (« quand on te confie une tache,
     d'habitude… »), avec quatre gestes qui paraissent tous raisonnables ;
   - des echelles verifiables (« sais-tu ce que coute… », « si tu partais
     deux semaines… ») ;
   - cinq « a quand remonte la derniere fois » dans tout le test, pour les
     actes rares ;
   - une « la derniere fois » : ce que tu as fait, pas ce que tu penses ;
   - une situation : ce qu'il vaut mieux faire.
   Les options valent de 0 a 3, dans l'ordre ecrit ici. L'interface melange
   l'ordre d'affichage des habitudes, des « derniere fois » et des
   situations.

   Ecriture : des phrases courtes, des mots de tous les jours, une seule idee
   par question. Quelqu'un qui n'a jamais lu le livre doit comprendre.

   Rien ici n'est envoye nulle part : le test ne quitte pas la page. */
(function (scope) {
  "use strict";
  const q = (capabilityId, n, kind, text, options) => ({
    id: `${capabilityId}-${n}`, capabilityId, kind, text,
    options: options && options.map((label, value) => ({ id: String(value), label, value }))
  });
  // « A quand remonte la derniere fois » : du plus recent au plus ancien.
  const recence = [["Cette semaine", 3], ["Ce mois-ci", 2], ["Cette année", 1], ["Plus longtemps, ou jamais", 0]]
    .map(([label, value]) => ({ id: String(value), label, value }));
  const horsEchelle = [
    { id: "unseen", label: "La situation ne s'est pas présentée" },
    { id: "blocked", label: "Mon cadre ne me le permettait pas" }
  ];
  const questions = [
    q("mindset", 1, "habitude", "Tu dois suivre une règle sans savoir pourquoi elle existe. D'habitude :", ["Tu l'appliques, ce n'est pas ton sujet.", "Tu t'en plains quand elle gêne.", "Tu cherches pourquoi, quand tu as le temps.", "Tu demandes pourquoi elle existe."]),
    q("mindset", 2, "habitude", "La dernière fois qu'un fait a contredit ton idée, qu'as-tu fait ?", ["J'ai défendu mon idée : un fait ne suffit pas.", "J'ai attendu d'en savoir plus.", "J'ai revu mon idée, sans le dire.", "J'ai dit que j'avais tort, et changé d'avis."]),
    q("mindset", 3, "habitude", "On te pose une question, et tu ne connais pas la réponse. D'habitude :", ["Tu réponds quand même, pour ne pas perdre la face.", "Tu donnes une réponse prudente et vague.", "Tu dis que tu ne sais pas.", "Tu dis ne pas savoir, puis tu reviens avec la réponse."]),
    q("mindset", 4, "derniere-fois", "La dernière fois que tu as vu quelque chose qui marchait mal autour de toi, qu'as-tu fait ?", [
      "Rien, ce n'était pas à moi de m'en occuper.",
      "J'en ai parlé autour de moi, sans plus.",
      "Je l'ai signalé à qui pouvait agir.",
      "J'ai fait un premier pas pour l'améliorer."
    ]),
    q("mindset", 5, "situation", "En réunion ou en cours, tout le monde utilise un mot que tu ne comprends pas. Que vaut-il mieux faire ?", [
      "Ne rien dire, pour ne pas ralentir le groupe.",
      "Chercher le mot plus tard, de ton côté.",
      "Demander tout bas à ton voisin.",
      "Demander tout de suite ce que veut dire le mot."
    ]),

    q("craft", 1, "echelle", "Quand tu prépares un travail important, d'habitude, tu le montres :", ["Une fois fini, si on te le demande.", "Une fois fini, avant de le rendre.", "À mi-chemin, à une personne de confiance.", "Tôt, dès qu'il y a quelque chose à critiquer."]),
    q("craft", 2, "habitude", "La dernière chose que tu as apprise dans ton métier, tu l'as apprise :", ["Parce qu'on te l'a imposée.", "Par hasard, en travaillant.", "Dans une formation qu'on t'a proposée.", "Parce que tu l'as cherchée toi-même."]),
    q("craft", 3, "habitude", "Ton travail est acceptable, et personne n'en demande plus. D'habitude :", ["Tu le rends tel quel : acceptable suffit.", "Tu le rends, en notant ce qui pourrait être mieux.", "Tu reprends les détails qui se voient.", "Tu reprends ce qui compte, même si ça ne se voit pas."]),
    q("craft", 4, "derniere-fois", "La dernière fois qu'on a critiqué ton travail, qu'as-tu fait ?", [
      "J'ai défendu mon travail, la critique était injuste.",
      "Je l'ai écoutée sans rien changer.",
      "J'ai corrigé ce travail comme on me l'a demandé.",
      "J'ai compris l'erreur et changé ma façon de faire."
    ]),
    q("craft", 5, "situation", "Tu fais la même tâche depuis deux ans, et tu la fais bien. Que vaut-il mieux faire ?", [
      "Continuer ainsi, puisque ça marche.",
      "Attendre qu'on te propose une formation.",
      "Changer de tâche pour ne pas t'ennuyer.",
      "Regarder comment les meilleurs la font, et comparer."
    ]),

    q("autonomy", 1, "habitude", "Quand on te confie une tâche, d'habitude, avant de commencer :", ["Tu commences : la demande est claire.", "Tu relis la demande pour ne rien oublier.", "Tu demandes le délai et le format attendus.", "Tu demandes à quoi elle doit servir."]),
    q("autonomy", 2, "habitude", "Quand tu demandes de l'aide, d'habitude, tu apportes :", ["Ta question, sans plus.", "Ce que tu as déjà essayé.", "Ce que tu as essayé, et où tu bloques.", "Le problème, tes essais, et ce que tu proposes."]),
    q("autonomy", 3, "habitude", "Une petite décision te revient, et la personne qui décide d'habitude n'est pas là. Tu :", ["Attends son retour.", "Lui écris, et attends sa réponse.", "Décides, sans forcément le dire.", "Décides, puis préviens de ce que tu as choisi."]),
    q("autonomy", 4, "derniere-fois", "La dernière fois qu'on t'a donné une consigne qui ne tenait pas debout, qu'as-tu fait ?", [
      "Je l'ai suivie sans rien dire.",
      "Je l'ai suivie, puis j'ai râlé.",
      "J'ai signalé le problème et attendu la réponse.",
      "J'ai expliqué le problème et proposé autre chose."
    ]),
    q("autonomy", 5, "situation", "Tu attends depuis une semaine une réponse pour avancer. Que vaut-il mieux faire ?", [
      "Attendre : ce n'est pas à toi de relancer.",
      "Relancer avec le même message.",
      "Avancer sur autre chose en attendant.",
      "Proposer une solution et une date pour décider."
    ]),

    q("understanding", 1, "recence", "À quand remonte la dernière fois que tu as parlé directement avec une personne qui utilise ce que tu fais ?"),
    q("understanding", 2, "echelle", "Sais-tu ce que coûte ou rapporte ce sur quoi tu travailles ?", ["Non, et ce n'est pas mon sujet.", "Non, mais je pourrais le demander.", "À peu près.", "Oui, et je sais d'où vient le chiffre."]),
    q("understanding", 3, "habitude", "Une autre équipe ou un autre métier te semble lent ou compliqué. D'habitude :", ["Tu fais avec : chacun son travail.", "Tu t'en plains à ton équipe.", "Tu demandes ce qui les ralentit.", "Tu passes du temps avec eux, pour voir leur travail."]),
    q("understanding", 4, "derniere-fois", "La dernière fois qu'on t'a demandé une chose précise, qu'as-tu fait ?", [
      "Je l'ai faite exactement comme demandé.",
      "Je l'ai faite en ajoutant mes idées.",
      "J'ai demandé à quoi elle devait servir.",
      "J'ai cherché le vrai problème, puis choisi quoi faire."
    ]),
    q("understanding", 5, "situation", "Une personne qui utilise ton travail se plaint souvent du même problème. Que vaut-il mieux faire ?", [
      "Lui répondre poliment, ce n'est pas ton rôle.",
      "Transmettre sa plainte à qui de droit.",
      "Noter ses plaintes pour en parler plus tard.",
      "Lui parler pour comprendre ce qu'elle essaie de faire."
    ]),

    q("delivery", 1, "echelle", "Quand tu fais quelque chose pour d'autres, ils le voient pour la première fois :", ["Quand tout est fini.", "Presque fini, pour une dernière relecture.", "À mi-chemin.", "Dès la première version qui marche à peu près."]),
    q("delivery", 2, "recence", "À quand remonte la dernière fois que tu as terminé quelque chose dont quelqu'un s'est vraiment servi ?"),
    q("delivery", 3, "habitude", "Ton projet ne tiendra pas dans le temps prévu. D'habitude :", ["Tu livres tout, quitte à bâcler la fin.", "Tu travailles plus tard pour tout finir.", "Tu demandes plus de temps, en expliquant pourquoi.", "Tu retires ce qui peut attendre, pour livrer l'essentiel."]),
    q("delivery", 4, "derniere-fois", "La dernière fois que tu as commencé quelque chose de nouveau, au bout de combien de temps quelqu'un a-t-il pu l'essayer ?", [
      "Personne ne l'a encore essayé.",
      "Plusieurs mois.",
      "Quelques semaines.",
      "Quelques jours."
    ]),
    q("delivery", 5, "situation", "Ton projet est presque prêt, et la date prévue arrive. Que vaut-il mieux faire ?", [
      "Repousser la date jusqu'à ce que tout soit parfait.",
      "Tout livrer à la date, même ce qui n'est pas prêt.",
      "Livrer et laisser les autres trouver ce qui manque.",
      "Livrer ce qui est prêt et utile, puis la suite."
    ]),

    q("ownership", 1, "recence", "À quand remonte la dernière fois que tu as vérifié, après coup, si un travail terminé avait servi ?"),
    q("ownership", 2, "habitude", "Tu vois qu'un travail promis va prendre du retard. D'habitude :", ["Tu accélères, en espérant tenir.", "Tu le dis si on te demande où tu en es.", "Tu préviens le jour prévu.", "Tu préviens dès que tu le sais, avec une nouvelle date."]),
    q("ownership", 3, "echelle", "Quel est le plus long travail que tu mènes jusqu'au bout sans que personne vérifie où tu en es ?", [
      "Quelques heures ou un jour.",
      "Une ou deux semaines.",
      "Un à trois mois.",
      "Plus de trois mois."
    ]),
    q("ownership", 4, "derniere-fois", "La dernière fois qu'un travail dont tu étais responsable a mal tourné, qu'as-tu fait ?", [
      "J'ai attendu de voir si quelqu'un le remarquait.",
      "J'ai expliqué que la cause venait d'ailleurs.",
      "Je l'ai dit et j'ai réparé ce que je pouvais.",
      "Je l'ai dit, j'ai réparé, puis vérifié que ça tenait."
    ]),
    q("ownership", 5, "situation", "Tu as terminé un travail. On te dit merci, puis plus de nouvelles. Que vaut-il mieux faire ?", [
      "Rien : c'est fini de ton côté.",
      "Attendre qu'on revienne vers toi en cas de problème.",
      "Écrire tout de suite pour savoir si ça va.",
      "Revenir voir un mois plus tard ce que ça a changé."
    ]),

    q("systems", 1, "echelle", "Si tu partais deux semaines sans prévenir, que se passerait-il ?", ["Presque tout attendrait mon retour.", "Plusieurs sujets attendraient.", "Une ou deux décisions attendraient.", "Rien : chacun saurait quoi faire."]),
    q("systems", 2, "habitude", "Une réunion régulière ne sert plus à grand-chose. D'habitude :", ["Tu y vas : c'est prévu.", "Tu y vas, en faisant autre chose.", "Tu proposes de la raccourcir.", "Tu proposes de la supprimer, ou de la remplacer par un écrit."]),
    q("systems", 3, "habitude", "Tu es la seule personne à savoir faire une tâche. D'habitude :", ["Tu la gardes : c'est plus sûr.", "Tu la fais quand on te le demande.", "Tu écris comment la faire.", "Tu l'apprends à quelqu'un, qui la fait devant toi."]),
    q("systems", 4, "derniere-fois", "La dernière fois qu'un même problème est revenu une deuxième fois, qu'as-tu fait ?", [
      "Je l'ai réglé comme la première fois.",
      "Je l'ai réglé et j'ai prévenu les autres.",
      "J'ai écrit comment le régler la prochaine fois.",
      "J'ai trouvé sa cause et je l'ai supprimée."
    ]),
    q("systems", 5, "situation", "Chaque lundi, tu passes une heure à refaire le même tableau à la main. Que vaut-il mieux faire ?", [
      "Continuer : tout le monde a l'habitude.",
      "Noter qu'il faudra l'automatiser un jour.",
      "L'automatiser sur ton ordinateur, pour toi.",
      "Vérifier qu'il sert encore, avant de l'automatiser."
    ]),

    q("leverage", 1, "recence", "À quand remonte la dernière fois que quelqu'un s'est servi d'une chose que tu as faite, sans avoir besoin de toi ?"),
    q("leverage", 2, "habitude", "Ta semaine est pleine, et une nouvelle demande arrive. D'habitude :", ["Tu dis oui, et tu travailles plus.", "Tu dis oui, et tu préviens que ça prendra du temps.", "Tu demandes ce qui compte le plus.", "Tu proposes ce que tu arrêtes pour lui faire de la place."]),
    q("leverage", 3, "habitude", "Avant de créer un outil, un document ou une méthode, d'habitude :", ["Tu te lances : tu sais ce qu'il te faut.", "Tu cherches un modèle sur internet.", "Tu demandes autour de toi si ça existe.", "Tu cherches ce qui existe déjà ici et pourrait resservir."]),
    q("leverage", 4, "derniere-fois", "La dernière fois que tu as reçu beaucoup de demandes qui se ressemblaient, qu'as-tu fait ?", [
      "Je les ai traitées une par une.",
      "J'ai demandé de l'aide pour suivre le rythme.",
      "J'ai préparé une réponse type pour aller plus vite.",
      "J'ai cherché leur cause commune pour la traiter."
    ]),
    q("leverage", 5, "situation", "Un nouvel outil payant te ferait gagner deux heures par semaine. Que vaut-il mieux faire ?", [
      "L'acheter tout de suite : deux heures, c'est beaucoup.",
      "Ne rien changer : un outil de plus complique tout.",
      "Laisser ton responsable décider à ta place.",
      "Comparer le temps gagné avec ce qu'il coûte à entretenir."
    ]),

    q("leadership", 1, "habitude", "Quelqu'un de moins expérimenté veut essayer une chose que tu sais risquée, mais pas grave. D'habitude :", ["Tu l'en empêches, pour lui éviter l'erreur.", "Tu la fais à sa place.", "Tu la laisses essayer, en surveillant de près.", "Tu la laisses essayer, puis vous en parlez ensemble."]),
    q("leadership", 2, "habitude", "Quand tu confies un travail à quelqu'un, d'habitude, tu donnes :", ["Les étapes à suivre, dans l'ordre.", "Les étapes, et le résultat attendu.", "Le résultat attendu, et tes conseils.", "Le problème à résoudre, et pourquoi il compte."]),
    q("leadership", 3, "habitude", "Quand tu relis le travail de quelqu'un, d'habitude :", ["Tu corriges toi-même : c'est plus rapide.", "Tu signales les erreurs.", "Tu signales les erreurs, et proposes une correction.", "Tu expliques ce que tu as vérifié, et pourquoi."]),
    q("leadership", 4, "derniere-fois", "La dernière fois qu'on t'a demandé de l'aide sur un problème que tu savais régler, qu'as-tu fait ?", [
      "Je l'ai réglé moi-même, c'était plus rapide.",
      "J'ai donné la réponse à appliquer.",
      "J'ai montré comment faire, étape par étape.",
      "J'ai posé des questions pour l'aider à trouver."
    ]),
    q("leadership", 5, "situation", "Une personne avec qui tu travailles propose une solution moins bonne que la tienne, mais qui marche. Que vaut-il mieux faire ?", [
      "Imposer ta solution, puisqu'elle est meilleure.",
      "La laisser faire sans rien dire.",
      "La laisser faire, puis lui montrer ta solution.",
      "Lui demander ses raisons, puis la laisser décider."
    ]),

    q("reference", 1, "recence", "À quand remonte la dernière fois qu'on t'a dit avoir repris une de tes façons de travailler ?"),
    q("reference", 2, "echelle", "Quand quelqu'un arrive dans ton équipe ou ton groupe, il apprend ta façon de faire :", ["En te posant ses questions au fil de l'eau.", "En te regardant faire.", "En lisant ce que tu as écrit, puis en te questionnant.", "Avec ce que tu as écrit, sans avoir besoin de toi."]),
    q("reference", 3, "habitude", "Un essai que tu as mené n'a pas marché. D'habitude :", ["Tu passes à autre chose, sans en parler.", "Tu en parles si on te le demande.", "Tu le racontes à ton équipe.", "Tu écris ce que tu en as appris, pour que d'autres l'évitent."]),
    q("reference", 4, "derniere-fois", "La dernière fois qu'on t'a posé une question dont tu connaissais bien la réponse, qu'as-tu fait ?", [
      "J'ai renvoyé la personne vers quelqu'un d'autre.",
      "J'ai répondu vite, à l'oral ou en privé.",
      "J'ai répondu en détail, avec des exemples.",
      "J'ai répondu là où d'autres pourront la relire."
    ]),
    q("reference", 5, "situation", "Tu as trouvé une façon de faire qui fait gagner du temps. Que vaut-il mieux faire ?", [
      "La garder pour toi : c'est ton avantage.",
      "En parler si quelqu'un te le demande.",
      "La présenter une fois en réunion.",
      "L'écrire avec ses limites, et la partager."
    ])
  ];
  // Chaque question porte un geste : une phrase courte, a l'infinitif, qui
  // sert a la fois de force, de frein et de case a cocher dans le resultat.
  const gestes = {
    "mindset-1": "Demander pourquoi une règle existe",
    "mindset-2": "Changer d'avis devant un fait, et le dire",
    "mindset-3": "Dire « je ne sais pas », puis revenir avec la réponse",
    "mindset-4": "Faire un premier pas quand quelque chose marche mal",
    "mindset-5": "Demander tout de suite ce que tu ne comprends pas",
    "craft-1": "Montrer ton travail tôt, pour qu'on le critique",
    "craft-2": "Aller chercher toi-même ce que tu veux apprendre",
    "craft-3": "Reprendre ce qui compte, même quand acceptable suffit",
    "craft-4": "Changer ta façon de faire après une critique",
    "craft-5": "Regarder comment les meilleurs font, et comparer",
    "autonomy-1": "Demander à quoi sert une tâche avant de la commencer",
    "autonomy-2": "Demander de l'aide avec le problème et une proposition",
    "autonomy-3": "Décider à ton niveau, puis prévenir",
    "autonomy-4": "Proposer autre chose face à une consigne qui ne tient pas",
    "autonomy-5": "Proposer une solution et une date pour décider",
    "understanding-1": "Parler avec une personne qui utilise ce que tu fais",
    "understanding-2": "Savoir ce que coûte ou rapporte ton travail",
    "understanding-3": "Passer du temps avec un autre métier",
    "understanding-4": "Chercher le vrai problème derrière une demande",
    "understanding-5": "Parler à la personne qui se plaint, pour la comprendre",
    "delivery-1": "Montrer une version pas finie à qui va s'en servir",
    "delivery-2": "Finir quelque chose dont quelqu'un se sert vraiment",
    "delivery-3": "Retirer ce qui peut attendre pour livrer à temps",
    "delivery-4": "Faire essayer une nouveauté en quelques jours",
    "delivery-5": "Livrer ce qui est prêt et utile, puis la suite",
    "ownership-1": "Vérifier après coup si ton travail a servi",
    "ownership-2": "Prévenir d'un retard dès que tu le sais",
    "ownership-3": "Mener un travail de plusieurs mois sans qu'on te surveille",
    "ownership-4": "Réparer une erreur, puis vérifier que ça tient",
    "ownership-5": "Revenir voir un mois plus tard ce que ton travail a changé",
    "systems-1": "Laisser un travail qui continue sans toi",
    "systems-2": "Supprimer une réunion ou une étape qui ne sert plus",
    "systems-3": "Transmettre une tâche que personne d'autre ne sait faire",
    "systems-4": "Supprimer la cause d'un problème qui revient",
    "systems-5": "Vérifier qu'une tâche sert encore avant de l'automatiser",
    "leverage-1": "Faire des choses qui servent sans toi",
    "leverage-2": "Choisir ce que tu arrêtes quand ta semaine est pleine",
    "leverage-3": "Réutiliser ce qui existe au lieu de repartir de zéro",
    "leverage-4": "Chercher la cause commune de demandes qui se ressemblent",
    "leverage-5": "Comparer le temps gagné avec ce que coûte un outil",
    "leadership-1": "Laisser quelqu'un essayer, puis en parler ensemble",
    "leadership-2": "Confier un problème plutôt qu'une liste de tâches",
    "leadership-3": "Expliquer ton raisonnement quand tu relis un travail",
    "leadership-4": "Poser des questions pour aider quelqu'un à trouver",
    "leadership-5": "Écouter les raisons de l'autre, puis lui laisser la décision",
    "reference-1": "Voir d'autres reprendre ta façon de travailler",
    "reference-2": "Écrire ta façon de faire pour qu'on l'apprenne sans toi",
    "reference-3": "Écrire ce qu'un échec t'a appris, pour les autres",
    "reference-4": "Répondre là où d'autres pourront relire",
    "reference-5": "Écrire une bonne façon de faire, avec ses limites"
  };
  questions.forEach((question) => { question.geste = gestes[question.id]; });
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
        "title": "L'ownership commence là où la fiche de poste s'arrête",
        "url": "/chapters/01-03-lownership-commence-la-ou-la-fiche-de-poste-sarrete.html",
        "type": "principe"
      },
      {
        "title": "⇄ Personne ne demande deux fois",
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
        "title": "Douze ans d'expérience, ou douze fois la même année",
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
        "title": "Être bloqué est une décision",
        "url": "/chapters/03-04-etre-bloque-est-une-decision.html",
        "type": "diagnostic"
      },
      {
        "title": "⇄ Tu ne peux pas demander de la franchise et garder le dernier mot",
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
        "title": "⇄ L'accès au client est un budget, pas une valeur",
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
        "title": "Shipper crée de l'information",
        "url": "/chapters/05-01-shipper-cree-de-linformation.html",
        "type": "principe"
      },
      {
        "title": "Rapide ne veut pas dire précipité",
        "url": "/chapters/05-02-rapide-ne-veut-pas-dire-precipite.html",
        "type": "pratique"
      },
      {
        "title": "⇄ Le rythme de livraison, c'est une décision que tu as prise",
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
        "title": "Reviens voir un mois plus tard",
        "url": "/chapters/06-02-reviens-voir-un-mois-plus-tard.html",
        "type": "pratique"
      },
      {
        "title": "⇄ Tu demandes des résultats et tu passes en revue de l'activité",
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
        "title": "Supprime l'étape avant de la documenter",
        "url": "/chapters/07-02-supprime-letape-avant-de-la-documenter.html",
        "type": "pratique"
      },
      {
        "title": "Confie un problème, pas une tâche",
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
        "title": "Range-les par cause, pas par sujet",
        "url": "/chapters/08-01-range-les-par-cause-pas-par-sujet.html",
        "type": "diagnostic"
      },
      {
        "title": "Le levier le moins cher est déjà payé",
        "url": "/chapters/08-03-le-levier-le-moins-cher-est-deja-paye.html",
        "type": "principe"
      },
      {
        "title": "⇄ Tu paies des heures, tu obtiens des heures",
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
        "title": "Une relecture qui dit seulement oui n'apprend rien",
        "url": "/chapters/09-04-une-relecture-qui-dit-seulement-oui-napprend-rien.html",
        "type": "principe"
      },
      {
        "title": "Confie un problème, pas une tâche",
        "url": "/chapters/09-03-confie-un-probleme-pas-une-tache.html",
        "type": "pratique"
      },
      {
        "title": "⇄ Tu es la référence qui manque, et tu n'as rien laissé",
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
        "title": "Un avis n'est pas un artefact",
        "url": "/chapters/10-03-un-avis-nest-pas-un-artefact.html",
        "type": "diagnostic"
      },
      {
        "title": "Réponds à la question en public",
        "url": "/chapters/10-05-reponds-a-la-question-en-public.html",
        "type": "pratique"
      },
      {
        "title": "⇄ L'absence de règle est une interdiction",
        "url": "/chapters/10-10-leader-labsence-de-regle-est-une-interdiction.html",
        "type": "systeme"
      }
    ]
  }
];
  // Chaque etape porte sa phrase et un plan « la prochaine fois que… » :
  // le geste que le resultat propose quand c'est l'etape suivante.
  const etapes = {
    mindset: { phrase: "Je rends les choses meilleures",
      plan: "La prochaine fois que quelque chose te gêne, fais un premier petit pas pour l'améliorer dans la journée, puis préviens qui peut agir." },
    craft: { phrase: "Je suis excellent à quelque chose",
      plan: "La prochaine fois que tu termines un travail, montre-le à quelqu'un de plus expérimenté avant de le rendre, et demande-lui une seule chose à améliorer." },
    autonomy: { phrase: "Donne-moi le problème, pas la procédure",
      plan: "La prochaine fois qu'on te confie une tâche, demande à quoi elle sert avant de commencer. Si tu bloques, reviens avec une proposition, pas une question." },
    understanding: { phrase: "Je comprends toute l'entreprise",
      plan: "La prochaine fois qu'on te demande quelque chose, trouve la personne qui en a besoin et demande-lui ce qu'elle essaie de faire." },
    delivery: { phrase: "Je mets des choses dans le réel",
      plan: "La prochaine fois que tu commences quelque chose, montre une première version à quelqu'un qui va s'en servir avant la fin de la semaine." },
    ownership: { phrase: "Je réponds du résultat",
      plan: "La prochaine fois que tu termines un travail, note une date dans un mois pour revenir voir ce qu'il a changé." },
    systems: { phrase: "Je rends la prochaine fois plus facile",
      plan: "La prochaine fois qu'un problème revient une deuxième fois, cherche ce qui le cause avant de le régler encore." },
    leverage: { phrase: "Je multiplie mon impact",
      plan: "La prochaine fois que tu reçois trois demandes qui se ressemblent, cherche leur cause commune avant de répondre à la troisième." },
    leadership: { phrase: "Je fabrique des builders autour de moi",
      plan: "La prochaine fois qu'on te demande de l'aide sur un problème que tu sais régler, pose deux questions avant de donner ta réponse." },
    reference: { phrase: "On apprend de ma façon de travailler",
      plan: "La prochaine fois qu'on te pose une question dont tu connais bien la réponse, écris-la là où d'autres pourront la retrouver." }
  };
  capabilities.forEach((capability) => Object.assign(capability, etapes[capability.id]));
  // Cinq paliers de deux etapes. Chaque texte dit ce que tu fais et ce que tu
  // ne fais pas encore : il doit etre faux pour quelqu'un deux paliers plus loin.
  const paliers = [
    { numero: 1, min: 0, max: 2, nom: "Tu poses les bases",
      texte: "Tu remarques ce qui ne va pas et tu travailles ton métier. Tu attends encore souvent qu'on te dise quoi faire, et pourquoi." },
    { numero: 2, min: 3, max: 4, nom: "Tu avances par toi-même",
      texte: "Tu pars du problème, pas de la consigne, et tu comprends pour qui tu travailles. Ce que tu fais arrive encore rarement jusqu'à de vraies personnes, vite et en entier." },
    { numero: 3, min: 5, max: 6, nom: "Tu livres et tu réponds du résultat",
      texte: "Tu mets des choses dans le réel et tu vérifies ce qu'elles ont changé. Tu règles encore les problèmes un par un, sans rendre la fois suivante plus facile." },
    { numero: 4, min: 7, max: 8, nom: "Tu rends la suite plus facile",
      texte: "Tu supprimes les causes, et ce que tu fais sert à d'autres sans toi. Tu fais encore peu grandir les personnes autour de toi." },
    { numero: 5, min: 9, max: 10, nom: "Tu fais grandir d'autres builders",
      texte: "Tu laisses décider, tu expliques ton raisonnement, et d'autres reprennent ta façon de travailler. Vérifie que tout cela tient quand tu n'es pas là." }
  ];
  const beginner = { title: "Un premier essai utile", url: "/premier-essai/" };
  const templates = { title: "Modèles pour agir et revoir", url: "/modeles/" };
  const method = { title: "Comment fonctionne le test", url: "/methode-du-test/" };
  const intentions = [
    { id: "start", label: "Commencer par un essai utile", anchor: "commencer", resource: beginner,
      guidance: "Un exemple personnel, associatif ou d'apprentissage suffit. Tu peux commencer par préparer une proposition, sans avoir déjà livré un projet." },
    { id: "deepen", label: "Approfondir ma pratique", anchor: "progresser",
      resource: { title: "Améliorer sans tout reprendre", url: "/ameliorer-sa-pratique/" },
      guidance: "Garde ce qui fonctionne déjà. Choisis une limite, un cas plus exigeant ou un retour qui pourrait enrichir ta pratique." },
    { id: "team", label: "Développer les pratiques d'un groupe", anchor: "equipe",
      resource: { title: "Faire tourner ça dans ton équipe", url: "/atelier/" },
      guidance: "Propose à des participants volontaires d'examiner une situation commune. Confirme le temps, les décisions ouvertes et la personne qui peut autoriser l'essai. Chacun peut passer ; les réponses individuelles restent les siennes." },
    { id: "support", label: "Soutenir des builders", anchor: "soutenir",
      resource: { title: "Six semaines pour apprendre ensemble", url: "/apprendre-en-equipe/" },
      guidance: "Demande quel appui serait utile, propose une contribution précise dans tes moyens, et attends l'accord des personnes concernées. Soutenir ne signifie pas prendre la direction de leur travail." }
  ];
  const modeLabels = { revisit: "Revoir une pratique", deepen: "Approfondir un appui", discover: "Préparer un premier essai", blocked: "Clarifier les conditions" };
  const memoryNotice = "Tes réponses ne sont envoyées nulle part. Elles disparaissent quand tu quittes la page, sauf si tu choisis de les garder sur cet appareil. Copie ta piste pour la garder.";

  // Les libelles de l'interface du test.
  const ui = {
    etape: (n, total, nb) => `Étape ${n} sur ${total} · ${nb} questions`,
    progression: "Progression du test",
    consigne: "Réponds pour ce que tu fais vraiment : au travail, en cours, dans une association ou un projet à toi. « Ton métier », c'est ce que tu fais le plus. Si une situation ne s'est pas présentée, dis-le avec les réponses du bas.",
    precedent: "Précédent",
    continuer: "Continuer",
    voirNiveau: "Voir mon niveau",
    reponses: (n, total) => `${n} réponse${n > 1 ? "s" : ""} sur ${total}`,
    resultatTitre: "Ton niveau de builder",
    estimation: {
      titre: "Avant de commencer",
      question: "À ton avis, quelles étapes sont solides dans ta pratique aujourd'hui ?",
      aide: "Coche toutes les étapes solides, à l'instinct. À la fin, le test comparera avec ce que tu as fait.",
      aucune: "Aucune encore",
      nsp: "Je ne sais pas",
      commencer: "Commencer le test"
    },
    ici: "Tu es ici",
    prochaineMarque: "Prochaine étape",
    position: (n, nom) => n ? `Ta pratique est solide jusqu'à l'étape ${n}, ${nom}.` : "Aucune étape n'est encore solide dans tes réponses.",
    prochaine: (n, nom) => `Prochaine étape : ${n}, ${nom}.`,
    sommet: "Tu es en haut de l'échelle.",
    niveau: (numero, total) => `Niveau ${numero} sur ${total}`,
    ecart: {
      trop: (noms) => `Tu pensais solides : ${noms}. Tes réponses ne le montrent pas encore.`,
      pasAssez: (noms) => `Solides dans tes réponses, sans que tu les coches : ${noms}. Tu fais plus que tu ne le crois.`,
      juste: "Tes réponses montrent les étapes que tu avais cochées. Tu te vois juste."
    },
    trou: (nom) => `Plus bas, une étape reste à consolider : ${nom}.`,
    bloquees: (noms) => `Ton cadre a limité ces étapes : ${noms}. Elles ne baissent pas ton niveau.`,
    sansNiveau: "Ton cadre a limité trop d'étapes pour situer un niveau. Ce n'est pas un jugement sur toi, c'est une information sur ton contexte.",
    forcesTitre: "Ce que tu fais déjà",
    reponse: (label) => `Ta réponse : « ${label} »`,
    freinsTitre: (n, nom) => `Ce qui te retient à l'étape ${n}, ${nom}`,
    freinsVides: "La situation ne s'est pas encore présentée.",
    sommetTexte: "Toutes tes étapes sont solides. Le risque, à ce niveau : devenir la personne sans qui rien n'avance. Vérifie que ce que tu transmets tient sans toi.",
    dejaLa: (n, total) => `${n} sur ${total} déjà là.`,
    fait: "fait",
    pasEncore: "pas encore",
    gesteTitre: "Ton prochain geste",
    carteLiee: "La carte du livre qui va avec",
    copierGeste: "Copier mon geste",
    pisteComplete: "Voir la piste complète →",
    retourTitre: "Reviens dans trois mois",
    retourTexte: (date) => `Repasse le test vers le ${date}. D'ici là, surveille ces gestes :`,
    retourEcran: (date) => `Repasse le test vers le ${date}. D'ici là, travaille les gestes pas encore cochés.`,
    retourSansGestes: (date) => `Repasse le test vers le ${date} pour voir ce qui a bougé.`,
    depuisTitre: "Depuis ton dernier passage",
    depuis: (date, avant, apres) => {
      const etape = (n) => n ? `jusqu'à l'étape ${n}` : "sur aucune étape";
      if (apres > avant) return `Le ${date}, ta pratique était solide ${etape(avant)}. Elle l'est maintenant ${etape(apres)}.`;
      if (apres < avant) return `Le ${date}, ta pratique était solide ${etape(avant)}. Tes réponses d'aujourd'hui la placent ${etape(apres)}.`;
      return `Le ${date}, ta pratique était déjà solide ${etape(avant)}. Pas de changement d'étape pour l'instant.`;
    },
    gagnes: "Gestes devenus habituels depuis :",
    garder: "Garder mes réponses sur cet appareil, pour voir ce qui a bougé au prochain passage. Rien n'est envoyé.",
    prudence: "Ce niveau décrit ce que tu as fait ces derniers mois, pas ton talent. Ses seuils sont provisoires.",
    carteTitre: "Voir tes dix étapes et choisir une autre piste",
    statuts: { solid: "Solide", partial: "En cours", open: "À travailler", unseen: "Pas rencontrée", blocked: "Limitée par ton cadre" },
    directions: {
      solid: "Tu le fais souvent. Tu peux l'approfondir ou le transmettre.",
      partial: "Tu le fais parfois. Un cas concret de plus peut le rendre solide.",
      open: "Tu le fais encore peu. Un premier ajustement suffit pour commencer.",
      unseen: "Ces situations ne se sont pas encore présentées. Commence par un exemple ou un premier essai.",
      blocked: "Ton cadre a limité ces situations. Tu peux commencer par clarifier les conditions."
    },
    pistesTitre: "Choisis une piste",
    intentionLegende: "Pour adapter la suite, que veux-tu faire ?",
    explorer: "Explorer cette piste →",
    clarifier: "Clarifier les conditions →",
    revoir: "Revoir les réponses",
    planLede: "Une proposition à adapter à ta situation. Elle ne change pas ton niveau.",
    troisCartes: "Trois cartes pour aller plus loin",
    lire: "Lire →",
    autrePiste: "Revenir à mon niveau",
    copier: "Copier ma piste",
    copierLabel: "Texte de ta piste à copier",
    copiee: "Piste copiée.",
    copieEchouee: "La copie automatique n'a pas abouti. Sélectionne et copie le texte ci-dessous."
  };

  const textes = {
    titre: (nom) => `Une piste que tu as choisie : ${nom}`,
    raison: (nom, mode) => `Tu as choisi l'étape « ${nom} » : ${mode}. Voici une proposition à adapter à ta situation.`,
    actions: {
      revisit: "Pars d'un exemple récent. Choisis un seul ajustement à proposer ou à essayer dans ton périmètre.",
      deepen: "Pars de ce qui t'aide déjà. Avec une personne volontaire, examine une limite ou un autre cas où cette pratique pourrait demander une adaptation.",
      discover: "Lis d'abord un exemple construit. Prépare ensuite cette pratique sur une situation personnelle ou fictive. Si un essai réel est possible, limite-le avec les personnes concernées.",
      blocked: "Commence par la condition manquante avant d'essayer de changer la pratique. Lis la carte sur les conditions, puis prépare une demande précise si tu peux la porter."
    },
    observations: {
      revisit: "Quel fait permettrait de voir si cet ajustement aide ? Conviens d'un retour et arrête ou réduis l'essai si ses conditions ne tiennent plus.",
      deepen: "Note ce qui reste utile et ce qui change dans cet autre cas. Une observation contraire est un apprentissage, pas une perte de niveau.",
      discover: "Distingue ce que l'exercice t'a aidé à formuler de ce qui a été observé en situation réelle. Tu peux terminer après la lecture ou la préparation.",
      blocked: "Observe si un accord ou un appui concret arrive. Sans lui, garde la proposition en attente, réduis-la avec accord ou suspends-la. Un refus ne mesure pas ta capacité."
    },
    champs: {
      sujet: "Sujet à adapter à ton exemple",
      geste: "Prochain geste",
      parcours: "Dans ton parcours",
      conditions: "Conditions et accord",
      temps: "Temps et travail déplacé",
      observation: "Observation et retour",
      fin: "Fin ou relais"
    },
    conditionsBloque: "Quelle condition faudrait-il clarifier avant de poursuivre : du temps, un accès, un accord, un appui ? Tu peux la nommer pour toi, sans la saisir ici.",
    conditionsGenerales: "Clarifie ce qui dépend de toi et ce qui demande un accord avant d'essayer. Une proposition n'est pas encore une autorisation.",
    tempsTexte: "Choisis une durée réaliste, ce qu'elle déplace et une date de retour adaptée. Si cela ne tient pas dans le temps disponible, réduis ou reporte l'essai.",
    finTexte: "Clarifie qui décide de poursuivre et qui accepte la suite. Tu n'as pas à assurer un suivi indéfini.",
    lectures: "Lectures : une seule carte peut suffire",
    disclaimer: "Cette piste est une suggestion de lecture et de pratique. Ton niveau, lui, vient de tes réponses et reste provisoire."
  };
  const contenu = { questions, capabilities, recence, horsEchelle, paliers, intentions, modeLabels,
    memoryNotice, beginner, templates, method, textes, ui };
  if (typeof module !== "undefined" && module.exports) module.exports = contenu;
  else scope.BuilderTestContenu = contenu;
})(globalThis);
