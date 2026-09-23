---
layout: landing
lang: en

permalink: /en/

categories:
  - builders
  - pratiques

seo:
  description: "Build Here: practices to get started, get better, grow a team and back other builders. Cards, examples and templates, free to read."
  keywords: build here, book, builders, software engineering, product, ownership, leadership, practical guide

title: The book
description: Understand, try, observe and learn

traductions:
  fr: /book/
---

{%- assign entrees = site.chapters_en | where_exp: "c", "c.metadata.principle" -%}
{%- assign etapes = site.chapters_en | where_exp: "c", "c.step_number" -%}

<section class="bloc hero">
  <div class="colonne">
    <div class="hero-corps">
      <div>
        <p class="bloc-surtitre">The builder's playbook</p>
        <h1 class="hero-titre">Building is something you learn.</h1>
        <p class="hero-accroche">A builder sets out to improve a concrete situation, watches what their action produces, and learns from it for next time. You can start with no title, no team and nothing published.</p>
        <p class="hero-actions">
          <a class="bouton" href="/book/en/chapters/00-introduction.html">Start with the introduction →</a>
          <a class="bouton bouton--contour" href="{{ site.downloads[lang].pdf }}">Download the PDF</a>
        </p>
        <ul class="preuve">
          <li><strong>{{ entrees | size }}</strong> cards</li>
          <li><strong>{{ etapes | size }}</strong> capabilities</li>
          <li>no account</li>
          <li>CC BY-SA</li>
        </ul>
      </div>
      <img class="hero-image hero-couverture" src="/book/assets/images/couverture.png" alt="Build Here cover" width="1200" height="1800" />
    </div>
  </div>
</section>

<section class="bloc bloc--surface">
  <div class="colonne colonne--prose">
    <h2 class="bloc-titre">What is inside</h2>
    <p class="bloc-texte">{{ etapes | size }} capabilities, {{ entrees | size }} short cards. Each one reads on its own and offers a situation, a line of reasoning, and an action to adapt. The capabilities in the contents are reading markers, with no ranking and no required order.</p>
    <p class="bloc-texte">Usefulness can be a service delivered, a risk reduced, an exploration, reliability preserved, or knowledge passed on. Making work continue without its author is one contribution among those other forms.</p>
  </div>
</section>

<section class="bloc">
  <div class="colonne">
    <h2 class="bloc-titre">Choose your path</h2>
    <p class="bloc-texte">Three cards and a first attempt, according to what you want to do now.</p>
    {% include parcours.html %}
    <p class="bloc-apres">Have a precise situation in mind? The <a href="/en/situations/">index by situation</a> takes you straight to the cards involved. To explore with no need yet defined, the <a href="/en/">builder test</a> gives your level and helps you pick a line of work.</p>
  </div>
</section>

<section class="bloc bloc--surface">
  <div class="colonne colonne--prose">
    <h2 class="bloc-titre">From reading to an attempt</h2>
    <p class="bloc-texte">Choose a single practice. Say what you can try, the agreements or backing it needs, the time available, and the work this effort displaces. The book does not ask you to make up for a missing condition alone.</p>
    <p class="bloc-texte">The <a href="/en/templates/">examples and templates</a> show how to prepare an attempt, observe a result, and agree an ending or a handover. The cases are constructed; they illustrate an approach, with no promise of the same result where you are.</p>
    <p class="bloc-texte">For a group, the <a href="/en/workshop/">workshop guide</a> offers a voluntary session and feedback that fits. A supporter can bring a review, time, or an agreed access, without directing the work.</p>
  </div>
</section>

<section class="bloc bloc--nuit">
  <div class="colonne">
    <h2 class="bloc-titre">Read it, take it, adapt it</h2>
    <p class="bloc-texte">The book is free to read. The downloads match the latest published edition.</p>
    <div class="grille grille--trois">
      <a class="carte-livre" href="/book/en/chapters/00-introduction.html"><span class="carte-livre-type">Online</span><span class="carte-livre-titre">Read in the browser</span><span class="carte-livre-meta">{{ entrees | size }} cards, one per page</span></a>
      <a class="carte-livre" href="{{ site.downloads[lang].pdf }}"><span class="carte-livre-type">PDF</span><span class="carte-livre-titre">The full printing</span><span class="carte-livre-meta">Print layout</span></a>
      <a class="carte-livre" href="{{ site.downloads[lang].epub }}"><span class="carte-livre-type">EPUB</span><span class="carte-livre-titre">For an e-reader</span><span class="carte-livre-meta">Kindle: send the file</span></a>
    </div>
    <p class="bloc-apres">The <a href="/en/about/">About page</a> explains how to send feedback, find the sources, and reuse the content.</p>
  </div>
</section>

<section class="bloc" id="contents">
  <div class="colonne colonne--prose">
    <h2 class="bloc-titre">Contents</h2>
    {% include sommaire-livre.html %}
  </div>
</section>
