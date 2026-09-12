---
layout: chapter
title: "Valider une spec ne la rend pas juste"
part: "Produit"
order: 28
metadata:
  principle: "20"
  reading_time_in_minutes: 2
categories:
  - produit
  - client
  - arbitrage
seo:
  description: "Une spec contient tout ce que tu croyais le jour où tu l'as écrite, y compris les parties fausses. Elle a été écrite sans l'information que la construction produit."
  keywords: "build here, produit, tech afrique, builder, valider, spec, rend, juste"
---

## Le réflexe

Le document est validé. Il devient la référence. Toutes les réunions suivantes portent sur la conformité entre la construction et le document, jamais sur la justesse du document.

## Le réflexe builder

> "C'est notre meilleure hypothèse de mars. Allons chercher ce qu'elle a raté."

## Pourquoi

Une spec contient tout ce que tu croyais le jour où tu l'as écrite, y compris les parties fausses. Elle a été écrite sans l'information que la construction produit. Sans la réaction du premier utilisateur. Sans la contrainte qui n'apparaît que quand deux systèmes se rencontrent.

La validation n'ajoute aucune connaissance. Elle ajoute de l'engagement. S'engager sur un document écrit au moment où tu en savais le moins fige les hypothèses du jour un dans un produit livré.

Ce n'est pas un argument contre l'écriture de specs. Quatre personnes ne peuvent pas construire la même chose sans. C'est un argument sur le jour où la spec et le terrain se contredisent, parce que le terrain ne va pas changer d'avis. Et quand la spec est un contrat signé, chiffré ligne par ligne, le combat n'est pas d'écrire moins. C'est de facturer le changement.

L'endroit où ça se fait détourner est prévisible. Une entrée qui dit que la spec peut être fausse se lit, pour celui qui n'a jamais voulu de la contrainte, comme l'autorisation de construire autre chose et d'appeler ça de l'apprentissage. Ce n'en est pas. Que la spec soit fausse est une affirmation, avec les mêmes obligations que n'importe quelle affirmation. Dis-le à voix haute, à celui qui a validé, avant que le code existe, avec ce que tu as trouvé. Diverger en silence et l'expliquer pendant la démo n'est pas de l'honnêteté intellectuelle. C'est le même gel, avec un autre propriétaire. Une erreur trouvée dans le document en semaine trois est le premier signe utile que la construction a produit.

## À essayer

En haut de la spec, au-dessus des exigences, deux lignes.

> On suppose : les utilisateurs veulent choisir leur créneau.
> On a tort si : moins d'un sur cinq touche le sélecteur le premier mois.

Une spec sans rien de falsifiable dedans est une liste de souhaits avec un numéro de version.

## Depuis ton siège

- **Engineer** : une erreur trouvée dans le document en semaine trois est le premier signe utile du chantier.
- **Founder** : valider n'ajoute pas de connaissance, ça ajoute de l'engagement. Sache ce que tu achètes.
- **Manager** : si contredire une spec validée coûte quelque chose, on divergera en silence jusqu'à la démo.
- **Customer-facing** : le premier utilisateur qui bute contredit le document. Rapporte-le avant la démo.
- **Recrutement** : demande une spec que le candidat a fait changer avant le code, et comment.

## À discuter

Quelle partie de notre produit n'existe que parce qu'elle était dans un document validé il y a deux ans ?
