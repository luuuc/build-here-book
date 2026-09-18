// L'API de Build Here.
//
// Le livre reste statique et se lit sans rien d'ici. Si ce Worker tombe, le
// livre se lit. C'est le principe 31 du brief, et il decide tout le reste.
//
// Les regles editoriales vivent dans lint.mjs, qui ne lit aucun fichier et
// n'appelle rien. Le meme module tourne dans bin/lint-entree en local et dans
// la CI, sans deuxieme copie des regles qui pourrait deriver.

import { verifier, rapport } from "./lint.mjs";
import { emettreJeton } from "./garde.mjs";
import { pageAdmin } from "./admin.mjs";
import * as note from "./note.mjs";
import * as commentaire from "./commentaire.mjs";
import * as evaluation from "./evaluation.mjs";

const SITE = "https://build-here.africa";
const TTL_SOMMAIRE = 10 * 60 * 1000;

let cache = { sections: null, quand: 0 };

// Le sommaire decide quelles sections s'affichent, et le linter valide `part`
// contre lui. Il change rarement, dix minutes de cache evitent un appel par
// verification sans jamais servir une liste d'hier.
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

  // Un echec ne doit pas vider un cache encore valable : mieux vaut une liste
  // d'il y a une heure qu'un controle de `part` qui disparait en silence.
  const sections = yml
    ? yml
        .split(/\r?\n/)
        .filter((l) => /^\s{4}-\s+/.test(l))
        .map((l) => l.replace(/^\s{4}-\s+/, "").trim())
    : cache.sections;

  cache = { sections: sections || [], quand: Date.now() };
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
    headers: {
      "content-type": "application/json; charset=utf-8",
      // Une reponse JSON que le navigateur se met a deviner peut finir
      // interpretee comme autre chose que du JSON. Elle dit son type, et le
      // navigateur s'y tient.
      "x-content-type-options": "nosniff",
      ...cors,
    },
  });

// Un nonce par reponse. Seize octets tires au hasard, jamais reutilises.
const unNonce = () => btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));

// Les en-tetes d'une page HTML servie par ce Worker.
//
// Ici, contrairement au site, on peut poser de vrais en-tetes : le Worker est
// l'origine, il n'y a pas de GitHub Pages entre les deux. `frame-ancestors`
// fonctionne donc, ce qu'une balise meta ne permet pas, et c'est lui qui
// interdit de mettre la file dans un cadre sur un autre site.
//
// Le nonce ne couvre que le style et le script du gabarit. Tout le reste est
// refuse, y compris un `javascript:` dans un href. La file affiche du texte
// ecrit par des inconnus, et elle le fait dans la session Access, celle qui
// donne acces aux retours prives : c'est la page du
// systeme ou une injection couterait le plus cher.
//
// `script` passe a faux pour la page de repli sans JavaScript, qui n'en a
// aucun : elle merite mieux qu'un nonce, elle merite 'none'.
function enTetesHtml(nonce, { script = true } = {}) {
  return {
    "content-type": "text/html; charset=utf-8",
    "content-security-policy": [
      "default-src 'none'",
      script ? `script-src 'nonce-${nonce}'` : "script-src 'none'",
      `style-src 'nonce-${nonce}'`,
      "img-src 'self' data:",
      "connect-src 'self'",
      "base-uri 'none'",
      "form-action 'none'",
      "frame-ancestors 'none'",
    ].join("; "),
    "x-content-type-options": "nosniff",
    "referrer-policy": "no-referrer",
  };
}

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
          "POST /note",
          "GET /commentaires?page=",
          "POST /commentaire",
          "POST /evaluation",
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
      // quelle carte du depot et arrete un envoi qui ne cherche pas a l'etre.
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

    if (chemin === "/evaluation") {
      if (requete.method !== "POST") return json({ erreur: "POST attendu." }, 405);
      if (!env.DB) return json({ erreur: "La base n'est pas configurée." }, 500);
      const { statut, corps } = await evaluation.recevoir(requete, env);
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
      const email = (requete.headers.get("Cf-Access-Authenticated-User-Email") || "").trim();
      if (!email) return json({ erreur: "Cloudflare Access n'a pas authentifié cette requête." }, 403);
      if (!env.DB) return json({ erreur: "La base n'est pas configurée." }, 500);

      // Access dit qui appelle, pas depuis ou, et son cookie part en
      // SameSite=None par defaut. Un formulaire pose sur n'importe quel site
      // arrivait donc ici avec la session de l'auteur, et l'attaquant connait
      // deja l'identifiant a viser : POST /commentaire le lui a rendu. Il
      // faisait publier son propre commentaire sans que personne n'ait rien
      // relu. C'est precisement le filtre sur
      // lequel tout le reste repose.
      //
      // Aucun corps n'etait exige non plus : un `requete.json()` qui echoue est
      // avale plus bas, et l'action partait quand meme. Un formulaire classique
      // suffisait, sans une ligne de JavaScript.
      //
      // Le navigateur pose `origin` sur toute requete qui n'est ni GET ni HEAD,
      // meme de meme origine : la page de la file passe, un formulaire etranger
      // non. Un client hors navigateur doit poser l'en-tete lui-meme.
      if (requete.method === "POST" && requete.headers.get("origin") !== url.origin) {
        return json({ erreur: "Origine refusée." }, 403);
      }

      if (chemin === "/admin") {
        const n = unNonce();
        return new Response(pageAdmin(email, n), {
          headers: {
            ...enTetesHtml(n),
            // Une file de moderation lue depuis un cache est une file qui
            // ment : elle montre un etat que personne n'a plus. Le nonce a la
            // meme exigence : reutilise depuis un cache, il ne vaut plus rien.
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

      if (chemin === "/admin/evaluations" && requete.method === "GET") {
        return json(await evaluation.resume(env));
      }

      return json({ erreur: "Point d'entrée inconnu." }, 404);
    }

    return json({ erreur: "Point d'entrée inconnu." }, 404);
  },
};
