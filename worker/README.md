# L'API de Build Here

Le livre et l'Ultimate Builder Test restent utilisables sans le Worker. Le calcul du test se fait dans le navigateur. L'API garde seulement les interactions qui ont besoin d'un état partagé.

## Points d'entrée publics

| Route | Rôle |
|---|---|
| `GET /jeton` | Jeton court et pays pour protéger les commentaires sans captcha |
| `POST /lint` | Vérification éditoriale locale des cartes du dépôt |
| `POST /note` | Retour structuré sur l'utilité d'une carte |
| `GET /commentaires?page=` | Commentaires publiés d'une carte |
| `POST /commentaire` | Commentaire envoyé en modération |
| `POST /evaluation` | Résumé anonyme d'un Ultimate Builder Test terminé |

`POST /evaluation` accepte une version, dix scores entiers de 0 à 100, le dernier niveau dont les prérequis tiennent et le prochain niveau. Il ne reçoit ni les réponses individuelles, ni contact, ni texte libre, ni identifiant stable.

## Derrière Cloudflare Access

`GET /admin` sert le tableau de bord. Il utilise :

- `/admin/commentaires` et les actions publier/refuser ;
- `/admin/notes` pour le retour éditorial ;
- `/admin/evaluations` pour la distribution agrégée du test.

La politique Cloudflare Access sur `api.build-here.africa/admin` est obligatoire. Le Worker vérifie aussi l'en-tête d'identité et l'origine des requêtes d'écriture.

## Base D1

Installation initiale :

```sh
npx wrangler d1 create build-here
npx wrangler d1 execute build-here --remote --file=schema.sql
npx wrangler d1 execute build-here --remote --file=schema-commentaires.sql
npx wrangler d1 execute build-here --remote --file=schema-notes.sql
npx wrangler d1 execute build-here --remote --file=schema-evaluations.sql
```

Pour une base qui portait l'ancien formulaire de cartes :

```sh
npx wrangler d1 execute build-here --remote --file=schema-remove-contributions.sql
```

Cette dernière migration supprime définitivement les anciennes cartes reçues et leurs coordonnées. Elle ne doit être exécutée qu'après l'export éventuellement souhaité de ces données.

## Déployer

```sh
npx wrangler login
npx wrangler secret put JETON_SECRET
npx wrangler deploy
```

`JETON_SECRET` signe les jetons de commentaire et les condensats temporaires utilisés pour les garde-fous réseau. Aucun jeton GitHub n'est nécessaire.
