---
layout: page
permalink: /contribuer/

categories:
  - contribution
  - builders

seo:
  description: Écris l'entrée que ce livre n'a pas. Le format, les tests, et un formulaire qui te répond en quelques secondes sur ce qui manque.
  keywords: build here, contribuer, écrire une entrée, contribution, builders afrique

title: Écrire la suivante
description: L'entrée que ce livre n'a pas
---

{% assign c = site.data.interface.contribution %}

Il manque à ce livre les entrées que je ne pouvais pas écrire, parce que je n'ai pas eu ces échecs, sur ces marchés, sur ces stacks.

Le format est en [annexe 1](/chapters/a1-comment-ecrire-une-entree.html), les tests qu'une entrée doit survivre en [annexe 2](/chapters/a2-les-douze-tests.html). Lis les deux avant d'écrire, pas après.

Écrire un premier texte public est difficile pour tout le monde, partout. C'est le sujet de [Ta première contribution](/chapters/16-01-ta-premiere-contribution.html) et du [Quatrième mois](/chapters/15-02-le-quatrieme-mois.html). Rien ici ne demande d'avoir déjà écrit.

## {{ site.data.interface.contribution.titre }}

<div class="contrib" id="contrib"
     data-api="https://api.build-here.africa"
     data-recue="{{ site.data.interface.contribution.envoye }}">

  <div class="contrib-portes">
    <button type="button" class="contrib-porte" data-porte="soi" aria-pressed="false">{{ c.soi }}</button>
    <button type="button" class="contrib-porte" data-porte="ia" aria-pressed="false">{{ c.ia }}</button>
  </div>

  <div class="contrib-aide" data-aide="soi" hidden>
    <p>Les six blocs, dans cet ordre, avec ces titres exacts.</p>
    <pre><code>## Le réflexe
## Le réflexe builder
## Pourquoi
## À essayer
## Depuis ton siège
## À discuter</code></pre>
    <p>Le front matter se copie sur n'importe quelle entrée du livre. Laisse <code>order</code> et <code>principle</code> à 999, ce sont des champs de séquence et ils ne sont pas ton problème.</p>
  </div>

  <div class="contrib-aide" data-aide="ia" hidden>
    <p>Copie ce texte, colle-le dans ton assistant, réponds aux questions, puis recolle le fichier qu'il produit.</p>
    <pre><code id="entretien">{{ site.data.interface.contribution.entretien | strip }}</code></pre>
    <p><button type="button" class="contrib-copier" data-copier="entretien">{{ c.copier }}</button></p>
  </div>

  <p class="contrib-tri">{{ site.data.interface.contribution.tri | strip | newline_to_br }}</p>

  <!-- Sans JavaScript, ce formulaire part en POST classique vers le Worker,
       qui repond une page. Le contrôle immediat est un confort, pas une
       condition de l'envoi : un envoi doit passer sur une mauvaise connexion,
       depuis un telephone. -->
  <form class="contrib-form" method="post" action="https://api.build-here.africa/contribution">
    <label>
      Ton nom, tel que tu veux le lire dans le livre
      <input type="text" name="auteur" maxlength="120" required>
    </label>

    <label>
      Un lien, où tu veux qu'on te trouve. Facultatif
      <input type="url" name="auteur_lien" maxlength="300" placeholder="https://">
    </label>

    <fieldset>
      <legend>{{ site.data.interface.commentaire.contact }}</legend>
      <label class="contrib-radio"><input type="radio" name="canal" value="mail" checked> Mail</label>
      <label class="contrib-radio"><input type="radio" name="canal" value="whatsapp"> WhatsApp</label>
      <input type="text" name="contact" maxlength="200" required>
    </fieldset>

    <label>
      L'entrée, en markdown, front matter compris
      <textarea name="markdown" rows="18" required spellcheck="false"></textarea>
    </label>

    <!-- Le champ piege. Un humain ne le voit pas et ne le remplit jamais. -->
    <div class="contrib-piege" aria-hidden="true">
      <label>Ne remplis pas ce champ<input type="text" name="site" tabindex="-1" autocomplete="off"></label>
    </div>

    <input type="hidden" name="jeton" value="">
    <input type="hidden" name="client" value="">

    <div class="contrib-actions">
      <button type="submit" class="contrib-envoyer">{{ site.data.interface.contribution.envoyer }}</button>
      <span class="contrib-etat" role="status"></span>
    </div>
  </form>

  <pre class="contrib-rapport" hidden></pre>
</div>

## Ce qui se passe ensuite

Je lis tout. L'entrée est relue contre les douze tests, et si elle échoue tu sauras sur quel test, ce qui vaut mieux qu'un silence poli.

Si elle tient, elle rejoint le livre **sous ton nom**, avec le lien de ton choix. Pas besoin d'être connu, pas besoin d'avoir déjà écrit, pas besoin de me connaître.

Si tu as un compte GitHub, l'autre porte est [une pull request](https://github.com/{{ site.repository }}/blob/main/CONTRIBUTING.md). La discussion y reste en ligne, en public, et elle sert au suivant.

<!-- Le script ne sert que sur cette page : il n'est pas dans foot.html, qui
     est charge par le livre entier. -->
<script src="/assets/javascripts/contribuer.js"></script>
