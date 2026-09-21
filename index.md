---
layout: landing

permalink: /
test_builder: true

# L'ancienne adresse du test. Les liens deja partages, et ceux imprimes dans
# le PDF avant ce changement, arrivent sur la page d'accueil qui porte le test.
redirect_from:
  - /test-builder/

categories:
  - builders
  - tech

seo:
  description: Choisis une pratique à explorer selon ton intention, ton expérience et tes conditions. Des questions facultatives, une piste à adapter et le livre en accès libre.
  keywords: test du builder, build here, livre, équipe, builders, ownership, autonomie, leadership

# Le titre ne s'affiche pas sur la page : le layout `landing` n'a pas de
# bandeau de titre. Il sert a l'onglet, aux moteurs et au partage.
title: Le test du builder
description: Des questions facultatives pour choisir une pratique, trois cartes et une suite adaptée à ta situation, sans score ni classement.
---

<section class="builder-test" data-builder-test>
  <div data-test-intro>
    <div class="landing-hero">
      <div class="landing-wrap">
        <p class="landing-eyebrow">Le test du builder · sans compte · à ton rythme</p>
        <h1 class="landing-quote">Choisis une pratique à explorer</h1>
        <p class="landing-lede">Pars d'une situation vécue, d'une force à approfondir ou d'un premier essai. Ces questions t'aident à choisir une lecture et une suite possible. Elles ne mesurent pas ton niveau de builder.</p>
        <button type="button" class="landing-cta" data-test-start hidden>Explorer les questions</button>
        <p>Tu peux explorer trois questions sur un sujet, passer une question ou choisir directement ton parcours.</p>
        {% include parcours.html %}
        <p class="landing-fineprint">Tes réponses restent dans la mémoire de cette page et ne sont pas envoyées au service d'évaluation. Elles disparaissent quand tu quittes ou recharges la page. Copie ta piste pour la garder. <a href="/chapters/a2-comment-fonctionne-le-test.html">Découvrir comment fonctionne le test</a>.</p>
      </div>
    </div>
  </div>
  <div class="landing-wrap">
    <div class="builder-test-workspace" data-test-workspace hidden>
      <nav class="builder-test-actions" aria-label="Navigation du questionnaire">
        <button type="button" data-test-intent>Changer d'intention</button>
        <button type="button" data-test-topics>Explorer une autre capacité</button>
        <button type="button" data-test-pistes>Voir mes pistes</button>
        <button type="button" data-test-restart>Recommencer</button>
      </nav>
      <p><a href="/chapters/00-choisir-ton-parcours.html" data-test-direct>Choisir directement mon parcours →</a></p>
      <p data-test-context></p>
      <div data-test-screen></div>
    </div>
    <noscript><p>Les questions interactives demandent JavaScript. Les quatre parcours de lecture et le livre restent entièrement accessibles par les liens ci-dessus.</p></noscript>
  </div>
</section>

<!-- La présentation du livre revient avec la piste choisie. -->
<div data-test-landing>

  <section class="landing-bloc">
    <div class="landing-wrap">
      {% assign etapes = site.chapters | where_exp: "c", "c.step_number" %}
      {% assign entrees = site.chapters | where_exp: "c", "c.metadata.principle" %}
      <h2>Le builder mindset se cultive dans ce que tu fais</h2>
      <p>Un builder prend un problème au sérieux et cherche comment le résoudre. Il fait un premier pas, confronte son idée au réel et améliore ce qu’il construit. Tu peux développer cette manière de faire dans ton métier, un projet personnel ou une équipe.</p>
      <p>Le support qui transforme des questions récurrentes en un guide utile construit. Le commercial qui trouve une approche que ses collègues peuvent reprendre construit aussi. Le code est une façon de construire parmi d’autres.</p>
      <p>{{ etapes | size }} étapes, {{ entrees | size }} cartes, une idée par carte, deux minutes chacune. Si tu débutes, tu trouveras des pratiques pour te lancer. Si tu construis déjà, tu pourras mettre des mots sur tes réflexes, les questionner et les transmettre. Chaque carte te propose quelque chose à essayer dans ta situation.</p>
      <p>Choisis une entrée selon ce que tu veux faire maintenant :</p>
      {% include parcours.html %}
      <a class="landing-cta landing-cta--calme" href="/livre/">Ouvrir le livre →</a>
    </div>
  </section>

  <section class="landing-bloc landing-bloc--shell">
    <div class="landing-wrap">
      <h2>Faire grandir le builder mindset dans ton équipe</h2>
      <p>Tu vois ce que des builders peuvent apporter et tu veux développer cette manière de travailler autour de toi. Le livre propose un format pour commencer : trente minutes par semaine pendant six semaines. À chaque séance, une carte, une discussion sur votre travail et une décision écrite, avec un nom et une date.</p>
      <p>Choisissez un sujet sur lequel vous pouvez agir ensemble. Essayez votre décision dans la semaine, puis revenez sur ce qu’elle a changé. Vous construisez ainsi des habitudes communes à partir de votre expérience.</p>
      <p>Si tu diriges l’équipe, commence par une carte qui concerne tes propres décisions. Partage ce que tu vas essayer et invite l’équipe à te faire un retour. Tu donnes à chacun un exemple concret de la pratique que vous cherchez à développer.</p>
      <a class="landing-cta landing-cta--calme" href="/chapters/00-faire-tourner-ca-dans-ton-equipe.html">Faire tourner ça dans ton équipe →</a>
    </div>
  </section>

</div>
