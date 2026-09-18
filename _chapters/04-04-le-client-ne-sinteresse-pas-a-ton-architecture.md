---
layout: chapter
title: "Le client ne s'intéresse pas à ton architecture"
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
  description: "Personne n'achète une architecture. Les gens achètent du temps récupéré, un risque écarté, une chose de moins à vérifier."
  keywords: "build here, produit, builder, client, interesse, architecture"
redirect_from:
  - /chapters/05-04-le-client-ne-sinteresse-pas-a-ton-architecture.html
---

## Le réflexe

La démo s'ouvre sur la migration. Nouveau service, nouvelle base, le schéma avec les boîtes et les flèches.

En face, le client attend poliment la partie qui le concerne.

## Le réflexe builder

> "La page de résultats charge en une seconde au lieu de neuf."

## Pourquoi

Personne n'achète une architecture. Les gens achètent du temps récupéré, un risque écarté, une chose de moins à vérifier.

Le travail technique invisible compte, et c'est lui qui rend le reste possible. Mais il doit être traduit pour exister aux yeux de ceux qui le financent. Une équipe qui n'explique jamais l'utilité de son travail se heurte à un mur au moment du budget. Personne dans la salle ne sait relier six mois de reprise à un bénéfice ressenti par le client. L'ensemble finit donc par apparaître comme une dépense sans résultat visible.

Certains projets résistent à l'exercice, et c'est là que les équipes abandonnent tôt. La rotation des clés. Une piste d'audit. La logique de retry derrière les paiements. Aucune fonctionnalité au bout. La phrase existe quand même, elle décrit simplement quelque chose qui cesse de se produire. "Un paiement qui avait échoué disparaissait en silence et le vendeur l'apprenait par le client." Ça se défend en réunion budgétaire. Si tu n'arrives à décrire aucun bénéfice, passé ou attendu, interroge-toi sur l'utilité du projet.

## À essayer

Pour chaque projet technique en cours, écris l'avant et l'après avec les mots du client, sans un seul terme technique dans l'un ou l'autre.

> Avant : le vendeur attendait la fermeture pour savoir s'il avait été payé.
> Après : il le voit arriver.

Lis-le à quelqu'un du commercial. S'il pose aussitôt une question, ça fonctionne.

## Depuis ton siège

- **Product** : si tu ne sais pas expliquer le bénéfice pour le client, interroge-toi sur le projet.
- **Founder** : six mois de reprise sans bénéfice client visible finissent par apparaître comme une simple dépense.
- **Manager** : demande la phrase client avant de financer, pas au moment du budget.
- **Customer-facing** : tu es le traducteur par défaut. Exige la phrase avant d'annoncer quoi que ce soit.
- **Recrutement** : demande à quoi a servi son plus gros chantier technique, sans un mot technique.

## À discuter

Notre plus gros projet technique en ce moment, qui ici peut dire en une phrase pourquoi un client devrait s'en soucier ?
