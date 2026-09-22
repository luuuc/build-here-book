# Build Here

Un guide pratique pour commencer, progresser, développer une équipe et soutenir ceux qui construisent.

Une carte courte, une idée qui tient seule. Chacune se lit sans avoir lu celles d'avant. Certaines portent la marque ⇄ et s'adressent à qui fixe les conditions.

## Lire en ligne

Le livre est disponible librement sur **[build-here.africa](https://build-here.africa)**.

## Tirer le livre

```sh
brew install weasyprint pandoc
bin/build-book          # les deux
bin/build-book pdf      # le PDF seul
bin/build-book epub     # l'EPUB seul
```

Sortie dans `build/`. Jekyll assemble le livre en une page HTML par format (`_pdf/`, corps dans `_includes/book-body.html` et `_includes/epub-body.html`), WeasyPrint pagine le PDF, Pandoc empaquette l'EPUB.

Le PDF est au format A4 : couverture pleine page, sommaire paginé, une page noire par partie, et chaque ouverture de section comme chaque carte sur une page paire. L'EPUB se reflowe, donc il garde la couverture, la navigation et la mise en page d'une carte, mais pas les règles de pagination.

Les deux formats sont générés et publiés automatiquement après chaque déploiement du site, par [`.github/workflows/book.yml`](.github/workflows/book.yml).

## Ce qu'il y a dedans

Le livre s'adresse aux personnes qui veulent commencer à construire, approfondir leur pratique, développer une équipe ou soutenir des builders. Un emploi, un rôle de direction et une publication publique ne sont pas des conditions d'entrée.

Il comprend une introduction de 800 à 1 200 mots, dix ouvertures de capacité, **85 cartes**, une conclusion et une bibliographie compacte. Les parcours, le guide de lecture, les ateliers, la méthode du questionnaire, la bibliographie commentée, l'index par situation, les trois cas construits et les modèles sont des pages Jekyll à la racine, avec le layout `landing`. Ces ressources accompagnent le livre sans entrer dans ses éditions PDF et EPUB.

Les dix capacités suivent l'ordre du sommaire, sans classement ni prérequis obligatoires : état d'esprit, métier, autonomie, compréhension, livraison, ownership, systèmes, levier, leadership et référence. Chacune peut être travaillée à partir d'une difficulté, d'une force ou d'une occasion de pratiquer.

Les [quatre parcours](https://build-here.africa/parcours/) et l'[index par situation](https://build-here.africa/situations/) donnent un accès direct. Les exemples précisent leur caractère construit et montrent temps, accords, observations, limites et fin de l'engagement.

## Choisir une pratique

Le [questionnaire facultatif](https://build-here.africa/) propose dix étapes de six affirmations, une par capacité du livre. Chaque affirmation utilise six positions d'accord, avec des options séparées pour une situation jamais rencontrée ou des conditions manquantes.

Le résultat présente les gestes que le lecteur reconnaît dans sa pratique, reconnaît moins ou souhaite explorer, sans score global ni classement des personnes. Le lecteur choisit sa piste. Les réponses restent dans la mémoire de la page, sans envoi au service d'évaluation ni stockage persistant. Copier la piste permet de conserver le geste, ses limites, son suivi et les liens de lecture. La [méthode publique](https://build-here.africa/methode-du-test/) expose les limites de cette proposition éditoriale.

Le [guide d'atelier](https://build-here.africa/atelier/) prévoit une participation volontaire, une séance adaptable et un retour sur ce qui a changé. Le test individuel n'est pas un préalable et ne doit pas servir à classer l'équipe.

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

### Vérifier les changements

```sh
bundle exec jekyll build
node bin/verifier-index
node bin/lint-entree
node bin/verifier-lint
node bin/verifier-test-builder _site
```

Le linter donne un avis de format ; il ne valide pas le jugement éditorial. « Depuis ton siège » est facultatif, sans liste fermée de rôles ni nombre de lignes imposé. La pertinence des conseils, des limites et des exemples reste une relecture humaine.

Pour vérifier l'interface, ouvre le site local avec `agent-browser`, puis exécute `agent-browser eval --stdin < bin/verifier-test-builder-browser.js`. Ce script parcourt le vrai questionnaire et simule seulement les issues du presse-papiers. Les résultats historiques du test à scores restent documentés dans `worker/README.md` ; le client actuel ne les alimente plus.

Les fichiers de `docs/` relatifs à l'ancien test sont conservés comme archives de conception et signalés comme tels. Ils ne définissent pas le questionnaire actuel.

## Contact

- **LinkedIn** : [Luc B. Perussault-Diallo](https://www.linkedin.com/in/luc-b-perussault-diallo-99525519)
- **Discussions** : [GitHub Discussions](https://github.com/luuuc/build-here-book/discussions)
