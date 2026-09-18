---
layout: page
title: "L'Ultimate Builder Test"
description: "Découvre ce qui te rend déjà solide, ce qui limite ton impact aujourd'hui, et quoi faire ensuite."
permalink: /test-builder/
test_builder: true
seo:
  description: "Un test pratique de 30 situations pour situer ton parcours de builder et recevoir un chemin de lecture personnalisé."
  keywords: "ultimate builder test, test builder, ownership, leadership, autonomie, Build Here"
---

<section class="builder-test" data-builder-test data-api="https://api.build-here.africa/evaluation">
  <div class="builder-test-intro" data-test-intro>
    <p class="builder-test-eyebrow">30 situations · 7 à 10 minutes</p>
    <h2>Pas un type. Ton prochain mouvement.</h2>
    <p>Le test mesure dix capacités qui se construisent les unes sur les autres. Il ne dit pas qui tu es. Il repère ce que tu fais déjà, puis l'étape qui limite le reste.</p>
    <ul>
      <li>Réponds avec ce que tu fais vraiment, pas avec la réponse qui sonne bien.</li>
      <li>Si deux réponses te ressemblent, choisis celle que ton équipe verrait le plus souvent.</li>
      <li>Ton résultat reste dans ce navigateur. Seul un résumé anonyme est envoyé pour améliorer le test.</li>
    </ul>
    <button type="button" class="builder-test-primary" data-test-start>Commencer</button>
  </div>

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
        <h3>Ton prochain niveau</h3>
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
    <p class="builder-test-disclaimer">Ce test est un outil éditorial d'orientation. Ce n'est ni un diagnostic psychologique, ni une mesure de valeur professionnelle.</p>
  </section>

  <noscript><p>Le test a besoin de JavaScript pour calculer ton parcours. Le reste du livre reste entièrement lisible sans lui.</p></noscript>
</section>
