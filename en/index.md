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

{%- assign entrees = site.chapters_en | where_exp: "c", "c.metadata.principle" -%}
{%- assign etapes = site.chapters_en | where_exp: "c", "c.step_number" -%}

<section class="builder-test" data-builder-test>
  <div data-test-intro>
    <section class="bloc bloc--surface hero">
      <div class="colonne">
        <div class="hero-corps">
          <div>
            <p class="bloc-surtitre">The builder test · 10 steps · no account</p>
            <h1 class="hero-titre">Are you a builder?</h1>
            <p class="hero-accroche">You do not need to code, to run a team, or to have launched anything. Find out how you get from a problem to something useful, and what you could try next.</p>
            <p class="hero-actions"><button type="button" class="bouton" data-test-start hidden>Take the test →</button></p>
            <ul class="preuve">
              <li><strong>10</strong> minutes</li>
              <li><strong>0</strong> account</li>
              <li><strong>0</strong> score</li>
              <li>your answers stay here</li>
            </ul>
          </div>
          <img class="hero-image" src="/assets/images/scenes/accueil.svg" alt="" width="480" height="320" />
        </div>
      </div>
    </section>
    <nav class="rail rail--accueil" aria-label="Without taking the test">
      <div class="rail-corps">
        <a href="/en/test-method/" class="rail-item"><span class="rail-fleche" aria-hidden="true">→</span><span>How the test works</span></a>
        <a href="/en/paths/" class="rail-item"><span class="rail-fleche" aria-hidden="true">→</span><span>Go straight to a path</span></a>
      </div>
    </nav>
  </div>
  <div class="colonne colonne--prose">
    <div class="builder-test-workspace" data-test-workspace hidden>
      <nav class="builder-test-actions" aria-label="Questionnaire navigation">
        <button type="button" class="bouton bouton--contour" data-test-restart>Start again</button>
      </nav>
      <p><a href="/en/paths/">Go straight to my path →</a></p>
      <div data-test-screen></div>
    </div>
    <noscript><p>The interactive questions need JavaScript. The four reading paths and the book stay fully reachable through the links above.</p></noscript>
  </div>
</section>

<!-- La présentation du livre revient avec la piste choisie. -->
<div data-test-landing>

  <section class="bloc">
    <div class="colonne">
      <h2 class="bloc-titre">How it goes</h2>
      <div class="grille grille--trois">
        <div class="pas">
          <img src="/assets/images/sections/curiosite.svg" alt="" width="120" height="120" />
          <h3>You answer statements</h3>
          <p>Ten capabilities, six statements each. You can say a situation never came up, or that the conditions were missing.</p>
        </div>
        <div class="pas">
          <img src="/assets/images/sections/escalier.svg" alt="" width="120" height="120" />
          <h3>You see where you stand</h3>
          <p>A reading of your answers, capability by capability, with what you could deepen or revisit.</p>
        </div>
        <div class="pas">
          <img src="/assets/images/sections/execution.svg" alt="" width="120" height="120" />
          <h3>You leave with one practice</h3>
          <p>A single one, to try this week, with the cards from the book that go with it.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="bloc bloc--surface">
    <div class="colonne colonne--prose">
      <p class="bloc-surtitre">What you get</p>
      <h2 class="bloc-titre">A reading of your practice, not a label.</h2>
      <p class="bloc-texte">Capability by capability, the test shows the moves you recognise in your work, the ones you recognise less, and the ones where the conditions were missing. It compares you with nobody and gives you no overall mark and no type. Sixty answers about your own week cannot measure a level, and the book does not believe being a builder is like being tall.</p>
      <p class="bloc-texte">Your answers stay in this page. They disappear when you leave it or reload, and nothing is sent anywhere. No account, no address to hand over.</p>
      <a class="bouton bouton--contour" href="/en/test-method/">How the test works →</a>
    </div>
  </section>

  <section class="bloc">
    <div class="colonne">
      <div class="hero-corps">
        <div>
          <h2 class="bloc-titre">Building is something you learn.</h2>
          <p class="bloc-texte">{{ entrees | size }} short cards to understand a problem better, try something, learn from the result, and pass on what works. Start where you are.</p>
          <a class="bouton bouton--contour" href="/en/book/">Explore the book →</a>
          <ul class="preuve">
            <li><strong>{{ entrees | size }}</strong> cards</li>
            <li><strong>{{ etapes | size }}</strong> capabilities</li>
            <li>free to read</li>
            <li>CC BY-SA</li>
          </ul>
        </div>
        <img class="hero-image hero-couverture" src="/assets/images/couverture.png" alt="Build Here cover" width="1200" height="1800" />
      </div>
    </div>
  </section>

  <section class="bloc bloc--nuit">
    <div class="colonne">
      <h2 class="bloc-titre">Give builders something to act on.</h2>
      <p class="bloc-texte">One card, a real situation, thirty minutes together: the book offers a workshop for deciding on a concrete attempt and the conditions it needs.</p>
      <a class="bouton" href="/en/workshop/">Try the workshop →</a>
    </div>
  </section>

</div>
