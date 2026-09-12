---
layout: chapter
title: "Le test n'est pas la preuve"
part: "Engineering"
order: 999
metadata:
  principle: "999"
  reading_time_in_minutes: 2
categories:
  - engineering
  - methode
seo:
  description: "Une suite verte dit que le code fait ce que le test décrit. Elle ne dit rien de ce que le test a oublié."
  keywords: "build here, engineering, tech afrique, builder"
author: "Mamadou Diallo"
author_link: "https://example.com/mamadou"
---

## Le réflexe

> "La suite est verte, on peut livrer."

La couverture est bonne, le tableau est vert, et personne ne demande ce qui n'est pas couvert.

## Le réflexe builder

> "Qu'est-ce que cette suite ne regarde pas ?"

Le vert dit que le code fait ce que le test décrit. Il ne dit rien de ce que le test a oublié.

## Pourquoi

Un test encode une hypothèse sur ce qui peut casser. Quand la panne arrive d'ailleurs, la suite reste verte pendant que la production brûle, et l'équipe cherche le problème dans le dernier endroit où elle regarde.

Le coût est un faux calme. Une heure de retard sur la détection, parfois un jour, parce que le premier réflexe devant un incident est de faire tourner les tests, et qu'ils rassurent.

Personne n'écrit une mauvaise suite exprès. On écrit les tests des pannes qu'on a déjà vues, et c'est raisonnable. Les pannes qu'on n'a pas vues n'ont pas de test par définition.

## À essayer

Cette semaine, prends le dernier incident de production et cherche le test qui aurait dû l'attraper. S'il n'existe pas, écris-le. S'il existait et qu'il était vert, tu as trouvé quelque chose de plus intéressant.

## Depuis ton siège

- **Product** : demande ce qui n'est pas couvert avant de demander la date.
- **Founder** : une suite verte n'est pas un rapport de risque, ne la lis pas comme tel.
- **Manager** : si tu récompenses la couverture, tu obtiendras de la couverture.
- **Customer-facing** : le client a vu la panne que la suite n'a pas vue. Rapporte-la comme un cas.

## À discuter

Quel incident des six derniers mois est passé devant une suite verte ?