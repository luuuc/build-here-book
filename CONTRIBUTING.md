# Écrire la suivante

Il manque à ce livre les cartes que je ne pouvais pas écrire, parce que je n'ai pas eu ces échecs, sur ces marchés, sur ces stacks.

Ce fichier donne la mécanique. Le format d'une carte est en [annexe 1](_chapters/a1-comment-ecrire-une-entree.md), les tests qu'elle doit survivre en [annexe 2](_chapters/a2-les-douze-tests.md). Lis les deux avant d'écrire, pas après.

---

## Où l'envoyer

**Une pull request.** Tu es déjà ici, c'est le chemin le plus court. La discussion reste en ligne, sous ton nom, et sert au suivant.

**[build-here.africa/contribuer](https://build-here.africa/contribuer).** Un formulaire, aucun compte à ouvrir, et il marche depuis un téléphone. La même page donne un entretien de huit questions à coller dans un assistant, qui les pose une par une et assemble le fichier au format ci-dessous. Ce qui arrive par là devient une pull request sur ce dépôt après modération, donc la relecture finit au même endroit.

**Un mail** à l'adresse de contact du site, pour une question, ou pour le cas où tu ne peux pas signer ton carte. Ce n'est pas le canal d'envoi d'une carte.

Rien ne distingue les cartes selon leur chemin d'arrivée, et la relecture est la même. Si tu n'as jamais ouvert de pull request, lis la carte *Ta première contribution*, qui décrit exactement ce qui va se passer.

---

## Ce que j'accepte

**Une carte.** Le vrai sujet de ce dépôt. Une idée, six blocs, moins de deux minutes de lecture.

**Un désaccord avec une carte existante.** Y compris une des miennes. L'annexe 2 s'applique dans les deux sens, à l'écriture comme au démontage. Ouvre une [discussion](../../discussions) plutôt qu'une pull request, sauf si tu proposes le texte de remplacement.

**Une correction.** Coquille, lien mort, erreur de fait. Pull request directe, aucune cérémonie.

**Une traduction.** Dis-le d'abord dans une discussion, pour qu'on ne le fasse pas deux fois.

**Une ligne dans l'annexe 4.** Un dépôt, des poids, un jeu de données, un groupe qui a une prochaine date. Une seule règle, un inconnu peut en faire quelque chose ce soir, sans permission et sans introduction. Le fichier est `_data/deja-en-ligne.yml`, les sept champs sont documentés en tête. Ordre alphabétique, quinze mots de faits maximum, aucun adjectif. Tu n'as pas besoin d'être l'auteur de la chose que tu ajoutes.

---

## Écrire une carte, mécaniquement

Un fichier par carte, dans `_chapters/`.

**Nom du fichier.** `EE-NN-titre-en-slug.md`, où `EE` est le numéro d'étape et `NN` la position dans l'étape. Exemple, `04-07-mon-titre.md`. Prends le numéro libre suivant dans ton étape, je renumérote à la fin.

**Front matter.** Copie celui de n'importe quelle carte existante et change ce qui te concerne.

```yaml
---
layout: chapter
title: "Le titre de la carte"
author: "Ton nom"
author_link: "https://là-où-tu-veux-qu-on-te-trouve"
part: "L'ownership"
order: 999
metadata:
  principle: "999"
  reading_time_in_minutes: 2
categories:
  - ownership
  - responsabilite
seo:
  description: "La phrase la plus forte de la carte."
  keywords: "build here, ownership, tech afrique, builder"
---
```

Laisse `order` et `principle` à `999`. Ce sont des champs de séquence, ils se recalculent à l'intégration et ils ne sont pas ton problème.

`author` est ton nom tel que tu veux le lire dans le livre. `author_link` est facultatif et pointe où tu veux. Les deux n'existent que sur les cartes venues de quelqu'un d'autre que moi.

**Le corps.** Six `##`, dans cet ordre, avec ces titres exacts.

```
## Le réflexe
## Le réflexe builder
## Pourquoi
## À essayer
## Depuis ton siège
## À discuter
```

`Depuis ton siège` est une liste de quatre à six lignes, une par siège, cent caractères maximum après les deux-points. Les sièges et les cinq règles du bloc sont dans [Comment écrire une carte](https://build-here.africa/chapters/a1-comment-ecrire-une-entree.html).

**L'index par symptôme.** Ton carte doit apparaître dans [Ce qui t'agace cette semaine](https://build-here.africa/chapters/a5-ce-qui-tagace-cette-semaine.html), une ligne, à gauche la phrase qu'on dit quand on a le problème. Écris-la si elle te vient, sinon je la pose à l'intégration, comme `order`. `bin/verifier-index` dit ce qui manque.

**Deux règles de forme qui font échouer une relecture.** Aucun tiret cadratin, aucun tiret demi-cadratin. Apostrophes droites, pas courbes.

**Voir le rendu en local.**

```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000
```

---

## Ce qui se passe ensuite

La carte est relue contre les douze tests, et la relecture est écrite dans la pull request. Elle porte sur le texte, jamais sur la personne.

Si elle échoue, tu sauras sur quel test. Une carte échoue en général dans un de trois états et les trois sont réparables. Deux idées collées ensemble, un principe sans situation, ou une situation sans principe.

Si elle tient, elle rejoint le livre **sous ton nom**, avec le lien de ton choix. Pas besoin d'être connu, pas besoin d'avoir déjà écrit, pas besoin de me connaître. C'est à peu près le sujet du livre.

---

## Licence

En contribuant, tu acceptes que ton texte soit publié sous [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), comme le reste du livre. Tu gardes la paternité de ce que tu as écrit et tu peux le republier où tu veux.
