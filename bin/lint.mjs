// Card lint rules for all four card types. Pure: takes a source string, returns a report, no I/O.
// `rules` are format rules, `metrics` are stats from existing cards. Nothing here rejects a card.

export const BLOCKS_BY_TYPE = {
  principle: ["Le réflexe", "Le réflexe builder", "Pourquoi", "À essayer", "À discuter"],
  diagnostic: ["Le symptôme", "Le signal", "Ce qui se passe", "À vérifier", "À discuter"],
  practice: ["Le point de départ", "Le geste", "Pourquoi ça marche", "À essayer", "À discuter"],
  system: ["Ce que tu demandes", "Ce que le système entend", "Ce que ça produit", "La décision", "À discuter"],
};

// Word counts only produce metrics, never rules.
export const SIGNAL_WORDS = 550;
export const MIN_WORDS = 200;

const EM_DASH = "—";
const EN_DASH = "–";
const CURLY_APOSTROPHE = "’";

const REQUIRED_KEYS = [
  "layout",
  "title",
  "part",
  "order",
  "categories",
  "metadata.reading_time_in_minutes",
  "seo.description",
  "seo.keywords",
];

// Minimal parser to avoid a YAML dependency: flat keys, lists, one nesting level.
function frontMatter(source) {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: null, body: source };

  const data = {};
  let parent = null;

  for (const raw of m[1].split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;

    const list = raw.match(/^\s+-\s+(.*)$/);
    if (list && parent) {
      if (!Array.isArray(data[parent])) data[parent] = [];
      data[parent].push(guess(list[1]));
      continue;
    }

    const nested = raw.match(/^\s+([\w-]+):\s*(.*)$/);
    if (nested && parent) {
      if (typeof data[parent] !== "object" || Array.isArray(data[parent])) data[parent] = {};
      data[parent][nested[1]] = guess(nested[2]);
      continue;
    }

    const root = raw.match(/^([\w-]+):\s*(.*)$/);
    if (root) {
      parent = root[1];
      data[root[1]] = root[2] === "" ? {} : guess(root[2]);
    }
  }

  return { data, body: source.slice(m[0].length) };
}

function guess(v) {
  const s = v.trim().replace(/\s+#.*$/, "");
  const bare = s.replace(/^["'](.*)["']$/, "$1");
  if (/^-?\d+$/.test(bare)) return Number(bare);
  if (bare === "true") return true;
  if (bare === "false") return false;
  return bare;
}

function path(data, key) {
  return key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), data);
}

// Headings inside code fences don't count.
function blocks(body) {
  const found = [];
  let inBlock = false;

  body.split(/\r?\n/).forEach((line, i) => {
    if (/^```/.test(line)) inBlock = !inBlock;
    if (inBlock) return;
    const m = line.match(/^##\s+(.*?)\s*$/);
    if (m) found.push({ title: m[1], line: i + 1 });
  });

  return found;
}

function blockBody(body, title) {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((l) => l.match(/^##\s+/) && l.replace(/^##\s+/, "").trim() === title);
  if (start === -1) return null;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((l) => /^##\s+/.test(l));
  return (end === -1 ? rest : rest.slice(0, end)).join("\n").trim();
}

function words(body) {
  return body
    .replace(/```[\s\S]*?```/g, "")
    .split(/\s+/)
    .filter((m) => /[\wÀ-ÿ]/.test(m)).length;
}

/**
 * @param {{filename?: string, source: string, sections?: string[], fresh?: boolean}} input
 * `fresh`: a newly added card, whose order fields must still be 999.
 */
export function check({ filename = "", source = "", sections = [], fresh = false }) {
  const { data, body } = frontMatter(source);
  const rules = [];
  const metrics = [];
  const rule = (m) => rules.push(m);
  const metric = (m) => metrics.push(m);

  if (!data) {
    return {
      file: filename,
      isEntry: false,
      lu: null,
      rules: ["Aucun front matter. Copie celui de n'importe quelle carte existante."],
      metrics: [],
    };
  }

  const isEntry = path(data, "metadata.principle") != null;

  const lu = {
    title: data.title || null,
    phrase: path(data, "seo.description") || data.description || null,
    section: data.part || null,
    author: data.author || null,
  };

  for (const c of REQUIRED_KEYS) {
    if (path(data, c) == null || path(data, c) === "") rule(`Le front matter n'a pas \`${c}\`.`);
  }

  if (sections.length && data.part && !sections.includes(data.part)) {
    rule(
      `\`part: "${data.part}"\` ne correspond à aucune section de \`_data/toc.yml\`. ` +
        `Une section absente de ce fichier n'apparaît pas dans le sommaire.`
    );
  }

  if (source.includes(EM_DASH)) rule("Il y a un tiret cadratin. Le livre n'en utilise aucun.");
  if (source.includes(EN_DASH)) rule("Il y a un tiret demi-cadratin. Le livre n'en utilise aucun.");
  if (source.includes(CURLY_APOSTROPHE)) {
    const n = source.split(CURLY_APOSTROPHE).length - 1;
    rule(`${n} apostrophe${n > 1 ? "s" : ""} courbe${n > 1 ? "s" : ""}. Le livre n'utilise que des apostrophes droites.`);
  }

  if (!isEntry) {
    // `metadata.principle` is what makes a file a card, so it's only required on new cards.
    if (fresh) {
      rule(
        "Le front matter n'a pas `metadata.principle`. C'est ce champ qui fait qu'un fichier " +
          "est une carte : sans lui, la page est rendue comme une ouverture de section et " +
          "l'accueil ne la compte pas. Mets-le à 999, il se recalcule à l'intégration."
      );
    }
    return { file: filename, isEntry: false, lu, rules, metrics };
  }

  const type = data.card_type;
  if (!Object.prototype.hasOwnProperty.call(BLOCKS_BY_TYPE, type)) {
    rule("`card_type` doit être `principle`, `diagnostic`, `practice` ou `system`.");
  }

  if (filename && !/^\d{2}-\d{2}-[a-z0-9-]+\.md$/.test(filename.split("/").pop())) {
    rule(
      `Le nom de fichier attendu est \`SS-NN-titre-en-slug.md\`, où \`SS\` est le numéro de ` +
        `section et \`NN\` la position dedans.`
    );
  }

  if (fresh) {
    if (data.order !== 999) {
      metric("`order` n'est pas à 999. C'est un champ de séquence, il se recalcule à l'intégration.");
    }
    if (String(path(data, "metadata.principle")) !== "999") {
      metric("`principle` n'est pas à 999. Comme `order`, il se recalcule à l'intégration.");
    }
  }

  const found = blocks(body);
  const titles = found.map((b) => b.title);
  const expected = BLOCKS_BY_TYPE[type] || BLOCKS_BY_TYPE.principle;

  if (titles.join("|") !== expected.join("|")) {
    const missing = expected.filter((b) => !titles.includes(b));
    const stray = titles.filter((t) => !expected.includes(t));

    if (missing.length) rule(`Bloc${missing.length > 1 ? "s" : ""} manquant${missing.length > 1 ? "s" : ""} : ${missing.map((m) => `« ${m} »`).join(", ")}.`);
    if (stray.length) rule(`Bloc${stray.length > 1 ? "s" : ""} qui n'existe${stray.length > 1 ? "nt" : ""} pas dans le format : ${stray.map((m) => `« ${m} »`).join(", ")}.`);
    if (!missing.length && !stray.length) {
      rule(`Les blocs sont là mais pas dans l'ordre pour le type ${type}. L'ordre est : ${expected.join(", ")}.`);
    }
  }

  const why = blockBody(body, expected[2]);
  if (why) {
    const paragraphs = why.split(/\n\s*\n/).filter((p) => p.trim()).length;
    if (paragraphs > 4) {
      rule(
        `« ${expected[2]} » a ${paragraphs} paragraphes. Le plafond est quatre. ` +
          `Une carte qui en demande plus est en général deux cartes sous un seul titre.`
      );
    }
  }

  // "À discuter" is deliberately unchecked: every heuristic tried flagged good questions.

  const n = words(body);
  if (n > SIGNAL_WORDS) {
    metric(
      `${n} mots. Le signal éditorial va de ${MIN_WORDS} à 500, jusqu'à 550 pour une ` +
        `carte qui a besoin de ce développement. ` +
        `Au-delà, une carte est souvent deux cartes sous un seul titre.`
    );
  }
  if (n < MIN_WORDS) {
    metric(
      `${n} mots. Le repère éditorial bas est de ${MIN_WORDS}. ` +
        `Une carte trop courte est en général un principe sans situation : cherche le moment ` +
        `exact où le comportement apparaît.`
    );
  }

  return { file: filename, isEntry: true, words: n, lu, rules, metrics };
}

export function report(r) {
  const l = [];

  if (r.lu && r.lu.title) {
    l.push(`Ce que j'ai lu : ${r.lu.title}`);
    if (r.lu.phrase) l.push(`  « ${r.lu.phrase} »`);
    const meta = [r.lu.section, r.lu.author ? `écrite par ${r.lu.author}` : null, r.isEntry ? `${r.words} mots` : "pas une carte"].filter(Boolean);
    l.push(`  ${meta.join(" · ")}`);
  } else {
    l.push(`Ce que j'ai lu : ${r.file || "un fichier sans titre"}`);
  }

  l.push("");

  if (!r.rules.length && !r.metrics.length) {
    l.push("Le format est propre. Le jugement éditorial reste une lecture humaine.");
    return l.join("\n");
  }

  if (r.rules.length) {
    l.push(`Les règles du format, ${r.rules.length} à regarder :`);
    r.rules.forEach((m) => l.push(`  → ${m}`));
    l.push("");
  }

  if (r.metrics.length) {
    l.push(`Ce qui n'est qu'une mesure sur le livre existant, et n'engage rien :`);
    r.metrics.forEach((m) => l.push(`  · ${m}`));
    l.push("");
  }

  l.push("Rien ici ne refuse la carte. Le jugement éditorial reste une lecture humaine.");
  return l.join("\n");
}
