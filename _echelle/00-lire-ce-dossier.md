# Brouillon de l'échelle

Ce dossier est un essai, pas une refonte. Rien n'a été déplacé, rien n'a été
supprimé, et le livre publié n'a pas bougé d'une ligne.

Le préfixe `_` fait que Jekyll ignore ce dossier. Il ne rend rien et ne casse
rien. Si la direction ne va pas, la branche se supprime et il ne reste aucune
trace.

## Ce qu'il y a dedans

Dix intros d'étape et dix-huit cartes neuves.

Les intros disent trois choses, toujours dans cet ordre : ce que tu es à ce
niveau, ce qui t'y retient, à quoi tu vois que tu es passé au suivant. C'est la
seule chose qu'un opener de section ne faisait pas.

Les dix-huit cartes remplissent les trois étapes que le livre actuel n'a jamais
écrites. Six pour l'ownership, six pour les systèmes, six pour le levier.

La liste de cartes au bas de chaque intro donne l'étape complète, y compris les
cartes existantes qui viennent s'y ranger. Elles ne sont pas dans ce dossier,
elles sont toujours dans `_chapters`.

## Ce qu'il n'y a pas dedans

Les deux cartes de l'étape 2 dont le lecteur par défaut n'est pas un ingénieur.
La réécriture des exemples engineering de l'étape 2. La délocalisation de
`15-03` et `15-04`. Les quatre pages d'ouverture et de clôture. Le passage de
« entrée » à « carte » dans le reste du dépôt.

Tout ça attend de savoir si l'échelle tient.

## Si ça tient

`git mv` vers `_chapters`, renumérotation des 68 cartes existantes, réécriture
de `_data/sommaire.yml` en une liste de dix, et retrait des deux mouvements dans
les trois gabarits. Le détail est dans `.doc/plan-echelle.md`.
