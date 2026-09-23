---
layout: chapter
title: "Lis le code source"
part: "Le métier"
order: 202
card_type: pratique
metadata:
  principle: "2.02"
  reading_time_in_minutes: 2
categories:
  - engineering
  - simplicite
  - technique
# La jumelle anglaise, pour le selecteur de langue et les balises hreflang.
traductions:
  en: /book/en/chapters/02-02-read-the-source.html
seo:
  description: "Quand une dépendance te surprend, sa source peut éclairer le comportement. Vérifie la version, le contexte et un cas précis."
  keywords: "build here, engineering, builder, code, source"
redirect_from:
  - /chapters/06-03-lis-le-code-source.html
---

## Le point de départ

Une bibliothèque logicielle se comporte autrement que prévu. La documentation et les exemples que tu as trouvés n'expliquent pas encore ton cas.

## Le geste

Ouvre l'implémentation correspondant à la version utilisée et cherche la fonction concernée.

## Pourquoi ça marche

Quand le code est accessible, il peut montrer une règle que la documentation résume : une durée d'attente par défaut, une condition sur une valeur ou la façon de construire une clé de cache. Cette lecture aide à transformer une supposition en hypothèse vérifiable.

Le fichier doit correspondre à ce qui tourne réellement. Une autre version, une configuration différente ou un service distant peuvent expliquer l'écart. Le code seul ne raconte pas toujours les conditions d'exécution.

Tu n'as pas besoin de lire le projet entier. Pars d'une entrée et suis-la jusqu'au comportement qui t'intéresse. Si tu débutes, demande à quelqu'un de parcourir cette fonction avec toi. Une session courte peut t'apprendre où regarder et quels mots chercher ensuite.

Hors logiciel, le geste voisin consiste à revenir au document qui fixe la règle : une procédure, une formule de calcul ou les conditions d'un service. Si la source est fermée ou hors de tes accès, demande un exemple reproductible ou une explication au fournisseur. Lire le code n'est pas une condition pour être builder.

## À essayer

Prends un comportement précis et note ce que tu attendais. Consacre quinze minutes à la source disponible, puis écris une hypothèse et l'endroit qui la soutient.

Vérifie-la dans un environnement adapté, avec un petit exemple ou une personne compétente. Si tu ne peux pas conclure, transmets ce que tu as regardé et la question qui reste. À la fin, tu dois pouvoir distinguer ce que la source montre de ce que tu supposes encore.

## Depuis ton siège

- **Ingénierie** : conserve la version et le cas qui permettent de retrouver l'observation.
- **Produit** : demande ce que le comportement technique implique pour l'usage.
- **Management** : prévois une aide à la lecture pour les personnes qui découvrent le système.

## À discuter

Quel comportement récent avons-nous mieux compris en revenant à sa source, et comment l'avons-nous vérifié ?
