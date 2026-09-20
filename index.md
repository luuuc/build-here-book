---
layout: page

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
  description: Trente situations, dix minutes. Le test du builder repère la marche qui limite ton impact aujourd'hui, et te donne trois cartes à utiliser cette semaine.
  keywords: test du builder, build here, builders, ownership, autonomie, leadership, évaluation

title: Le test du builder
description: Ton travail vaut ce qu'il continue de produire quand tu n'es pas là. Trente situations mesurent combien de ta présence il exige encore.
---

<section class="builder-test" data-builder-test data-api="https://api.build-here.africa/evaluation">
  <div class="builder-test-intro" data-test-intro>
    <p class="builder-test-eyebrow">30 situations · 7 à 10 minutes · sans compte</p>
    <h2>Pas un type. Ton prochain mouvement.</h2>
    <p>Le passager est transporté par le travail et ne transporte rien. Il fait correctement ce qu'on lui apporte, et rien ne continue quand il n'est plus là. Ce n'est pas une catégorie de personnes, c'est une posture, et tout le monde l'occupe sur un sujet ou un autre. Ce test repère lequel.</p>
    <ul>
      <li>Réponds avec ce que tu fais vraiment, pas avec la réponse qui sonne bien.</li>
      <li>Si deux réponses te ressemblent, choisis celle que ton équipe verrait le plus souvent.</li>
      <li>Ton résultat reste dans ce navigateur. Seul un résumé anonyme est envoyé pour améliorer le test.</li>
    </ul>
    <button type="button" class="builder-test-primary" data-test-start>Commencer le test</button>
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

  <noscript><p>Le test a besoin de JavaScript pour calculer ton parcours. Le livre reste entièrement lisible sans lui.</p></noscript>
</section>

<!-- Tout ce qui suit disparait pendant que le test tourne : on ne repond pas a
     trente situations avec une page de presentation sous les pieds. Le script
     le remet en place quand le resultat s'affiche. -->
<div class="landing" data-test-landing>

  <section class="landing-bloc">
    <h2>Ce que le test te rend</h2>
    <div class="landing-cards">
      <div class="landing-card">
        <small>Ton appui</small>
        <p>La capacité qui tient déjà, nommée. Celle sur laquelle le reste peut s'appuyer.</p>
      </div>
      <div class="landing-card">
        <small>Ta marche</small>
        <p>L'étape qui limite aujourd'hui l'effet de tout ce que tu fais déjà bien.</p>
      </div>
      <div class="landing-card">
        <small>Trois cartes</small>
        <p>Un diagnostic, un principe et une pratique, à utiliser cette semaine.</p>
      </div>
    </div>
    <p class="landing-note">Le résultat n'est pas une identité. Change quelque chose, repasse le test, il doit changer avec toi. <a href="/chapters/a2-comment-fonctionne-le-test.html">La méthode est publique</a>.</p>
  </section>

  <section class="landing-bloc">
    <h2>Explore le cadre</h2>
    <p>Le test mesure dix capacités qui se construisent les unes sur les autres. Un métier sans initiative produit un passager très qualifié. Un levier posé sur un travail qu'on n'a pas compris multiplie une erreur.</p>
    {% assign etapes = site.chapters | where_exp: "c", "c.step_number" | sort: "step_number" %}
    <ol class="landing-echelle">
      {% for etape in etapes %}
        <li>
          <a href="{{ etape.url }}">
            <em>{{ etape.step_number }}</em>
            <strong>{{ etape.title }}</strong>
            <span>{{ etape.description }}</span>
          </a>
        </li>
      {% endfor %}
    </ol>
    <p class="landing-note">L'échelle n'est pas un classement. Les étapes s'accumulent, elles ne se distribuent pas comme des grades, et personne ne les tient toutes en même temps sur tous les sujets.</p>
  </section>

  <section class="landing-bloc">
    {% assign entrees = site.chapters | where_exp: "c", "c.metadata.principle" %}
    <h2>Le livre</h2>
    <p><strong>Build Here</strong> est le playbook derrière le test. {{ etapes | size }} étapes, {{ entrees | size }} cartes, une idée par carte, deux minutes chacune. Tu en appliques déjà une partie sans les avoir nommées. D'autres vont te contredire, et c'est le but.</p>
    <p>Pour toi, pour ton équipe, pour ceux que tu formes. Tout est là, en accès libre. Et rien de ce que le livre demande n'attend un budget, une réorganisation, un meilleur employeur ou la permission de qui que ce soit. Ça commence là où tu es, avec ce que tu as sous la main.</p>
    <a class="landing-cta" href="/livre/">Ouvrir le livre →</a>
  </section>

  <section class="landing-bloc">
    <h2>Pour ton équipe</h2>
    <p>Une carte par semaine, trente minutes, six semaines. De quoi faire passer une conversation d'équipe du symptôme à la cause, sans réunion supplémentaire ni budget à demander.</p>
    <a class="landing-cta" href="/chapters/00-faire-tourner-ca-dans-ton-equipe.html">Faire tourner ça dans ton équipe →</a>
  </section>

</div>
