---
layout: chapter
title: "Une trace n'est pas forcément du code"
part: "La référence"
order: 1003
card_type: principe
metadata:
  principle: "10.03"
  reading_time_in_minutes: 3
categories:
  - trace
  - support
  - produit
seo:
  description: "Le test n'a jamais parlé de code. Il demande si un inconnu peut s'en servir sans savoir qui tu es."
  keywords: "build here, trace, support, produit, builder, code"
redirect_from:
  - /chapters/14-05-une-trace-nest-pas-forcement-du-code.html
---

## Le réflexe

> "Je n'ai rien à publier, je n'écris pas de code."

Tu lis cette étape et chaque exemple est un postmortem, une dépendance, un message d'erreur. Tu fais du support, du produit, du design, des opérations, ou tu diriges. Tu en conclus que ce chapitre s'adresse à quelqu'un d'autre.

## Le réflexe builder

> "Qu'est-ce que je sais que personne n'a écrit ?"

## Pourquoi

Le test n'a jamais parlé de code. Il demande si un inconnu peut s'en servir sans savoir qui tu es. Un tableau des motifs de contact d'une année, avec les proportions, passe ce test. Un dépôt privé de trois cent mille lignes ne le passe pas.

Ce qui manque le plus n'est d'ailleurs pas technique. Il existe des milliers de textes sur les files d'attente distribuées et presque rien sur la façon dont on rattrape un paiement mobile qui a échoué chez un opérateur qui répond au téléphone. Personne n'a écrit comment on forme un agent support sur un produit qui change chaque semaine, ni comment on fait tenir une réunion client quand la moitié du processus vit dans un groupe WhatsApp. Ici, des gens savent faire tout ça et le trouvent banal.

La forme ne change pas d'un métier à l'autre. Une chronologie, un chiffre, une chose que le lecteur peut aller vérifier. *Le support client, c'est de la recherche produit avec des participants énervés* demande d'étiqueter une semaine de tickets par cause. Ce tableau, publié avec les proportions et sans le nom d'un seul client, est un artefact qu'une équipe ailleurs peut poser à côté du sien dès demain.

Ce qui ne compte pas est le même pour tout le monde. Le retour d'expérience sans un chiffre dedans. L'article qui décrit une méthode générale que trente personnes ont déjà décrite. Ne publie pas ce que ton métier est censé faire, publie ce que la pratique de ton métier t'a appris et qu'on ne découvre qu'en le faisant.

## À essayer

Prends ta dernière semaine et cherche le chiffre que personne d'autre ne détient. Le nombre de fois où la même demande est arrivée. Le temps réel d'un processus que ton produit prétend couvrir. L'étape précise où les gens abandonnent.

Publie-le avec ce que tu en as conclu, sans le nom d'un seul client. Neuf cents mots, aucune conclusion sur le secteur.

## Depuis ton siège

- **Produit** : le temps réel d'un processus que ton produit prétend couvrir est un chiffre que personne n'a.
- **Design** : l'étape précise où les gens abandonnent, avec les proportions, est un artefact complet.
- **Fondateur** : un dépôt privé de trois cent mille lignes ne passe pas le test. Un tableau d'une page, oui.
- **Management** : ce que ton équipe trouve banal est ce que personne n'a écrit. Va le lui demander.
- **Relation client** : personne n'a écrit comment on forme un agent sur un produit qui change chaque semaine.
- **Recrutement** : une trace n'est pas du code. Élargis ce que tu acceptes comme preuve de travail.

## À discuter

Qui ici détient un chiffre que personne d'autre dans l'entreprise ne connaît ? Où est-il écrit aujourd'hui ?
