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
# La jumelle anglaise, pour le selecteur de langue et les balises hreflang.
traductions:
  en: /book/chapters/08-04-leverage-in-the-wrong-place-multiplies-the-mistake.html
seo:
  description: "Un levier multiplie aussi les erreurs, et une IA les multiplie plus vite. Liste les exceptions et prévois l'arrêt avant d'élargir."
  keywords: "build here, levier, automatisation, erreur, builder"
redirect_from:
  - /livre/chapitres/08-05-un-levier-mal-place-multiplie-lerreur.html
---

## Le symptôme

Une tâche marche sur quelques cas. L'équipe veut l'automatiser ou la généraliser. Personne n'a décrit les exceptions.

## Le signal

Avant d'élargir, demande ce qui peut mal tourner, comment tu le verras, et comment tu arrêtes.

## Ce qui se passe

Un levier multiplie ce que tu lui donnes, y compris les erreurs. Une personne qui se trompe se trompe une fois. Une automatisation qui se trompe se trompe mille fois avant que quelqu'un le remarque.

Une équipe veut envoyer automatiquement des rappels de dossier. Les cas ordinaires marchent. Mais les dossiers clos, les coordonnées changées, les personnes qui ont demandé à ne plus être contactées ? La personne qui envoyait à la main les écartait sans y penser. L'automatisation, non, à moins qu'on le lui dise.

Avec l'IA, ce risque grandit : un agent qui rédige et envoie des messages, qui modifie des données ou qui répond aux clients agit vite et avec assurance. Commence là où ses résultats sont relus avant de produire un effet.

Chaque automatisation a besoin d'un responsable, d'un signal quand elle se trompe, et d'un moyen de l'arrêter. Sans ces trois choses, elle n'est pas prête.

## À vérifier

Avant d'élargir, liste les exceptions que la personne qui fait le travail gère aujourd'hui sans y penser. Teste sur des cas variés, y compris ceux qui pourraient casser la règle.

Commence là où tu peux relire les résultats avant qu'ils partent. Prévois qui reçoit les erreurs, comment arrêter, et comment réparer les effets déjà produits.

## Depuis ton siège

- **Ingénierie** : prépare les contrôles, l'arrêt et la reprise avant d'élargir l'usage.
- **Opérations** : explicite les exceptions que la pratique actuelle traite déjà.
- **Management** : attribue les moyens de suivi, pas seulement ceux de construction.
- **Relation client** : prévois un canal de retour vers la personne qui peut agir.

## À discuter

Quel contrôle risquons-nous de perdre en automatisant, et comment saurons-nous qu'il faut arrêter ?
