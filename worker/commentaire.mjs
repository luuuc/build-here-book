// Les discussions publiques autour des entrees.
//
// Elles ne sont pas de la relecture editoriale. Un desaccord, un contexte de
// plus, une experience depuis un autre marche, une question, un contre-exemple.
// Le livre separe trois choses et cette separation tient tout le reste :
//
//   « je ne suis pas d'accord parce que »  ->  ici
//   « cette phrase devrait dire X »        ->  une pull request
//   « ca ne m'a pas servi, il manque un exemple »  ->  la note
//
// Pas de giscus, et c'est le choix structurant. Un compte GitHub est un mur
// devant exactement les lecteurs a qui ce livre s'adresse. Et un livre qui
// consacre une section a l'ownership ne loue pas sa conversation a un tiers.

import {
  composerNumero,
  verifierJeton,
  regarderIp,
  retenirIp,
  retenirPiege,
  rang,
} from "./garde.mjs";

const maintenant = () => Math.floor(Date.now() / 1000);
const FENETRE = 3600;
const PLAFOND_CLIENT = 6;

function contactValide(canal, valeur) {
  const v = (valeur || "").trim();
  if (!v) return true; // facultatif, contrairement a une contribution
  if (canal === "mail") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 200;
  if (canal === "whatsapp") return /^\+?\d{8,15}$/.test(v.replace(/[\s.-]/g, ""));
  return false;
}

async function tropDeCommentaires(db, client) {
  if (!client) return false;
  const r = await db
    .prepare("SELECT COUNT(*) AS n FROM commentaires WHERE client = ? AND cree_le > ?")
    .bind(client, maintenant() - FENETRE)
    .first();
  return (r?.n ?? 0) >= PLAFOND_CLIENT;
}

export async function recevoir(requete, env) {
  let d;
  try {
    d = await requete.json();
  } catch (e) {
    return { statut: 400, corps: { erreur: "Corps JSON attendu." } };
  }

  // Le champ piege. Rejet silencieux, et un compteur pour savoir s'il mange
  // des gens : s'il grimpe alors que la file reste vide, il faut le revoir.
  if ((d.site || "").trim()) {
    await retenirPiege(env.DB);
    return { statut: 200, corps: { recu: true, id: null } };
  }

  const page = (d.page || "").trim().slice(0, 300);
  const auteur = (d.auteur || "").trim().slice(0, 120);
  const texte = (d.texte || "").trim();
  const canal = d.canal === "whatsapp" ? "whatsapp" : "mail";
  const contact =
    canal === "whatsapp" ? composerNumero(d.indicatif, d.contact) : (d.contact || "").trim();

  if (!page.startsWith("/")) return { statut: 400, corps: { erreur: "`page` manque." } };
  if (!auteur) return { statut: 400, corps: { erreur: "Ton nom manque. Il apparaîtra à côté de ce que tu écris." } };
  if (!texte) return { statut: 400, corps: { erreur: "Le texte manque." } };
  if (texte.length > 8000) return { statut: 413, corps: { erreur: "Le texte dépasse 8000 caractères." } };
  if (!contactValide(canal, contact)) {
    return { statut: 400, corps: { erreur: "Le mail ou le numéro n'a pas la bonne forme." } };
  }

  const reseau = await regarderIp(env.DB, env.JETON_SECRET, requete.headers.get("cf-connecting-ip"), "commentaire");
  if (!reseau.ok) {
    return { statut: 429, corps: { erreur: "Trop d'envois depuis ce réseau dans l'heure. Réessaie plus tard." } };
  }

  const client = (d.client || "").slice(0, 64);
  if (await tropDeCommentaires(env.DB, client)) {
    return { statut: 429, corps: { erreur: "Tu as déjà écrit plusieurs fois cette heure. Laisse-moi les lire." } };
  }

  const j = await verifierJeton(env.JETON_SECRET, d.jeton);
  if (!j.ok && j.raison === "trop rapide") {
    return { statut: 400, corps: { erreur: "Envoi trop rapide. Recharge la page et réessaie." } };
  }

  // Un parent doit exister et etre publie : on ne repond pas a un commentaire
  // que personne n'a encore vu.
  let parent = null;
  if (d.parent_id) {
    const p = await env.DB.prepare(
      "SELECT id FROM commentaires WHERE id = ? AND page = ? AND etat = 'publie'"
    )
      .bind(d.parent_id, page)
      .first();
    if (!p) return { statut: 400, corps: { erreur: "Le commentaire auquel tu réponds n'existe pas." } };
    parent = p.id;
  }

  const id = crypto.randomUUID();
  const t = maintenant();

  const ecritures = [
    env.DB.prepare(
      `INSERT INTO commentaires
         (id, page, titre, parent_id, auteur, ville, lien, texte, passage, etat, rang, client, cree_le, maj_le)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'en_attente', ?, ?, ?, ?)`
    ).bind(
      id,
      page,
      (d.titre || "").trim().slice(0, 300) || null,
      parent,
      auteur,
      (d.ville || "").trim().slice(0, 80) || null,
      (d.lien || "").trim().slice(0, 300) || null,
      texte,
      (d.passage || "").trim().slice(0, 1000) || null,
      // Pas de signal de brievete ici : un avis court est la regle.
      rang({ markdown: texte, jetonOk: j.ok, jetonRaison: j.raison, seuilCourt: 0 }),
      client || null,
      t,
      t
    ),
  ];

  if (contact) {
    ecritures.push(
      env.DB.prepare(
        "INSERT INTO contacts_commentaires (commentaire_id, canal, valeur, cree_le) VALUES (?, ?, ?, ?)"
      ).bind(id, canal, contact, t)
    );
  }

  await env.DB.batch(ecritures);
  await retenirIp(env.DB, reseau);

  return { statut: 201, corps: { recu: true, id } };
}

// La lecture publique. Elle ne touche jamais contacts_commentaires, et la
// forme rendue n'a pas de champ de contact du tout : absent, pas vide.
export async function publies(env, page) {
  const { results } = await env.DB.prepare(
    `SELECT id, parent_id, auteur, lien, texte, passage, auteur_du_livre, cree_le
     FROM commentaires
     WHERE page = ? AND etat = 'publie'
     ORDER BY cree_le ASC LIMIT 200`
  )
    .bind(page)
    .all();

  return results;
}

// ---- Derriere Cloudflare Access ----

export async function enAttente(env) {
  const { results } = await env.DB.prepare(
    `SELECT id, page, titre, auteur, rang, cree_le FROM commentaires
     WHERE etat = 'en_attente' ORDER BY rang ASC, cree_le ASC LIMIT 100`
  ).all();
  return results;
}

export async function un(env, id) {
  const c = await env.DB.prepare("SELECT * FROM commentaires WHERE id = ?").bind(id).first();
  if (!c) return null;

  const contact = await env.DB.prepare(
    "SELECT canal, valeur FROM contacts_commentaires WHERE commentaire_id = ?"
  )
    .bind(id)
    .first();

  const parent = c.parent_id
    ? await env.DB.prepare("SELECT auteur, texte FROM commentaires WHERE id = ?").bind(c.parent_id).first()
    : null;

  return { ...c, contact: contact || null, parent: parent || null };
}

export async function marquer(env, id, etat) {
  if (!["en_attente", "publie", "refuse"].includes(etat)) return { erreur: "État inconnu." };
  const r = await env.DB.prepare("UPDATE commentaires SET etat = ?, maj_le = ? WHERE id = ?")
    .bind(etat, maintenant(), id)
    .run();
  return r.meta.changes ? { etat } : { erreur: "Commentaire introuvable." };
}

// La reponse de l'auteur parait sans attendre : il n'a pas a se moderer
// lui-meme, et une conversation ou une moitie attend une file n'en est pas une.
export async function repondre(env, parentId, texte, nom) {
  const parent = await env.DB.prepare("SELECT page, titre FROM commentaires WHERE id = ?")
    .bind(parentId)
    .first();
  if (!parent) return { erreur: "Commentaire introuvable." };

  const propre = (texte || "").trim();
  if (!propre) return { erreur: "Le texte manque." };

  const t = maintenant();
  const id = crypto.randomUUID();

  await env.DB.prepare(
    `INSERT INTO commentaires
       (id, page, titre, parent_id, auteur, texte, etat, auteur_du_livre, cree_le, maj_le)
     VALUES (?, ?, ?, ?, ?, ?, 'publie', 1, ?, ?)`
  )
    .bind(id, parent.page, parent.titre, parentId, nom, propre.slice(0, 8000), t, t)
    .run();

  return { id, publie: true };
}
