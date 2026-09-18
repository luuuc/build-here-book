---
layout: chapter
title: "L'open source est une salle de classe"
part: "Le métier"
order: 207
card_type: principe
metadata:
  principle: "2.07"
  reading_time_in_minutes: 2
categories:
  - apprentissage
  - open-source
  - niveau
seo:
  description: "Le code, c'est le corrigé. Ce que tu n'obtiens nulle part ailleurs, c'est le raisonnement."
  keywords: "build here, apprentissage, builder, open, source, salle, classe"
redirect_from:
  - /chapters/08-02-lopen-source-est-une-salle-de-classe.html
---

## Le réflexe

L'open source est un stock de pièces. Tu l'installes, tu l'utilises, tu le mets à jour. La relation s'arrête là.

## Le réflexe builder

> "Dix ans de disputes ont produit cette API. Les disputes sont encore en ligne."

## Pourquoi

Le code, c'est le corrigé. Ce que tu n'obtiens nulle part ailleurs, c'est le raisonnement. La proposition qui a été rejetée, avec trois paragraphes expliquant pourquoi. La revue où un mainteneur explique qu'une approche ne survivra pas aux écritures concurrentes. Le rapport de bug où l'hypothèse de quelqu'un est réfutée publiquement, sous son nom et sans crispation, puis conservée en ligne pendant dix ans.

Il y a une version pratique de ça. La prochaine fois qu'une mise à jour casse ton application, l'explication est dans un thread d'il y a deux ans, écrite par celui qui a fait le changement et qui savait ce qu'il coûterait. La plupart des équipes ne le lisent jamais. Elles patchent le symptôme et repaient à la version majeure suivante.

Et contribuer n'est pas l'activité bénévole à laquelle on le réduit, donc "on livre, on n'a pas le temps" répond à la mauvaise question. La revue d'un mainteneur, c'est une heure de relecture exigeante par quelqu'un de plus expérimenté que tes relecteurs habituels, sur ton code, gratuitement. Quand le nombre de gens capables de te relire correctement est petit, il n'y a aucun autre moyen d'acheter cette heure à quelque prix que ce soit.

C'est aussi la seule salle où personne ne peut voir d'où tu viens tant que tu ne le dis pas.

## À essayer

Prends une bibliothèque dont ton produit dépend. Lis les trois threads ouverts les plus longs de son tracker. Pas le code. La discussion.

Puis envoie un petit correctif. Une documentation ambiguë compte. La première contribution t'apprend le processus, et le processus est l'endroit où les gens abandonnent.

## Depuis ton siège

- **Product** : une proposition rejetée avec ses trois paragraphes de raisons est un cours d'arbitrage.
- **Design** : les débats d'API montrent comment on rend une chose compréhensible sans explication.
- **Founder** : une relecture exigeante par un mainteneur expérimenté, gratuitement.
- **Customer-facing** : l'explication du bug qui casse tes clients est souvent dans un thread de 2023.
- **Recrutement** : personne n'y voit d'où vient quelqu'un. C'est une source que tu n'utilises pas.

## À discuter

Est-ce que quelqu'un ici a ouvert une pull request sur une de nos dépendances ? Qu'est-ce qui a arrêté le dernier qui y a pensé ?
