---
layout: chapter
title: "Un levier mal placé multiplie l'erreur"
part: "Le levier"
order: 804
card_type: diagnostic
metadata:
  principle: "8.04"
  reading_time_in_minutes: 2
categories:
  - levier
  - impact
  - risque
# La jumelle anglaise, pour le selecteur de langue et les balises hreflang.
traductions:
  en: /en/chapters/08-04-leverage-in-the-wrong-place-multiplies-the-mistake.html
seo:
  description: "Vérifie exceptions, protections, arrêt et entretien avant d'amplifier un travail ; aucun petit échantillon ne garantit à lui seul la qualité."
  keywords: "build here, levier, automatisation, erreur, builder"
redirect_from:
  - /chapters/08-05-un-levier-mal-place-multiplie-lerreur.html
---

## Le symptôme

Une tâche fonctionne dans plusieurs cas et l'équipe envisage de l'automatiser ou de la diffuser davantage. Les exceptions et les contrôles actuels restent peu décrits.

## Le signal

Avant d'augmenter la portée, examine ce qui peut se tromper, comment le détecter et qui pourra arrêter ou reprendre le travail.

## Ce qui se passe

Une automatisation peut répéter une erreur à grande échelle. Une pratique manuelle peut aussi laisser passer des erreurs, parfois longtemps. Le choix ne se résume donc pas à opposer humain prudent et machine aveugle : il faut comprendre les contrôles de chaque solution et les conséquences d'une défaillance.

Certaines vérifications sont implicites dans le travail. Une personne remarque un montant inhabituel ou une situation qui demande un autre traitement. Décris ces décisions avec elle avant de modifier le parcours. Une règle, une validation humaine ou un traitement séparé des exceptions peut être nécessaire pour conserver la protection.

Exemple construit : une équipe souhaite envoyer automatiquement des rappels de dossier. Elle vérifie les cas ordinaires, mais aussi les dossiers clos, les coordonnées modifiées et les personnes qui ne doivent plus être contactées. Un petit échantillon aléatoire peut manquer ces cas. Le choix des vérifications dépend de la diversité des situations et de la gravité d'une erreur, sans garantie attachée au nombre dix.

Une mise en place demande aussi un responsable, du temps de surveillance et une solution de reprise. Si ces moyens ne sont pas disponibles, garder une partie manuelle ou renoncer peut être le meilleur arbitrage. Pour un débutant, une simulation sur des cas préparés avec un pair permet d'apprendre sans lancer une action réelle sur tout un service.

## À vérifier

Avant l'essai, note les résultats attendus, les exceptions connues et les protections nécessaires. Fais confirmer le périmètre et les accords par les personnes responsables du service.

Commence dans un cadre limité où les résultats peuvent être examinés avant de produire des effets. Choisis des cas variés, y compris ceux qui pourraient invalider la règle. Pour des conséquences importantes, demande les vérifications adaptées plutôt que de te fier à un échantillon seul.

Si l'essai est retenu, prévois les signaux d'erreur, qui les reçoit, comment arrêter et comment traiter les effets déjà produits. Réexamine qualité, charge de contrôle et utilité quand les conditions changent.

## Depuis ton siège

- **Ingénierie** : prépare les contrôles, l'arrêt et la reprise avant d'élargir l'usage.
- **Opérations** : explicite les exceptions que la pratique actuelle traite déjà.
- **Management** : attribue les moyens de suivi, pas seulement ceux de construction.
- **Relation client** : prévois un canal de retour vers la personne qui peut agir.

## À discuter

Quel contrôle risquons-nous de perdre en automatisant, et comment saurons-nous qu'il faut arrêter ?
