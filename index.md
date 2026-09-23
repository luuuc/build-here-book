---
layout: landing

permalink: /

categories:
  - builders
  - pratiques

seo:
  description: "Build Here : des pratiques pour commencer, progresser, développer une équipe et soutenir des builders. Cartes, exemples et modèles en accès libre."
  keywords: build here, livre, builders, ingénierie logicielle, produit, ownership, leadership, guide pratique

title: Le livre
description: Comprendre, essayer, observer et apprendre

# La jumelle anglaise, pour le selecteur de langue et les balises hreflang.
traductions:
  en: /book/en/
---

{%- assign entrees = site.chapters | where_exp: "c", "c.metadata.principle" -%}
{%- assign etapes = site.chapters | where_exp: "c", "c.step_number" -%}

<section class="bloc hero">
  <div class="colonne">
    <div class="hero-corps">
      <div>
        <p class="bloc-surtitre">Le playbook des builders</p>
        <h1 class="hero-titre">Construire, ça s'apprend.</h1>
        <p class="hero-accroche">Un builder cherche à améliorer concrètement une situation, observe ce que son action produit et apprend pour la suite. Tu peux commencer sans titre, sans équipe et sans réalisation publique.</p>
        <p class="hero-actions">
          <a class="bouton" href="/book/chapters/00-introduction.html">Commencer par l'introduction →</a>
          <a class="bouton bouton--contour" href="{{ site.downloads[lang].pdf }}">Télécharger le PDF</a>
        </p>
        <ul class="preuve">
          <li><strong>{{ entrees | size }}</strong> cartes</li>
          <li><strong>{{ etapes | size }}</strong> capacités</li>
          <li>sans compte</li>
          <li>CC BY-SA</li>
        </ul>
      </div>
      <img class="hero-image hero-couverture" src="/book/assets/images/couverture.png" alt="Couverture de Build Here" width="1200" height="1800" />
    </div>
  </div>
</section>

<section class="bloc bloc--surface">
  <div class="colonne colonne--prose">
    <h2 class="bloc-titre">Ce que tu trouves dedans</h2>
    <p class="bloc-texte">{{ etapes | size }} capacités, {{ entrees | size }} cartes courtes. Chacune se lit indépendamment et propose une situation, un raisonnement et une action à adapter. Les étapes du sommaire sont des repères de lecture, sans classement ni prérequis obligatoires.</p>
    <p class="bloc-texte">L'utilité peut être un service rendu, un risque réduit, une exploration, une fiabilité préservée ou un savoir transmis. Faire continuer un travail sans son auteur est une contribution parmi ces autres formes.</p>
  </div>
</section>

<section class="bloc">
  <div class="colonne">
    <h2 class="bloc-titre">Choisir ton parcours</h2>
    <p class="bloc-texte">Trois cartes et un premier essai selon ce que tu veux faire maintenant.</p>
    {% include parcours.html %}
    <p class="bloc-apres">Une situation précise en tête ? L'<a href="/situations/">index par situation</a> mène directement aux cartes concernées. Pour explorer sans besoin déjà défini, le <a href="/">test du builder</a> donne ton niveau et t'aide à choisir une piste.</p>
  </div>
</section>

<section class="bloc bloc--surface">
  <div class="colonne colonne--prose">
    <h2 class="bloc-titre">Passer de la lecture à un essai</h2>
    <p class="bloc-texte">Choisis une seule pratique. Précise ce que tu peux essayer, les accords ou appuis nécessaires, le temps disponible et le travail que cet effort déplace. Le livre n'exige pas de compenser seul une condition manquante.</p>
    <p class="bloc-texte">Les <a href="/modeles/">exemples et modèles</a> montrent comment préparer un essai, observer un résultat et convenir d'une fin ou d'un relais. Les cas sont construits ; ils illustrent une démarche, sans promettre le même résultat chez toi.</p>
    <p class="bloc-texte">Pour un groupe, le <a href="/atelier/">guide d'atelier</a> propose une séance volontaire et un retour adapté. Un supporter peut apporter une relecture, du temps ou un accès convenu, sans diriger le travail.</p>
  </div>
</section>

<section class="bloc bloc--nuit">
  <div class="colonne">
    <h2 class="bloc-titre">Lire, emporter, adapter</h2>
    <p class="bloc-texte">Le livre est en accès libre. Les téléchargements correspondent à la dernière édition publiée.</p>
    <div class="grille grille--trois">
      <a class="carte-livre" href="/book/chapters/00-introduction.html"><span class="carte-livre-type">En ligne</span><span class="carte-livre-titre">Lire dans le navigateur</span><span class="carte-livre-meta">{{ entrees | size }} cartes, une par page</span></a>
      <a class="carte-livre" href="{{ site.downloads[lang].pdf }}"><span class="carte-livre-type">PDF</span><span class="carte-livre-titre">Le tirage complet</span><span class="carte-livre-meta">Mise en page d'impression</span></a>
      <a class="carte-livre" href="{{ site.downloads[lang].epub }}"><span class="carte-livre-type">EPUB</span><span class="carte-livre-titre">Pour une liseuse</span><span class="carte-livre-meta">Kindle : envoyer le fichier</span></a>
    </div>
    <p class="bloc-apres">La <a href="/a-propos/">page À propos</a> explique comment faire un retour, retrouver les sources et réutiliser le contenu.</p>
  </div>
</section>

<section class="bloc" id="sommaire">
  <div class="colonne colonne--prose">
    <h2 class="bloc-titre">Sommaire</h2>
    {% include sommaire-livre.html %}
  </div>
</section>
