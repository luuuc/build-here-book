---
layout: chapter
title: "Relie l'architecture à ce qu'elle rend possible"
part: "La compréhension"
order: 404
card_type: principe
metadata:
  principle: "4.04"
  reading_time_in_minutes: 2
categories:
  - produit
  - client
  - arbitrage
seo:
  description: "Explique l'utilité du travail technique et les preuves disponibles, avec les détails adaptés à la décision du lecteur."
  keywords: "build here, builder, architecture, utilite, maintenance, effets"
redirect_from:
  - /chapters/05-04-le-client-ne-sinteresse-pas-a-ton-architecture.html
---

## Le réflexe

La démo s'ouvre sur la migration. Nouveau service, nouvelle base, le schéma avec les boîtes et les flèches.

En face, le client attend poliment la partie qui le concerne.

## Le réflexe builder

> "Voici ce qui change pour vous, et ce qui nous permet de le dire."

## Pourquoi

Le temps récupéré, un risque réduit ou une fiabilité préservée rendent l'utilité du travail technique plus lisible. Certains interlocuteurs ont aussi besoin des détails d'architecture pour examiner la sécurité, l'intégration ou la maintenance. Adapte l'explication à leur décision.

Le travail technique invisible compte, et c'est lui qui rend le reste possible. Il gagne à être expliqué aux personnes qui l'utilisent, le maintiennent ou le financent. Une équipe qui peine à expliquer l'utilité de son travail peut rencontrer des difficultés au moment du budget. Il peut manquer un lien explicite entre l'effort et son effet attendu. Ce lien aide à discuter les moyens nécessaires, même quand le résultat est peu visible.

Certains projets demandent de décrire une fiabilité préservée ou un risque réduit. La rotation des clés. Une piste d'audit. La logique de retry derrière les paiements. Aucune fonctionnalité au bout. La phrase existe quand même, elle décrit simplement quelque chose qui cesse de se produire. "Un paiement qui avait échoué disparaissait en silence et le vendeur l'apprenait par le client." Ça se défend en réunion budgétaire. Si le bénéfice reste incertain, nomme l'hypothèse et la façon de la vérifier. Un chantier exploratoire peut être utile pour réduire cette incertitude.

## À essayer

Choisis un chantier et écris l'avant et l'après pour son destinataire. Si tu débutes, fais-le avec une personne qui connaît le contexte. Hors logiciel, applique le geste à une procédure ou à un outil. Distingue un effet déjà observé d'un bénéfice attendu. Exemple construit :

> Avant : le vendeur attendait la fermeture pour savoir s'il avait été payé.
> Après : il le voit arriver.

Demande à une personne concernée de reformuler le bénéfice et ses limites. Ajoute les détails utiles à ses questions. Après l'essai ou à la revue prévue, vérifie l'effet annoncé avec elle ; une réaction intéressée ne suffit pas à le prouver.

## Depuis ton siège

- **Produit** : explicite le bénéfice attendu ou l'incertitude que le projet cherche à réduire.
- **Fondateur** : examine aussi la fiabilité préservée et les risques réduits.
- **Management** : demande l'effet attendu et les moyens de l'observer avant de financer.
- **Relation client** : vérifie ce qui peut être annoncé et ce qui reste à confirmer.
- **Recrutement** : demande à quoi a servi un chantier et comment son effet a été vérifié.

## À discuter

Sur un chantier actuel, quel effet pouvons-nous expliquer à son destinataire, et lequel reste à vérifier ?
