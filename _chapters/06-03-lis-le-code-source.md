---
layout: chapter
title: "Lis le code source"
part: "Engineering"
order: 34
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

> "Ouvre le fichier et lis la fonction."

## Pourquoi

Presque tout ce dont tu dépends est lisible. Le framework, le client HTTP, le driver de base de données, le script de déploiement. C'est sur ton disque en ce moment, dans le dossier des dépendances, et ça ne t'a rien coûté.

La plupart des gens ne l'ouvrent jamais, ce qui te laisse avec ce que la documentation a choisi de couvrir. Une documentation est en retard, partielle, et n'a pas été écrite pour ton cas. Le code, si. Ce que tu trouves est petit et utile dans l'heure. Un timeout par défaut à trente secondes. Une clé de cache qui inclut la locale, ce qui explique pourquoi le staging allait bien et la prod non.

Saute ce qui n'est pas lisible. Les builds minifiés, les clients générés, cinq couches de métaprogrammation. Lis la librairie que tu appelles vingt fois par jour, et lis seulement la fonction que tu appelles vraiment. Quinze minutes rapportent plus ici qu'ailleurs, parce que la personne qui te répondrait en trente secondes n'existe pas dans le bâtiment, et que le support du fournisseur travaille pendant que tu dors, donc une question posée le matin obtient sa réponse le lendemain.

Il y a une deuxième raison, et elle pèse plus lourd que la première.

Personne n'a le droit de te dire que ce savoir est gardé. Il n'y a pas de porte. C'est ouvert, c'est complet, c'est déjà sur ta machine, et c'est la même copie, au bit près, que celle que lit la personne que tu prends pour l'expert.

## À essayer

La prochaine fois qu'une librairie te surprend, ouvre le fichier avant d'ouvrir l'onglet de recherche.

Quinze minutes. Tu ne comprendras pas le projet. Tu comprendras une fonction, définitivement.

## À discuter

Qui ici a lu le code source d'une dépendance sans laquelle notre produit ne tourne pas ?
