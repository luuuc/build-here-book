---
layout: chapter
title: "Lis le code source"
part: "Engineering"
order: 35
metadata:
  principle: "26"
  reading_time_in_minutes: 2
categories:
  - engineering
  - simplicite
  - technique
seo:
  description: "Presque tout ce dont tu dépends est lisible. Le framework, le client HTTP, le driver de base de données, le script de déploiement."
  keywords: "build here, engineering, tech afrique, builder, code, source"
---

## Le réflexe

La librairie ne se comporte pas comme prévu. Tu cherches, tu essaies trois réponses d'un thread de forum, et tu gardes celle qui fait taire l'erreur.

## Le réflexe builder

Tu ouvres le fichier. Tu lis la fonction que tu appelles.

## Pourquoi

Presque tout ce dont tu dépends est lisible. Le framework, le client HTTP, le driver de base de données, le script de déploiement. C'est déjà sur ton disque, dans le dossier des dépendances.

La plupart des gens ne l'ouvrent jamais, ce qui te laisse avec ce que la documentation a choisi de couvrir. Elle est en retard, partielle, et n'a pas été écrite pour ton cas. Le code, si. Un timeout par défaut à trente secondes. Une clé de cache qui inclut la locale, ce qui explique pourquoi le staging allait bien et la prod non.

Lis seulement la fonction que tu appelles vraiment, et saute les builds minifiés et les clients générés. La personne qui te répondrait en trente secondes n'existe pas dans le bâtiment, et le support du fournisseur travaille pendant que tu dors.

Personne n'a le droit de te dire que ce savoir est gardé. Il n'y a pas de porte. C'est ouvert, c'est complet, c'est déjà sur ta machine, et c'est la même copie, au bit près, que celle que lit la personne que tu prends pour l'expert.

## À essayer

La prochaine fois qu'une librairie te surprend, ouvre le fichier avant d'ouvrir l'onglet de recherche.

Quinze minutes. Tu ne comprendras pas le projet. Tu comprendras une fonction, définitivement.

## Depuis ton siège

- **Product** : le comportement par défaut d'une dépendance est une décision produit que tu n'as pas prise.
- **Design** : le composant que tu utilises impose ses règles. Ouvre-le avant de dessiner autour.
- **Manager** : un après-midi passé à lire un driver ressemble à un après-midi passé à lire. Dis le contraire.
- **Customer-facing** : le bug que décrit le client est parfois documenté nulle part et lisible en dix minutes.
- **Recrutement** : demande une dépendance dont le candidat a lu le code, et ce qu'il y a trouvé.

## À discuter

Qui ici a lu le code source d'une dépendance sans laquelle notre produit ne tourne pas ?
