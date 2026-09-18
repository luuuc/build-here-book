# Brouillon de l'échelle

Ce dossier est un essai. Le préfixe `_` fait que Jekyll l'ignore : il ne rend
rien et ne casse rien. Si la direction ne va pas, la branche se supprime.

## Ce qu'il y a dedans

**Dix intros d'étape.** Chacune dit trois choses, dans cet ordre : ce que tu es
à ce niveau, ce qui t'y retient, à quoi tu vois que tu es passé au suivant.
C'est la seule chose qu'un opener de section ne faisait pas.

**Dix-huit cartes neuves**, pour les trois étapes que le livre n'avait jamais
écrites. Six pour l'ownership, six pour les systèmes, six pour le levier, paire
⇄ comprise à chaque fois.

**Deux cartes de métier** dont le lecteur par défaut n'est pas un ingénieur,
`02-03` et `02-04`. Sans elles, l'étape 2 contredisait la thèse du livre dans sa
première page.

**Trois cartes délocalisées.** `02-09`, `10-08` et `10-12` remplacent
`08-04`, `15-03` et `15-04`. Aucune ne sort du livre : leur argument tient
partout, seul l'habillage était local.

**Quatre pages d'ouverture et de clôture.** L'introduction, Comment lire ce
livre, la conclusion, et le morceau de `13-arreter-de-le-faire-en-silence.md`
qui va rejoindre `pourquoi-build-here.md`.

Les 23 cartes passent `bin/lint-entree`. La seule règle qui reste signalée est
que leur `part:` n'existe pas encore dans `_data/sommaire.yml`, ce qui est
normal tant que la migration n'a pas eu lieu.

## Ce qu'il reste à faire

La migration elle-même. `git mv` vers `_chapters`, renumérotation des 68 cartes
existantes en `étape.carte`, réécriture de `_data/sommaire.yml` en une liste de
dix, retrait des deux mouvements dans `_layouts/chapter.html`,
`_includes/book-body.html` et `_includes/epub-body.html`.

La suppression de `13-arreter-de-le-faire-en-silence.md` et l'insertion de son
morceau dans `pourquoi-build-here.md`.

La couverture, qui annonce encore « Deux mouvements · Quinze sections » dans
`_cover/cover.html` et `_pdf/book.html`.

Le détail est dans `.doc/plan-echelle.md`.
