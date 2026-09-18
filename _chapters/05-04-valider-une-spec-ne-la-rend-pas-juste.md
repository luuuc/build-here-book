---
layout: chapter
title: "Valider une spec ne la rend pas juste"
part: "La livraison"
order: 504
metadata:
  principle: "5.04"
  reading_time_in_minutes: 2
categories:
  - produit
  - client
  - arbitrage
seo:
  description: "Une spec contient tout ce que tu croyais le jour où tu l'as écrite, y compris les parties fausses. Elle a été écrite sans ce que le développement allait t'apprendre."
  keywords: "build here, produit, builder, valider, spec, rend, juste"
redirect_from:
  - /chapters/05-02-valider-une-spec-ne-la-rend-pas-juste.html
---

## Le réflexe

Le document est validé. Il devient la référence. Toutes les réunions suivantes portent sur la conformité du produit au document, jamais sur la justesse du document.

## Le réflexe builder

> "C'est notre meilleure hypothèse de mars. Allons chercher ce qu'elle a raté."

## Pourquoi

Une spec contient tout ce que tu croyais le jour où tu l'as écrite, y compris les parties fausses. Elle a été écrite sans ce que le développement allait t'apprendre. Sans la réaction du premier utilisateur. Sans la contrainte qui n'apparaît que quand deux systèmes se rencontrent.

La validation n'ajoute aucune connaissance. Elle ajoute de l'engagement. S'engager sur un document écrit au moment où tu en savais le moins fige les hypothèses du premier jour dans un produit livré.

Ce n'est pas un argument contre l'écriture de specs. Quatre personnes ne peuvent pas construire la même chose sans. C'est un argument sur le jour où la spec et le terrain se contredisent, parce que le terrain ne va pas changer d'avis. Et quand la spec est un contrat signé, chiffré ligne par ligne, le combat n'est pas d'écrire moins. C'est de facturer le changement.

On voit bien comment ce principe peut être détourné. Une carte qui dit que la spec peut être fausse se lit, pour celui qui refuse toute contrainte, comme l'autorisation de construire autre chose et d'appeler ça de l'apprentissage. Ce n'en est pas. Dire que la spec est fausse est une affirmation qu'il faut pouvoir étayer comme n'importe quelle autre. Dis-le à voix haute, à celui qui a validé, avant que le code existe, avec ce que tu as trouvé. Diverger en silence et l'expliquer pendant la démo n'est pas de l'honnêteté intellectuelle. Tu imposes à ton tour une décision que personne ne peut discuter. Une erreur trouvée dans le document à la troisième semaine montre au moins que le développement t'a appris quelque chose.

## À essayer

En haut de la spec, au-dessus des exigences, deux lignes.

> On suppose : les utilisateurs veulent choisir leur créneau.
> On a tort si : moins d'un sur cinq touche le sélecteur le premier mois.

Une spec sans hypothèse qu'on puisse vérifier est une liste de souhaits avec un numéro de version.

## Depuis ton siège

- **Engineer** : une erreur trouvée dans le document à la troisième semaine est le premier signe utile du chantier.
- **Founder** : valider n'ajoute pas de connaissance, ça ajoute de l'engagement. Sache ce que tu achètes.
- **Manager** : si contredire une spec validée coûte quelque chose, on divergera en silence jusqu'à la démo.
- **Customer-facing** : le premier utilisateur qui bute contredit le document. Rapporte-le avant la démo.
- **Recrutement** : demande une spec que le candidat a fait changer avant le code, et comment.

## À discuter

Quelle partie de notre produit n'existe que parce qu'elle était dans un document validé il y a deux ans ?
