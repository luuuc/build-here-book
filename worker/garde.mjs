// Ce qui protege la file, et rien de plus.
//
// La moderation est le vrai filtre : aucun commentaire n'atteint un lecteur
// sans approbation. Tout ce qui suit protege donc l'attention de l'auteur.
//
// Aucun defi visible. Ni Turnstile ni Bot Fight Mode : derriere du NAT
// operateur, le defi tombe le plus souvent sur les lecteurs a qui ce livre
// s'adresse. Une defense qui taxe l'audience pour arreter des robots qu'on
// allait moderer de toute facon est un mauvais echange.

const FENETRE = 3600; // une heure, en secondes
const PLAFOND_IP = 60; // large : un NAT operateur met une ville derriere une IP
// Une note est un clic, pas un texte. Quelqu'un qui lit le livre d'une traite
// en pose legitimement plusieurs dizaines, et le livre compte 81 cartes.
const PLAFOND_NOTES_IP = 300;
// Un test demande plusieurs minutes. Cette limite ne vise que les scripts qui
// rempliraient la table, tout en laissant un reseau partage finir le test.
const PLAFOND_EVALUATIONS_IP = 120;
const AGE_JETON = 3; // secondes minimum entre le chargement et l'envoi
const VIE_JETON = 7200; // deux heures, le temps d'ecrire

const enc = new TextEncoder();

async function hmac(secret, message) {
  const cle = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cle, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Le jeton porte son propre horodatage. Un seul champ sert donc deux
// controles : l'age minimum, et la peremption.
export async function emettreJeton(secret) {
  const t = Math.floor(Date.now() / 1000);
  const alea = crypto.randomUUID();
  return { jeton: `${t}.${alea}.${await hmac(secret, `${t}.${alea}`)}`, emis: t };
}

export async function verifierJeton(secret, jeton) {
  if (typeof jeton !== "string" || !jeton) return { ok: false, raison: "absent" };

  const [t, alea, sig] = jeton.split(".");
  if (!t || !alea || !sig) return { ok: false, raison: "malforme" };
  if (sig !== (await hmac(secret, `${t}.${alea}`))) return { ok: false, raison: "signature" };

  const age = Math.floor(Date.now() / 1000) - Number(t);
  if (age < 0) return { ok: false, raison: "futur" };
  if (age < AGE_JETON) return { ok: false, raison: "trop rapide" };
  if (age > VIE_JETON) return { ok: false, raison: "perime" };

  return { ok: true, age };
}

// Le sel tourne chaque jour : le condensat n'est pas reversible, et deux
// jours ne se correlent pas.
//
// `usage` separe les compteurs. Sans lui, un lecteur qui note cinq entrees
// entamerait le quota de commentaire de tout son NAT operateur, ce qui est
// exactement le genre de couplage qu'on ne voit qu'en production.
async function cleIp(secret, ip, usage) {
  const jour = new Date().toISOString().slice(0, 10);
  return (await hmac(secret, `${usage}.${jour}.${ip}`)).slice(0, 32);
}

// Un garde-fou grossier, pas une limite par personne. La limite serree vit
// sur l'identifiant local du navigateur : une adresse IP peut porter une ville
// entiere derriere un NAT operateur, et la museler serait pire que le spam.
//
// Il se lit en deux temps, et l'ordre compte. La premiere version incrementait
// puis comparait, donc un refus faisait monter le compteur lui aussi : soixante
// requetes malformees suffisaient a murer un reseau entier jusqu'a la fin de
// l'heure, y compris pour quelqu'un qui arrivait apres. C'est exactement le mal
// que la conception voulait eviter.
//
// `regarder` ne compte rien, `retenir` compte une acceptation. Un envoi refuse
// pour n'importe quelle autre raison ne coute donc rien a son voisin de NAT.
export async function regarderIp(db, secret, ip, usage = "commentaire", plafond = PLAFOND_IP) {
  if (!ip) return { ok: true, compte: 0 };

  const cle = await cleIp(secret, ip, usage);
  const fenetre = Math.floor(Date.now() / 1000 / FENETRE) * FENETRE;

  // La purge epargne le compteur du piege : lui doit s'accumuler dans le
  // temps, c'est tout son interet.
  await db
    .prepare("DELETE FROM garde WHERE fenetre < ? AND cle <> 'piege'")
    .bind(fenetre)
    .run();
  const r = await db
    .prepare("SELECT compte FROM garde WHERE cle = ? AND fenetre = ?")
    .bind(cle, fenetre)
    .first();

  const compte = r?.compte ?? 0;
  return { ok: compte < plafond, compte, cle, fenetre };
}

export async function retenirIp(db, { cle, fenetre }) {
  if (!cle) return;
  await db
    .prepare(
      `INSERT INTO garde (cle, compte, fenetre) VALUES (?, 1, ?)
       ON CONFLICT (cle) DO UPDATE SET compte = compte + 1`
    )
    .bind(cle, fenetre)
    .run();
}

// Le rang trie la file, il ne refuse jamais. Un texte qui cite trois sources
// est exactement celui qu'on veut lire : il descend dans la file, il n'est
// pas ecarte.
// `seuilCourt` est le point ou un texte devient suspect par sa brievete. Il
// vaut 400 pour un texte long. Il ne veut rien dire pour un avis : « meme chose a Abidjan » fait
// vingt caracteres et c'est exactement ce qu'on veut lire. Passe a zero, le
// signal est eteint.
export function rang({ markdown, jetonOk, jetonRaison, seuilCourt = 400 }) {
  let r = 0;

  const liens = (markdown.match(/https?:\/\//g) || []).length;
  if (liens >= 2) r += liens;

  // Sans JavaScript, le jeton ne peut pas etre demande : la page est statique.
  // Une absence coute donc peu. Une signature fausse coute beaucoup, elle ne
  // s'obtient qu'en essayant.
  if (!jetonOk) r += jetonRaison === "absent" ? 2 : 10;

  if (/(.)\1{12,}/.test(markdown)) r += 5;
  if (seuilCourt && markdown.length < seuilCourt) r += 3;

  return r;
}

// Le piege avale en silence, et c'est voulu : un robot qui recoit un succes
// n'apprend rien. Mais un humain dont un gestionnaire de mots de passe remplit
// le champ recevrait le meme succes, et son entree n'existerait nulle part.
// Aucune ligne, aucune trace, sur le chemin que trois annexes passent a ouvrir.
//
// On garde donc un compteur, sans le texte. Si ce nombre grimpe alors que la
// file reste vide, le piege mange des gens.
export async function retenirPiege(db) {
  const fenetre = Math.floor(Date.now() / 1000 / FENETRE) * FENETRE;
  await db
    .prepare(
      `INSERT INTO garde (cle, compte, fenetre) VALUES ('piege', 1, ?)
       ON CONFLICT (cle) DO UPDATE SET compte = compte + 1, fenetre = ?`
    )
    .bind(fenetre, fenetre)
    .run();
}

// Le numero arrive en deux morceaux quand le formulaire a un selecteur
// d'indicatif : l'indicatif choisi, et ce que la personne a tape. On
// recompose ici plutot que dans la page, pour que ca marche aussi sans
// JavaScript, ou le select part tel quel dans le formulaire.
export function composerNumero(indicatif, saisi) {
  const n = (saisi || "").replace(/[\s.()-]/g, "");
  if (!n) return "";
  if (n.startsWith("+")) return n; // deja complet, on n'y touche pas
  const i = String(indicatif || "").replace(/\D/g, "");
  if (!i) return n;
  // Un zero de tete est la notation nationale : il saute devant l'indicatif.
  return "+" + i + n.replace(/^0+/, "");
}

// Le lien que quelqu'un laisse sous son nom finit dans un `href`, sur le site
// et dans la file. `javascript:` y est une URL valide : encodeURI ne touche pas
// au schema, et le navigateur decode avant d'executer. Echapper ne suffit donc
// pas, il faut une liste blanche de schemas.
//
// Elle est posee a l'ecriture, pas au rendu : la base ne doit jamais porter un
// lien qu'un gabarit pourrait rendre par erreur. Les rendus la reposent quand
// meme, pour les lignes ecrites avant ce controle.
export function lienSur(valeur) {
  const v = (valeur || "").trim().slice(0, 300);
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  // Quelqu'un qui tape « linkedin.com/in/xyz » a donne un lien, pas un schema.
  // On le complete plutot que de le perdre en silence : sans schema, le
  // navigateur le lisait comme un chemin du site et le lien etait deja casse.
  if (/^[^\s/:]+\.[^\s/:]+/.test(v)) return "https://" + v;
  return null;
}

export const seuils = { FENETRE, PLAFOND_IP, PLAFOND_NOTES_IP, PLAFOND_EVALUATIONS_IP, AGE_JETON, VIE_JETON };
