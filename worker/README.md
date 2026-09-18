# L'API de Build Here

Le livre reste statique et se lit sans rien d'ici. Si ce Worker tombe, le
livre se lit. C'est le principe qui décide tout le reste.

## Les points d'entrée

### Public

`GET /jeton` rend un jeton de formulaire signé, valable deux heures.

`POST /lint` vérifie une carte contre les règles de l'annexe 1 et rend un
rapport. Il ne refuse jamais rien : le tri final est une lecture humaine
contre les douze tests.

```sh
curl -sX POST https://api.build-here.africa/lint \
  -H 'content-type: application/json' \
  -d "$(jq -n --arg s "$(cat ../_chapters/05-01-le-ticket-nest-pas-le-travail.md)" \
        '{filename: "05-01-le-ticket-nest-pas-le-travail.md", source: $s, nouvelle: false}')" \
  | jq -r .rapport
```

`nouvelle` distingue une contribution qui arrive d'une carte déjà intégrée.
Sur une contribution, `order` et `principle` sont attendus à 999. Sur une
carte du livre, ils portent leur vrai numéro. Le défaut est `true`.

`POST /contribution` reçoit une carte. Accepte du JSON et un formulaire
classique : sans JavaScript la page poste directement et reçoit une page en
retour, parce qu'un envoi doit passer sur une mauvaise connexion.

### Derrière Cloudflare Access

`GET /admin` est la file de modération. `GET /admin/contributions`,
`GET /admin/contributions/:id`, puis `POST .../approuver`, `.../a-corriger`,
`.../refuser`.

Approuver ouvre la pull request. Rien n'atteint le dépôt avant.

## Les modules

| Fichier | Ce qu'il fait |
|---|---|
| `lint.mjs` | les règles de l'annexe 1. Aucune carte-sortie, aucun appel |
| `garde.mjs` | jetons, garde-fou anti-flood, rang de la file |
| `github.mjs` | nommage du fichier, front matter imposé, pull request |
| `contribution.mjs` | recevoir, lister, approuver |
| `admin.mjs` | la page de modération |
| `index.mjs` | le routage, et la seule partie qui lit le dépôt |

`lint.mjs` est appelé depuis trois endroits, et il n'existe qu'une fois :
`bin/lint-entree` en local, ce Worker, et `.github/workflows/entree.yml` sur
une pull request. Un contributeur et une relecture reçoivent donc le même
verdict sur la même carte.

## Ce qui protège la file

La modération est le vrai filtre : rien n'atteint un lecteur sans
approbation. Tout le reste protège l'attention de l'auteur, pas le site.

Aucun défi visible, ni Turnstile ni Bot Fight Mode. Derrière du NAT
opérateur, le défi tombe le plus souvent sur les lecteurs à qui ce livre
s'adresse.

- un champ piège, hors de l'écran. Rempli, rejet silencieux et aucune ligne
- un jeton signé qui porte son horodatage. Moins de trois secondes, refus
- une limite serrée sur l'identifiant local du navigateur
- un garde-fou grossier par réseau, 60 par heure. Large, parce qu'une adresse
  peut porter une ville entière
- un rang qui trie la file et ne refuse jamais. Un texte qui cite trois
  sources est exactement celui qu'on veut lire

## Déployer

```sh
npx wrangler login

npx wrangler d1 create build-here
# recopier l'id rendu dans wrangler.toml
npx wrangler d1 execute build-here --remote --file=schema.sql

npx wrangler secret put JETON_SECRET   # une chaîne longue et aléatoire
npx wrangler secret put GITHUB_TOKEN   # portée fine, ce dépôt seul

npx wrangler deploy
```

Le jeton GitHub demande `contents:write` et `pull_requests:write` sur
`luuuc/build-here-book` seul. Il ne peut rien faire d'autre que créer une
branche, y poser un fichier et ouvrir une pull request.

Puis une politique Cloudflare Access sur `api.build-here.africa/admin`,
**sinon la file de modération est publique.**

## Le durcissement qui reste

`/admin` vérifie la présence de l'en-tête `Cf-Access-Authenticated-User-Email`,
que Cloudflare Access injecte. C'est une seconde barrière derrière la
politique du bord : si la politique est retirée par accident, l'en-tête
disparaît et rien ne passe.

La vérification cryptographique du JWT d'Access, contre les clés de l'équipe,
serait plus forte. Elle est à faire avant que quelqu'un d'autre que l'auteur
ait accès à la file.
