---
layout: page
lang: en

permalink: /en/book/

traductions:
  fr: /livre/

categories:
  - builders
  - pratiques

seo:
  description: "Build Here: practices to get started, get better, grow a team and back other builders. Cards, examples and templates, free to read."
  keywords: build here, book, builders, software engineering, product, ownership, leadership, practical guide

title: The book
description: Understand, try, watch what happens, learn

# La bande d'entree : deux liens deja ecrits plus bas, et les deux chiffres
# que le sommaire compte de toute facon.
bande_actions:
  - titre: "Start with the introduction"
    url: /en/chapters/00-introduction.html
    primaire: true
  - titre: "Download the PDF"
    telechargement: pdf
# La couverture tient la colonne de droite : a cote d'elle, compter les
# sections de la page n'apprend rien.
bande_image: /assets/images/couverture.png
bande_image_alt: The cover of Build Here
bande_sections: false
bande_meta:
  - titre: "Capabilities"
    compte: capacites
  - titre: "Short cards"
    compte: cartes
---

## The builder's playbook

A builder sets out to improve a concrete situation, watches what their action produces, and learns from it for next time. You can start with no title, no team and nothing published. If you are already building, the book also helps you go deeper into what works.

{% assign entrees = site.chapters_en | where_exp: "c", "c.metadata.principle" %}
{% assign etapes = site.chapters_en | where_exp: "c", "c.step_number" %}

{{ etapes | size }} capabilities, {{ entrees | size }} short cards. Each one reads on its own and offers a situation, a line of reasoning, and an action to adapt. The capabilities in the contents are reading markers, with no ranking and no required order.

Usefulness can be a service delivered, a risk reduced, an exploration, reliability preserved, or knowledge passed on. Making work continue without its author is one contribution among those other forms.

## Choose your path

Three cards and a first attempt, according to what you want to do now:

{% include parcours.html %}

Have a precise situation in mind? The [index by situation](/en/situations/) takes you straight to the cards involved. To explore with no need yet defined, the [optional test questions](/en/) help you pick a line of work, with no score. You can also [start with the introduction](/en/chapters/00-introduction.html).

## From reading to an attempt

Choose a single practice. Say what you can try, the agreements or backing it needs, the time available, and the work this effort displaces. The book does not ask you to make up for a missing condition alone.

The [examples and templates](/en/templates/) show how to prepare an attempt, observe a result, and agree an ending or a handover. The cases are constructed; they illustrate an approach, with no promise of the same result where you are.

For a group, the [workshop guide](/en/workshop/) offers a voluntary session and feedback that fits. A supporter can bring a review, time, or an agreed access, without directing the work.

## Read it, take it, adapt it

The book is free to read. You can read here, [download the PDF]({{ site.downloads[lang].pdf }}) or [the EPUB]({{ site.downloads[lang].epub }}). The downloads match the latest published edition.

The [About page](/en/about/) explains how to send feedback, find the sources, and reuse the content.

## Contents
{: #contents }

{% include sommaire-livre.html %}
