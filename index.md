---
layout: home

categories:
  - builders
  - tech

seo:
  description: Un guide pratique pour ceux qui construisent. Dix étapes, quatre-vingt-sept cartes, une idée par carte.
  keywords: build here, builders, ingénierie logicielle, produit, ownership, leadership, guide pratique, visibilité

title: Build Here
description: Un guide pratique pour ceux qui construisent
---

<img
  src="/assets/images/couverture.png"
  alt="Couverture de Build Here"
  class="book-cover"
  width="1200"
  height="1800"
/>

# Le playbook des builders

> Un builder est quelqu'un qui prend la responsabilité de rendre le réel meilleur. Le métier qu'il pratique ne change rien au trajet.

{% assign entrees = site.chapters | where_exp: "c", "c.metadata.principle" %}
{% assign etapes = site.chapters | where_exp: "c", "c.step_number" %}

{{ etapes | size }} étapes, {{ entrees | size }} cartes. Tu en appliques déjà une partie sans les avoir nommées. D'autres vont te contredire, et c'est le but. L'[Ultimate Builder Test](/test-builder/) repère la marche qui limite les suivantes et te donne un parcours de trois cartes.

Pour toi, pour ton équipe, pour ceux que tu formes. Tout est là, en accès libre, et rien n'y demande un budget, une réorganisation, ou la permission de qui que ce soit.

<br>
Une carte, deux minutes, une idée qui tient seule.
