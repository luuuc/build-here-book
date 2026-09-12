---
layout: chapter
title: "Comment écrire une entrée"
description: "Le format, bloc par bloc"
show_chapter_number: false
part: "Annexes"
order: 89
metadata:
  reading_time_in_minutes: 8
categories:
  - annexes
  - methode
  - references
seo:
  description: "Il manque à ce livre les entrées que je ne pouvais pas écrire, parce que je n'ai pas eu ces échecs, sur ces marchés, sur ces stacks."
  keywords: "build here, annexes, tech afrique, builder, comment, ecrire, entree"
---

Il manque à ce livre les entrées que je ne pouvais pas écrire, parce que je n'ai pas eu ces échecs, sur ces marchés, sur ces stacks. Si tu construis depuis un moment, tu en portes plusieurs.

Voici le format, écrit pour que quelqu'un d'autre que moi puisse s'en servir. Prends-le. Écris l'entrée. Renvoie-la avec le raisonnement attaché, pour qu'on puisse la discuter.

Une entrée porte une idée. Elle se lit en moins de deux minutes et se comprend par quelqu'un qui n'a rien lu d'autre du livre.

Chaque entrée utilise les mêmes six blocs, dans le même ordre. La répétition est le principe. Au bout de trois entrées, un lecteur sait où se trouve l'action sans avoir à scanner.

---

## Le squelette

Une entrée, un fichier. Le titre est le `#` du fichier, les six blocs sont des `##`.

```
# Titre

## Le réflexe

> La phrase que les gens disent à voix haute.

Deux ou trois phrases sur ce que cette phrase suppose.

## Le réflexe builder

> La phrase de remplacement, aussi courte.

Deux ou trois phrases sur ce qui change.

## Pourquoi

L'explication. Quatre paragraphes, plafond dur.

## À essayer

Une action, faisable cette semaine.

## Depuis ton siège

- **Product** : ce que l'entrée change pour lui, en une ligne.
- **Manager** : ...

## À discuter

Une question qu'une équipe peut poser à voix haute.
```

---

## Le titre

Assez court pour survivre à l'intérieur d'une conversation.

Une entrée fonctionne quand les gens se mettent à répéter la phrase. "Le ticket n'est pas le travail" se dit en réunion. "Considérations sur la mesure de la production dans les équipes produit" ne se dit nulle part.

Deux formes portent l'essentiel du livre.

→ L'opposition : *Avoir tort ne coûte rien. Le rester coûte cher.*
→ La négation d'une évidence : *Le marketing n'est pas de la décoration.*

Un titre qui décrit le sujet a déjà perdu. Le titre porte la position, pas le thème.

---

## Le réflexe

Écris ce que les gens disent, avec leurs mots, sous forme de citation.

> "Ce n'est pas dans mon périmètre."

Le lecteur doit reconnaître la phrase avant de la juger. Si le réflexe ressemble à une chose que seul un imbécile dirait, l'entrée n'atterrit sur personne.

Le comportement doit avoir l'air raisonnable, parce que vu de l'intérieur il l'est presque toujours. C'est ce qui le rend difficile à lâcher.

---

## Le réflexe builder

Le basculement, en une ou deux lignes. Un contraste, livré sans la leçon.

Garde-le atteignable. Si la version builder exige un courage rare ou une organisation qui n'existe pas, l'entrée est décorative.

---

## Pourquoi

Le cœur de l'entrée, et le bloc qui demande le plus de réécriture.

Quatre paragraphes. Pas cinq, pas six. Ce bloc s'allonge parce que c'est là qu'atterrit tout ce qui ne rentrait pas ailleurs, et une entrée qui a besoin de six paragraphes est en général deux entrées sous un seul titre.

Ce qui marche :

→ un mécanisme. Comment le comportement produit son effet, la morale en moins.
→ un coût visible. Des heures, de l'argent, une décision qui a attendu, une information qui a cessé de circuler.
→ une raison d'avoir de la sympathie. Pourquoi des gens intelligents finissent là.
→ le contre-argument le plus fort, traité à l'intérieur du mécanisme plutôt qu'annoncé.

Ce dernier point avait autrefois son paragraphe dédié dans chaque entrée, ouvrant sur une variante de "l'objection est légitime" et fermant sur une concession d'un mot. Lis six entrées d'affilée et tu sens le rythme arriver. Une entrée sur cinq environ devrait annoncer un contre-argument. Le chiffre est un réglage, pas une mesure, et il est probablement encore trop haut. Dans les autres, replie-le pour que le lecteur ne voie jamais la couture, ou retire-le si l'entrée tient sans.

Ce qui ne marche pas : les affirmations sur ce que font les bonnes équipes. Personne ne change de comportement parce qu'on lui a dit que les meilleurs font autrement. Un paragraphe qui explique une scène que le lecteur avait déjà comprise ne marche pas non plus. Fais confiance à la scène et coupe le paragraphe d'après.

---

## À essayer

Une action, cette semaine, sans budget et sans réorganisation.

Un bon "À essayer" est assez précis pour qu'en fin de semaine tu saches si tu l'as fait. "Sois plus curieux" ne se vérifie pas. "Trente minutes, une chose que tu utilises sans la comprendre" se vérifie.

Quand c'est la formulation qui est difficile, donne-la mot pour mot. Une phrase toute prête est souvent la seule chose entre l'intention et le fait de le faire.

---

## Depuis ton siège

Quatre à six lignes, une par siège, sur ce que l'entrée change à une place qui n'est pas celle du lecteur par défaut.

C'est ce bloc qui rend une entrée utilisable par une équipe entière d'un coup. Sans lui, chaque entrée atterrit sur le builder qui a déjà le réflexe, et personne d'autre ne sait ce qu'on lui demande. Les sièges sont décrits dans [Comment lire ce livre](/chapters/00-comment-lire-ce-livre.html).

Cinq règles, et les quatre premières servent toutes à empêcher la même chose, un bloc qui remplit.

**1. Quatre à six sièges. Jamais sept par principe.** Un bloc qui liste tout le monde à chaque fois finit par dire une seule chose sous sept objets différents.

**2. Le siège dont « À essayer » donne déjà l'action ne prend pas de ligne.** C'est le plus souvent Engineer, puisque l'action de l'entrée est déjà écrite pour lui.

**3. Un siège qui n'a rien de différent à dire ne prend pas de ligne.** N'écris pas « ce siège n'est pas concerné », et ne reformule pas le titre. Une ligne vide se lit et coûte du temps. Une ligne absente ne coûte rien.

**4. Cent caractères après les deux-points, plafond dur.** Une ligne, qui ne se replie pas sur un téléphone. Si la différence ne tient pas en une ligne, ce siège a besoin de sa propre entrée, pas d'une ligne plus longue.

**5. Le bloc ne compte pas dans les mots de l'entrée.** Ce n'est pas de la prose, c'est une table. Un lecteur y prend sa ligne, pas les six.

---

## À discuter

Une question ouverte, adressée à une équipe, à laquelle on ne peut pas répondre par oui ou non.

Les meilleures pointent le passé récent, pas les intentions. "Qui a signalé une erreur sérieuse ces six derniers mois ?" produit une vraie conversation. "Est-ce qu'on est une équipe qui accepte l'erreur ?" produit un consensus vide.

---

## Les paires

Certaines entrées en appellent une deuxième. Quand une entrée demande un comportement à quelqu'un, vérifie si ce comportement lui est disponible dans une organisation ordinaire.

Si ce n'est pas le cas, l'entrée manquante est celle adressée à qui façonne les conditions. Elle porte la marque ⇄ dans la table des matières.

Sans la paire, le livre devient une liste d'exigences dirigées vers le bas.

---

## L'ancrage

L'ancrage n'est pas rationné. C'est un livre écrit depuis un endroit, et un endroit est précis ou c'est une salle d'attente. Sers-toi du détail de terrain : l'environnement de staging partagé, la connexion comptée, le fournisseur qui facture en dollars contre un revenu qui arrive en monnaie locale, la ligne de support à huit fuseaux, le senior qui est la seule personne du pays à avoir fait tourner ça en production.

La seule règle qui reste. Le détail est dans une scène, et le livre n'explique jamais le continent à ceux qui y vivent.

---

## Le registre

Cinq règles, et ce ne sont pas des préférences stylistiques. C'est ce qui empêche ce livre de devenir la chose contre laquelle il est écrit.

**1. C'est la salle qui est drôle. Jamais les gens qui sont dedans.** La comédie vise la structure, à chaque fois. La seule entrée où elle glisse sur une personne est celle qui sera capturée en screenshot.

**2. L'ennemi est le marché de la visibilité.** Qui est recommandé, qui obtient l'introduction, qui monte sur le panel, et le rapport que tout ça entretient avec le fait de livrer. Jamais une culture, jamais une catégorie, jamais le lecteur.

**3. Pince-sans-rire.** Phrase plate, fait scandaleux, aucun point d'exclamation. N'apporte aucune indignation. Le lecteur a la sienne et elle est meilleure que la tienne.

**4. Une scène précise et une phrase transportable.** La scène est pour le builder, qui doit reconnaître sa propre semaine. La phrase est pour celui qui la citera en réunion, et qui est la distribution.

**5. Aucun diagnostic de catégorie.** Pas de "ici, les gens ne...". Les salles décrites dans ce livre existent partout. Ce qui change, c'est le nombre de gens qui en ont vu une qui fonctionne.

---

## La version dure

La plupart des entrées ouvrent sur un réflexe manifestement faux dès qu'il est dit à voix haute. Écrit comme ça soixante-dix fois, le livre ne s'adresse qu'à celui qui n'a pas encore compris, et celui qui a compris le referme.

Donc environ une entrée sur huit ouvre sur un réflexe réellement défendable. L'ingénieur qui bloque la release s'est déjà brûlé. Le fondateur qui a tout centralisé a vu une décision manquer de tuer sa boîte. Personne dans cette scène n'est bête, et l'entrée doit battre la bonne raison, pas la mauvaise.

Ces mêmes entrées portent l'autre moitié, à savoir la façon dont le titre se détourne. Une formule comme *être bloqué est une décision* s'utilise comme un bâton. *Ton code n'est pas ton bébé* s'utilise pour écarter une objection juste. Nomme-le à l'intérieur de l'entrée. Un lecteur avec quinze ans de métier ne se demande pas si le principe est vrai. Il se demande si tu as vu comment on en abuse, et il le repère en un paragraphe.

---

## La longueur

200 à 350 mots par entrée. Jusqu'à 450 pour une entrée qui porte un réflexe défendable ou une garde contre le détournement, puisque ce sont deux paragraphes en plus et qu'aucun des deux n'est du remplissage. Une section complète tombe entre 1500 et 1700, ou jusqu'à 1900 quand elle porte une entrée en paire.

Le bloc « Depuis ton siège » ne compte pas dans ces mots. Son budget est le sien, six lignes de cent caractères au plus, et la règle est dans le bloc.

Une entrée qui s'allonge est en général deux entrées sous un seul titre. Coupe-la en deux et les deux moitiés deviennent plus fortes.

---

## En envoyer une

Écris-la contre [les douze tests](/chapters/a2-les-douze-tests.html) avant de l'envoyer. Une entrée qui y survit arrive prête à être discutée, ce qui est le seul état dans lequel elle vaut la peine d'être lue.

Inclus ce qu'elle t'a coûté. Pas comme une histoire, comme un mécanisme. L'entrée est la chose que tu aurais voulu qu'on te tende quatre ans plus tôt, et ce qui la rend transmissible, c'est la partie que tu as dû payer.

### Deux portes, le même endroit

**Une pull request sur [le dépôt](https://github.com/{{ site.repository }}).** Un fichier dans `_chapters/`, le front matter copié sur n'importe quelle entrée existante. Le modèle de pull request est la liste des douze tests en cases à cocher. La discussion se passe dans la pull request, en public, et elle reste en ligne après.

**Un mail à [{{ site.contact_email }}](mailto:{{ site.contact_email }}).** Le texte dans le corps du message, sans mise en forme particulière. Je m'occupe du fichier.

Les deux portes mènent au même endroit et rien ne distingue les entrées arrivées par l'une ou par l'autre. Si tu n'as jamais ouvert de pull request, prends le mail sans y penser une seconde, ou prends la pull request et lis *[Ta première contribution](/chapters/16-01-ta-premiere-contribution.html)*, qui décrit exactement ce qui va se passer.

Le [CONTRIBUTING.md](https://github.com/{{ site.repository }}/blob/main/CONTRIBUTING.md) du dépôt donne les détails mécaniques, le nommage des fichiers et le champ `order`.

### Ce qui se passe ensuite

Elle est relue contre les douze tests, et la relecture est écrite. Si elle échoue, tu sauras sur quel test, ce qui vaut mieux qu'un silence poli.

Si elle tient, elle rejoint le livre **sous ton nom**, avec un lien vers où tu veux. Pas besoin d'être connu, pas besoin d'avoir déjà écrit, pas besoin de me connaître.

Deux lignes dans le front matter, et c'est tout ce que ça demande.

```yaml
author: "Ton nom"
author_link: "https://là-où-tu-veux-qu-on-te-trouve"
```

Le lien est facultatif, le nom non. Il apparaît sous le titre de l'entrée, sur le site, dans le PDF et dans l'EPUB.

Un livre qui demande d'arrêter de travailler en silence ne peut pas se relire en privé. C'est pour ça que la porte par défaut est celle qui laisse une trace publique, et pour ça que l'autre reste ouverte sans condition.

---

## Écrites par quelqu'un d'autre

{% assign signees = site.chapters | where_exp: "c", "c.author" | sort: "order" %}{% if signees.size > 0 %}{% for c in signees %}
→ [{{ c.title }}]({{ c.url }}), par {{ c.author }}{% endfor %}
{% else %}
Aucune pour l'instant. La première ligne est disponible.
{% endif %}
