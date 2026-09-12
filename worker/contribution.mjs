// Recevoir une contribution, et la faire avancer jusqu'a une pull request.
//
// Le cycle, decide a l'etape 19 du brief :
//
//   une experience  ->  contribution structuree  ->  D1, en attente
//   ->  moderation  ->  markdown  ->  pull request  ->  fusion  ->  publie
//
// Rien n'atteint le depot avant la moderation. Le principe tient en une ligne :
// l'apport de la communaute est dynamique, le savoir publie reste dans Git.

import { verifier, rapport as texteDuRapport } from "./lint.mjs";
import {
  composerNumero,
  verifierJeton,
  regarderIp,
  retenirIp,
  retenirPiege,
  tropDeContributions,
  rang,
} from "./garde.mjs";
import {
  prochainNom,
  numeroDeSection,
  injecterFrontMatter,
  ouvrirPullRequest,
} from "./github.mjs";

// Cinq etats, et le code ecrit les cinq. La premiere version en declarait
// sept : `approuvee` et `fusionnee` n'etaient poses par aucun chemin, donc
// lus par personne. Un diagramme n'est pas du code. `fusionnee` reviendra le
// jour ou quelque chose surveillera la fusion des pull requests.
const ETATS = ["recue", "en_relecture", "a_corriger", "pr_ouverte", "refusee"];

const maintenant = () => Math.floor(Date.now() / 1000);

// E.164, validation large. Chiffres et un plus, huit a quinze caracteres.
// Aucune regle par pays : la lecture est panafricaine et diasporique, et un
// validateur strict rejetterait de vrais numeros.
function contactValide(canal, valeur) {
  const v = (valeur || "").trim();
  if (canal === "mail") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 200;
  if (canal === "whatsapp") return /^\+?\d{8,15}$/.test(v.replace(/[\s.-]/g, ""));
  return false;
}

export async function recevoir(requete, env, sections) {
  const donnees = await corpsDeLaRequete(requete);

  // Le champ piege. Un humain ne le voit pas et ne le remplit jamais. Rejet
  // silencieux : aucune ligne creee, et le robot recoit un succes pour qu'il
  // n'apprenne rien. Le compteur, lui, permet de savoir si le piege mange des
  // gens : s'il grimpe alors que la file reste vide, il faut le revoir.
  if ((donnees.site || "").trim()) {
    await retenirPiege(env.DB);
    return { statut: 200, corps: { recue: true, id: null } };
  }

  const markdown = (donnees.markdown || "").trim();
  const auteur = (donnees.auteur || "").trim();
  const canal = donnees.canal === "whatsapp" ? "whatsapp" : "mail";
  // Le numero arrive en deux morceaux quand le formulaire a un selecteur
  // d'indicatif. On recompose avant de valider.
  const contact =
    canal === "whatsapp"
      ? composerNumero(donnees.indicatif, donnees.contact)
      : (donnees.contact || "").trim();

  if (!markdown) return { statut: 400, corps: { erreur: "Le texte de l'entrée manque." } };
  if (markdown.length > 300000) return { statut: 413, corps: { erreur: "Le texte dépasse 300 Ko." } };
  if (!auteur) return { statut: 400, corps: { erreur: "Ton nom manque. Il apparaîtra sous le titre de l'entrée." } };
  if (auteur.length > 120) return { statut: 400, corps: { erreur: "Ton nom dépasse 120 caractères." } };
  if (!contactValide(canal, contact)) {
    return {
      statut: 400,
      corps: { erreur: "Il manque un mail ou un numéro WhatsApp pour que l'auteur puisse te répondre." },
    };
  }

  // On regarde sans compter. Le compteur ne monte qu'a l'enregistrement, plus
  // bas : un envoi refuse pour une autre raison ne doit rien couter au voisin
  // de NAT operateur.
  const ip = requete.headers.get("cf-connecting-ip");
  const reseau = await regarderIp(env.DB, env.JETON_SECRET, ip);
  if (!reseau.ok) {
    return { statut: 429, corps: { erreur: "Trop d'envois depuis ce réseau dans l'heure. Réessaie plus tard." } };
  }

  const client = (donnees.client || "").slice(0, 64);
  if (await tropDeContributions(env.DB, client)) {
    return { statut: 429, corps: { erreur: "Tu as déjà envoyé plusieurs entrées cette heure. Laisse-moi les lire." } };
  }

  const j = await verifierJeton(env.JETON_SECRET, donnees.jeton);
  if (!j.ok && j.raison === "trop rapide") {
    return { statut: 400, corps: { erreur: "Envoi trop rapide. Recharge la page et réessaie." } };
  }

  const r = verifier({
    filename: donnees.filename || "",
    source: markdown,
    sections,
    nouvelle: true,
  });
  const texte = texteDuRapport(r);

  const id = crypto.randomUUID();
  const t = maintenant();

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO contributions
         (id, titre, markdown, auteur, auteur_lien, rapport, etat, rang, client, cree_le, maj_le)
       VALUES (?, ?, ?, ?, ?, ?, 'recue', ?, ?, ?, ?)`
    ).bind(
      id,
      r.lu?.titre || null,
      markdown,
      auteur,
      (donnees.auteur_lien || "").trim() || null,
      JSON.stringify({ ...r, texte }),
      rang({ markdown, jetonOk: j.ok, jetonRaison: j.raison }),
      client || null,
      t,
      t
    ),
    env.DB.prepare(
      "INSERT INTO contacts (contribution_id, canal, valeur, cree_le) VALUES (?, ?, ?, ?)"
    ).bind(id, canal, contact, t),
  ]);

  await retenirIp(env.DB, reseau);

  return { statut: 201, corps: { recue: true, id, rapport: texte, lu: r.lu } };
}

// Deux formes acceptees. JSON quand la page a du JavaScript, formulaire
// classique quand elle n'en a pas : un envoi doit passer sur une mauvaise
// connexion, depuis un telephone, sans JavaScript.
async function corpsDeLaRequete(requete) {
  const type = requete.headers.get("content-type") || "";

  if (type.includes("application/json")) {
    try {
      return await requete.json();
    } catch (e) {
      return {};
    }
  }

  const f = await requete.formData();
  return Object.fromEntries([...f.entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]));
}

// ---- Ce qui suit demande Cloudflare Access ----

export function qui(requete) {
  return requete.headers.get("cf-access-authenticated-user-email");
}

// Sans etat, tout est rendu, ce qui attend en tete. La premiere version
// masquait les refusees : on ne pouvait plus jamais relire ce qu'on avait
// ecarte, ni voir ce que le rang avait mal classe.
export async function lister(env, etat) {
  const colonnes = `SELECT id, titre, auteur, etat, rang, pr_url, cree_le FROM contributions`;
  const q = ETATS.includes(etat)
    ? env.DB.prepare(`${colonnes} WHERE etat = ? ORDER BY rang ASC, cree_le DESC LIMIT 200`).bind(etat)
    : env.DB.prepare(`${colonnes} ORDER BY etat = 'recue' DESC, rang ASC, cree_le DESC LIMIT 200`);

  const { results } = await q.all();
  return results;
}

export async function une(env, id) {
  const c = await env.DB.prepare("SELECT * FROM contributions WHERE id = ?").bind(id).first();
  if (!c) return null;

  // Le contact n'est joint qu'ici, derriere Access. Aucune lecture publique
  // ne touche cette table.
  const contact = await env.DB.prepare(
    "SELECT canal, valeur FROM contacts WHERE contribution_id = ?"
  )
    .bind(id)
    .first();

  return { ...c, contact: contact || null };
}

export async function marquer(env, id, etat, note) {
  if (!ETATS.includes(etat)) return { erreur: "État inconnu." };
  const r = await env.DB.prepare(
    "UPDATE contributions SET etat = ?, note = ?, maj_le = ? WHERE id = ?"
  )
    .bind(etat, note || null, maintenant(), id)
    .run();
  return r.meta.changes ? { etat } : { erreur: "Contribution introuvable." };
}

export async function approuver(env, id, { sections, carte }) {
  const c = await une(env, id);
  if (!c) return { erreur: "Contribution introuvable." };
  if (c.pr_url) return { erreur: "Une pull request existe déjà.", pr_url: c.pr_url };
  if (!env.GITHUB_TOKEN) return { erreur: "GITHUB_TOKEN n'est pas configuré." };

  const markdown = injecterFrontMatter(c.markdown, {
    auteur: c.auteur,
    auteur_lien: c.auteur_lien,
  });

  const part = (markdown.match(/^part:\s*["']?(.+?)["']?\s*$/m) || [])[1] || "";
  const nom = await prochainNom(
    env.GITHUB_TOKEN,
    env.DEPOT,
    numeroDeSection(carte, part),
    c.titre || "entree"
  );

  let rapportTexte = null;
  try {
    rapportTexte = JSON.parse(c.rapport)?.texte || null;
  } catch (e) {}

  const url = await ouvrirPullRequest(env.GITHUB_TOKEN, env.DEPOT, {
    nom,
    markdown,
    titre: c.titre || nom,
    auteur: c.auteur,
    rapport: rapportTexte,
  });

  await env.DB.prepare(
    "UPDATE contributions SET etat = 'pr_ouverte', pr_url = ?, maj_le = ? WHERE id = ?"
  )
    .bind(url, maintenant(), id)
    .run();

  return { pr_url: url, nom };
}
