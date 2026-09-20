// Les questions du test du builder. Fichier produit, ne pas modifier ici.
//
//   source  : docs/questions-test-du-builder.md
//   produit : bin/questions-vers-js
//
// Les valeurs sont provisoires tant que la notation par les praticiens n'a
// pas eu lieu. L'ordre des options est celui du brouillon ; le test le tire
// au hasard à l'affichage.

window.QUESTIONS = [
  {
    "facette": "laisse",
    "etape": 0,
    "type": "situation",
    "enonce": "Tu es absent plusieurs jours d'affilée. Qu'est-ce qui se passe pendant ce temps ?",
    "options": [
      {
        "t": "Plusieurs sujets attendent mon retour, et je rattrape la semaine suivante.",
        "v": 0
      },
      {
        "t": "On m'appelle une ou deux fois pour des décisions qui ne peuvent pas attendre.",
        "v": 1
      },
      {
        "t": "Presque tout continue, sauf ce qui demande un arbitrage de ma part.",
        "v": 2
      },
      {
        "t": "Tout continue, et j'apprends au retour des décisions prises sans moi.",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 7,
    "type": "situation",
    "enonce": "Le même incident revient pour la deuxième fois en un mois.",
    "options": [
      {
        "t": "Je le règle comme la première fois, c'est plus rapide que d'en faire une affaire.",
        "v": 0
      },
      {
        "t": "Je le règle et je préviens l'équipe que ça s'est reproduit une deuxième fois.",
        "v": 1
      },
      {
        "t": "Je le règle, puis j'écris la procédure pour que le prochain aille plus vite.",
        "v": 2
      },
      {
        "t": "Je cherche l'étape qui le produit, et je la supprime plutôt que de la documenter.",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 7,
    "type": "situation",
    "enonce": "Une tâche manuelle revient chaque lundi depuis six mois.",
    "options": [
      {
        "t": "Je la fais, elle prend vingt minutes et tout le monde a l'habitude comme ça.",
        "v": 0
      },
      {
        "t": "Je la fais, et je note quelque part qu'il faudrait l'automatiser un jour.",
        "v": 1
      },
      {
        "t": "Je l'automatise pour moi, et je garde le script sur mon poste au cas où.",
        "v": 2
      },
      {
        "t": "Je vérifie qu'elle sert encore, puis je l'automatise là où l'équipe la trouve.",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 8,
    "type": "situation",
    "enonce": "Trente demandes du même type arrivent chaque semaine dans ta file.",
    "options": [
      {
        "t": "Je les traite au fil de l'eau, c'est le travail et quelqu'un doit le faire.",
        "v": 0
      },
      {
        "t": "Je demande une personne de plus pour absorber le volume qui arrive chaque semaine.",
        "v": 1
      },
      {
        "t": "Je prépare un modèle de réponse pour traiter plus vite les cas les plus fréquents.",
        "v": 2
      },
      {
        "t": "Je les range par cause, et je traite celle qui en supprime le plus.",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 8,
    "type": "situation",
    "enonce": "Un outil te ferait gagner une heure par semaine, mais personne ne l'a demandé.",
    "options": [
      {
        "t": "J'attends qu'on le priorise, ce n'est pas à moi de décider ce qu'on construit.",
        "v": 0
      },
      {
        "t": "Je le propose en réunion, et je verrai bien ce que l'équipe en dit.",
        "v": 1
      },
      {
        "t": "Je le construis vite fait pour moi, et j'en parle si quelqu'un le remarque.",
        "v": 2
      },
      {
        "t": "Je le construis en petit, je mesure l'heure gagnée, et j'apporte le chiffre.",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 9,
    "type": "situation",
    "enonce": "Quelqu'un de ton équipe t'apporte la même question pour la troisième fois.",
    "options": [
      {
        "t": "Je réponds, c'est plus rapide que d'expliquer et ça débloque tout de suite.",
        "v": 0
      },
      {
        "t": "Je réponds, et je lui dis de revenir autant de fois qu'il en aura besoin.",
        "v": 1
      },
      {
        "t": "Je réponds, et je lui envoie la documentation qui contient déjà la réponse.",
        "v": 2
      },
      {
        "t": "Je lui demande comment il chercherait, et je corrige ce qui l'a empêché de trouver.",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 9,
    "type": "situation",
    "enonce": "Tu confies un sujet à quelqu'un de moins expérimenté, et la première version te déçoit.",
    "options": [
      {
        "t": "Je la reprends moi-même, on n'a pas le temps de recommencer sur ce sujet.",
        "v": 0
      },
      {
        "t": "Je liste ce qu'il faut changer, et je lui demande d'appliquer la liste ligne à ligne.",
        "v": 1
      },
      {
        "t": "Je corrige avec lui, en expliquant chaque changement au fur et à mesure.",
        "v": 2
      },
      {
        "t": "Je lui rends le problème avec ce qui manque, et je le laisse décider.",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 10,
    "type": "situation",
    "enonce": "Tu viens de régler un problème que personne dans l'équipe n'avait su régler.",
    "options": [
      {
        "t": "Je passe à la suite, c'est réglé et le reste attend depuis trop longtemps.",
        "v": 0
      },
      {
        "t": "Je raconte en réunion comment j'ai fait, ceux qui écoutent en profiteront.",
        "v": 1
      },
      {
        "t": "J'écris une note interne, dans l'espace où l'équipe range ce genre de chose.",
        "v": 2
      },
      {
        "t": "J'écris ce qui m'a trompé et la démarche, là où quelqu'un cherchera plus tard.",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 10,
    "type": "situation",
    "enonce": "On te pose en privé une question que d'autres se posent sûrement aussi.",
    "options": [
      {
        "t": "Je réponds en privé, c'est plus simple et la personne a sa réponse.",
        "v": 0
      },
      {
        "t": "Je réponds en privé, et je propose d'en reparler si d'autres sont bloqués.",
        "v": 1
      },
      {
        "t": "Je réponds dans le canal de l'équipe, pour que la réponse serve ailleurs.",
        "v": 2
      },
      {
        "t": "Je réponds là où on cherchera dans six mois, avec le raisonnement.",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 8,
    "type": "evenement",
    "enonce": "Ces trois derniers mois, combien de fois quelqu'un a-t-il utilisé quelque chose que tu as construit ou écrit, sans avoir eu besoin de te le demander ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une ou deux fois",
        "v": 1
      },
      {
        "t": "trois à cinq fois",
        "v": 2
      },
      {
        "t": "plus de cinq fois",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 9,
    "type": "evenement",
    "enonce": "Ces six derniers mois, combien de personnes ont pris sans te consulter une décision que tu aurais prise toi-même, et que tu as trouvée bonne ?",
    "options": [
      {
        "t": "aucune",
        "v": 0
      },
      {
        "t": "une",
        "v": 1
      },
      {
        "t": "deux ou trois",
        "v": 2
      },
      {
        "t": "plus de trois",
        "v": 3
      }
    ]
  },
  {
    "facette": "laisse",
    "etape": 10,
    "type": "evenement",
    "enonce": "Ces six derniers mois, combien de fois quelqu'un que tu n'as pas formé t'a-t-il dit s'être appuyé sur quelque chose que tu as écrit ou publié ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une fois",
        "v": 1
      },
      {
        "t": "deux ou trois fois",
        "v": 2
      },
      {
        "t": "plus de trois fois",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 1,
    "type": "situation",
    "enonce": "Une règle interne ralentit tout le monde depuis des mois. Personne ne t'a demandé de la changer.",
    "options": [
      {
        "t": "Je m'y adapte, elle ne relève pas de moi et quelqu'un a eu ses raisons.",
        "v": 0
      },
      {
        "t": "Je la signale à mon responsable les jours où elle me bloque vraiment.",
        "v": 1
      },
      {
        "t": "Je propose une correction à la personne qui en a la charge, puis j'attends.",
        "v": 2
      },
      {
        "t": "Je corrige la part réversible, je montre le résultat, et je demande le reste.",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 1,
    "type": "situation",
    "enonce": "En réunion, un terme important t'échappe alors que les autres semblent le comprendre.",
    "options": [
      {
        "t": "Je laisse passer, je ne vais pas ralentir tout le monde pour un seul mot.",
        "v": 0
      },
      {
        "t": "Je le cherche discrètement après la réunion, ça évite d'exposer mon ignorance devant tous.",
        "v": 1
      },
      {
        "t": "Je demande une définition à la fin, quand la discussion est déjà retombée.",
        "v": 2
      },
      {
        "t": "Je demande tout de suite, et je vérifie qu'on parle bien du même sens.",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 1,
    "type": "situation",
    "enonce": "Quelqu'un démontre devant l'équipe que ton idée centrale est fausse.",
    "options": [
      {
        "t": "J'explique le contexte dans lequel elle était raisonnable au moment du choix.",
        "v": 0
      },
      {
        "t": "Je cesse d'en parler et je passe à autre chose sans en faire une histoire.",
        "v": 1
      },
      {
        "t": "Je reconnais l'erreur et je corrige la décision dans la foulée.",
        "v": 2
      },
      {
        "t": "Je corrige, je dis ce qui m'a trompé, et j'ajoute le contrôle qui manquait.",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 2,
    "type": "situation",
    "enonce": "Tu résous un problème nouveau pour ton équipe.",
    "options": [
      {
        "t": "J'essaie jusqu'à trouver quelque chose qui marche, c'est le résultat qui compte.",
        "v": 0
      },
      {
        "t": "Je demande à la personne la plus expérimentée ici comment elle ferait.",
        "v": 1
      },
      {
        "t": "Je lis la documentation et je m'appuie sur des exemples reconnus.",
        "v": 2
      },
      {
        "t": "Je remonte aux sources d'origine, je compare deux approches, je garde la trace.",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 2,
    "type": "situation",
    "enonce": "Ton travail fonctionne, mais tu sens que tu ne progresses plus.",
    "options": [
      {
        "t": "C'est normal après quelques années, la courbe s'aplatit pour à peu près tout le monde.",
        "v": 0
      },
      {
        "t": "J'attends un projet plus difficile, c'est ce qui relance l'apprentissage d'habitude.",
        "v": 1
      },
      {
        "t": "Je choisis une compétence précise et je l'approfondis dans mon coin, à mon rythme.",
        "v": 2
      },
      {
        "t": "Je cherche une pratique exigeante dehors, je produis, et je demande une critique.",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 3,
    "type": "situation",
    "enonce": "Tu es bloqué depuis deux heures par une dépendance extérieure.",
    "options": [
      {
        "t": "J'attends la réponse et je signale le blocage si on me demande où j'en suis.",
        "v": 0
      },
      {
        "t": "Je relance avec plus de détails, puis je prends une autre tâche en attendant.",
        "v": 1
      },
      {
        "t": "Je documente ce qui manque exactement et je propose une date de décision.",
        "v": 2
      },
      {
        "t": "Je nomme la décision qui manque, j'essaie une voie réversible, je remonte deux options.",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 3,
    "type": "situation",
    "enonce": "Un ticket décrit précisément une solution qui ne semble pas résoudre le problème.",
    "options": [
      {
        "t": "Je livre ce qui est écrit, la décision a été prise bien au-dessus de moi.",
        "v": 0
      },
      {
        "t": "Je demande qu'on réécrive le ticket avant que je commence quoi que ce soit.",
        "v": 1
      },
      {
        "t": "J'explique mon doute avant de commencer, puis je livre ce qui est décidé.",
        "v": 2
      },
      {
        "t": "Je vérifie le problème avec des faits, je propose une autre coupe.",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 3,
    "type": "situation",
    "enonce": "En réalisant une tâche, tu découvres une cause plus profonde.",
    "options": [
      {
        "t": "Je finis la tâche, le reste dépasse largement ce qu'on m'a demandé.",
        "v": 0
      },
      {
        "t": "Je le mentionne à l'oral si j'y repense au moment du point d'équipe.",
        "v": 1
      },
      {
        "t": "Je livre, puis j'ajoute la découverte dans le suivi pour plus tard.",
        "v": 2
      },
      {
        "t": "Je livre, j'apporte les preuves de la cause, et je propose la décision suivante.",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 1,
    "type": "evenement",
    "enonce": "Ces trois derniers mois, combien de fois as-tu changé quelque chose qui te gênait, sans qu'on te l'ait demandé ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une ou deux fois",
        "v": 1
      },
      {
        "t": "trois à cinq fois",
        "v": 2
      },
      {
        "t": "plus de cinq fois",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 2,
    "type": "evenement",
    "enonce": "Ces six derniers mois, combien de fois es-tu remonté à une source d'origine (le code, la documentation d'origine, le texte de référence) plutôt qu'à un résumé ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une ou deux fois",
        "v": 1
      },
      {
        "t": "trois à cinq fois",
        "v": 2
      },
      {
        "t": "plus de cinq fois",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 2,
    "type": "evenement",
    "enonce": "Ces six derniers mois, combien de fois quelqu'un d'extérieur à ton entreprise a-t-il critiqué un travail que tu lui as montré ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une fois",
        "v": 1
      },
      {
        "t": "deux ou trois fois",
        "v": 2
      },
      {
        "t": "plus de trois fois",
        "v": 3
      }
    ]
  },
  {
    "facette": "lance",
    "etape": 3,
    "type": "evenement",
    "enonce": "Ces trois derniers mois, combien de fois as-tu changé la solution demandée après avoir vérifié le problème ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une ou deux fois",
        "v": 1
      },
      {
        "t": "trois à cinq fois",
        "v": 2
      },
      {
        "t": "plus de cinq fois",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 4,
    "type": "situation",
    "enonce": "Une équipe demande une fonctionnalité urgente pour un client important.",
    "options": [
      {
        "t": "Je la priorise, c'est un client important et l'urgence vient directement de sa part.",
        "v": 0
      },
      {
        "t": "Je demande une spécification plus détaillée avant d'engager le moindre travail dessus.",
        "v": 1
      },
      {
        "t": "Je demande quel problème le client cherche vraiment à résoudre avec cette demande.",
        "v": 2
      },
      {
        "t": "Je parle à la personne concernée, et je sépare le besoin de la solution.",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 4,
    "type": "situation",
    "enonce": "Ton choix améliore le produit mais complique beaucoup le travail du support.",
    "options": [
      {
        "t": "Le support s'adaptera, c'est un ajustement à faire une fois la livraison passée.",
        "v": 0
      },
      {
        "t": "J'envoie une documentation au support pour qu'il soit prêt le jour de la sortie.",
        "v": 1
      },
      {
        "t": "J'invite le support à la revue avant la livraison, pour qu'il se prononce.",
        "v": 2
      },
      {
        "t": "Je chiffre le coût pour eux, j'observe leurs cas, et je change ou j'assume.",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 4,
    "type": "situation",
    "enonce": "On te demande combien rapporte ce que tu construis en ce moment.",
    "options": [
      {
        "t": "Ce n'est pas mon métier, d'autres suivent les chiffres dans cette entreprise.",
        "v": 0
      },
      {
        "t": "Je donne l'objectif qu'on m'a communiqué au lancement du projet, il y a longtemps.",
        "v": 1
      },
      {
        "t": "Je donne l'ordre de grandeur, je sais à peu près où le chiffre se situe.",
        "v": 2
      },
      {
        "t": "Je donne le chiffre, sa source, et ce qui le ferait bouger.",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 5,
    "type": "situation",
    "enonce": "Tu construis depuis trois semaines et rien n'est encore entre les mains de quelqu'un.",
    "options": [
      {
        "t": "Je préfère montrer quand ce sera propre, une version bancale donne une mauvaise image.",
        "v": 0
      },
      {
        "t": "Je montre une maquette à l'équipe pour valider la direction prise jusqu'ici.",
        "v": 1
      },
      {
        "t": "Je fais une démonstration interne pour récolter des retours avant la vraie sortie.",
        "v": 2
      },
      {
        "t": "Je coupe une part utilisable et je la mets devant un usage réel.",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 5,
    "type": "situation",
    "enonce": "La livraison de vendredi est prête, sauf un détail d'affichage.",
    "options": [
      {
        "t": "Je repousse à lundi, autant livrer quelque chose de complètement fini et propre.",
        "v": 0
      },
      {
        "t": "Je corrige le détail dans la nuit, quitte à livrer fatigué le lendemain matin.",
        "v": 1
      },
      {
        "t": "Je livre, et j'ouvre un suivi pour le détail en prévenant l'équipe.",
        "v": 2
      },
      {
        "t": "Je livre, je regarde si le détail gêne réellement quelqu'un, et je décide.",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 6,
    "type": "situation",
    "enonce": "Tu as livré il y a un mois. Personne ne t'a rien dit depuis.",
    "options": [
      {
        "t": "Pas de nouvelle, bonne nouvelle, et la file est déjà pleine pour la suite.",
        "v": 0
      },
      {
        "t": "Je demande au passage si les gens en sont contents, quand j'en croise.",
        "v": 1
      },
      {
        "t": "Je regarde les chiffres d'usage pour voir si la fonctionnalité a pris.",
        "v": 2
      },
      {
        "t": "Je retourne voir, j'écris ce qui s'est passé, et je porte la décision suivante.",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 6,
    "type": "situation",
    "enonce": "Une décision que tu as poussée a donné un mauvais résultat.",
    "options": [
      {
        "t": "Les conditions ont changé en cours de route, personne ne pouvait le prévoir.",
        "v": 0
      },
      {
        "t": "Je laisse l'équipe en tirer les leçons, ça ne sert à rien de s'appesantir.",
        "v": 1
      },
      {
        "t": "Je reconnais le mauvais résultat en réunion et je propose de revenir en arrière.",
        "v": 2
      },
      {
        "t": "Je l'écris, je dis ce que j'avais mal vu, et je porte la correction.",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 6,
    "type": "situation",
    "enonce": "Un travail que tu as commencé change de main avant d'être fini.",
    "options": [
      {
        "t": "Ce n'est plus mon sujet, la personne qui reprend fera ses propres choix.",
        "v": 0
      },
      {
        "t": "Je transmets mes fichiers et je reste disponible si on me pose des questions.",
        "v": 1
      },
      {
        "t": "Je fais une passation, j'explique le contexte et les choix déjà faits.",
        "v": 2
      },
      {
        "t": "Je passe le problème et les impasses, et je reviens voir le résultat.",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 4,
    "type": "evenement",
    "enonce": "Ces trois derniers mois, combien de fois as-tu parlé directement à quelqu'un qui utilise ce que tu construis ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une ou deux fois",
        "v": 1
      },
      {
        "t": "trois à cinq fois",
        "v": 2
      },
      {
        "t": "plus de cinq fois",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 5,
    "type": "evenement",
    "enonce": "Ces trois derniers mois, combien de fois as-tu mis quelque chose devant un usage réel en moins de deux semaines ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une ou deux fois",
        "v": 1
      },
      {
        "t": "trois à cinq fois",
        "v": 2
      },
      {
        "t": "plus de cinq fois",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 6,
    "type": "evenement",
    "enonce": "Ces six derniers mois, combien de fois es-tu retourné voir le résultat d'une livraison un mois après ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une ou deux fois",
        "v": 1
      },
      {
        "t": "trois à cinq fois",
        "v": 2
      },
      {
        "t": "plus de cinq fois",
        "v": 3
      }
    ]
  },
  {
    "facette": "ferme",
    "etape": 6,
    "type": "evenement",
    "enonce": "Ces six derniers mois, combien de fois as-tu écrit qu'une de tes décisions avait donné un mauvais résultat ?",
    "options": [
      {
        "t": "jamais",
        "v": 0
      },
      {
        "t": "une fois",
        "v": 1
      },
      {
        "t": "deux ou trois fois",
        "v": 2
      },
      {
        "t": "plus de trois fois",
        "v": 3
      }
    ]
  }
];

window.MARGE = [
  {
    "enonce": "Peux-tu changer quelque chose dans ta façon de travailler sans demander la permission ?",
    "options": [
      "non, jamais",
      "pour des détails",
      "pour la plupart des choses",
      "oui, y compris sur ce qui compte"
    ]
  },
  {
    "enonce": "As-tu une part de travail entière, du début jusqu'à un résultat que tu peux voir ?",
    "options": [
      "non, je reçois des morceaux",
      "rarement",
      "souvent",
      "oui, la plupart du temps"
    ]
  },
  {
    "enonce": "Ici, quand quelqu'un signale un problème, qu'est-ce qui lui arrive le plus souvent ?",
    "options": [
      "on lui reproche de l'avoir remonté",
      "on lui demande de le régler seul",
      "on prend note et ça avance",
      "on cherche ce qui l'a produit"
    ]
  },
  {
    "enonce": "Sur une semaine normale, combien de ton temps n'est pas déjà pris par ce qu'on attend de toi ?",
    "options": [
      "rien",
      "quelques minutes",
      "quelques heures",
      "une journée ou plus"
    ]
  }
];
