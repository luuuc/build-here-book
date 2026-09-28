---
layout: chapter
title: "Faire simple est une performance technique"
part: "Le métier"
order: 201
card_type: principe
action_scope: "Portée : individu ou accord d'équipe"
metadata:
  principle: "2.01"
  reading_time_in_minutes: 2
categories:
  - engineering
  - simplicite
  - technique
# La jumelle anglaise, pour le selecteur de langue et les balises hreflang.
traductions:
  en: /book/chapters/02-01-making-it-simple-is-a-technical-achievement.html
seo:
  description: "Simplifier demande de comprendre ce qu'on retire, de vérifier les usages concernés et de préserver un retour en arrière."
  keywords: "build here, engineering, builder, faire, simple, performance, technique"
redirect_from:
  - /livre/chapitres/06-02-faire-simple-est-une-performance-technique.html
---

## Le réflexe

Une solution accumule les options pour couvrir tous les cas imaginés. Chacune paraît raisonnable quand on la regarde seule.

## Le réflexe builder

> "De quoi les personnes ont-elles réellement besoin, et quelle partie ajoute un coût sans les aider ?"

## Pourquoi

Simplifier demande de comprendre ce qu'on retire. Un formulaire peut perdre un champ inutile et devenir plus facile à remplir. Il peut aussi perdre l'information dont une autre personne a besoin pour traiter le dossier.

Dans le code, une version plus courte peut être plus lisible, mais le nombre de lignes ne tranche pas la qualité. Un cas rare peut protéger une opération importante. L'absence de ce cas dans les observations disponibles ne démontre pas qu'il ne se produira jamais.

La version simple peut venir d'une meilleure connaissance du besoin ou d'un périmètre volontairement étroit dès le départ. Un débutant peut proposer une simplification utile ; un collègue plus expérimenté peut l'aider à vérifier les conséquences qu'il ne voit pas encore.

L'enjeu est de préserver ce qui rend le travail juste en réduisant ce qui le complique. Cela vaut pour un écran, une procédure, un rapport ou une architecture. Une suppression mérite donc les mêmes questions qu'un ajout : qui est concerné, qu'est-ce qui change, et comment revenir en arrière si l'hypothèse est fausse ?

## À essayer

Choisis une partie que tu comprends assez pour expliquer son rôle. Note ce que tu voudrais retirer et ce que cette partie permet aujourd'hui.

Demande un retour à une personne qui l'utilise ou en dépend. Si le changement est autorisé et réversible, essaie-le sur un périmètre limité, avec une façon de restaurer l'existant. Sinon, commence par une maquette ou une copie de travail.

Après un cycle d'usage convenu, regarde si la tâche est plus facile et si un besoin a été perdu. Garde, adapte ou annule la simplification selon ce que tu observes.

## Depuis ton siège

- **Produit** : examine les usages affectés par un retrait avec les personnes concernées.
- **Opérations** : vérifie l'information que l'étape transmet à la suivante.
- **Management** : laisse du temps pour vérifier une suppression, même si elle produit peu de nouveauté visible.

## À discuter

Quelle simplification récente a réduit l'effort tout en préservant le service rendu ?

*À vérifier ailleurs :* Rich Hickey examine la distinction entre simplicité et facilité dans *Simple Made Easy*, cité dans *[Déjà écrit](/references/)*.
