---
layout: chapter
title: "Valider une spec ne la rend pas juste"
part: "La livraison"
order: 504
card_type: diagnostic
metadata:
  principle: "5.04"
  reading_time_in_minutes: 2
categories:
  - produit
  - client
  - arbitrage
# La jumelle anglaise, pour le selecteur de langue et les balises hreflang.
traductions:
  en: /book/chapters/05-04-signing-off-a-spec-does-not-make-it-right.html
seo:
  description: "Une spec validée est un accord sur ce qu'on croyait. Quand la réalité la contredit, dis-le et mets-la à jour."
  keywords: "build here, produit, builder, valider, spec, rend, juste"
redirect_from:
  - /livre/chapitres/05-02-valider-une-spec-ne-la-rend-pas-juste.html
---

## Le symptôme

Un document décrit le résultat attendu et les contraintes. Il a été validé. Une observation nouvelle contredit une de ses hypothèses.

## Le signal

Sépare ce qui est exigé, ce qui a été vérifié et ce qui reste supposé. Puis porte la contradiction à la personne qui a validé.

## Ce qui se passe

Une spécification validée est un accord sur ce qu'on croyait au moment de la valider. Elle ne rend pas les hypothèses vraies. La réalisation et l'usage les testent, et certaines tombent.

Un document prévoit un choix de créneau pour l'inscription. L'équipe suppose que cela la facilitera. Au premier essai, des personnes ne comprennent pas les horaires. La spec est validée. Elle est aussi fausse sur ce point. La réponse peut être une meilleure explication ou un autre choix, mais pas le silence.

Tout n'est pas une hypothèse. Certaines exigences viennent d'un engagement, d'une obligation légale ou d'une contrainte de fonctionnement. Un retour contraire ne les annule pas. Distingue les deux avant de proposer un changement.

Ne diverge pas en silence. Apporte les faits et les options à la personne qui a validé, et fais mettre le document à jour. Un document qui ne suit pas la réalité devient une source d'erreurs pour le suivant.

## À vérifier

Dans un document de travail, ajoute l'hypothèse qui compte le plus :

> Nous supposons que ...
> Nous le vérifierons par ...
> Si ce n'est pas le cas, nous ...

Au retour, mets le document à jour, que l'hypothèse tienne ou non.

## Depuis ton siège

- **Ingénierie** : rapporte un cas reproductible et ses conséquences pour le périmètre.
- **Produit** : distingue une hypothèse d'usage d'une exigence à respecter.
- **Management** : dis qui peut accepter un changement, et réponds vite.
- **Relation client** : apporte le contexte du retour sans le généraliser à tous les clients.

## À discuter

Quelle hypothèse d'un document mérite d'être vérifiée, et quelle exigence doit d'abord être comprise ?
