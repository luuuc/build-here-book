// Resultats anonymes de l'Ultimate Builder Test.
//
// Le calcul reste dans le navigateur : le test fonctionne si le Worker tombe.
// L'API ne recoit ni reponses individuelles, ni nom, ni contact, ni identifiant
// stable. Elle garde uniquement les dix scores et le prochain niveau, afin de
// voir si une question ou une etape produit des resultats aberrants.

import { regarderIp, retenirIp, seuils } from "./garde.mjs";

const maintenant = () => Math.floor(Date.now() / 1000);

export async function recevoir(requete, env) {
  let d;
  try {
    d = await requete.json();
  } catch (e) {
    return { statut: 400, corps: { erreur: "Corps JSON attendu." } };
  }

  const scores = Array.isArray(d.scores) ? d.scores : [];
  const valides = scores.length === 10 && scores.every((n) => Number.isInteger(n) && n >= 0 && n <= 100);
  const niveau = Number(d.niveau);
  const prochain = Number(d.prochain);
  const version = Number(d.version);

  if (!valides) return { statut: 400, corps: { erreur: "`scores` doit contenir dix entiers de 0 à 100." } };
  if (!Number.isInteger(niveau) || niveau < 0 || niveau > 10) return { statut: 400, corps: { erreur: "`niveau` est invalide." } };
  if (!Number.isInteger(prochain) || prochain < 1 || prochain > 10) return { statut: 400, corps: { erreur: "`prochain` est invalide." } };
  if (version !== 1) return { statut: 400, corps: { erreur: "Version du test inconnue." } };

  const reseau = await regarderIp(
    env.DB,
    env.JETON_SECRET,
    requete.headers.get("cf-connecting-ip"),
    "evaluation",
    seuils.PLAFOND_EVALUATIONS_IP
  );
  if (!reseau.ok) return { statut: 429, corps: { erreur: "Trop d'évaluations depuis ce réseau dans l'heure." } };

  await env.DB.prepare(
    `INSERT INTO evaluations (id, version, scores, niveau, prochain, cree_le)
     VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(crypto.randomUUID(), version, JSON.stringify(scores), niveau, prochain, maintenant())
    .run();
  await retenirIp(env.DB, reseau);

  return { statut: 201, corps: { recue: true } };
}

export async function resume(env) {
  const { results: niveaux } = await env.DB.prepare(
    `SELECT niveau, prochain, COUNT(*) AS total
     FROM evaluations GROUP BY niveau, prochain ORDER BY niveau, prochain`
  ).all();
  const { results: lignes } = await env.DB.prepare(
    `SELECT scores FROM evaluations ORDER BY cree_le DESC LIMIT 1000`
  ).all();

  const sommes = Array(10).fill(0);
  let comptes = 0;
  for (const ligne of lignes) {
    try {
      const scores = JSON.parse(ligne.scores);
      if (scores.length !== 10) continue;
      scores.forEach((n, i) => (sommes[i] += Number(n) || 0));
      comptes++;
    } catch (e) {}
  }

  return {
    total: niveaux.reduce((n, ligne) => n + Number(ligne.total || 0), 0),
    niveaux,
    moyennes: comptes ? sommes.map((n) => Math.round(n / comptes)) : Array(10).fill(0),
  };
}
