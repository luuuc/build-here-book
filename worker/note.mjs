// La note d'une entree.
//
// Ni etoiles ni score. Trois reponses, et une raison structuree quand ce n'est
// pas oui. Ce qui vaut n'est pas le compte des « oui », c'est « il manque un
// exemple » sur une entree precise, parce que ca se repare et qu'un score ne
// se repare pas.
//
// Le commentaire libre ne s'affiche jamais, nulle part. C'est ce qui lui evite
// toute moderation, et c'est aussi ce qui permet d'y etre franc.

import { regarderIp, retenirIp, seuils } from "./garde.mjs";

const VALEURS = ["oui", "moitie", "non"];
const RAISONS = ["abstrait", "deja-su", "desaccord", "exemple", "autre"];

const maintenant = () => Math.floor(Date.now() / 1000);

export async function noter(requete, env) {
  let d;
  try {
    d = await requete.json();
  } catch (e) {
    return { statut: 400, corps: { erreur: "Corps JSON attendu." } };
  }

  const page = (d.page || "").trim().slice(0, 300);
  const valeur = VALEURS.includes(d.valeur) ? d.valeur : null;
  const client = (d.client || "").trim().slice(0, 64);

  if (!page.startsWith("/")) return { statut: 400, corps: { erreur: "`page` manque." } };
  if (!valeur) return { statut: 400, corps: { erreur: "`valeur` doit être oui, moitie ou non." } };
  if (!client) return { statut: 400, corps: { erreur: "`client` manque." } };

  // Pas de captcha : la cible n'en vaut pas la peine, et un defi coute plus
  // aux lecteurs qu'il ne coute a qui voudrait fausser trois chiffres.
  // Un garde-fou reseau large suffit a borner la table, et il a son propre
  // compteur pour ne pas entamer celui des commentaires.
  const reseau = await regarderIp(
    env.DB,
    env.JETON_SECRET,
    requete.headers.get("cf-connecting-ip"),
    "note",
    seuils.PLAFOND_NOTES_IP
  );
  if (!reseau.ok) return { statut: 429, corps: { erreur: "Trop de notes depuis ce réseau dans l'heure." } };

  const t = maintenant();

  // Revoter remplace au lieu d'ajouter : quelqu'un qui change d'avis ne doit
  // pas compter deux fois. L'index unique sur (page, client) le garantit.
  await env.DB.prepare(
    `INSERT INTO notes (id, page, titre, valeur, raison, commentaire, client, cree_le, maj_le)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (page, client) DO UPDATE SET
       valeur = excluded.valeur,
       raison = excluded.raison,
       commentaire = excluded.commentaire,
       titre = excluded.titre,
       maj_le = excluded.maj_le`
  )
    .bind(
      crypto.randomUUID(),
      page,
      (d.titre || "").trim().slice(0, 300) || null,
      valeur,
      RAISONS.includes(d.raison) ? d.raison : null,
      (d.commentaire || "").trim().slice(0, 4000) || null,
      client,
      t,
      t
    )
    .run();

  await retenirIp(env.DB, reseau);

  return { statut: 201, corps: { notee: true } };
}

// ---- Derriere Cloudflare Access ----
//
// Les notes ne se moderent pas, elles se lisent. Ce qui suit est la seule
// raison de les avoir collectees : voir quelle entree ne sert pas, et pourquoi.

export async function resume(env) {
  const { results: pages } = await env.DB.prepare(
    `SELECT page,
            MAX(titre) AS titre,
            COUNT(*) AS total,
            SUM(valeur = 'oui') AS oui,
            SUM(valeur = 'moitie') AS moitie,
            SUM(valeur = 'non') AS non
     FROM notes
     GROUP BY page
     ORDER BY (SUM(valeur = 'moitie') + SUM(valeur = 'non') * 2) DESC, total DESC
     LIMIT 100`
  ).all();

  const { results: raisons } = await env.DB.prepare(
    `SELECT page, raison, COUNT(*) AS n FROM notes
     WHERE raison IS NOT NULL GROUP BY page, raison ORDER BY n DESC`
  ).all();

  // Les commentaires arrivent bruts, les plus recents devant. Ils ne sont
  // agreges nulle part : une phrase de quelqu'un qui a lu vaut mieux que
  // n'importe quel compte.
  const { results: mots } = await env.DB.prepare(
    `SELECT page, titre, valeur, raison, commentaire, maj_le FROM notes
     WHERE commentaire IS NOT NULL AND commentaire <> ''
     ORDER BY maj_le DESC LIMIT 50`
  ).all();

  return { pages, raisons, commentaires: mots };
}
