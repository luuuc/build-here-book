---
layout: page

permalink: /livre/

categories:
  - builders
  - pratiques

seo:
  description: "Build Here : des pratiques pour commencer, progresser, développer une équipe et soutenir des builders. Cartes, exemples et modèles en accès libre."
  keywords: build here, livre, builders, ingénierie logicielle, produit, ownership, leadership, guide pratique

title: Le livre
description: Comprendre, essayer, observer et apprendre
---

<img src="/assets/images/couverture.png" alt="Couverture de Build Here" class="book-cover" width="1200" height="1800" />

## Le playbook des builders

Un builder cherche à améliorer concrètement une situation, observe ce que son action produit et apprend pour la suite. Tu peux commencer sans titre, sans équipe et sans réalisation publique. Si tu construis déjà, le livre aide aussi à approfondir ce qui fonctionne.

{% assign entrees = site.chapters | where_exp: "c", "c.metadata.principle" %}
{% assign etapes = site.chapters | where_exp: "c", "c.step_number" %}

{{ etapes | size }} capacités, {{ entrees | size }} cartes courtes. Chacune se lit indépendamment et propose une situation, un raisonnement et une action à adapter. Les étapes du sommaire sont des repères de lecture, sans classement ni prérequis obligatoires.

L'utilité peut être un service rendu, un risque réduit, une exploration, une fiabilité préservée ou un savoir transmis. Faire continuer un travail sans son auteur est une contribution parmi ces autres formes.

## Choisir ton parcours

Trois cartes et un premier essai selon ce que tu veux faire maintenant :

{% include parcours.html %}

Une situation précise en tête ? L'[index par situation](/chapters/a5-ce-qui-tagace-cette-semaine.html) mène directement aux cartes concernées. Pour explorer sans besoin déjà défini, les [questions facultatives du test](/) aident à choisir une piste, sans score. Tu peux aussi [commencer par l'introduction](/chapters/00-introduction.html).

## Passer de la lecture à un essai

Choisis une seule pratique. Précise ce que tu peux essayer, les accords ou appuis nécessaires, le temps disponible et le travail que cet effort déplace. Le livre n'exige pas de compenser seul une condition manquante.

Les [exemples et modèles](/chapters/a9-modeles-pour-agir-et-revoir.html) montrent comment préparer un essai, observer un résultat et convenir d'une fin ou d'un relais. Les cas sont construits ; ils illustrent une démarche, sans promettre le même résultat chez toi.

Pour un groupe, le [guide d'atelier](/chapters/00-faire-tourner-ca-dans-ton-equipe.html) propose une séance volontaire et un retour adapté. Un supporter peut apporter une relecture, du temps ou un accès convenu, sans diriger le travail.

## Lire, emporter, adapter

Le livre est en accès libre. Tu peux lire ici, [télécharger le PDF]({{ site.downloads.pdf }}) ou [l'EPUB]({{ site.downloads.epub }}). Les téléchargements correspondent à la dernière édition publiée.

La [page À propos](/a-propos/) explique comment faire un retour, retrouver les sources et réutiliser le contenu.

## Sommaire
{: #sommaire }

{% include sommaire-livre.html %}
