# Build Here

Un guide pratique pour ceux qui construisent sur ce continent.

Une carte, deux minutes, une idée qui tient seule. Chacune se lit sans avoir lu celles d'avant. Certaines portent la marque ⇄ et s'adressent à qui fixe les conditions.

## Lire en ligne

Le livre est disponible librement sur **[build-here.africa](https://build-here.africa)**.

## Tirer le livre

```sh
brew install weasyprint pandoc
bin/build-book          # les deux
bin/build-book pdf      # le PDF seul
bin/build-book epub     # l'EPUB seul
```

Sortie dans `build/`. Jekyll assemble le livre en une page HTML par format (`_pdf/`, corps commun dans `_includes/book-body.html`), WeasyPrint pagine le PDF, Pandoc empaquette l'EPUB.

Le PDF est au format A4 : couverture pleine page, sommaire paginé, une page noire par partie, et chaque ouverture de section comme chaque carte sur une page paire. L'EPUB se reflowe, donc il garde la couverture, la navigation et la mise en page d'une carte, mais pas les règles de pagination.

Les deux sont retirés automatiquement après chaque déploiement du site, par [`.github/workflows/book.yml`](.github/workflows/book.yml).

## Ce qu'il y a dedans

Une introduction, un mode d'emploi (*Comment lire ce livre*), **dix étapes** et cinq annexes.

Le premier mouvement te rend meilleur. Le second rend ton travail visible. Ce sont deux problèmes différents, et le second est le plus difficile des deux.

### Devenir meilleur

- **Curiosité** - elle est facturable, et son manque coûte aussi plus cher
- **Ego et honnêteté intellectuelle** - avoir tort ne coûte rien, le rester coûte cher
- **Hiérarchie** - respecte l'ancien, conteste l'idée
- **Ownership** - n'apporte pas la tâche, apporte le problème
- **Produit** - le ticket n'est pas le travail
- **Engineering** - faire simple est une performance technique
- **Exécution** - shipper crée de l'information
- **Apprentissage** - ton meilleur professeur ne travaille pas ici
- **Leadership** - on fabrique l'environnement dont on se plaint
- **Technologie et business** - ce qu'on sait construire décide ce qu'on peut vendre
- **Client** - parle à la personne qui a le problème
- **Distribution** - un produit que personne ne trouve n'existe pas

### Arrêter de le faire en silence

- **Laisser une trace** - une explication a une audience de un, une trace a une audience que tu ne choisis pas
- **Se faire trouver** - écrit et invisible, c'est un progrès d'exactement zéro
- **Devenir une référence** - ça arrive à quelqu'un d'autre, ailleurs, sans toi

Puis une conclusion : laisser quelque chose que le suivant pourra trouver.

Les annexes donnent le format d'une carte, les douze tests qu'elle doit survivre, et seize titres publiés entre 1954 et 2018 où tout ça était déjà écrit.

## Écrire la suivante

Il manque à ce livre les cartes que je ne pouvais pas écrire, parce que je n'ai pas eu ces échecs, sur ces marchés, sur ces stacks.

Elle s'envoie depuis **[build-here.africa/contribuer](https://build-here.africa/contribuer)**, sans compte à ouvrir, et la page donne un entretien à coller dans un assistant pour la préparer. Ce qui arrive par là devient une pull request sur ce dépôt. Si tu as déjà un compte, ouvre-la toi-même. Le chemin ne change rien à la relecture.

Le format est en [annexe 1](_chapters/a1-comment-ecrire-une-entree.md), les tests en [annexe 2](_chapters/a2-les-douze-tests.md), la mécanique dans [CONTRIBUTING.md](CONTRIBUTING.md). Si elle tient, elle rejoint le livre sous ton nom.

Pas besoin d'être connu. C'est à peu près le sujet.

## Licence

[Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Partage-le, adapte-le, utilise-le commercialement. Cite la source et garde les dérivés sous la même licence.

## Construit avec

- [Jekyll](https://jekyllrb.com/), générateur de site statique
- [GitHub Pages](https://pages.github.com/), hébergement
- Markdown, format du contenu

### Développement

```bash
git clone https://github.com/luuuc/build-here-book.git
cd build-here-book
bundle install
bundle exec jekyll serve
# http://localhost:4000
```

Le contenu vit dans `_chapters/`. Un fichier par carte, trié par le champ `order` du front matter.

## Contact

- **LinkedIn** : [Luc B. Perussault-Diallo](https://www.linkedin.com/in/luc-b-perussault-diallo-99525519)
- **Discussions** : [GitHub Discussions](https://github.com/luuuc/build-here-book/discussions)
