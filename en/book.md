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
  keywords: build here, book, builders, software engineering, product, ownership, leadership

title: The book
description: Understand, try, watch what happens, learn

bande_image: /assets/images/couverture.png
bande_image_alt: The cover of Build Here
bande_sections: false
# Tant que la traduction est partielle, compter les capacites annoncerait un
# zero. Une seule mesure, vraie a toutes les etapes : les cartes traduites.
bande_meta:
  - titre: "Cards translated"
    compte: cartes
---

## The builder's playbook

A builder sets out to improve a concrete situation, watches what their action produces, and learns from it for next time. You can start with no title, no team and nothing published. If you are already building, the book also helps you go deeper into what works.

{% assign entrees = site.chapters_en | where_exp: "c", "c.metadata.principle" %}

The French edition holds ten capabilities and 85 short cards. {{ entrees | size }} are translated so far. Each card reads on its own and offers a situation, a line of reasoning and an action to adapt. The capabilities are reading markers, with no ranking and no required order.

## Contents

The English edition is being translated card by card. Sections with nothing translated yet do not appear below, and the [French edition](/livre/) is complete.

{% include sommaire-livre.html %}
