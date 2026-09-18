---
layout: chapter
title: "Supprime l'étape avant de la documenter"
part: "Les systèmes"
order: 702
metadata:
  principle: "7.02"
  reading_time_in_minutes: 2
categories:
  - systemes
  - process
  - simplicite
seo:
  description: "Une documentation est souvent le lot de consolation d'une étape qui n'aurait pas dû exister."
  keywords: "build here, systemes, process, documentation, builder"
---

## Le réflexe

> "Je vais écrire une procédure pour que tout le monde sache la faire."

C'est généreux, c'est du travail réel, et ça règle effectivement le problème de la semaine.

## Le réflexe builder

> "Avant d'écrire comment on la fait, pourquoi est-ce qu'elle existe ?"

Trois questions dans l'ordre. Est-ce qu'on peut la supprimer. Sinon, est-ce qu'une machine peut la faire. Sinon seulement, on l'écrit.

## Pourquoi

Une documentation est souvent le lot de consolation d'une étape qui n'aurait pas dû exister. Elle a l'avantage d'être rapide à produire et de donner l'impression d'avoir traité le sujet. Elle a l'inconvénient de rendre l'étape permanente.

Le mécanisme est presque comique. Une étape non documentée est fragile : le jour où elle agace quelqu'un, elle disparaît. Une étape documentée est défendue. Elle a une page, la page a un auteur, l'auteur a passé du temps dessus, et remettre l'étape en question revient maintenant à remettre en question un travail. Tu n'as pas seulement conservé l'étape, tu lui as donné un avocat.

Regarde ce qui se documente dans une entreprise de cinq ans. Une validation qui existe à cause d'un incident qui ne peut plus se produire depuis la refonte. Un champ à recopier d'un outil dans un autre parce qu'une intégration n'a jamais été finie. Une double vérification instaurée après une erreur commise une fois par une personne qui est partie. Chacune a eu une bonne raison. Aucune n'a été rouverte, parce qu'il n'existe aucun moment prévu pour rouvrir une raison.

Certaines étapes ne se suppriment pas et il faut le dire clairement. L'argent, la sécurité, le juridique, ce qui engage quelqu'un d'autre. Là, écris la procédure, et écris avec elle pourquoi l'étape existe. Une procédure sans sa raison connaît deux destins : elle est supprimée par le premier qui la trouve absurde, ou gardée pour toujours par prudence. Les deux sont mauvais, et la raison est la seule chose qui permet de trancher plus tard.

## À essayer

Prends la prochaine procédure que tu allais écrire. Avant de l'écrire, va demander à la personne qui a instauré l'étape pourquoi elle existe.

Si personne ne le sait, tu as ta réponse.

## Depuis ton siège

- **Engineer** : une étape manuelle documentée survit dix ans. Supprimée, elle ne revient pas.
- **Product** : un champ obligatoire que tout le monde remplit au hasard est du bruit, pas une donnée.
- **Founder** : compte les validations qui passent par toi. Chacune a eu une raison en son temps.
- **Manager** : une équipe n'a jamais retiré une étape que tu as remerciée quelqu'un d'avoir écrite.
- **Customer-facing** : l'étape que tu expliques dix fois par semaine au client est une étape à supprimer.

## À discuter

Quelle étape existe ici pour une raison que personne dans la salle ne sait plus expliquer ?
