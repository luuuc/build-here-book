// L'API de Build Here.
//
// Le livre reste statique et se lit sans rien d'ici. Si ce Worker tombe, le
// livre se lit. C'est le principe 31 du brief, et il decide tout le reste.
//
// Les regles de l'annexe 1 vivent dans lint.mjs, qui ne lit aucun fichier et
// n'appelle rien. Le meme module tourne dans bin/lint-entree en local, donc un
// contributeur et une pull request recoivent le meme verdict sur la meme
// entree, sans deuxieme copie des regles qui pourrait deriver.

import { verifier, rapport } from "./lint.mjs";
import { emettreJeton } from "./garde.mjs";
import * as contribution from "./contribution.mjs";
import { carteDesSections } from "./github.mjs";
import { pageAdmin } from "./admin.mjs";
import * as note from "./note.mjs";
import * as commentaire from "./commentaire.mjs";

const SITE = "https://build-here.africa";
const TTL_SOMMAIRE = 10 * 60 * 1000;

let cache = { sections: null, carte: null, quand: 0 };

// Deux choses lues dans le depot, et elles ne disent pas la meme chose.
//
// sommaire.yml est le menu curate : il decide quelles sections s'affichent, et
// c'est contre lui que le linter valide `part`. Une section absente de ce
// fichier n'apparaitrait dans aucun sommaire.
//
// book.json est ce qui existe reellement : il donne le prefixe de fichier de
// chaque section, dont l'ouverture d'une pull request a besoin pour nommer le
// fichier.
//
// Les deux changent rarement, dix minutes de cache evitent un appel par
// requete sans jamais servir une liste d'hier.
async function depot(env) {
  if (cache.sections && Date.now() - cache.quand < TTL_SOMMAIRE) return cache;

  const lire = async (url, defaut) => {
    try {
      const r = await fetch(url, { headers: { "user-agent": "build-here-api" } });
      return r.ok ? await r.text() : defaut;
    } catch (e) {
      return defaut;
    }
  };

  const brut = `https://raw.githubusercontent.com/${env.DEPOT}/main`;
  const yml = await lire(`${brut}/_data/sommaire.yml`, null);
  const json = await lire(`${env.SITE || SITE}/book.json`, null);

  // Un echec ne doit pas vider un cache encore valable : mieux vaut une liste
  // d'il y a une heure qu'un controle de `part` qui disparait en silence.
  const sections = yml
    ? yml
        .split(/\r?\n/)
        .filter((l) => /^\s{4}-\s+/.test(l))
        .map((l) => l.replace(/^\s{4}-\s+/, "").trim())
    : cache.sections;

  let carte = cache.carte;
  if (json) {
    try {
      carte = carteDesSections(JSON.parse(json));
    } catch (e) {}
  }

  cache = { sections: sections || [], carte: carte || {}, quand: Date.now() };
  return cache;
}

const sections = async (env) => (await depot(env)).sections;

const cors = {
  "access-control-allow-origin": SITE,
  "access-control-allow-headers": "content-type",
  "access-control-allow-methods": "GET, POST, OPTIONS",
};

const json = (corps, statut = 200) =>
  new Response(JSON.stringify(corps, null, 2), {
    status: statut,
    headers: { "content-type": "application/json; charset=utf-8", ...cors },
  });

export default {
  async fetch(requete, env) {
    const url = new URL(requete.url);
    const chemin = url.pathname.replace(/\/+$/, "") || "/";

    if (requete.method === "OPTIONS") return new Response(null, { headers: cors });

    // ---- Public ----

    if (chemin === "/" || chemin === "/sante") {
      return json({
        service: "build-here-api",
        points: [
          "GET /jeton",
          "POST /lint",
          "POST /contribution",
          "POST /note",
          "GET /commentaires?page=",
          "POST /commentaire",
        ],
      });
    }

    if (chemin === "/jeton") {
      if (!env.JETON_SECRET) return json({ erreur: "JETON_SECRET n'est pas configuré." }, 500);
      const { jeton } = await emettreJeton(env.JETON_SECRET);
      // Le pays vient de Cloudflare, qui le pose sur chaque requete. La page
      // est servie statiquement par Pages, donc elle ne peut pas le savoir
      // autrement, et c'est le seul appel qu'elle fait de toute facon.
      return json({ jeton, pays: requete.cf?.country || null });
    }

    if (chemin === "/lint") {
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
      // Une entree fait environ 3 Ko. Cent fois ca laisse passer n'importe
      // quelle contribution honnete et arrete un envoi qui ne cherche pas
      // a l'etre.
      if (corps.source.length > 300000) return json({ erreur: "`source` dépasse 300 Ko." }, 413);

      const r = verifier({
        filename: typeof corps.filename === "string" ? corps.filename : "",
        source: corps.source,
        sections: await sections(env),
        nouvelle: corps.nouvelle !== false,
      });
      return json({ ...r, rapport: rapport(r) });
    }

    if (chemin === "/commentaires") {
      if (!env.DB) return json({ erreur: "La base n'est pas configurée." }, 500);
      const page = (url.searchParams.get("page") || "").trim();
      if (!page.startsWith("/")) return json({ erreur: "`page` manque." }, 400);
      return json({ commentaires: await commentaire.publies(env, page) });
    }

    if (chemin === "/commentaire") {
      if (requete.method !== "POST") return json({ erreur: "POST attendu." }, 405);
      if (!env.DB) return json({ erreur: "La base n'est pas configurée." }, 500);
      const { statut, corps } = await commentaire.recevoir(requete, env);
      return json(corps, statut);
    }

    if (chemin === "/note") {
      if (requete.method !== "POST") return json({ erreur: "POST attendu." }, 405);
      if (!env.DB) return json({ erreur: "La base n'est pas configurée." }, 500);
      const { statut, corps } = await note.noter(requete, env);
      return json(corps, statut);
    }

    if (chemin === "/contribution") {
      if (requete.method !== "POST") return json({ erreur: "POST attendu." }, 405);
      if (!env.DB) return json({ erreur: "La base n'est pas configurée." }, 500);

      const { statut, corps } = await contribution.recevoir(requete, env, await sections(env));

      // Sans JavaScript, le navigateur a envoye un formulaire classique et
      // attend une page, pas du JSON.
      const veutDuJson = (requete.headers.get("accept") || "").includes("application/json");
      if (!veutDuJson) {
        return new Response(pageReponse(statut, corps), {
          status: statut,
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }
      return json(corps, statut);
    }

    // ---- Derriere Cloudflare Access ----
    //
    // La politique Access s'applique au chemin /admin dans le tableau de bord
    // Cloudflare, donc une requete qui arrive ici a deja ete authentifiee au
    // bord. Le controle ci-dessous est une seconde barriere : si la politique
    // est retiree par accident, l'en-tete disparait et rien ne passe.
    //
    // La verification cryptographique du JWT d'Access, contre les cles de
    // l'equipe, serait plus forte. Elle est notee dans le README comme le
    // durcissement a faire avant que quelqu'un d'autre que l'auteur ait acces.

    if (chemin.startsWith("/admin")) {
      const email = contribution.qui(requete);
      if (!email) return json({ erreur: "Cloudflare Access n'a pas authentifié cette requête." }, 403);
      if (!env.DB) return json({ erreur: "La base n'est pas configurée." }, 500);

      if (chemin === "/admin") {
        return new Response(pageAdmin(email), {
          headers: {
            "content-type": "text/html; charset=utf-8",
            // Une file de moderation lue depuis un cache est une file qui
            // ment : elle montre un etat que personne n'a plus.
            "cache-control": "no-store",
          },
        });
      }

      if (chemin === "/admin/commentaires" && requete.method === "GET") {
        return json({
          commentaires: await commentaire.lister(env, url.searchParams.get("etat")),
        });
      }

      const mc = chemin.match(/^\/admin\/commentaires\/([0-9a-f-]{36})(\/[a-z-]+)?$/);
      if (mc) {
        const [, id, action] = mc;

        if (!action && requete.method === "GET") {
          const c = await commentaire.un(env, id);
          return c ? json(c) : json({ erreur: "Commentaire introuvable." }, 404);
        }

        if (requete.method !== "POST") return json({ erreur: "POST attendu." }, 405);

        let corps = {};
        try {
          corps = await requete.json();
        } catch (e) {}

        if (action === "/publier") return json(await commentaire.marquer(env, id, "publie"));
        if (action === "/refuser") return json(await commentaire.marquer(env, id, "refuse"));
        if (action === "/repondre") {
          return json(await commentaire.repondre(env, id, corps.texte, env.NOM_AUTEUR || "Luc"));
        }
      }

      if (chemin === "/admin/notes" && requete.method === "GET") {
        return json(await note.resume(env));
      }

      if (chemin === "/admin/contributions" && requete.method === "GET") {
        return json({ contributions: await contribution.lister(env, url.searchParams.get("etat")) });
      }

      const m = chemin.match(/^\/admin\/contributions\/([0-9a-f-]{36})(\/[a-z-]+)?$/);
      if (m) {
        const [, id, action] = m;

        if (!action && requete.method === "GET") {
          const c = await contribution.une(env, id);
          return c ? json(c) : json({ erreur: "Contribution introuvable." }, 404);
        }

        if (requete.method !== "POST") return json({ erreur: "POST attendu." }, 405);

        let corps = {};
        try {
          corps = await requete.json();
        } catch (e) {}

        if (action === "/approuver") {
          try {
            return json(await contribution.approuver(env, id, await depot(env)));
          } catch (e) {
            // L'ouverture de la pull request peut echouer a mi-chemin : une
            // branche creee sans fichier, par exemple. L'etat n'avance pas, le
            // message dit ou ca s'est arrete, et l'auteur reessaie.
            return json({ erreur: e.message }, 502);
          }
        }

        if (action === "/refuser") return json(await contribution.marquer(env, id, "refusee", corps.note));
        if (action === "/a-corriger") return json(await contribution.marquer(env, id, "a_corriger", corps.note));
        if (action === "/en-relecture") return json(await contribution.marquer(env, id, "en_relecture", corps.note));
      }

      return json({ erreur: "Point d'entrée inconnu." }, 404);
    }

    return json({ erreur: "Point d'entrée inconnu." }, 404);
  },
};

// La reponse sans JavaScript. Volontairement nue : c'est un repli, pas une
// page du site.
function pageReponse(statut, corps) {
  const ok = statut < 400;
  const titre = ok ? "Reçue" : "Pas envoyée";
  const message = ok
    ? "Ton entrée est arrivée. Je lis tout avant publication, et je te réponds sur le contact que tu as laissé."
    : corps.erreur || "Quelque chose n'a pas marché.";

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titre} | Build Here</title>
<style>body{font-family:Georgia,serif;line-height:1.7;max-width:34em;margin:4rem auto;padding:0 1.5rem;color:#2B2925}
h1{font-size:1.6rem}pre{white-space:pre-wrap;background:#FAF7F0;padding:1rem;font-size:.85rem}a{color:#8A6100}</style>
</head><body>
<h1>${titre}</h1>
<p>${message}</p>
${corps.rapport ? `<pre>${corps.rapport.replace(/[<&]/g, (c) => (c === "<" ? "&lt;" : "&amp;"))}</pre>` : ""}
<p><a href="${SITE}/contribuer">Retour</a></p>
</body></html>`;
}
