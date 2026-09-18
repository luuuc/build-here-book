---
layout: chapter
title: "Écris ce qui a cassé"
part: "Les systèmes"
order: 706
card_type: pratique
metadata:
  principle: "7.06"
  reading_time_in_minutes: 3
categories:
  - trace
  - postmortem
  - incident
  - apprentissage
seo:
  description: "Un postmortem contient une chose qu'aucune rétro ne garde. L'hypothèse fausse, et combien de temps tu l'as gardée."
  keywords: "build here, trace, postmortem, builder, incident"
redirect_from:
  - /chapters/14-03-ecris-ce-qui-a-casse.html
---

## Le point de départ

> "Tout le monde ici sait ce qui s'est passé."

L'incident est réglé. La campagne a raté, le recrutement a duré quatre mois, le passage de relais a perdu un client, ou le service est tombé. On en a parlé, le canal contient les messages, et l'équipe est passée à autre chose. Écrire ça proprement ressemble à de la paperasse sur une chose déjà digérée.

## Le geste

> "Ce que ça m'a appris n'existe nulle part hors de ma tête."

## Pourquoi ça marche

Un postmortem contient une chose qu'aucune rétro ne garde. L'hypothèse fausse, et combien de temps tu l'as gardée. C'est ce qui t'a coûté le plus de temps, et c'est le premier détail que tu oublies. Six mois plus tard tu te souviens que le message ne parlait à personne, que le meilleur candidat avait décliné, ou que le mauvais service était en cause. Tu ne te souviens plus des deux semaines où tu accusais le canal, du critère qui écartait les bons profils, ni des deux heures passées à regarder au mauvais endroit. Or c'est exactement ce dont a besoin le suivant, parce qu'il va faire la même erreur pour les mêmes bonnes raisons.

Il y a deux lecteurs et aucun des deux n'était dans la rétro. Toi dans dix-huit mois, quand la panne revient à une autre heure avec une autre erreur. Et l'inconnu qui tape le message d'erreur et qui tombe sur toi.

L'objection sérieuse n'est pas la pudeur, c'est la taille du marché. Ton client peut lire le texte le lendemain, et le concurrent qui recrute aussi. Elle se règle en écrivant le mécanisme au lieu de l'incident. Le client n'a pas besoin d'être nommé, le montant n'a pas besoin d'être exact, et le fournisseur peut rester « un prestataire de paiement ». Ce qui doit être précis, c'est la séquence des faits, et elle n'appartient à aucun client.

Reste le vrai obstacle. Dans une équipe où signaler une erreur discrédite celui qui la signale, personne n'en publiera une, et la carte qui traite ça est *Si reconnaître une erreur te discrédite, plus personne ne le fera*. Vérifie de quel côté tu es avant de demander à quelqu'un d'autre d'écrire le sien.

## À essayer

La dernière chose sérieuse qui a cassé. Quatre lignes, ce soir, pendant que la chronologie existe encore.

> Ce qui a cassé.
> Ce que je croyais que c'était, et pendant combien de temps.
> Ce que c'était.
> Ce qui permettait au problème d'exister.

Publie-le là où quelqu'un qui rencontre le même problème le trouvera. Pas seulement dans le wiki interne, où il sera lu par les quatre personnes qui étaient déjà au courant.

## Depuis ton siège

- **Produit** : l'hypothèse fausse et sa durée valent plus que la cause. C'est ce qui manque au suivant.
- **Fondateur** : décris le mécanisme. Inutile de nommer le client ou de donner le montant exact.
- **Management** : là où signaler une erreur te discrédite, personne ne publiera. Vérifie de quel côté tu es d'abord.
- **Relation client** : tu tiens la chronologie côté client, minute par minute. Elle manque à tous les postmortems.
- **Recrutement** : un candidat qui raconte l'hypothèse gardée deux heures t'en dit plus qu'un CV entier.

## À discuter

Notre dernier incident sérieux, où est écrite l'hypothèse fausse qu'on a gardée deux heures ?
