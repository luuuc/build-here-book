# Le test du builder, refonte

Note de conception. Elle décrit le test à construire, pas celui qui tourne
aujourd'hui. L'annexe `a2-comment-fonctionne-le-test.md` décrit le test en
ligne et devra être réécrite le jour où celui-ci le remplace, pas avant : le
livre ne documente pas une version qui n'existe pas.

Les décisions ci-dessous s'appuient sur quatre recherches menées en septembre
2026. Les sources sont en fin de note.

---

## 1. Ce que le test mesure

**Le test ne mesure pas la personne. Il mesure le travail.**

C'est la décision dont tout le reste découle. Un test qui note quelqu'un glisse
vers le type de personnalité même sans étiquette : le lecteur se demande ce
qu'il est. Un test qui mesure ce que le travail exige encore de la présence de
son auteur pose une question vérifiable, et c'est déjà la thèse du livre.

Une seule ligne, de 0 à 100 : **combien de ton travail continue sans toi**.

Le mot « passager » vit dans le texte. Il ne devient jamais un résultat. Pas de
type, pas d'archétype, pas de nom de quadrant, pas d'animal.

Cette décision règle aussi l'objection du travail contraint. Si le score est
une propriété du travail, un score bas dans un poste qui n'accorde aucune marge
est un fait sur le poste. Hackman et Oldham sont formels sur ce point : leur
score motivationnel multiplie par l'autonomie, donc un poste qui n'en donne
aucune tombe à zéro quels que soient les efforts de la personne.

## 2. Ce que le test ne fait pas

- Il ne donne pas de type, parce que les types ne résistent pas aux données :
  sur 317 études taxométriques, les structures continues l'emportent environ
  cinq contre une, et environ la moitié des personnes changent de type MBTI en
  cinq semaines.
- Il ne donne pas de percentile au lancement. Un percentile demande un
  échantillon de référence, et le nôtre sera composé de lecteurs d'un livre sur
  la construction, donc déjà déplacé vers le haut. Le jour où il y en aura un,
  la phrase sera « parmi les personnes qui ont passé ce test », jamais
  « parmi les gens ».
- Il ne prédit pas la réussite, le salaire ni la performance. Cette affirmation
  demanderait une étude de critère qu'on n'a pas faite.
- Il ne sert ni au recrutement, ni à l'évaluation d'un collaborateur.

## 3. La structure

**Dix étapes comme carte du livre, trois facettes comme mesure.**

Dix scores de trois questions ne mesurent rien de fiable. Trois questions à
quatre options ne produisent que dix valeurs possibles, avec une erreur de
mesure plus large que les écarts entre étapes : le classement des dix scores
est donc en grande partie du bruit, et c'est exactement ce dont dépend la règle
actuelle des prérequis.

Les trois facettes, douze questions chacune :

| Facette | Étapes | Ce qu'elle mesure |
|---|---|---|
| Ce que tu lances | 1, 2, 3 | tu pars du problème au lieu d'attendre la tâche |
| Ce que tu fermes | 4, 5, 6 | tu vas jusqu'au résultat et tu en réponds |
| Ce que tu laisses | 7, 8, 9, 10 | quelque chose continue sans toi |

Cette découpe suit la structure validée de Griffin, Neal et Parker : proficiency,
adaptivity, proactivity, croisées avec soi, l'équipe et l'organisation.

Les dix étapes restent la carte du livre et servent à recommander les cartes.
Elles ne sont plus des scores.

## 4. Les questions

**Trente-six questions notées**, vingt-cinq situations et onze événements,
plus quatre questions de marge non notées. Environ huit minutes.

### Les situations

Format : jugement situationnel à tendance comportementale. L'instruction est
**« que ferais-tu »**, jamais « quelle est la meilleure réponse ». La seconde
se coache, corrèle surtout avec le raisonnement abstrait et se falsifie plus
facilement, sans gagner en validité prédictive.

Quatre règles d'écriture, par ordre d'effet :

1. **L'ordre des options est tiré au hasard à chaque affichage.** Aujourd'hui
   les options vont de la pire à la meilleure, et la bonne se repère à sa
   longueur : la quatrième est systématiquement la plus détaillée. Un lecteur
   repère le motif en deux questions, et à partir de là le test mesure sa
   politesse.
2. **Les quatre options ont une longueur comparable**, à quelques mots près, et
   restent plausibles. Aucune ne doit être visiblement la réponse attendue.
3. **Chaque option porte une valeur de 0 à 3** attachée à l'option, pas à sa
   position. La valeur vient d'une notation par plusieurs praticiens
   expérimentés, moyennée — c'est la méthode défendable quand on n'a pas de
   critère de performance à corréler.
4. **Chaque question porte son étape** (1 à 10). C'est ce qui permet la
   recommandation de cartes sans scorer dix échelles.

Exemple, étape 3. La version actuelle :

> Tu es bloqué depuis deux heures par une dépendance extérieure.
> - J'attends une réponse. *(0)*
> - Je relance avec le même message. *(1)*
> - Je documente le blocage et cherche une autre tâche. *(2)*
> - Je formule la décision manquante, teste une voie réversible et escalade avec des options. *(3)*

La même, réécrite, à afficher dans un ordre tiré au hasard :

> Tu es bloqué depuis deux heures par une dépendance extérieure.
> - J'attends la réponse et je signale le blocage si on me demande où j'en suis. *(0)*
> - Je relance avec plus de détails, puis je prends une autre tâche en attendant. *(1)*
> - Je documente ce qui manque exactement et je propose une date de décision. *(2)*
> - Je nomme la décision qui manque, j'essaie une voie réversible et je remonte deux options. *(3)*

### Les événements

Douze questions sur un fait compté, dans une fenêtre de temps. C'est le format
le plus difficile à flatter, parce qu'il demande un souvenir et non un accord.

> Ces trois derniers mois, combien de fois quelqu'un a-t-il utilisé quelque
> chose que tu as construit ou écrit, sans avoir eu besoin de te le demander ?
> jamais *(0)* · une ou deux fois *(1)* · trois à cinq fois *(2)* · plus de cinq fois *(3)*

Les repères doivent être comptables et neutres : des repères hauts tirent les
réponses vers le haut.

Une question porte la thèse et mérite d'ouvrir le test :

> La dernière fois que tu as été absent une semaine entière, qu'est-ce qui
> s'est arrêté ?

### La marge, hors score

Quatre questions sur ce que le poste autorise, **jamais comptées dans le
score** et jamais présentées comme un second axe. Deux axes coupés en seuils
redonnent des quadrants, c'est-à-dire des types : c'est ce qui a coulé le
modèle de followership de Kelley.

Elles couvrent : la latitude de changer quelque chose sans permission, le fait
d'avoir une part de travail entière jusqu'à un résultat visible, ce qui arrive
ici à quelqu'un qui signale un problème (repris de Westrum), et le temps qui
n'est pas déjà pris.

Elles servent à une seule phrase du résultat, qui oriente la recommandation :
soit la contrainte est dans le poste, et le livre renvoie vers les cartes
leader et la version équipe ; soit elle est dans la posture, et il renvoie vers
les pratiques.

## 5. Le calcul

- Score brut : somme des trente-six valeurs, sur 108, ramenée à 100.
- Trois scores de facette, calculés de la même façon sur douze questions.
- **Aucun seuil.** Le seuil à 57 % disparaît : un seuil ne se défend que s'il
  est attaché à un résultat observé. La règle des prérequis disparaît avec lui.
- **Aucun score ponctuel affiché.** Le résultat donne une bande de dix points
  (« entre 55 et 65 »), jamais un nombre seul. La largeur de cette bande est
  une prudence éditoriale tant qu'on n'a pas mesuré la fidélité test-retest ;
  elle sera remplacée par une vraie erreur de mesure quand les données le
  permettront, et la note le dira.
- La recommandation de cartes vient des questions, pas d'un score : on prend
  les situations où la personne s'est placée à 0 ou 1, on les groupe par étape,
  et on retient l'étape la plus chargée. À égalité, l'étape la plus basse
  l'emporte, ce qui applique l'hypothèse du livre sans la déguiser en mesure.

## 6. Le résultat, dans cet ordre

1. **La mesure**, en bande, avec une phrase qui décrit cette zone.
2. **L'épreuve d'absence** : ce qui s'arrêterait et ce qui continuerait si tu
   partais deux semaines. Une prédiction que le lecteur peut confronter au réel.
3. **Tes réponses, citées.** Les deux ou trois situations qui ont produit ce
   verdict, avec l'option choisie. C'est ce qui rend le résultat opposable.
4. **La marge** que ton poste te laisse, en une phrase.
5. **Une pratique cette semaine**, puis trois cartes.
6. **Le rendez-vous** : repasse le test dans trois mois.
7. **Le livre.**

Règle d'écriture pour chaque description de zone : **elle doit être fausse pour
quelqu'un situé trente points plus loin.** Sinon c'est l'effet Barnum, et le
lecteur qui se reconnaît ne prouve rien — c'est un effet démontré depuis 1949,
y compris sur des descriptions MBTI.

Le rendez-vous est le produit. 16personalities donne une identité qu'on garde ;
on donne une mesure qu'on déplace. Le livre le dit déjà : le résultat n'est pas
une identité.

Conséquence assumée : **ça se partagera moins bien.** Quatre lettres se collent
dans une biographie, pas une bande de continuité. Le partageable ici est la
question, et pour ceux qui repassent, l'écart.

## 7. Ce qu'on peut écrire, et ce qu'on ne peut pas

On peut écrire que le test est un test de jugement situationnel à instruction
comportementale, avec une clé notée par des praticiens, qu'il rend un continuum
et non un type, et qu'il affiche sa propre imprécision. Une fois mesurés, on
pourra publier l'alpha et la corrélation test-retest.

On ne peut pas écrire qu'il prédit quoi que ce soit, tant qu'aucune étude de
critère n'a été faite. La version la moins chère d'une telle étude : un courriel
six mois plus tard avec une seule question de résultat concret, corrélée au
score.

La méthode se publie. La clé de notation, non.

## 8. Les données

Ce qui quitte le navigateur, dans la version 2 : la version du questionnaire,
les réponses question par question, les trois scores de facette, le score
global et l'étape recommandée. Les réponses individuelles deviennent
nécessaires : sans elles, aucune statistique d'item, aucun alpha, aucune erreur
de mesure, donc aucune bande honnête.

Trois conditions pour que ça reste anonyme au sens du considérant 26 du RGPD :

- aucun identifiant stable, aucun contact, aucun texte libre ;
- l'adresse IP reste condensée avec un sel qui tourne chaque jour, dans une
  table séparée, comme aujourd'hui ;
- **l'horodatage des évaluations passe au jour, pas à la seconde.** Aujourd'hui
  `cree_le` est à la seconde dans la même base que le compteur de débit, ce qui
  laisse une corrélation temporelle théorique entre une évaluation et un
  condensat d'IP. Le jour suffit largement à l'usage.

Une phrase simple sur la page vaut mieux qu'une bannière.

## 9. Ce qui reste à faire

Deux seuils différents, et il ne faut pas les confondre. **Utilisable** veut
dire qu'on peut le mettre en ligne sans mentir au lecteur. **Fini** veut dire
qu'on peut défendre ses chiffres devant quelqu'un qui cherche la faute.

### Utilisable : ce qu'il faut avant de le mettre en ligne

- [x] Écrire les trente-six questions selon les règles du point 4.
      Voir `questions-test-du-builder.md`.
- [ ] Relecture d'auteur sur la voix, et sur les options trop proches pour
      être départagées de bonne foi.
- [ ] Faire noter les options par trois ou quatre praticiens, sur une version
      sans les valeurs ni les lignes « ce qui sépare ». Garder la moyenne.
      Tant que ce n'est pas fait, la clé est un avis, pas une clé.
- [ ] Écrire les descriptions de zone, chacune passée au test de fausseté :
      elle doit être fausse pour quelqu'un situé trente points plus loin.
- [ ] Écrire l'épreuve d'absence, c'est-à-dire le texte qui traduit une bande
      en ce qui s'arrêterait si le lecteur partait deux semaines.
- [x] Refaire le calcul et l'affichage : trois facettes, ordre des options
      tiré au hasard, bande au lieu d'un score, citation des réponses du
      lecteur, plus de seuil. Fait dans `_brouillon/test-du-builder/`, que
      Jekyll ne publie pas. Aperçu : ouvrir `apercu.html` dans un navigateur.
- [ ] Basculer le brouillon en ligne, une fois les clés notées : le moteur
      vers `assets/javascripts/`, le balisage vers `index.md`, le style vers
      `assets/stylesheets/style.css`, et mettre à jour
      `bin/verifier-test-builder`, qui compte encore trente questions.
- [ ] Version 2 du schéma et de `worker/evaluation.mjs` : réponses question par
      question, horodatage au jour et non à la seconde.
- [ ] Réécrire l'annexe `a2-comment-fonctionne-le-test.md`, le jour de la
      bascule et pas avant. Le livre ne documente pas une version qui n'existe
      pas.
- [ ] Mettre à jour la page d'accueil : le nombre de questions, la durée, et
      la promesse, qui parlent encore de trente situations.

### Fini : ce qu'il faut pour défendre les chiffres

- [ ] Cinq cents passages environ, pour calculer les statistiques d'item et
      l'alpha de chaque facette. Une facette sous 0,70 doit être réécrite,
      pas publiée avec une excuse.
- [ ] Une mesure de fidélité test-retest : proposer à quelques lecteurs de
      repasser le test à un mois. Sans elle, la bande reste une prudence
      éditoriale, et la note doit continuer de le dire.
- [ ] Remplacer la bande de dix points par la vraie erreur de mesure.
- [ ] Publier alpha, test-retest et la distribution des scores dans l'annexe,
      chiffres à l'appui. La méthode se publie, la clé de notation non.
- [ ] Décider des percentiles : seulement au-delà de mille passages, et
      libellés « parmi les personnes qui ont passé ce test ».

### Ce qui reste hors de portée, et qu'il faut dire

Le test ne prédira rien tant qu'aucune étude de critère n'aura été menée. La
version la moins chère : un courriel six mois plus tard, une seule question de
résultat concret, corrélée au score. Tant qu'elle n'existe pas, aucune phrase
du livre ne doit laisser entendre que le score annonce une carrière.

## 10. Sources

**Méthode.** McDaniel et al. 2007 sur la validité des tests de jugement
situationnel et l'effet des instructions. Kasten et al. 2023, fidélité
test-retest poolée à .70. Cao et Drasgow 2019 sur le choix forcé. Birkeland et
al. 2006 sur l'inflation en situation d'enjeu. Haslam et al. 2020, 317 études
taxométriques. Pittenger 1993 sur le MBTI. Forer 1949.

**Construit.** Griffin, Neal et Parker 2007, *work role performance*. Frese et
al. 1997, initiative personnelle. Morrison et Phelps 1999, *taking charge*.
Van Dyne et Pierce 2004, propriété psychologique. Hackman et Oldham sur
l'identité de la tâche. Tornau et Frese 2013, méta-analyse.

**Preuve.** Campos, Frese et al., *Science* 2017 : essai randomisé au Togo,
1 500 micro-entrepreneurs, la formation à l'initiative personnelle augmente les
profits de 30 %, contre 11 % non significatifs pour la formation classique en
gestion. C'est la citation qui sort ce livre du registre motivationnel.

**Objection.** Tanya Reilly, « Being Glue » : le travail de liant n'est pas
promu, et sa conclusion est l'inverse de celle du livre. Babcock et al. 2017 sur
les tâches non promouvables. Benson, Li et Shue 2019 : les entreprises
promeuvent le meilleur performeur individuel, pas celui qui fait performer les
autres. La seule réponse qui tienne est celle du capital humain : être
indispensable est un capital spécifique à une entreprise, sans valeur ailleurs,
et c'est ce qui y enferme ; les systèmes, l'enseignement et les traces sont
portables. Le livre doit donc dire tout haut que l'employeur n'est pas celui qui
paie, et qu'un builder qu'on ne paie jamais doit partir. La carte
« Partir n'est pas une trahison » existe déjà et devrait porter plus de poids.
