---
layout: landing
lang: en

permalink: /en/
test_builder: true

traductions:
  fr: /

categories:
  - builders
  - pratiques

seo:
  description: Are you a builder? A ten-step test to explore how you build and choose a practice to try. No account, no ranking.
  keywords: builder test, build here, book, team, builders, ownership, autonomy, leadership

# Le titre ne s'affiche pas sur la page : le layout `landing` n'a pas de
# bandeau de titre. Il sert a l'onglet, aux moteurs et au partage.
title: Are you a builder?
description: Ten steps to explore how you build and find something to try, with no ranking.
---

<section class="builder-test" data-builder-test>
  <div data-test-intro>
    <div class="landing-hero">
      <div class="landing-wrap">
        <p class="landing-eyebrow">The builder test · 10 steps · no account</p>
        <h1 class="landing-quote">Are you a builder?</h1>
        <p class="landing-lede">You do not need to code, to run a team, or to have launched anything. Find out how you get from a problem to something useful, and what you could try next.</p>
        <button type="button" class="landing-cta" data-test-start hidden>Take the test →</button>
        <p class="landing-fineprint">About 10 minutes. Your answers stay in this page and disappear when you leave it or reload.</p>
      </div>
    </div>
    <nav class="rail rail--accueil" aria-label="Without taking the test">
      <div class="rail-corps">
        <a href="/en/test-method/" class="rail-item"><span class="rail-fleche" aria-hidden="true">→</span><span>How the test works</span></a>
        <a href="/en/paths/" class="rail-item"><span class="rail-fleche" aria-hidden="true">→</span><span>Go straight to a path</span></a>
      </div>
    </nav>
  </div>
  <div class="landing-wrap">
    <div class="builder-test-workspace" data-test-workspace hidden>
      <nav class="builder-test-actions" aria-label="Questionnaire navigation">
        <button type="button" data-test-restart>Start again</button>
      </nav>
      <p><a href="/en/paths/">Go straight to my path →</a></p>
      <div data-test-screen></div>
    </div>
    <noscript><p>The interactive questions need JavaScript. The four reading paths and the book stay fully reachable through the links above.</p></noscript>
  </div>
</section>

<!-- La présentation du livre revient avec la piste choisie. -->
<div data-test-landing>

  <section class="landing-bloc">
    <div class="landing-wrap">
      {% assign entrees = site.chapters_en | where_exp: "c", "c.metadata.principle" %}
      <h2>Building is something you learn.</h2>
      <p>{{ entrees | size }} short cards to understand a problem better, try something, learn from the result, and pass on what works. Start where you are.</p>
      <a class="landing-cta landing-cta--calme" href="/en/book/">Explore the book →</a>
    </div>
  </section>

  <section class="landing-bloc landing-bloc--shell">
    <div class="landing-wrap">
      <h2>Give builders something to act on.</h2>
      <p>One card, a real situation, thirty minutes together: the book offers a workshop for deciding on a concrete attempt and the conditions it needs.</p>
      <a class="landing-cta landing-cta--calme" href="/en/workshop/">Try the workshop →</a>
    </div>
  </section>

</div>
