// Les regles de l'annexe 1, en un seul endroit.
//
// Ce module ne lit aucun fichier et n'appelle rien. Il prend une source et
// rend un rapport. C'est ce qui lui permet de tourner aussi bien dans un
// Worker que dans un node local ou dans la CI, sans deuxieme implementation
// des regles qui pourrait deriver.
//
// Deux principes, decides par le conseil de relecture.
//
// 1. Il ne refuse jamais rien. Il dit ce qui manque, il ne ferme pas la porte.
//    Le tri final est une lecture humaine contre les douze tests.
//
// 2. Le rapport commence par ce qui a ete compris, pas par ce qui manque.
//    Quelqu'un doit lire d'abord qu'on a lu son idee.
//
// Deux niveaux, et ils ne se melangent pas dans le rapport. « regle » vient
// de l'annexe 1, qui est ecrite et publique. « mesure » n'est qu'une
// statistique sur les entrees existantes, et n'engage personne.

export const BLOCS = [
  "Le réflexe",
  "Le réflexe builder",
  "Pourquoi",
  "À essayer",
  "Depuis ton siège",
  "À discuter",
];

export const SIEGES = [
  "Engineer",
  "Product",
  "Design",
  "Founder",
  "Manager",
  "Customer-facing",
  "Recrutement",
];

// Des mesures et non des regles, alignees sur l'annexe 1 depuis le 12/09/2026.
//
// Mesure avec ce comptage, bloc « Depuis ton siege » exclu comme l'annexe le
// demande, les 68 entrees vont de 307 a 596 mots, mediane 434, p90 517.
//
// L'annexe ecrivait « 200 a 350 mots, jusqu'a 450 ». Ces chiffres couvraient 12 %
// du livre et aucune entree n'etait sous 300 : un contributeur qui les suivait
// produisait un texte 20 % plus court que tout ce qui l'entoure. L'annexe dit
// maintenant 300 a 500, jusqu'a 550, et ces deux seuils sont ceux-la.
//
// Le plancher sert autant que le plafond. Une entree trop courte est en general
// un principe sans situation, un des trois etats d'echec de l'annexe 2.
export const MOTS_SIGNAL = 550;
export const MOTS_PLANCHER = 300;

const EM_DASH = "—";
const EN_DASH = "–";
const APOSTROPHE_COURBE = "’";

const CLES_REQUISES = [
  "layout",
  "title",
  "part",
  "order",
  "categories",
  "metadata.reading_time_in_minutes",
  "seo.description",
  "seo.keywords",
];

// Un analyseur minimal, suffisant pour ce front matter. On ne tire pas une
// dependance YAML dans un Worker pour lire des cles plates, une liste de
// categories et deux niveaux d'imbrication.
function frontMatter(source) {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: null, corps: source };

  const data = {};
  let parent = null;

  for (const brute of m[1].split(/\r?\n/)) {
    if (!brute.trim() || brute.trim().startsWith("#")) continue;

    const liste = brute.match(/^\s+-\s+(.*)$/);
    if (liste && parent) {
      if (!Array.isArray(data[parent])) data[parent] = [];
      data[parent].push(devine(liste[1]));
      continue;
    }

    const imbrique = brute.match(/^\s+([\w-]+):\s*(.*)$/);
    if (imbrique && parent) {
      if (typeof data[parent] !== "object" || Array.isArray(data[parent])) data[parent] = {};
      data[parent][imbrique[1]] = devine(imbrique[2]);
      continue;
    }

    const racine = brute.match(/^([\w-]+):\s*(.*)$/);
    if (racine) {
      parent = racine[1];
      data[racine[1]] = racine[2] === "" ? {} : devine(racine[2]);
    }
  }

  return { data, corps: source.slice(m[0].length) };
}

function devine(v) {
  const s = v.trim().replace(/\s+#.*$/, "");
  const nu = s.replace(/^["'](.*)["']$/, "$1");
  if (/^-?\d+$/.test(nu)) return Number(nu);
  if (nu === "true") return true;
  if (nu === "false") return false;
  return nu;
}

function chemin(data, cle) {
  return cle.split(".").reduce((o, k) => (o == null ? undefined : o[k]), data);
}

// Les blocs de l'entree, dans l'ordre ou ils apparaissent. Les titres a
// l'interieur d'un bloc de code ne comptent pas : l'annexe 1 en contient.
function blocs(corps) {
  const trouves = [];
  let dansUnBloc = false;

  corps.split(/\r?\n/).forEach((ligne, i) => {
    if (/^```/.test(ligne)) dansUnBloc = !dansUnBloc;
    if (dansUnBloc) return;
    const m = ligne.match(/^##\s+(.*?)\s*$/);
    if (m) trouves.push({ titre: m[1], ligne: i + 1 });
  });

  return trouves;
}

function corpsDuBloc(corps, titre) {
  const lignes = corps.split(/\r?\n/);
  const debut = lignes.findIndex((l) => l.match(/^##\s+/) && l.replace(/^##\s+/, "").trim() === titre);
  if (debut === -1) return null;
  const reste = lignes.slice(debut + 1);
  const fin = reste.findIndex((l) => /^##\s+/.test(l));
  return (fin === -1 ? reste : reste.slice(0, fin)).join("\n").trim();
}

function mots(corps) {
  // Le bloc « Depuis ton siege » a son propre budget, l'annexe 1 le dit.
  // Le compter avec la prose ferait echouer des entrees correctes.
  const sansSieges = corps.replace(/^##\s+Depuis ton siège[\s\S]*?(?=^##\s+|$)/m, "");
  return sansSieges
    .replace(/^---[\s\S]*?^---/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .split(/\s+/)
    .filter((m) => /[\wÀ-ÿ]/.test(m)).length;
}

/**
 * @param {{filename?: string, source: string, sections?: string[], nouvelle?: boolean}} entree
 *
 * `nouvelle` distingue une contribution qui arrive d'une entree deja
 * integree. Les champs de sequence doivent valoir 999 dans le premier cas et
 * portent leur vrai numero dans le second : sans ce drapeau, le linter
 * signalerait les 68 entrees du livre pour un champ qui est correct.
 */
export function verifier({ filename = "", source = "", sections = [], nouvelle = false }) {
  const { data, corps } = frontMatter(source);
  const regles = [];
  const mesures = [];
  const regle = (m) => regles.push(m);
  const mesure = (m) => mesures.push(m);

  if (!data) {
    return {
      fichier: filename,
      estUneEntree: false,
      lu: null,
      regles: ["Aucun front matter. Copie celui de n'importe quelle entrée existante."],
      mesures: [],
    };
  }

  const estUneEntree = chemin(data, "metadata.principle") != null;

  const lu = {
    titre: data.title || null,
    phrase: chemin(data, "seo.description") || data.description || null,
    section: data.part || null,
    auteur: data.author || null,
  };

  // ---- Ce qui vaut pour tout fichier du livre ----

  for (const c of CLES_REQUISES) {
    if (chemin(data, c) == null || chemin(data, c) === "") regle(`Le front matter n'a pas \`${c}\`.`);
  }

  if (sections.length && data.part && !sections.includes(data.part)) {
    regle(
      `\`part: "${data.part}"\` ne correspond à aucune section de \`_data/sommaire.yml\`. ` +
        `Une section absente de ce fichier n'apparaît pas dans le sommaire.`
    );
  }

  if (source.includes(EM_DASH)) regle("Il y a un tiret cadratin. Le livre n'en utilise aucun.");
  if (source.includes(EN_DASH)) regle("Il y a un tiret demi-cadratin. Le livre n'en utilise aucun.");
  if (source.includes(APOSTROPHE_COURBE)) {
    const n = source.split(APOSTROPHE_COURBE).length - 1;
    regle(`${n} apostrophe${n > 1 ? "s" : ""} courbe${n > 1 ? "s" : ""}. Le livre n'utilise que des apostrophes droites.`);
  }

  if (!estUneEntree) {
    // `metadata.principle` ne peut pas etre une cle requise partout : c'est son
    // absence qui distingue une ouverture de section ou une annexe d'une
    // entree, et le livre en compte vingt-cinq. Mais sur une contribution, on
    // sait que la personne propose une entree, et alors le champ manque.
    if (nouvelle) {
      regle(
        "Le front matter n'a pas `metadata.principle`. C'est ce champ qui fait qu'un fichier " +
          "est une entrée : sans lui, la page est rendue comme une ouverture de section et " +
          "l'accueil ne la compte pas. Mets-le à 999, il se recalcule à l'intégration."
      );
    }
    return { fichier: filename, estUneEntree: false, lu, regles, mesures };
  }

  // ---- Ce qui ne vaut que pour une entree ----

  if (filename && !/^\d{2}-\d{2}-[a-z0-9-]+\.md$/.test(filename.split("/").pop())) {
    regle(
      `Le nom de fichier attendu est \`SS-NN-titre-en-slug.md\`, où \`SS\` est le numéro de ` +
        `section et \`NN\` la position dedans.`
    );
  }

  if (nouvelle) {
    if (data.order !== 999) {
      mesure("`order` n'est pas à 999. C'est un champ de séquence, il se recalcule à l'intégration.");
    }
    if (String(chemin(data, "metadata.principle")) !== "999") {
      mesure("`principle` n'est pas à 999. Comme `order`, il se recalcule à l'intégration.");
    }
  }

  const trouves = blocs(corps);
  const titres = trouves.map((b) => b.titre);

  if (titres.join("|") !== BLOCS.join("|")) {
    const manquants = BLOCS.filter((b) => !titres.includes(b));
    const intrus = titres.filter((t) => !BLOCS.includes(t));

    if (manquants.length) regle(`Bloc${manquants.length > 1 ? "s" : ""} manquant${manquants.length > 1 ? "s" : ""} : ${manquants.map((m) => `« ${m} »`).join(", ")}.`);
    if (intrus.length) regle(`Bloc${intrus.length > 1 ? "s" : ""} qui n'existe${intrus.length > 1 ? "nt" : ""} pas dans le format : ${intrus.map((m) => `« ${m} »`).join(", ")}.`);
    if (!manquants.length && !intrus.length) {
      regle(`Les six blocs sont là mais pas dans l'ordre. L'ordre est : ${BLOCS.join(", ")}.`);
    }
  }

  const pourquoi = corpsDuBloc(corps, "Pourquoi");
  if (pourquoi) {
    const paragraphes = pourquoi.split(/\n\s*\n/).filter((p) => p.trim()).length;
    if (paragraphes > 4) {
      regle(
        `« Pourquoi » a ${paragraphes} paragraphes. L'annexe 1 en fixe quatre, plafond dur. ` +
          `Une entrée qui en demande plus est en général deux entrées sous un seul titre.`
      );
    }
  }

  const sieges = corpsDuBloc(corps, "Depuis ton siège");
  if (sieges) {
    const lignes = sieges.split(/\r?\n/).filter((l) => /^\s*-\s+/.test(l));

    if (lignes.length < 4 || lignes.length > 6) {
      regle(
        `« Depuis ton siège » a ${lignes.length} ligne${lignes.length > 1 ? "s" : ""}. ` +
          `L'annexe 1 en demande quatre à six, jamais sept par principe.`
      );
    }

    lignes.forEach((l) => {
      const m = l.match(/^\s*-\s+\*\*(.+?)\*\*\s*:\s*(.*)$/);
      if (!m) {
        regle(`Une ligne de « Depuis ton siège » n'a pas la forme \`- **Siège** : texte\` : ${l.trim()}`);
        return;
      }
      if (!SIEGES.includes(m[1])) {
        regle(`« ${m[1]} » n'est pas un des sept sièges. Ils sont : ${SIEGES.join(", ")}.`);
      }
      if (m[2].length > 100) {
        regle(
          `La ligne « ${m[1]} » fait ${m[2].length} caractères après les deux-points. ` +
            `Le plafond est cent, pour qu'elle ne se replie pas sur un téléphone.`
        );
      }
    });
  }

  // Rien n'est controle sur « A discuter », et c'est une decision, pas un oubli.
  //
  // L'annexe 1 demande une question ouverte a laquelle on ne peut pas repondre
  // par oui ou non, et qui pointe le passe recent plutot que les intentions.
  // Deux heuristiques ont ete essayees et les deux ont signale du bon travail.
  //
  // Exiger un point d'interrogation rejetait « Cite la derniere decision qu'on
  // a changee a cause de quelqu'un d'exterieur », qui est un meilleur
  // declencheur que beaucoup de questions.
  //
  // Detecter l'ouverture « Est-ce que » rejetait « Est-ce que quelqu'un ici a
  // ouvert une pull request sur une de nos dependances ? », qui porte sur un
  // fait et sur le passe recent, c'est-a-dire le bon motif. Le mauvais exemple
  // de l'annexe, « Est-ce qu'on est une equipe qui accepte l'erreur ? », porte
  // sur l'identite. La difference est identite contre fait, et elle ne se lit
  // pas dans la forme.
  //
  // Un controle qui signale du bon travail est pire qu'un controle absent : il
  // se fait ignorer, et il pousse a ecrire pour la machine. Ce bloc appartient
  // entierement a la lecture humaine, contre le test 7.

  const n = mots(corps);
  if (n > MOTS_SIGNAL) {
    mesure(
      `${n} mots hors bloc « Depuis ton siège ». L'annexe 1 donne 300 à 500, jusqu'à 550 pour une ` +
        `entrée qui porte un réflexe défendable. Les 68 entrées vont de 307 à 596, médiane 434. ` +
        `Au-delà, une entrée est souvent deux entrées sous un seul titre.`
    );
  }
  if (n < MOTS_PLANCHER) {
    mesure(
      `${n} mots hors bloc « Depuis ton siège ». La plus courte entrée du livre en fait 307. ` +
        `Une entrée trop courte est en général un principe sans situation : cherche le moment ` +
        `exact où le comportement apparaît.`
    );
  }

  return { fichier: filename, estUneEntree: true, mots: n, lu, regles, mesures };
}

// Le rapport en texte. Il commence par ce qui a ete lu.
export function rapport(r) {
  const l = [];

  if (r.lu && r.lu.titre) {
    l.push(`Ce que j'ai lu : ${r.lu.titre}`);
    if (r.lu.phrase) l.push(`  « ${r.lu.phrase} »`);
    const meta = [r.lu.section, r.lu.auteur ? `écrite par ${r.lu.auteur}` : null, r.estUneEntree ? `${r.mots} mots` : "pas une entrée"].filter(Boolean);
    l.push(`  ${meta.join(" · ")}`);
  } else {
    l.push(`Ce que j'ai lu : ${r.fichier || "un fichier sans titre"}`);
  }

  l.push("");

  if (!r.regles.length && !r.mesures.length) {
    l.push("Le format est propre. Les douze tests sont une lecture humaine, pas un contrôle.");
    return l.join("\n");
  }

  if (r.regles.length) {
    l.push(`Les règles de l'annexe 1, ${r.regles.length} à regarder :`);
    r.regles.forEach((m) => l.push(`  → ${m}`));
    l.push("");
  }

  if (r.mesures.length) {
    l.push(`Ce qui n'est qu'une mesure sur le livre existant, et n'engage rien :`);
    r.mesures.forEach((m) => l.push(`  · ${m}`));
    l.push("");
  }

  l.push("Rien ici ne refuse l'entrée. Les douze tests sont une lecture humaine.");
  return l.join("\n");
}
