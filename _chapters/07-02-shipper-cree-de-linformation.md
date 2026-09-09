---
layout: chapter
title: "Shipper crée de l'information"
part: "Exécution"
order: 37
metadata:
  principle: "28"
  reading_time_in_minutes: 2
categories:
  - execution
  - livraison
  - produit
seo:
  description: "Une équipe qui livre chaque semaine collecte cinquante réponses par an. Une équipe qui livre deux fois par an en collecte deux."
  keywords: "build here, execution, tech afrique, builder, shipper, cree, information"
---

## Le réflexe

Le travail reste à l'abri jusqu'à ce qu'il soit prêt. Une release propre vaut mieux que cinq bancales.

## Le réflexe builder

> "Ça part jeudi. On saura vendredi."

## Pourquoi

Une équipe qui livre chaque semaine collecte cinquante réponses par an. Une équipe qui livre deux fois par an en collecte deux. Au bout de trois ans, ce qui les sépare n'est pas le talent, c'est une carte de leur propre terrain que la seconde ne peut acheter nulle part.

Ce qu'une release tranche, aucune salle ne le tranchera. Si les gens trouvent le bouton. Si tes mots veulent dire pour eux ce qu'ils voulaient dire pour toi.

Le risque va contre l'intuition ici. Une release qui porte trois mois de travail a trois mois de suspects quand elle casse. Deux jours de travail en ont deux. Ça cesse d'être théorique quand le déploiement doit atterrir avant que le courant saute à dix-huit heures. Tu veux un changement que tu peux annuler en quatre minutes, pas un trimestre de travail que tu bisectes à la lumière du téléphone.

Certains travaux ne peuvent pas sortir chaque semaine. Une intégration de paiement, un flux réglementé, une migration dont le rollback prend une nuit. La fréquence n'a jamais été le principe, le retour l'était. Là où la livraison ne peut pas être découpée, découpe la preuve. Un essai à blanc sur dix pour cent des données, un rapport qui doit correspondre à l'ancien au centime près, quelque chose de vérifiable avant le jour où tout en dépend.

## À essayer

Mesure un chiffre. Le temps entre le moment où une ligne est écrite et le moment où cette ligne atteint un utilisateur.

Suis un seul changement de bout en bout et note chaque endroit où il a attendu. L'attente, c'est en général l'agenda de quelqu'un, pas un build.

## À discuter

Ici, combien de temps entre le code écrit et le client servi ?
