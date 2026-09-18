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
seo:
  description: "Un levier est indifférent à la direction. Automatiser un mauvais processus produit du mauvais plus vite et plus loin."
  keywords: "build here, levier, automatisation, erreur, builder"
---

## Le symptôme

> "On automatise, ça ira plus vite."

C'est exact. C'est aussi tout ce que la phrase garantit.

## Le signal

> "Est-ce que ce processus est bon ? Parce qu'on s'apprête à le faire cent fois plus."

## Ce qui se passe

Un levier est indifférent à la direction. Il multiplie ce sur quoi tu le poses, et il ne vérifie pas d'abord que la chose méritait d'être multipliée. Automatiser un mauvais processus produit du mauvais plus vite, plus loin, et de façon plus régulière.

Il y a pire, et c'est ce qui rend cette carte nécessaire. Le travail manuel contient des points de contrôle involontaires. Quelqu'un remarque qu'un montant est étrange. Quelqu'un trouve que ce client-là ne devrait pas recevoir ce message. Ces vérifications ne sont écrites nulle part, personne ne les a demandées, et elles rattrapent une part des erreurs depuis des années. L'automatisation retire le travail, et elle retire ces contrôles avec, sans que personne n'ait décidé de les supprimer puisque personne ne savait qu'ils existaient.

Les dégâts sont faciles à imaginer parce qu'ils arrivent partout. Une séquence de messages part sur le mauvais segment et écrit à quarante mille personnes au lieu de quatre cents. Une règle de remboursement automatique traite un cas qu'elle n'aurait pas dû toucher, et le traite huit cents fois avant qu'un humain regarde. Une erreur de tarif dans un modèle de proposition part chez tous les prospects du trimestre. Dans les trois cas, la version manuelle aurait produit une erreur, une seule, repérée le jour même.

Ce n'est pas un argument pour rester à la main, ce serait renoncer à l'étape entière. C'est un argument sur l'ordre. Tu pointes le levier vers un travail dont tu as déjà vérifié qu'il marche, et tu gardes un endroit où quelqu'un regarde un échantillon. Une automatisation que personne ne regarde plus n'est pas un système, c'est une décision prise une fois et appliquée sans limite.

## À vérifier

Avant de multiplier quoi que ce soit, fais-le tourner à la main sur dix cas et regarde les dix résultats, un par un.

Puis, une fois en place, garde un rendez-vous court pour regarder un échantillon. Dix cas au hasard suffisent.

## Depuis ton siège

- **Produit** : une règle automatique est une décision prise une fois et appliquée sans discussion.
- **Ingénierie** : l'alerte qui compte n'est pas que ça a tourné, c'est que le résultat est plausible.
- **Fondateur** : demande ce qui se passe quand c'est faux, et combien de fois avant qu'on le voie.
- **Management** : une automatisation sans échantillon relu régulièrement finit par dériver en silence.
- **Relation client** : tu vois les dégâts en premier. Un canal direct vers celui qui a posé la règle.

## À discuter

Qu'est-ce qui tourne tout seul ici, et à quand remonte la dernière fois que quelqu'un a regardé le résultat ?
