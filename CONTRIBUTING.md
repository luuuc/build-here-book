# Écrire la suivante

Il manque à ce livre les entrées que je ne pouvais pas écrire, parce que je n'ai pas eu ces échecs, sur ces marchés, sur ces stacks.

Ce fichier donne la mécanique. Le format d'une entrée est en [annexe 1](_chapters/a1-comment-ecrire-une-entree.md), les tests qu'elle doit survivre en [annexe 2](_chapters/a2-les-douze-tests.md). Lis les deux avant d'écrire, pas après.

---

## Deux portes, le même endroit

**Une pull request.** La discussion reste en ligne, sous ton nom, et sert au suivant.

**Un mail** à l'adresse de contact du site. Le texte dans le corps du message, je m'occupe du fichier.

Rien ne distingue les entrées arrivées par l'une ou par l'autre, et la relecture est la même. Si tu n'as jamais ouvert de pull request, prends le mail sans y réfléchir, ou prends la pull request et lis l'entrée *Ta première contribution*, qui décrit exactement ce qui va se passer.

---

## Ce que j'accepte

**Une entrée.** Le vrai sujet de ce dépôt. Une idée, cinq blocs, moins de deux minutes de lecture.

**Un désaccord avec une entrée existante.** Y compris une des miennes. L'annexe 2 s'applique dans les deux sens, à l'écriture comme au démontage. Ouvre une [discussion](../../discussions) plutôt qu'une pull request, sauf si tu proposes le texte de remplacement.

**Une correction.** Coquille, lien mort, erreur de fait. Pull request directe, aucune cérémonie.

**Une traduction.** Dis-le d'abord dans une discussion, pour qu'on ne le fasse pas deux fois.

**Une ligne dans l'annexe 4.** Un dépôt, des poids, un jeu de données, un groupe qui a une prochaine date. Une seule règle, un inconnu peut en faire quelque chose ce soir, sans permission et sans introduction. Le fichier est `_data/deja-en-ligne.yml`, les sept champs sont documentés en tête. Ordre alphabétique, quinze mots de faits maximum, aucun adjectif. Tu n'as pas besoin d'être l'auteur de la chose que tu ajoutes.

---

## Écrire une entrée, mécaniquement

Un fichier par entrée, dans `_chapters/`.

**Nom du fichier.** `SS-NN-titre-en-slug.md`, où `SS` est le numéro de section et `NN` la position dans la section. Exemple, `04-07-mon-titre.md`. Prends le numéro libre suivant dans ta section, je renumérote à la fin.

**Front matter.** Copie celui de n'importe quelle entrée existante et change ce qui te concerne.

```yaml
---
layout: chapter
title: "Le titre de l'entrée"
part: "Ownership"
order: 999
metadata:
  principle: "999"
  reading_time_in_minutes: 2
categories:
  - ownership
  - responsabilite
seo:
  description: "La phrase la plus forte de l'entrée."
  keywords: "build here, ownership, tech afrique, builder"
---
```

Laisse `order` et `principle` à `999`. Ce sont des champs de séquence, ils se recalculent à l'intégration et ils ne sont pas ton problème.

**Le corps.** Six `##`, dans cet ordre, avec ces titres exacts.

```
## Le réflexe
## Le réflexe builder
## Pourquoi
## À essayer
## Depuis ton siège
## À discuter
```

`Depuis ton siège` est une liste de quatre à six lignes, une par siège, cent caractères maximum après les deux-points. Les sièges et les cinq règles du bloc sont dans [Comment écrire une entrée](https://build-here.africa/chapters/a1-comment-ecrire-une-entree.html).

**Deux règles de forme qui font échouer une relecture.** Aucun tiret cadratin, aucun tiret demi-cadratin. Apostrophes droites, pas courbes.

**Voir le rendu en local.**

```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000
```

---

## Ce qui se passe ensuite

L'entrée est relue contre les douze tests, et la relecture est écrite dans la pull request. Elle porte sur le texte, jamais sur la personne.

Si elle échoue, tu sauras sur quel test. Une entrée échoue en général dans un de trois états et les trois sont réparables. Deux idées collées ensemble, un principe sans situation, ou une situation sans principe.

Si elle tient, elle rejoint le livre **sous ton nom**, avec le lien de ton choix. Pas besoin d'être connu, pas besoin d'avoir déjà écrit, pas besoin de me connaître. C'est à peu près le sujet du livre.

---

## Licence

En contribuant, tu acceptes que ton texte soit publié sous [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), comme le reste du livre. Tu gardes la paternité de ce que tu as écrit et tu peux le republier où tu veux.
