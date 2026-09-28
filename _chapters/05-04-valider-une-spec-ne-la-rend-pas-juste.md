---
layout: chapter
title: "Valider une spec ne la rend pas juste"
part: "La livraison"
order: 504
card_type: diagnostic
metadata:
  principle: "5.04"
  reading_time_in_minutes: 2
categories:
  - produit
  - client
  - arbitrage
# La jumelle anglaise, pour le selecteur de langue et les balises hreflang.
traductions:
  en: /book/chapters/05-04-signing-off-a-spec-does-not-make-it-right.html
seo:
  description: "Distingue exigences et hypothèses dans une spécification, puis fais examiner les faits nouveaux avant de modifier le travail convenu."
  keywords: "build here, produit, builder, valider, spec, rend, juste"
redirect_from:
  - /livre/chapitres/05-02-valider-une-spec-ne-la-rend-pas-juste.html
---

## Le symptôme

Un document décrit le résultat attendu et les contraintes. Il a été validé, mais une observation nouvelle semble contredire une de ses hypothèses.

## Le signal

Distingue ce qui est exigé, ce qui a été vérifié et ce qui reste supposé. Fais examiner la contradiction avant de changer le travail convenu.

## Ce qui se passe

Une spécification aide à coordonner un travail et à conserver les décisions. Sa revue peut apporter de nouvelles connaissances : une contrainte oubliée, un cas d'usage ou une vérification supplémentaire. La validation n'assure cependant pas que toutes les hypothèses résisteront à la réalisation et à l'usage.

Tout n'est pas une hypothèse de préférence. Certaines exigences correspondent à un engagement, une protection ou une contrainte de fonctionnement. Elles ne disparaissent pas parce qu'un essai produit un retour différent. Il faut comprendre leur raison et identifier qui peut autoriser une modification.

Un document prévoit un choix de créneau. L'équipe suppose que cela facilitera l'inscription. Un premier essai montre que certaines personnes ne comprennent pas les horaires proposés. Ce retour peut appeler une meilleure explication, un autre choix ou davantage d'observation ; il ne suffit pas à conclure que personne ne veut choisir.

Une découverte ne donne pas un droit de diverger en silence. Présente les faits, leur portée et les options à la personne responsable du périmètre. Pour un document partagé ou un engagement externe, fais confirmer le changement et ses conséquences sur le délai et le coût. Une personne qui débute peut apporter un cas précis sans devoir résoudre seule toute la contradiction.

## À vérifier

Dans un document de travail, ajoute une hypothèse qui compte pour la décision :

> Nous supposons que ...
> Nous le vérifierons par ...
> Si l'observation contredit cette attente, nous examinerons ... avec ...

Choisis une vérification proportionnée et précise ses limites. Une observation qualitative peut suffire à révéler une difficulté ; un seuil chiffré demande une raison et un contexte.

Au retour, note ce qui a été appris et fais mettre à jour la décision si nécessaire. Une hypothèse confirmée mérite aussi d'être conservée.

## Depuis ton siège

- **Ingénierie** : rapporte un cas reproductible et ses conséquences pour le périmètre.
- **Produit** : distingue une hypothèse d'usage d'une exigence à respecter.
- **Management** : précise qui peut accepter un changement et informer les parties concernées.
- **Relation client** : apporte le contexte du retour sans le généraliser à tous les clients.

## À discuter

Quelle hypothèse d'un document mérite d'être vérifiée, et quelle exigence doit d'abord être comprise ?
