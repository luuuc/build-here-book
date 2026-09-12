// L'API de Build Here. Pour l'instant elle ne fait qu'une chose, verifier une
// entree contre les regles de l'annexe 1.
//
// Les regles vivent dans lint.mjs, qui ne lit aucun fichier et n'appelle rien.
// Ce fichier est la seule partie qui touche au reseau. Le meme module tourne
// dans bin/lint-entree en local, donc les regles ne peuvent pas deriver entre
// ce que voit un contributeur et ce que voit une pull request.
//
// Il ne refuse jamais une entree. Il rend un rapport, et le tri final est une
// lecture humaine contre les douze tests.

import { verifier, rapport } from "./lint.mjs";

const DEPOT = "luuuc/build-here-book";
const SOMMAIRE = `https://raw.githubusercontent.com/${DEPOT}/main/_data/sommaire.yml`;
const SITE = "https://build-here.africa";

// Les sections declarees changent rarement. Dix minutes de cache evitent un
// appel a GitHub par verification sans jamais servir une liste d'hier.
const TTL = 10 * 60 * 1000;
let cache = { sections: null, quand: 0 };

async function sections() {
  if (cache.sections && Date.now() - cache.quand < TTL) return cache.sections;

  try {
    const r = await fetch(SOMMAIRE, { headers: { "user-agent": "build-here-api" } });
    if (!r.ok) return cache.sections || [];
    const texte = await r.text();
    cache = {
      sections: texte
        .split(/\r?\n/)
        .filter((l) => /^\s{4}-\s+/.test(l))
        .map((l) => l.replace(/^\s{4}-\s+/, "").trim()),
      quand: Date.now(),
    };
    return cache.sections;
  } catch (e) {
    // Le controle de `part` disparait, le reste du rapport tient. Mieux vaut
    // un rapport incomplet qu'aucun rapport.
    return cache.sections || [];
  }
}

const entetes = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": SITE,
  "access-control-allow-headers": "content-type",
  "access-control-allow-methods": "POST, OPTIONS",
};

const json = (corps, statut = 200) =>
  new Response(JSON.stringify(corps, null, 2), { status: statut, headers: entetes });

export default {
  async fetch(requete) {
    const url = new URL(requete.url);

    if (requete.method === "OPTIONS") return new Response(null, { headers: entetes });

    if (url.pathname === "/" || url.pathname === "/sante") {
      return json({ service: "build-here-api", points: ["POST /lint"] });
    }

    if (url.pathname !== "/lint") return json({ erreur: "Point d'entrée inconnu." }, 404);
    if (requete.method !== "POST") return json({ erreur: "POST attendu." }, 405);

    let corps;
    try {
      corps = await requete.json();
    } catch (e) {
      return json({ erreur: "Corps JSON attendu : { filename, source, nouvelle }." }, 400);
    }

    if (typeof corps.source !== "string" || !corps.source.trim()) {
      return json({ erreur: "`source` manque, ou est vide." }, 400);
    }

    // Une entree fait environ 3 Ko. Cent fois ca laisse passer n'importe quelle
    // contribution honnete et arrete un envoi qui ne cherche pas a l'etre.
    if (corps.source.length > 300000) {
      return json({ erreur: "`source` dépasse 300 Ko." }, 413);
    }

    const r = verifier({
      filename: typeof corps.filename === "string" ? corps.filename : "",
      source: corps.source,
      sections: await sections(),
      nouvelle: corps.nouvelle !== false,
    });

    return json({ ...r, rapport: rapport(r) });
  },
};
