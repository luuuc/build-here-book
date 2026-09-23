---
layout: chapter
title: "Écris ce qui a cassé"
part: "Les systèmes"
order: 706
card_type: pratique
metadata:
  principle: "7.06"
  reading_time_in_minutes: 2
categories:
  - trace
  - postmortem
  - incident
  - apprentissage
# La jumelle anglaise, pour le selecteur de langue et les balises hreflang.
traductions:
  en: /book/en/chapters/07-06-write-down-what-broke.html
seo:
  description: "Conserve les faits, les hypothèses et la suite d'un incident dans une trace adaptée, sans imposer une publication publique ou hors temps de travail."
  keywords: "build here, trace, postmortem, builder, incident"
redirect_from:
  - /chapters/14-03-ecris-ce-qui-a-casse.html
---

## Le point de départ

Un incident est maîtrisé ou une tentative a échoué. Les échanges existent, mais le raisonnement, les faits utiles et les questions ouvertes restent difficiles à retrouver.

## Le geste

Prépare un retour d'expérience court et accessible aux personnes qui en ont besoin, après avoir traité l'urgence et prévu le temps nécessaire.

## Pourquoi ça marche

Une trace peut conserver la chronologie, les hypothèses examinées, les actions et leurs effets. Une rétrospective, un compte rendu ou un postmortem peut remplir cette fonction. Le nom du document importe moins que sa capacité à aider une prochaine décision, sans prétendre qu'une seule méthode conserve l'apprentissage.

Un dossier s'est arrêté entre deux équipes parce que chacune attendait une confirmation différente. Le retour décrit ce qui était visible de chaque côté, comment le blocage a été compris et quel accord de passation a été modifié. Il distingue les faits établis des causes encore possibles. Il n'est pas nécessaire de trouver une erreur personnelle pour apprendre.

Les lecteurs peuvent être un relais, l'équipe, ou toi plus tard. Un document interne entretenu est une transmission valable. Une publication publique peut élargir la portée si elle est utile et autorisée, mais retirer un nom ou modifier un chiffre ne suffit pas à rendre une séquence partageable. Vérifie le contenu avec les responsables concernés ; garde une version restreinte si nécessaire.

L'écriture demande du temps, parfois après un épisode éprouvant. Convenez d'un effort raisonnable et évitez l'injonction à publier le soir même. Une personne qui débute peut aider à reconstruire un cas avec un pair. Si tu développes une équipe, protège la possibilité de signaler et d'examiner une difficulté : voir [⇄ Si avoir tort coûte du statut, plus personne n'aura tort à voix haute](/book/chapters/01-10-leader-si-avoir-tort-coute-du-statut-plus-personne-naura-tort-a-voix-haute.html).

## À essayer

Choisis un événement dont la trace aiderait une suite réelle. Note :

> Ce qui s'est passé et ce qui reste incertain : ...
> Ce que nous pensions alors et les vérifications effectuées : ...
> Les actions, leurs effets et les limites rencontrées : ...
> La suite décidée, son responsable et sa vérification : ...

Fais relire les faits par les personnes concernées et choisis un emplacement adapté aux droits de partage. Au moment convenu, vérifie si l'action décidée a été réalisée et utile. Une note publiée ou rangée ne ferme pas à elle seule la boucle.

## Depuis ton siège

- **Produit** : conserve les hypothèses et les observations, pas seulement la conclusion.
- **Opérations** : précise ce qui a permis de rétablir ou de préserver le service.
- **Management** : prévois le temps de revue et un partage adapté au contenu.
- **Relation client** : apporte les faits partageables sur les conséquences pour les personnes.

## À discuter

Quel retour d'expérience aiderait une prochaine décision, et qui doit pouvoir le retrouver ?
