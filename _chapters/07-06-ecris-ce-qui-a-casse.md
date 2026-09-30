---
layout: chapter
title: "Écris ce qui a cassé"
part: "Les systèmes"
order: 706
card_type: practice
metadata:
  principle: "7.06"
  reading_time_in_minutes: 2
categories:
  - trace
  - postmortem
  - incident
  - apprentissage
translations:
  en: /book/chapters/07-06-write-down-what-broke.html
seo:
  description: "Sans trace, le même incident revient. Écris une page dans la semaine, et publie-la quand elle peut servir à d'autres."
  keywords: "build here, trace, postmortem, builder, incident"
redirect_from:
  - /livre/chapitres/14-03-ecris-ce-qui-a-casse.html
---

## Le point de départ

Un incident est réglé ou un essai a échoué. Les échanges existent, mais le raisonnement et les leçons sont éparpillés dans les messages.

## Le geste

Écris un compte rendu court dans la semaine : ce qui s'est passé, ce qu'on a compris, ce qu'on change.

## Pourquoi ça marche

Sans trace, le même incident revient et l'équipe le redécouvre. Avec une page, la personne suivante sait ce qui a été essayé, ce qui a marché et ce qui a été changé.

Un dossier s'est arrêté entre deux équipes parce que chacune attendait une confirmation différente. Le compte rendu décrit ce que chaque côté voyait, comment le blocage a été compris, et quel accord de passation a changé. Personne n'est désigné coupable. Le mécanisme, lui, est corrigé.

Une IA peut reconstruire la chronologie à partir des messages et des tickets en quelques minutes. Garde ton temps pour ce qu'elle ne sait pas : pourquoi on a cru ce qu'on a cru, et ce qu'on change.

Partage-le avec ceux qui en ont besoin : l'équipe, le relais, les équipes voisines. Quand l'histoire peut servir à d'autres, publie-la, en retirant ce qui ne t'appartient pas. Une bonne partie de ce qu'on sait sur les pannes vient de comptes rendus publiés par d'autres.

## À essayer

Choisis un incident ou un échec récent. Écris une page :

> Ce qui s'est passé et ce qui reste incertain : ...
> Ce que nous pensions alors et les vérifications faites : ...
> Les actions, leurs effets et les limites rencontrées : ...
> Ce que nous changeons, qui s'en occupe, et comment on le vérifie : ...

Fais relire les faits par les personnes concernées. Au moment prévu, vérifie que l'action décidée a été faite.

## Depuis ton siège

- **Produit** : conserve les hypothèses et les observations, pas seulement la conclusion.
- **Opérations** : précise ce qui a permis de rétablir ou de préserver le service.
- **Management** : prévois le temps d'écrire, dans la semaine qui suit.
- **Relation client** : apporte les faits sur les conséquences pour les clients.

## À discuter

Quel retour d'expérience aiderait une prochaine décision, et qui doit pouvoir le retrouver ?
