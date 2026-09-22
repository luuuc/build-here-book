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
  - pratiques

seo:
  description: Es-tu un builder ? Un test en dix étapes pour explorer ta manière de construire et choisir une pratique à essayer. Sans compte ni classement.
  keywords: test du builder, build here, livre, équipe, builders, ownership, autonomie, leadership

# Le titre ne s'affiche pas sur la page : le layout `landing` n'a pas de
# bandeau de titre. Il sert a l'onglet, aux moteurs et au partage.
title: Es-tu un builder ?
description: Dix étapes pour explorer ta manière de construire et trouver une piste à essayer, sans classement.
---

<section class="builder-test" data-builder-test>
  <div data-test-intro>
    <div class="landing-hero">
      <div class="landing-wrap">
        <p class="landing-eyebrow">Le test du builder · 10 étapes · sans compte</p>
        <h1 class="landing-quote">Es-tu un builder ?</h1>
        <p class="landing-lede">Tu n'as pas besoin de coder, de diriger une équipe ou d'avoir déjà lancé un projet. Découvre comment tu passes d'un problème à quelque chose d'utile, et ce que tu pourrais essayer ensuite.</p>
        <button type="button" class="landing-cta" data-test-start hidden>Faire le test →</button>
        <p class="landing-fineprint">Environ 10 minutes. Tes réponses restent dans cette page et disparaissent quand tu la quittes ou la recharges. <a href="/methode-du-test/">Comment fonctionne le test</a> · <a href="/parcours/">Choisir directement un parcours</a>.</p>
      </div>
    </div>
  </div>
  <div class="landing-wrap">
    <div class="builder-test-workspace" data-test-workspace hidden>
      <nav class="builder-test-actions" aria-label="Navigation du questionnaire">
        <button type="button" data-test-restart>Recommencer</button>
      </nav>
      <p><a href="/parcours/">Choisir directement mon parcours →</a></p>
      <div data-test-screen></div>
    </div>
    <noscript><p>Les questions interactives demandent JavaScript. Les quatre parcours de lecture et le livre restent entièrement accessibles par les liens ci-dessus.</p></noscript>
  </div>
</section>

<!-- La présentation du livre revient avec la piste choisie. -->
<div data-test-landing>

  <section class="landing-bloc">
    <div class="landing-wrap">
      {% assign entrees = site.chapters | where_exp: "c", "c.metadata.principle" %}
      <h2>Construire, ça s'apprend.</h2>
      <p>{{ entrees | size }} cartes courtes pour mieux comprendre un problème, tenter quelque chose, apprendre du résultat et transmettre ce qui marche. Commence où tu en es.</p>
      <a class="landing-cta landing-cta--calme" href="/livre/">Découvrir le livre →</a>
    </div>
  </section>

  <section class="landing-bloc landing-bloc--shell">
    <div class="landing-wrap">
      <h2>Donne aux builders de quoi agir.</h2>
      <p>Une carte, une situation réelle, trente minutes ensemble : le livre propose un atelier pour décider d'un essai concret et des conditions nécessaires.</p>
      <a class="landing-cta landing-cta--calme" href="/atelier/">Essayer l'atelier →</a>
    </div>
  </section>

</div>
