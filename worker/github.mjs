// Ouvrir la pull request, apres moderation et jamais avant.
//
// L'inverse remplirait le depot de spam. C'est le principe de l'etape 19 du
// brief : l'apport de la communaute est dynamique, le savoir publie reste
// controle par Git.
//
// Le jeton est a portee fine, `contents:write` et `pull_requests:write`, sur
// ce depot seul. Il ne peut rien faire d'autre que ce qui est ici.

const API = "https://api.github.com";

function entetes(jeton) {
  return {
    authorization: `Bearer ${jeton}`,
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "user-agent": "build-here-api",
    "content-type": "application/json",
  };
}

async function gh(jeton, chemin, init = {}) {
  const r = await fetch(`${API}${chemin}`, { ...init, headers: entetes(jeton) });
  const texte = await r.text();
  let corps = null;
  try {
    corps = texte ? JSON.parse(texte) : null;
  } catch (e) {
    corps = { message: texte };
  }
  if (!r.ok) {
    throw new Error(`GitHub ${r.status} sur ${chemin} : ${corps?.message || "sans message"}`);
  }
  return corps;
}

function slug(titre) {
  return titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Le CONTRIBUTING dit de prendre le numero libre suivant dans la section, et
// que la renumerotation se fait a l'integration. On lit donc le dossier au
// lieu de deviner.
export async function prochainNom(jeton, depot, sectionNum, titre) {
  const ss = String(sectionNum).padStart(2, "0");
  let occupes = [];
  let lu = false;

  try {
    const liste = await gh(jeton, `/repos/${depot}/contents/_chapters`);
    occupes = liste
      .map((f) => f.name.match(new RegExp(`^${ss}-(\\d{2})-`)))
      .filter(Boolean)
      .map((m) => Number(m[1]));
    lu = true;
  } catch (e) {
    // Le dossier illisible ne doit pas bloquer une contribution.
  }

  // Deux replis, et ils ne disent pas la meme chose.
  //
  // Le dossier lu et vide : la section est neuve, 01 est libre.
  //
  // Le dossier illisible : on ne sait pas ce qui est pris, et 01 est
  // pratiquement sur d'entrer en collision. GitHub refuse alors un PUT sans
  // sha sur un fichier existant, et l'approbation meurt sur une 422 apres
  // avoir cree une branche orpheline. 99 est libre par construction, il est
  // manifestement faux, donc visible, et le CONTRIBUTING dit deja que la
  // renumerotation se fait a l'integration.
  const n = lu ? (occupes.length ? Math.max(...occupes) + 1 : 1) : 99;
  const nn = String(n).padStart(2, "0");
  return `${ss}-${nn}-${slug(titre)}.md`;
}

// Le numero de section vient du livre, pas du contributeur, et pas d'une
// deduction.
//
// La premiere version prenait l'index de la section dans sommaire.yml. Verifie
// sur le depot, ca donnait le bon numero pour les dix-huit sections reelles,
// mais par coincidence : le fichier du sommaire est un menu curate, il n'a
// aucune obligation de suivre la numerotation des fichiers. Une section
// inseree dans le menu sans renumeroter les fichiers, et toute contribution
// suivante atterrissait dans la mauvaise section.
//
// La carte est donc lue dans book.json, qui porte l'URL et la section de
// chaque chapitre. Le prefixe y est celui des fichiers, par construction.
export function carteDesSections(livre) {
  const carte = {};
  for (const c of livre?.tableOfContents || []) {
    const m = (c.url || "").match(/\/chapters\/(\d{2})-/);
    if (m && c.part && carte[c.part] === undefined) carte[c.part] = Number(m[1]);
  }
  return carte;
}

// 99 quand la section est inconnue : le fichier atterrit en fin de dossier,
// visible, et l'auteur renumerote a l'integration comme le CONTRIBUTING le dit.
// Mieux vaut un numero manifestement faux qu'un numero plausible et faux.
export function numeroDeSection(carte, part) {
  const n = carte[part];
  return Number.isInteger(n) ? n : 99;
}

// Le markdown arrive du contributeur, eventuellement produit par son
// assistant. On respecte ce qu'il a ecrit et on impose seulement les quatre
// champs qui ne sont pas les siens : sa signature, et les deux champs de
// sequence que l'auteur recalcule.
export function injecterFrontMatter(markdown, { auteur, auteur_lien }) {
  const m = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return markdown;

  let fm = m[1];
  const corps = markdown.slice(m[0].length);

  const poser = (cle, valeur) => {
    const q = `${cle}: ${JSON.stringify(valeur)}`;
    const re = new RegExp(`^${cle}:.*$`, "m");
    fm = re.test(fm) ? fm.replace(re, q) : `${fm}\n${q}`;
  };

  poser("author", auteur);
  if (auteur_lien) poser("author_link", auteur_lien);
  else fm = fm.replace(/^author_link:.*$\n?/m, "");

  poser("order", 999);

  // `principle` est ce qui fait qu'un fichier est une entree : le gabarit
  // teste `page.metadata.principle` pour la classe du contenu, et la page
  // d'accueil compte les entrees avec. Une contribution qui l'oublie serait
  // publiee en page de section. On le pose donc, on ne se contente pas de le
  // corriger quand il est deja la.
  if (/^\s+principle:.*$/m.test(fm)) {
    fm = fm.replace(/^(\s+)principle:.*$/m, '$1principle: "999"');
  } else if (/^metadata:\s*$/m.test(fm)) {
    fm = fm.replace(/^metadata:\s*$/m, 'metadata:\n  principle: "999"');
  } else {
    fm = `${fm}\nmetadata:\n  principle: "999"`;
  }

  return `---\n${fm}\n---\n${corps}`;
}

export async function ouvrirPullRequest(jeton, depot, { nom, markdown, titre, auteur, rapport }) {
  const branche = `entree/${nom.replace(/\.md$/, "")}`;

  const principal = await gh(jeton, `/repos/${depot}/git/ref/heads/main`);

  // Cinq appels en sequence, et ce n'est pas une transaction : ca ne peut pas
  // l'etre. Un echec a mi-chemin laisse une branche creee sans fichier, et le
  // deuxieme essai mourait alors sur « la branche existe deja ».
  //
  // On le rend donc rejouable. Si la branche est la, on continue avec elle au
  // lieu de repartir de zero, et l'auteur n'a qu'a reappuyer.
  try {
    await gh(jeton, `/repos/${depot}/git/refs`, {
      method: "POST",
      body: JSON.stringify({ ref: `refs/heads/${branche}`, sha: principal.object.sha }),
    });
  } catch (e) {
    if (!/already exists/i.test(e.message)) throw e;
  }

  // Meme raison pour le fichier : s'il est deja pose, GitHub exige son sha
  // pour le remplacer.
  let sha;
  try {
    const existant = await gh(
      jeton,
      `/repos/${depot}/contents/_chapters/${nom}?ref=${encodeURIComponent(branche)}`
    );
    sha = existant?.sha;
  } catch (e) {
    // 404 attendu au premier essai : le fichier n'existe pas encore.
  }

  // btoa ne prend que du latin-1. Le livre est en francais accentue, donc on
  // passe par les octets UTF-8 avant d'encoder.
  const octets = new TextEncoder().encode(markdown);
  // Par tranches : String.fromCharCode(...octets) depasse la limite
  // d'arguments d'un appel des que le texte fait quelques dizaines de Ko, et
  // la limite d'envoi est a 300.
  let brut = "";
  for (let i = 0; i < octets.length; i += 8192) {
    brut += String.fromCharCode(...octets.subarray(i, i + 8192));
  }
  const b64 = btoa(brut);

  await gh(jeton, `/repos/${depot}/contents/_chapters/${nom}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `docs(chapters): ${titre}`,
      content: b64,
      branch: branche,
      ...(sha ? { sha } : {}),
    }),
  });

  // Et pour la pull request : si elle est deja ouverte sur cette branche, on
  // rend son URL au lieu d'echouer.
  try {
    const pr = await gh(jeton, `/repos/${depot}/pulls`, {
      method: "POST",
      body: JSON.stringify({
        title: titre,
        head: branche,
        base: "main",
        body: corpsDeLaPr({ titre, auteur, rapport, nom }),
      }),
    });
    return pr.html_url;
  } catch (e) {
    if (!/already exist/i.test(e.message)) throw e;
    const ouvertes = await gh(
      jeton,
      `/repos/${depot}/pulls?head=${encodeURIComponent(depot.split("/")[0] + ":" + branche)}&state=open`
    );
    if (ouvertes?.[0]?.html_url) return ouvertes[0].html_url;
    throw e;
  }
}

function corpsDeLaPr({ titre, auteur, rapport, nom }) {
  return [
    `Une carte proposée par **${auteur}**, arrivée par le formulaire du site.`,
    "",
    `Fichier : \`_chapters/${nom}\`. Les champs \`order\` et \`principle\` sont à 999, ils se recalculent à l'intégration.`,
    "",
    "## Le contrôle des règles de l'annexe 1",
    "",
    "```",
    rapport || "Aucun rapport enregistré.",
    "```",
    "",
    "Ce contrôle ne porte que sur ce que l'annexe 1 écrit. Les douze tests de l'annexe 2 sont une lecture humaine, et c'est cette relecture qui décide.",
  ].join("\n");
}
