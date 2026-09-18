---
layout: chapter
title: "Déjà en ligne"
description: "Ce qu'on peut ouvrir ce soir"
show_chapter_number: false
part: "Annexes"
order: 1204
metadata:
  reading_time_in_minutes: 3
categories:
  - annexes
  - references
  - ressources
seo:
  description: "Une liste de choses qu'on peut ouvrir. Une seule règle d'admission, un inconnu peut en faire quelque chose ce soir."
  keywords: "build here, annexes, builder, deja, en ligne, open source"
---

Ce n'est pas un annuaire, ni une carte de l'écosystème, ni une sélection. Ces documents existent déjà, il y en a un par ville, et la plupart n'ont pas survécu à leur deuxième mise à jour.

C'est une liste de choses qu'on peut ouvrir. Un dépôt qui accepte les pull requests, des poids qu'on télécharge, un jeu de données, un groupe qui a annoncé sa prochaine rencontre.

Une seule règle d'admission. **Un inconnu peut en faire quelque chose ce soir, sans demander la permission ni connaître quelqu'un.**

## Pourquoi cette page existe

L'annexe 3 liste ce qui a été écrit ailleurs, il y a longtemps. Celle-ci liste ce qui tourne ici, maintenant.

La clôture du livre dit qu'à chaque fois que quelqu'un publie une chose utilisable, le nombre de références disponibles pour le suivant augmente de un. C'est le compteur.

Ce n'est pas là pour prouver quoi que ce soit à qui que ce soit. Si tu cherches quelque chose d'ouvert à utiliser, étudier ou rejoindre ce soir, c'est pour toi. Sinon, referme.

## Ce qui n'y est pas

Les entreprises qu'on ne peut que regarder. Leur réussite compte, mais une levée de fonds n'offre rien à quoi contribuer.

Le critère écarte des projets excellents. C'est assumé. Une liste qui admet tout ne dit rien.

## Sur les liens

L'annexe 3 se termine en disant qu'elle ne porte aucun lien, parce que les liens meurent et les titres non.

Celle-ci n'est faite que de liens. Certains finiront donc par ne plus fonctionner. Chaque ligne porte la date de sa dernière vérification, pour que tu saches de quand date le contrôle, et on retire les liens morts au lieu de les laisser s'accumuler.

C'est le prix d'une liste de choses vivantes.

---

{% assign lignes = site.data['deja-en-ligne'] | sort: "nom" %}
{% for l in lignes %}
**{{ l.nom }}**, {{ l.lieu }}. {{ l.fait }}. {{ l.par }}. [{{ l.porte }}]({{ l.lien }}){:target="_blank" rel="noopener"}, vérifié le {{ l.verifie | date: "%d/%m/%Y" }}.
{% endfor %}

---

La liste n'est ni un classement, ni une mise en avant. L'ordre reste alphabétique, les descriptions factuelles et les liens morts sont retirés lors des revues éditoriales.
