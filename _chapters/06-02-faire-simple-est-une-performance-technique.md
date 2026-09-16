---
layout: chapter
title: "Faire simple est une performance technique"
part: "Engineering"
order: 34
metadata:
  principle: "25"
  reading_time_in_minutes: 2
categories:
  - engineering
  - simplicite
  - technique
seo:
  description: "Personne n'écrit la solution simple en premier. Le premier jet couvre tous les cas que tu peux imaginer, parce que tu ne sais pas encore lesquels arrivent."
  keywords: "build here, engineering, tech afrique, builder, faire, simple, performance, technique"
---

## Le réflexe

La simplicité se lit comme un point de départ. On commence simple parce qu'on ne sait pas encore faire mieux, puis on devient sérieux en devenant compliqué.

## Le réflexe builder

La version simple est la dernière que tu écris, pas la première.

## Pourquoi

Personne n'écrit la solution simple en premier. Le premier jet couvre tous les cas que tu peux imaginer, parce que tu ne sais pas encore lesquels arrivent.

Passer de trois cents lignes à quarante n'est pas du travail de débutant. C'est la distance entre le domaine que tu imaginais dès la première semaine et le domaine que tu as observé en production pendant un an.

La version à quarante lignes laisse parfois tomber un cas qui finit par poser problème. Le test, c'est pourquoi il a disparu. Disparu parce que les logs montrent qu'il ne se produit jamais, c'est de la compréhension. Disparu parce que le traiter était pénible, c'est l'incident du trimestre prochain avec une stack trace plus courte. Nomme ce que tu as retiré dans la pull request et laisse quelqu'un te contredire.

Le mot sert aussi de bouclier. "Restons simples" peut vouloir dire j'ai compris ce domaine et j'ai enlevé ce dont il n'a pas besoin. Ça peut aussi vouloir dire je n'ai pas envie d'apprendre la partie réellement difficile. Les deux sonnent pareil en réunion, et elles se séparent sur une seule question. Est-ce que la personne sait dire ce que la version compliquée permettait ? Si tu ne sais pas expliquer ce que tu as retiré, ta solution n'est pas simple. Elle est inachevée, et les cas abandonnés reviennent plus tard à travers les réclamations des clients.

## À essayer

Prends une partie du système que tu connais bien. Pose une question.

> Si je l'écrivais aujourd'hui, avec ce que je sais maintenant, qu'est-ce que je ne construirais pas du tout ?

Puis supprime une de ces choses cette semaine. Pour de bon, pas derrière un flag.

## Depuis ton siège

- **Product** : une fonctionnalité retirée est un arbitrage. Même revue qu'un lancement.
- **Design** : un écran qu'on supprime vaut souvent mieux qu'un écran qu'on clarifie.
- **Founder** : demande ce que la version compliquée permettait. La réponse sépare le simple de l'inachevé.
- **Customer-facing** : les cas abandonnés reviennent avec des noms de clients dessus, et par toi.
- **Recrutement** : demande ce que le candidat a supprimé, pas ce qu'il a construit. Peu ont la réponse.

## À discuter

Quelle suppression a été applaudie ici ?
