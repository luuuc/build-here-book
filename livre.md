---
layout: page

permalink: /livre/

categories:
  - builders
  - tech

seo:
  description: "Build Here, le playbook des builders. Dix étapes et quatre-vingt-cinq cartes qui mesurent une seule chose : combien de ta présence ton travail exige encore."
  keywords: build here, livre, builders, ingénierie logicielle, produit, ownership, leadership, guide pratique

title: Le livre
description: Bâtir là où tu es, pour que ça tienne sans toi
---

<img
  src="/assets/images/couverture.png"
  alt="Couverture de Build Here"
  class="book-cover"
  width="1200"
  height="1800"
/>

# Le playbook des builders

> Ton travail vaut ce qu'il continue de produire quand tu n'es pas là. Les dix étapes mesurent une seule chose : combien de ta présence il exige encore.

{% assign entrees = site.chapters | where_exp: "c", "c.metadata.principle" %}
{% assign etapes = site.chapters | where_exp: "c", "c.step_number" %}

{{ etapes | size }} étapes, {{ entrees | size }} cartes. Tu en appliques déjà une partie sans les avoir nommées. D'autres vont te contredire, et c'est le but. [Le test du builder](/) repère la marche qui limite les suivantes et te donne un parcours de trois cartes.

Pour toi, pour ton équipe, pour ceux que tu formes. Tout est là, en accès libre. Et rien de ce que le livre demande n'attend un budget, une réorganisation, un meilleur employeur ou la permission de qui que ce soit. Ça commence là où tu es, avec ce que tu as sous la main.

<br>
Une carte, deux minutes, une idée qui tient seule.

<a class="landing-cta" href="/chapters/00-introduction.html">Commencer la lecture →</a>
