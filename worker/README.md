# L'API de Build Here

Le livre reste statique. Cette API ajoute de l'état autour de lui, et rien
ici n'est nécessaire pour lire Build Here.

## Ce qu'elle fait aujourd'hui

`POST /lint` vérifie une entrée contre les règles de l'annexe 1 et rend un
rapport. Elle ne refuse jamais rien : le tri final est une lecture humaine
contre les douze tests.

```sh
curl -sX POST https://api.build-here.africa/lint \
  -H 'content-type: application/json' \
  -d "$(jq -n --arg s "$(cat ../_chapters/05-01-le-ticket-nest-pas-le-travail.md)" \
        '{filename: "05-01-le-ticket-nest-pas-le-travail.md", source: $s, nouvelle: false}')" \
  | jq -r .rapport
```

`nouvelle` distingue une contribution qui arrive d'une entrée déjà intégrée.
Sur une contribution, les champs de séquence `order` et `principle` sont
attendus à 999. Sur une entrée du livre, ils portent leur vrai numéro. Le
défaut est `true`.

## Les trois appelants, une seule implémentation

Les règles vivent dans `lint.mjs`, qui ne lit aucun fichier et n'appelle rien.

- `bin/lint-entree`, en local, la seule partie qui touche au disque
- ce Worker, la seule partie qui touche au réseau
- `.github/workflows/entree.yml`, qui appelle le Worker sur une pull request

Un contributeur et une pull request reçoivent donc le même verdict sur la
même entrée, sans deuxième copie des règles qui pourrait dériver.

## Déployer

```sh
npx wrangler login
npx wrangler deploy
```

Il faut que `build-here.africa` soit une zone du compte Cloudflare et qu'un
enregistrement DNS existe pour `api`.
