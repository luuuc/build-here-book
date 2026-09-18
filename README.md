# Build Here

Un guide pratique pour ceux qui construisent.

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

Dix étapes, dans cet ordre, et chacune s'appuie sur les précédentes.

1. **L'état d'esprit** - je rends les choses meilleures
2. **Le métier** - je suis excellent à quelque chose
3. **L'autonomie** - donne-moi le problème, pas la procédure
4. **La compréhension** - je comprends toute l'entreprise
5. **La livraison** - je mets des choses dans le réel
6. **L'ownership** - je réponds du résultat
7. **Les systèmes** - je rends la prochaine fois plus facile
8. **Le levier** - je multiplie mon impact
9. **Le leadership** - je fabrique des builders autour de moi
10. **La référence** - on apprend de ma façon de travailler

Les huit premières rendent meilleur. Les deux dernières sont celles que presque personne ne monte : rien dans le fait de bien travailler ne produit une trace, il faut le décider.

Puis une conclusion : un builder en onze lignes, et laisser quelque chose que le suivant pourra trouver.

Les annexes expliquent les quatre formats de cartes, la méthode de l'Ultimate Builder Test, et seize titres publiés entre 1954 et 2018 où tout ça était déjà écrit.

## Trouver sa prochaine marche

L'**[Ultimate Builder Test](https://build-here.africa/test-builder/)** présente trente situations de travail. Il situe le dernier niveau dont les prérequis tiennent, repère la marche suivante et construit un parcours de trois cartes. Le calcul se fait dans le navigateur ; le backend ne reçoit qu'un résumé anonyme des dix scores pour améliorer les questions.

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
