---
layout: chapter
title: "Ne t'arrête pas à la première réponse"
part: "Le métier"
order: 206
metadata:
  principle: "2.06"
  reading_time_in_minutes: 2
categories:
  - curiosite
  - apprentissage
  - engineering
  - support
seo:
  description: "La première réponse qu'on trouve traite souvent le symptôme le plus visible. Comme ce symptôme disparaît, on croit avoir compris le problème."
  keywords: "build here, curiosite, tech afrique, builder, arrete, premiere, reponse"
redirect_from:
  - /chapters/01-05-ne-tarrete-pas-a-la-premiere-reponse.html
---

## Le réflexe

> "J'ai répondu au client, il est satisfait."

Symptôme parti. Ticket suivant.

## Le réflexe builder

> "Ça marche. Mais pourquoi ça ne marchait pas ?"

Une réponse qui fait disparaître le symptôme règle peut-être l'urgence. Elle laisse le problème de fond intact.

## Pourquoi

La première réponse qu'on trouve traite souvent le symptôme le plus visible. Comme ce symptôme disparaît, on croit avoir compris le problème.

Le traitement d'import s'est arrêté dans la nuit. Tu le relances, les chiffres reviennent, tu fermes le ticket. Trois semaines plus tard il échoue à nouveau, à une autre heure avec une autre erreur, donc le lien ne se fait pas. Il aura fallu deux nuits d'échec avant que quelqu'un demande ce que les deux fichiers avaient en commun. Chercher la cause demande environ trente minutes de plus. S'arrêter au symptôme, c'est retrouver le même problème pendant des années, avec une nouvelle explication à chaque fois.

Le même piège existe loin du code. Trois clients demandent comment télécharger leur reçu. Le support envoie le bon lien, vite, et les trois repartent contents. La première réponse est bonne. La deuxième question est meilleure : pourquoi trois personnes qui viennent de payer ne trouvent-elles pas ce lien seules ? Tant que personne ne la pose, le support gagne sur son temps de réponse et l'entreprise paie la même réponse chaque semaine.

Et personne ne fera cette recherche à ta place. Aucun senior du plateau n'a fait tourner ce système. La deuxième réponse sort du code source, ou de la doc du fournisseur, lue par toi, lentement, sur une connexion qui te fait réfléchir à l'utilité de la vidéo.

Deux niveaux suffisent presque toujours. À force d'imposer un formulaire des cinq pourquoi et une réunion récurrente, on finit par décourager la recherche des causes. Ça a cassé, pourquoi ? Le champ était vide. Pourquoi il était vide ? Rien n'empêche qu'il soit vide. C'est cette deuxième réponse qui mérite d'être écrite, parce que le suivant ne peut pas y arriver seul.

## À essayer

Pendant une semaine, ne ferme pas une demande, un incident ou une objection tant que sa résolution ne contient pas deux phrases. Ce que tu as fait, et ce qui permettait au problème d'exister.

Si la deuxième est "pas clair", écris-le. C'est vrai, et ça marque l'endroit pour le prochain qui tombera dessus.

## Depuis ton siège

- **Product** : un bug qui revient sous trois formes est une décision produit que personne n'a prise.
- **Design** : quand un utilisateur contourne ton écran, le contournement n'est pas la cause.
- **Manager** : si fermer vite est ce qui se voit, personne ne cherchera la cause.
- **Customer-facing** : note ce que le client faisait juste avant. C'est souvent la deuxième réponse.
- **Recrutement** : demande un bug que le candidat a compris, pas un bug qu'il a fait disparaître.

## À discuter

Nomme un problème qui revient ici sous des formes différentes.
