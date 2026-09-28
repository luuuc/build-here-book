# Build Here

Un guide pratique pour commencer, progresser, développer une équipe et soutenir ceux qui construisent.

Une carte courte, une idée qui tient seule. Chacune se lit sans avoir lu celles d'avant. Certaines portent la marque ⇄ et s'adressent à qui fixe les conditions.

## Lire en ligne

Le livre est disponible librement sur **[build-here.africa](https://build-here.africa)**.

## Tirer le livre

```sh
brew install weasyprint pandoc
bin/build-book          # les deux, en français
bin/build-book pdf      # le PDF seul
bin/build-book epub     # l'EPUB seul
bin/build-book all en   # les deux, en anglais
```

Sortie dans `build/`. Jekyll assemble le livre en une page HTML par format (`_pdf/`, corps dans `_includes/book-body.html` et `_includes/epub-body.html`), WeasyPrint pagine le PDF, Pandoc empaquette l'EPUB.

Le PDF est au format A4 : couverture pleine page, sommaire paginé, une page noire par partie, et chaque ouverture de section comme chaque carte sur une page paire. L'EPUB se reflowe, donc il garde la couverture, la navigation et la mise en page d'une carte, mais pas les règles de pagination.

Les quatre fichiers sont générés et publiés automatiquement après chaque déploiement du site, par [`.github/workflows/book.yml`](.github/workflows/book.yml).

## Les langues

Le livre s'écrit en français et paraît en anglais. Chaque langue a ses propres mots dans l'adresse : le français sous `/livre/`, l'anglais sous `/book/`. Les deux versions sont complètes : mêmes 98 entrées, mêmes pages, même questionnaire, même tirage.

Aucun gabarit ne porte de mot. Les chaînes de l'interface, le sommaire, les libellés de surtitre, et le menu du site vivent dans `_data/fr/` et `_data/en/`, un fichier par langue et les mêmes clés des deux côtés. `_includes/langue.html`, inclus en tête de chaque gabarit, pose les variables pour le reste de la page : `lang`, `t` pour les chaînes, `sommaire`, `livre` pour les entrées de cette langue.

| | français | anglais |
| --- | --- | --- |
| entrées | `_chapters/` | `_chapters_en/` |
| fichiers machine | `livre/` | `book/` |
| chaînes | `_data/fr/` | `_data/en/` |
| questionnaire | `test-builder-contenu.js` | `test-builder-contenu-en.js` |
| adresses | `/livre/`, `/livre/chapitres/…` | `/book/`, `/book/chapters/…` |
| tirage | `build/build-here.pdf` | `build/build-here-en.pdf` |

Les anciennes adresses (`/book/chapters/…` en français, `/book/en/…`) sont redirigées par le Worker `site/workers/book-proxy`. Les styles et images communs restent sous `/book/assets/`. Chaque carte a une copie markdown : `.html` devient `.md`.

Les règles du questionnaire ne sont écrites qu'une fois, dans `assets/javascripts/test-builder-model.js`. Il ne contient aucune phrase : `creer(contenu)` reçoit le contenu de la langue chargée. `bin/verifier-test-builder _site fr` et `… en` font tourner les mêmes règles de niveau et les mêmes 160 combinaisons de pistes sur chacun.

Une page qui a une jumelle dans l'autre langue la déclare dans son front matter. Le sélecteur de langue de l'en-tête et les balises `hreflang` lisent la même clé :

```yaml
traductions:
  en: /book/chapters/01-01-curiosity-is-billable.html
```

Sans cette clé, le sélecteur renvoie à l'accueil de l'autre langue, et aucun `hreflang` n'est écrit : mieux vaut pas d'annonce qu'une annonce fausse.

Les fichiers lus par les machines suivent : `llms.txt`, `llms-full.txt`, et `book.json` sous `/livre/` et sous `/book/`. Le texte légal de la licence n'existe qu'en anglais chez Creative Commons ; les deux pages partagent donc `_includes/cc-by-sa-4.html`.

Les vérificateurs de `bin/` lisent `_chapters/` pour les règles de l'annexe 1 : elles sont écrites pour le texte français.

Ajouter une langue : un dossier dans `_data/`, une collection `chapters_<code>` dans `_config.yml`, une entrée dans `site.langues`, un dossier de pages, un fichier de contenu pour le questionnaire, une ligne dans `LANGUES` du plugin `llms_full.rb`. `_includes/langue.html` n'a pas à changer.

## Ce qu'il y a dedans

Le livre s'adresse aux personnes qui veulent commencer à construire, approfondir leur pratique, développer une équipe ou soutenir des builders. Un emploi, un rôle de direction et une publication publique ne sont pas des conditions d'entrée.

Il comprend une introduction de 800 à 1 200 mots, dix ouvertures de capacité, **87 cartes**, une conclusion et une bibliographie compacte. Les parcours, le guide de lecture, les ateliers, la méthode du questionnaire, la bibliographie commentée, l'index par situation, les trois cas construits et les modèles sont des pages Jekyll à la racine, avec le layout `landing`. Ces ressources accompagnent le livre sans entrer dans ses éditions PDF et EPUB.

Les dix capacités suivent l'ordre du sommaire, sans classement ni prérequis obligatoires : état d'esprit, métier, autonomie, compréhension, livraison, ownership, systèmes, levier, leadership et référence. Chacune peut être travaillée à partir d'une difficulté, d'une force ou d'une occasion de pratiquer.

Les [quatre parcours](https://build-here.africa/parcours/) et l'[index par situation](https://build-here.africa/situations/) donnent un accès direct. Les exemples précisent leur caractère construit et montrent temps, accords, observations, limites et fin de l'engagement.

## Choisir une pratique

Le [questionnaire facultatif](https://build-here.africa/test-du-builder/) pose cinquante questions, cinq par capacité du livre : des habitudes liées à un moment, des questions vérifiables, cinq « à quand remonte la dernière fois » dans tout le test, puis une « la dernière fois » et une situation par capacité. Deux réponses restent hors calcul : la situation ne s'est pas présentée, ou le cadre ne le permettait pas.

Le résultat donne un niveau de builder de 1 à 5, l'étape où la pratique est solide et la réponse qui retient à l'étape suivante. Les seuils sont provisoires, fixés à la main à partir du livre. Une étape limitée par le cadre ne baisse pas le niveau. Le lecteur choisit ensuite sa piste. Rien n'est envoyé au service d'évaluation. Les réponses ne sont gardées que si le lecteur coche la case prévue, dans son navigateur, sous une seule clé ; le passage suivant montre alors ce qui a bougé. Copier la piste permet de conserver le geste, ses limites, son suivi et les liens de lecture. La [méthode publique](https://build-here.africa/methode-du-test/) expose les limites de cette proposition éditoriale.

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
# http://localhost:4000/livre/ et http://localhost:4000/book/
```

Avec le site à côté (`../site`), `bin/dev` dans le site sert les deux sur
http://localhost:3000 : le livre sous `/livre/` et `/book/`, reconstruit à chaque
modification, et les liens entre le site et le livre marchent.

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

Pour vérifier l'interface, ouvre le site local avec `agent-browser`, puis exécute `agent-browser eval --stdin < bin/verifier-test-builder-browser.js`. Ce script parcourt le vrai questionnaire et simule seulement les issues du presse-papiers. Les résultats historiques de l'ancien test à scores restent documentés dans `worker/README.md` ; le client actuel ne les alimente plus.

Les fichiers de `docs/` relatifs à l'ancien test sont conservés comme archives de conception et signalés comme tels. Ils ne définissent pas le questionnaire actuel.

## Contact

- **LinkedIn** : [Luc B. Perussault-Diallo](https://www.linkedin.com/in/luc-b-perussault-diallo-99525519)
- **Discussions** : [GitHub Discussions](https://github.com/luuuc/build-here-book/discussions)
