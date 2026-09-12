---
layout: chapter
title: "Déjà en ligne"
description: "Ce qu’on peut ouvrir ce soir"
show_chapter_number: false
part: "Annexes"
order: 92
metadata:
  reading_time_in_minutes: 3
categories:
  - annexes
  - references
  - contribution
seo:
  description: "Une liste de choses qu'on peut ouvrir. Une seule regle d'admission, un inconnu peut en faire quelque chose ce soir."
  keywords: "build here, annexes, tech afrique, builder, deja, en ligne, open source"
---

Ce n'est pas un annuaire, ni une carte de l'écosystème, ni une sélection. Ces documents existent déjà, il y en a un par ville, et la plupart n'ont pas survécu à leur deuxième mise à jour.

C'est une liste de choses qu'on peut ouvrir. Un dépôt qui accepte les pull requests, des poids qu'on télécharge, un jeu de données, un groupe qui a une prochaine date.

Une seule règle d'admission. **Un inconnu peut en faire quelque chose ce soir, sans permission et sans introduction.**

## Pourquoi cette page existe

L'annexe 3 liste ce qui a été écrit ailleurs, il y a longtemps. Celle-ci liste ce qui tourne ici, maintenant.

La clôture du livre dit qu'à chaque fois que quelqu'un publie une chose utilisable, le nombre de références disponibles pour le suivant augmente de un. C'est le compteur.

Ce n'est pas là pour prouver quoi que ce soit à qui que ce soit. Si tu cherches où contribuer et que tu ne sais pas où atterrir, c'est pour toi. Sinon, referme.

## Ce qui n'y est pas

Les entreprises qu'on ne peut que regarder. Elles sont dans l'ouverture, à leur place, et une levée de fonds n'est pas une porte.

Le critère écarte des projets excellents. C'est assumé. Une liste qui admet tout ne dit rien.

## Sur les liens

L'annexe 3 se termine en disant qu'elle ne porte aucun lien, parce que les liens meurent et les titres non.

Celle-ci n'est faite que de liens. Elle va donc pourrir. Chaque ligne porte la date de sa dernière vérification, pour que tu saches à quel point tu me fais confiance, et une ligne morte se retire au lieu de s'accumuler.

C'est le prix d'une liste de choses vivantes.

---

{% assign lignes = site.data['deja-en-ligne'] | sort: "nom" %}
{% for l in lignes %}
**{{ l.nom }}**, {{ l.lieu }}. {{ l.fait }}. {{ l.par }}. [{{ l.porte }}]({{ l.lien }}){:target="_blank" rel="noopener"}, vérifié le {{ l.verifie | date: "%d/%m/%Y" }}.
{% endfor %}

---

## Ajouter une ligne

Même porte que le reste du livre. Une pull request sur [le dépôt](https://github.com/{{ site.repository }}), une ligne dans `_data/deja-en-ligne.yml`, sept champs. Ou un mail à [{{ site.contact_email }}](mailto:{{ site.contact_email }}) et je m'occupe du fichier.

Trois choses à savoir avant.

→ **Tu n'as pas besoin d'être l'auteur.** Ajouter le travail de quelqu'un d'autre est le cas le plus utile. C'est aussi le seul disponible pour celui qui n'a pas le droit de publier ce qu'il fait chez son employeur.

→ **Pas de classement, pas de mise en avant, pas de logo.** Ordre alphabétique, toutes les lignes de la même longueur. Le jour où une place dans cette liste devient une récompense, la page a rejoint ce contre quoi le livre est écrit.

→ **Quinze mots de faits après le nom.** Une communauté dynamique de passionnés n'est pas un fait. Deux rencontres par mois, une trentaine de personnes, en est un.

Si c'est ta première pull request, *[Ta première contribution](/chapters/16-01-ta-premiere-contribution.html)* décrit exactement ce qui va se passer.
