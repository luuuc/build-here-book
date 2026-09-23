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

# La jumelle anglaise, pour le selecteur de langue et les balises hreflang.
traductions:
  en: /en/
---

{%- assign entrees = site.chapters | where_exp: "c", "c.metadata.principle" -%}
{%- assign etapes = site.chapters | where_exp: "c", "c.step_number" -%}

<section class="builder-test" data-builder-test>
  <div data-test-intro>
    <section class="bloc bloc--surface hero">
      <div class="colonne">
        <div class="hero-corps">
          <div>
            <p class="bloc-surtitre">Le test du builder · 10 étapes · sans compte</p>
            <h1 class="hero-titre">Es-tu un builder ?</h1>
            <p class="hero-accroche">Tu n'as pas besoin de coder, de diriger une équipe ou d'avoir déjà lancé un projet. Découvre comment tu passes d'un problème à quelque chose d'utile, et ce que tu pourrais essayer ensuite.</p>
            <p class="hero-actions"><button type="button" class="bouton" data-test-start hidden>Faire le test →</button></p>
            <ul class="preuve">
              <li><strong>10</strong> minutes</li>
              <li><strong>0</strong> compte</li>
              <li><strong>0</strong> score</li>
              <li>tes réponses restent ici</li>
            </ul>
          </div>
          <img class="hero-image" src="/assets/images/scenes/accueil.svg" alt="" width="480" height="320" />
        </div>
      </div>
    </section>
    <nav class="rail rail--accueil" aria-label="Sans passer par le test">
      <div class="rail-corps">
        <a href="/methode-du-test/" class="rail-item"><span class="rail-fleche" aria-hidden="true">→</span><span>Comment fonctionne le test</span></a>
        <a href="/parcours/" class="rail-item"><span class="rail-fleche" aria-hidden="true">→</span><span>Choisir directement un parcours</span></a>
      </div>
    </nav>
  </div>
  <div class="colonne colonne--prose">
    <div class="builder-test-workspace" data-test-workspace hidden>
      <nav class="builder-test-actions" aria-label="Navigation du questionnaire">
        <button type="button" class="bouton bouton--contour" data-test-restart>Recommencer</button>
      </nav>
      <p><a href="/parcours/">Choisir directement mon parcours →</a></p>
      <div data-test-screen></div>
    </div>
    <noscript><p>Les questions interactives demandent JavaScript. Les quatre parcours de lecture et le livre restent entièrement accessibles par les liens ci-dessus.</p></noscript>
  </div>
</section>

<!-- La présentation du livre revient avec la piste choisie. -->
<div data-test-landing>

  <section class="bloc">
    <div class="colonne">
      <h2 class="bloc-titre">Comment ça se passe</h2>
      <div class="grille grille--trois">
        <div class="pas">
          <img src="/assets/images/sections/curiosite.svg" alt="" width="120" height="120" />
          <h3>Tu réponds à des affirmations</h3>
          <p>Dix capacités, six affirmations chacune. Tu peux dire qu'une situation ne s'est jamais présentée, ou que les conditions t'ont manqué.</p>
        </div>
        <div class="pas">
          <img src="/assets/images/sections/escalier.svg" alt="" width="120" height="120" />
          <h3>Tu vois où tu en es</h3>
          <p>Une lecture de tes réponses, capacité par capacité, avec ce que tu pourrais approfondir ou revoir.</p>
        </div>
        <div class="pas">
          <img src="/assets/images/sections/execution.svg" alt="" width="120" height="120" />
          <h3>Tu repars avec une pratique</h3>
          <p>Une seule, à essayer cette semaine, avec les cartes du livre qui vont avec.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="bloc bloc--surface">
    <div class="colonne colonne--prose">
      <p class="bloc-surtitre">Ce que tu obtiens</p>
      <h2 class="bloc-titre">Une lecture de ta pratique, pas une étiquette.</h2>
      <p class="bloc-texte">Capacité par capacité, le test montre les gestes que tu reconnais, ceux que tu reconnais moins, et ceux où les conditions t'ont manqué. Il ne te compare à personne et ne te donne ni note globale ni type. Soixante réponses sur ta propre semaine ne mesurent pas un niveau, et le livre ne croit pas qu'on soit builder comme on est grand.</p>
      <p class="bloc-texte">Tes réponses restent dans cette page. Elles disparaissent quand tu la quittes ou la recharges, et rien n'est envoyé nulle part. Pas de compte, pas d'adresse à laisser.</p>
      <a class="bouton bouton--contour" href="/methode-du-test/">Comment fonctionne le test →</a>
    </div>
  </section>

  <section class="bloc">
    <div class="colonne">
      <div class="hero-corps">
        <div>
          <h2 class="bloc-titre">Construire, ça s'apprend.</h2>
          <p class="bloc-texte">{{ entrees | size }} cartes courtes pour mieux comprendre un problème, tenter quelque chose, apprendre du résultat et transmettre ce qui marche. Commence où tu en es.</p>
          <a class="bouton bouton--contour" href="/livre/">Découvrir le livre →</a>
          <ul class="preuve">
            <li><strong>{{ entrees | size }}</strong> cartes</li>
            <li><strong>{{ etapes | size }}</strong> capacités</li>
            <li>accès libre</li>
            <li>CC BY-SA</li>
          </ul>
        </div>
        <img class="hero-image hero-couverture" src="/assets/images/couverture.png" alt="Couverture de Build Here" width="1200" height="1800" />
      </div>
    </div>
  </section>

  <section class="bloc bloc--nuit">
    <div class="colonne">
      <h2 class="bloc-titre">Donne aux builders de quoi agir.</h2>
      <p class="bloc-texte">Une carte, une situation réelle, trente minutes ensemble : le livre propose un atelier pour décider d'un essai concret et des conditions nécessaires.</p>
      <a class="bouton" href="/atelier/">Essayer l'atelier →</a>
    </div>
  </section>

</div>
