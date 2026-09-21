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
  description: Trente situations, dix minutes. Que tu commences ou que tu construises depuis des années, le test du builder t'aide à repérer tes points d'appui et une pratique à développer cette semaine. Le playbook complet est en accès libre.
  keywords: test du builder, build here, livre, équipe, builders, ownership, autonomie, leadership

# Le titre ne s'affiche pas sur la page : le layout `landing` n'a pas de
# bandeau de titre. Il sert a l'onglet, aux moteurs et au partage.
title: Le test du builder
description: Trente situations, dix minutes. Tu repars avec tes points d'appui, une pratique à développer et trois cartes pour passer à l'action cette semaine.
---

<section class="builder-test" data-builder-test data-api="https://api.build-here.africa/evaluation">

  <!-- L'ouverture disparait quand le test demarre : on ne repond pas a trente
       situations avec une page de presentation sous les pieds. -->
  <div data-test-intro>
    <div class="landing-hero">
      <div class="landing-wrap">
        <p class="landing-eyebrow">Le test du builder · 30 situations · 10 minutes · sans compte</p>
        <h1 class="landing-quote">Tu veux construire quelque chose qui compte. Quel est ton prochain pas ?</h1>
        <p class="landing-lede">Passer d’une idée à quelque chose d’utile. Comprendre ce qui manque, essayer, apprendre et améliorer. Que tu commences ou que tu construises depuis des années, ce test t’aide à repérer tes points d’appui et une pratique à développer cette semaine.</p>
        <button type="button" class="landing-cta" data-test-start>Passer le test</button>
        <p class="landing-fineprint"><a href="/chapters/00-choisir-ton-parcours.html">Choisir un parcours de lecture →</a></p>
        <p class="landing-fineprint">Pars de ce que tu fais aujourd’hui, même sur de petits projets. Tes réponses te proposent une piste à explorer et trois cartes pour passer à l’action. Elles restent dans ce navigateur ; seul un résumé anonyme est transmis pour améliorer les questions. <a href="/chapters/a2-comment-fonctionne-le-test.html">Découvrir comment fonctionne le test</a>.</p>
      </div>
    </div>
  </div>

  <div class="landing-wrap">
    <div class="builder-test-run" data-test-run hidden>
      <div class="builder-test-progress" aria-live="polite">
        <span data-test-count></span>
        <span class="builder-test-progress-track" aria-hidden="true"><span data-test-progress></span></span>
      </div>
      <p class="builder-test-stage" data-test-stage></p>
      <h2 data-test-question tabindex="-1"></h2>
      <div class="builder-test-answers" data-test-answers></div>
      <div class="builder-test-nav">
        <button type="button" data-test-back>Précédente</button>
        <button type="button" data-test-next disabled>Suivante</button>
      </div>
    </div>

    <section class="builder-test-result" data-test-result hidden aria-live="polite">
      <p class="builder-test-eyebrow">Ton résultat</p>
      <h2 data-result-title></h2>
      <p class="builder-test-lede" data-result-summary></p>

      <div class="builder-test-result-grid">
        <div>
          <h3>Ton appui</h3>
          <p data-result-strength></p>
        </div>
        <div>
          <h3>Ta prochaine pratique</h3>
          <p data-result-next></p>
        </div>
      </div>

      <div class="builder-test-scale" data-result-scale aria-label="Résultat par étape"></div>

      <h3>Ton parcours maintenant</h3>
      <div class="builder-test-route" data-result-route></div>

      <div class="builder-test-practice">
        <h3>Cette semaine</h3>
        <p data-result-practice></p>
      </div>

      <div class="builder-test-actions">
        <button type="button" class="builder-test-primary" data-test-restart>Repasser le test</button>
        <button type="button" data-test-copy>Copier mon résultat</button>
      </div>
      <p class="builder-test-disclaimer">Ce résultat est une piste de réflexion à confronter à ton expérience, pas une note sur tes capacités.</p>
    </section>

    <noscript><p>Le test a besoin de JavaScript pour calculer ton parcours. Le livre reste entièrement lisible sans lui.</p></noscript>
  </div>
</section>

<!-- Les deux bandes qui suivent sortent aussi pendant le test. Le script les
     remet en place quand le resultat s'affiche. -->
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
