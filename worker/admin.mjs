// L'interface de moderation. Servie par le Worker, derriere Cloudflare Access,
// donc sur la meme origine que l'API : aucun jeton a gerer dans le navigateur,
// ce sont les cookies d'Access qui portent l'authentification.
//
// Elle porte les couleurs du livre, et pour une raison de travail : c'est le
// meme objet. Bande #FBEEC1 et filet #F5B301 en haut, angles droits, le jaune
// en aplat et jamais en texte, un serif pour ce qui se lit et un sans pour ce
// qui se balaye. Les fontes du site, elles, ne peuvent pas venir : la
// politique de securite ci-dessous n'ouvre aucun hote tiers, et on ne
// l'ouvrira pas pour de la typographie sur la page qui affiche du texte ecrit
// par des inconnus dans la session Access. Georgia et system-ui tiennent le
// meme role.
//
// La file a deux colonnes : ce qui attend a gauche, ce qu'on lit a droite. Le
// detail ne s'ouvre plus sous la liste, donc la liste ne disparait jamais et
// le clavier enchaine les entrees sans un seul defilement. Le conseil a nomme
// le vrai cout de ce calque, et ce n'est pas le code : une interface qui
// demande trois clics par contribution coute plus cher qu'elle ne rapporte.
//
// Attention en modifiant le script plus bas. Il vit dans un gabarit a accents
// graves, donc il traverse deux couches d'echappement. La regle tenue ici est
// de n'ecrire aucune contre-oblique dedans, sauf dans les deux expressions
// regulieres, ou elle est doublee expres : `\\S` sort `\S`. Le moyen de s'y
// tenir est simple, et il vaut d'etre garde :
//
//   - le balisage vit dans des chaines a apostrophes simples, avec ses
//     attributs entre guillemets, et aucun texte francais dedans ;
//   - le texte francais vit dans des chaines a guillemets, ou l'apostrophe
//     s'ecrit nue.
//
// Un `\"` ecrit ici sortirait `"` et couperait la chaine en deux.
//
// bin/verifier-admin analyse le script produit. Il tourne dans la CI, parce que
// rien d'autre ne le fait : ce n'est du JavaScript qu'une fois la chaine rendue.
//
// `nonce` vient de index.mjs, tire au hasard a chaque reponse, et se retrouve
// dans l'en-tete de politique de securite. Le style et le script portes ici
// sont les seuls que le navigateur acceptera d'executer.
//
// Consequence de cette politique, et elle se voit dans le code : `style-src`
// ne porte qu'un nonce, donc les attributs `style=""` sont refuses, silence
// compris. Toute mise en forme vit dans la feuille ci-dessous. Ce qui depend
// d'une donnee, comme la largeur des jauges, se pose par le CSSOM, que la
// politique ne regarde pas.

// La marque du livre, inversee : fond clair, B noir, barre jaune. Le trace
// vient de favicon.svg, sans une retouche, pour que ce soit le meme dessin.
const MARQUE =
  '<svg viewBox="0 0 64 64" width="34" height="34" role="img" aria-label="Build Here">' +
  '<rect width="64" height="64" fill="#fff"/>' +
  '<path transform="translate(15.6635 43.0) scale(0.022880 -0.022880)" fill="#1C1A17" d="M238 141V1334L83 1360V1486H381Q444 1486 497.5 1489.5Q551 1493 601.5 1497.0Q652 1501 702 1501Q862 1501 967.5 1477.5Q1073 1454 1134.5 1409.5Q1196 1365 1222.0 1302.5Q1248 1240 1248 1162Q1248 1062 1207.0 984.5Q1166 907 1093.5 857.5Q1021 808 927 793Q1057 795 1151.5 754.5Q1246 714 1297.5 636.0Q1349 558 1349 448Q1349 354 1318.5 270.5Q1288 187 1216.0 123.5Q1144 60 1021.5 24.0Q899 -12 715 -12Q647 -12 598.0 -9.0Q549 -6 499.5 -3.0Q450 0 382 0H79V120ZM530 839Q546 838 569.5 837.0Q593 836 619.5 836.0Q646 836 671.0 836.0Q696 836 714 836Q797 836 849.5 871.0Q902 906 928.0 971.5Q954 1037 954 1127Q954 1256 893.5 1317.5Q833 1379 686 1379Q662 1379 631.0 1377.0Q600 1375 572.0 1372.5Q544 1370 530 1369ZM530 131Q547 124 577.5 120.5Q608 117 642.5 116.0Q677 115 706 115Q822 115 892.5 152.5Q963 190 994.0 260.0Q1025 330 1025 426Q1025 574 956.0 636.0Q887 698 739 698Q716 698 686.5 697.5Q657 697 626.5 697.0Q596 697 571.0 696.5Q546 696 530 694Z"/>' +
  '<rect x="19" y="49" width="26" height="6" fill="#F5B301"/></svg>';

const echapper = (s) =>
  String(s ?? "").replace(/[<&"]/g, (c) => (c === "<" ? "&lt;" : c === "&" ? "&amp;" : "&quot;"));

export function pageAdmin(email, nonce) {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>La file | Build Here</title>
<style nonce="${nonce}">
  :root {
    color-scheme: light;
    --encre: #1C1A17;
    --bande: #FBEEC1;
    --signal: #F5B301;
    --ambre: #8A6100;
    --papier: #FAF7F0;
    --coquille: #F2EFE9;
    --filet: #E8E3D9;
    --lire: Georgia, "Times New Roman", serif;
    --voir: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  * { box-sizing: border-box }
  body {
    margin: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column;
    font-family: var(--lire); line-height: 1.72; color: #2B2925; background: var(--papier);
  }
  ::selection { background: var(--signal); color: var(--encre) }
  a { color: var(--ambre) }
  a:hover { color: var(--encre) }
  :focus-visible { outline: 2px solid var(--ambre); outline-offset: 2px }

  /* La bande du livre, celle qui ouvre chaque entree. */
  header {
    display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
    padding: .8rem 1.75rem; background: var(--bande); border-bottom: 3px solid var(--signal);
  }
  header svg { display: block; flex: none }
  header small {
    min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    font-family: var(--voir); font-size: .72rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: .14em; color: var(--ambre);
  }

  .onglets { display: flex; gap: .5rem; padding: .75rem 1.75rem; border-bottom: 1px solid var(--filet) }
  .onglets button {
    display: flex; align-items: baseline; gap: .5rem;
    font-family: var(--voir); font-size: .92rem; padding: .5rem 1.1rem;
    color: var(--encre); background: #fff; border: 1px solid var(--filet); cursor: pointer;
  }
  .onglets button:hover { background: var(--bande) }
  .onglets button b { font-weight: 600; color: var(--ambre) }
  .onglets button[aria-pressed="true"] { background: var(--encre); border-color: var(--encre); color: #fff }
  .onglets button[aria-pressed="true"] b { color: rgba(255, 255, 255, .55) }

  .corps { flex: 1; display: flex; min-height: 0; min-width: 0 }
  .file { width: 400px; flex: none; display: flex; flex-direction: column; min-height: 0; min-width: 0; border-right: 1px solid var(--filet) }
  .volet { flex: 1; display: flex; flex-direction: column; min-width: 0; background: #fff }

  .filtres { display: flex; gap: .4rem; padding: .75rem 1.1rem; border-bottom: 1px solid var(--filet) }
  .filtres button {
    font-family: var(--voir); font-size: .82rem; padding: .2rem .6rem;
    color: var(--ambre); background: transparent; border: 1px solid var(--filet); cursor: pointer;
  }
  .filtres button:hover { background: var(--bande) }
  .filtres button[aria-pressed="true"] { background: #fff; border-color: var(--ambre); color: var(--encre) }
  .filtres[hidden], .legende[hidden] { display: none }

  .legende {
    display: flex; flex-wrap: wrap; gap: .9rem; padding: .85rem 1.1rem;
    border-bottom: 1px solid var(--filet);
    font-family: var(--voir); font-size: .72rem; color: var(--ambre);
  }
  .legende span { display: inline-flex; align-items: center; gap: .35rem }
  .legende i { display: block; width: .62rem; height: .62rem; border: 1px solid var(--filet) }

  #liste { flex: 1; overflow: auto; min-height: 0; font-family: var(--voir) }
  .raccourcis {
    margin: 0; padding: .7rem 1.1rem; border-top: 1px solid var(--filet); background: var(--coquille);
    font-family: var(--voir); font-size: .72rem; color: var(--ambre);
  }

  /* Une ligne de la file. Le filet jaune a gauche est la seule alarme. */
  .ligne {
    display: flex; flex-direction: column; gap: .3rem;
    padding: .8rem 1.1rem .8rem .95rem;
    border-bottom: 1px solid var(--filet); border-left: 3px solid transparent; cursor: pointer;
  }
  .ligne:hover { background: var(--bande) }
  .ligne.douteux { border-left-color: var(--signal) }
  .ligne.actif, .ligne.actif:hover { background: #fff; border-left-color: var(--encre) }
  .ligne-titre { font-size: .92rem; font-weight: 600; line-height: 1.35; color: var(--encre) }
  .ligne-extrait { font-size: .92rem; line-height: 1.45; color: var(--encre) }
  .ligne-meta { display: flex; align-items: baseline; justify-content: space-between; gap: .6rem; font-size: .76rem; color: var(--ambre) }
  .tronque { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
  .etiquette { flex: none; font-size: .68rem; font-weight: 600; text-transform: uppercase; letter-spacing: .14em; white-space: nowrap }
  .pastilles { display: flex; flex-wrap: wrap; gap: .4rem }
  .pastille {
    padding: .1rem .32rem; background: var(--signal); color: var(--encre);
    font-size: .62rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em;
  }
  .fleche { color: var(--ambre) }

  /* La jauge des avis. Le jaune mesure le non : c'est la seule barre ici. */
  .jauge { display: flex; height: 6px; gap: 1px; margin: .15rem 0 }
  .jauge i, .legende i { background: var(--filet) }
  .jauge i.moitie, .legende i.moitie { background: var(--bande) }
  .jauge i.non, .legende i.non { background: var(--signal) }
  .chiffres { font-variant-numeric: tabular-nums }

  #detail { flex: 1; overflow: auto; min-width: 0; min-height: 0; padding: 2rem 2.75rem 2.5rem }
  .piece { max-width: 46em }
  .piece h1, .prose, .parent p, .citation { overflow-wrap: anywhere }
  .piece h1 { margin: 0; font-size: 1.6rem; line-height: 1.22; letter-spacing: -.01em; color: var(--encre) }
  .piece h1 a { color: var(--encre); text-decoration: none; border-bottom: 2px solid var(--signal) }
  .repere {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: .6rem; margin: .75rem 0 0;
    font-family: var(--voir); font-size: .72rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: .14em; color: var(--ambre);
  }
  .repere > * { min-width: 0; overflow-wrap: anywhere }
  .sep { opacity: .45 }
  .libelle {
    margin: 1.85rem 0 .6rem; font-family: var(--voir); font-size: .72rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: .14em; color: var(--ambre);
  }
  .libelle .mot { font-weight: 400; text-transform: none; letter-spacing: 0; font-size: .76rem }
  .piece > :first-child, .accueil > :first-child { margin-top: 0 }
  .rapport {
    margin: 0; padding: 1rem 1.1rem; background: var(--papier); border-left: 3px solid var(--filet);
    font-family: ui-monospace, "SFMono-Regular", Menlo, monospace;
    font-size: .82rem; line-height: 1.6; white-space: pre-wrap; overflow-x: auto;
    max-width: 100%; overflow-wrap: anywhere;
  }
  /* Le texte soumis reste de la source echappee, habillee en serif. Il ne se
     rend jamais en HTML : cette page affiche ce que des inconnus ont ecrit. */
  .texte {
    margin: 0; max-width: 34em; font-family: var(--lire); font-size: .95rem; line-height: 1.72;
    white-space: pre-wrap; word-break: break-word;
  }
  .citation {
    margin: 0; padding: .6rem .9rem; background: var(--bande); border-left: 3px solid var(--signal);
    font-size: .9rem; font-style: italic; line-height: 1.55;
  }
  .parent { padding: .85rem 1.1rem; background: var(--papier); border: 1px solid var(--filet); border-left: 3px solid var(--filet) }
  .parent-qui { font-family: var(--voir); font-size: .92rem; font-weight: 600; color: var(--encre) }
  .parent p, .prose { margin: .45rem 0 0; font-size: .95rem; line-height: 1.65 }
  .prose { margin-top: 0 }
  .reponse {
    display: block; width: 100%; margin: 0; padding: .6rem .75rem;
    font-family: var(--lire); font-size: .95rem; line-height: 1.65;
    color: var(--encre); background: #fff; border: 1px solid var(--filet); border-radius: 0; resize: vertical;
  }
  .reponse:focus { outline: 0; border-color: var(--ambre) }
  .note { margin: .45rem 0 0; font-family: var(--voir); font-size: .76rem; color: var(--ambre) }

  .puces { display: flex; flex-wrap: wrap; gap: .5rem }
  .puce {
    display: inline-flex; align-items: baseline; gap: .45rem; padding: .3rem .7rem;
    background: var(--coquille); border: 1px solid var(--filet);
    font-family: var(--voir); font-size: .82rem; color: var(--encre);
  }
  .puce b { color: var(--ambre); font-variant-numeric: tabular-nums }
  /* Une phrase de quelqu'un qui a lu vaut mieux que n'importe quel compte,
     donc elle est plus grosse que les comptes. */
  .ecrit {
    margin-bottom: .75rem; padding: 1.1rem 1.4rem; background: #fff;
    border: 1px solid var(--filet); border-left: 3px solid var(--filet);
  }
  .ecrit.moitie { border-left-color: var(--bande) }
  .ecrit.non { border-left-color: var(--signal) }
  .ecrit p { margin: 0; font-size: 1.06rem; line-height: 1.65; color: var(--encre) }

  /* La barre d'action : le pied de page du livre, remis au travail. Rien
     d'autre dans l'outil n'est de cette couleur, donc l'oeil y va. */
  .actions {
    display: flex; align-items: center; gap: .75rem; padding: 1rem 2.75rem;
    background: var(--bande); border-top: 3px solid var(--signal); font-family: var(--voir);
  }
  .actions:empty { display: none }
  .pousse { flex: 1 }
  .bouton {
    display: inline-block; font-family: var(--voir); font-size: .95rem; font-weight: 500;
    padding: .65rem 1.3rem; color: var(--encre); background: #fff;
    border: 1px solid var(--filet); cursor: pointer; text-decoration: none;
  }
  .bouton:hover { background: var(--papier) }
  .bouton.principal { color: #fff; background: var(--encre); border-color: var(--encre) }
  .bouton.principal:hover { background: var(--ambre); border-color: var(--ambre) }
  .bouton:disabled { opacity: .45; cursor: default }
  /* Le refus est loin de la main plutot que rouge : le livre n'a pas de rouge,
     et la distance protege mieux qu'une couleur qu'on finit par cliquer. */
  .discret {
    font-family: var(--voir); font-size: .88rem; padding: .35rem .25rem;
    color: var(--ambre); background: none; border: 0; text-decoration: underline; cursor: pointer;
  }
  .discret:hover { color: var(--encre) }
  .discret.sur { padding: .5rem .9rem; background: var(--encre); color: #fff; text-decoration: none }

  .vide { padding: 2.5rem 1.1rem; font-family: var(--voir); font-size: .88rem; color: var(--ambre) }
  .accueil { max-width: 32em }
  .cases { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; margin-top: 1rem; background: var(--filet); border: 1px solid var(--filet) }
  .case { padding: 1.1rem 1.25rem; background: #fff }
  .case b { display: block; font-family: var(--voir); font-size: 2.1rem; font-weight: 600; line-height: 1.1; color: var(--encre); font-variant-numeric: tabular-nums }
  .case span { font-family: var(--voir); font-size: .76rem; color: var(--ambre) }
  .souffle { margin: 1.4rem 0 0; font-size: .95rem }
  .invite {
    margin: 1.6rem 0 0; padding: 1rem 1.1rem; background: var(--bande); border-left: 3px solid var(--signal);
    font-family: var(--voir); font-size: .95rem; line-height: 1.55; color: var(--encre);
  }

  #retour { display: none }

  /* Le telephone : une colonne, et le detail prend l'ecran. */
  @media (max-width: 860px) {
    header, .onglets { padding-left: 1.1rem; padding-right: 1.1rem }
    .actions, #detail { padding-left: 1.1rem; padding-right: 1.1rem }
    .onglets { gap: .4rem }
    .onglets button { font-size: .82rem; padding: .55rem .75rem }
    .file { width: 100%; border-right: 0 }
    .volet { display: none }
    .corps.ouvert .file { display: none }
    .corps.ouvert .volet { display: flex }
    #retour {
      display: flex; align-items: center; gap: .5rem; width: 100%;
      padding: .7rem 1.1rem; background: var(--bande); border: 0; border-bottom: 1px solid var(--filet);
      font-family: var(--voir); font-size: .78rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: .14em; color: var(--encre); cursor: pointer;
    }
    .ligne { padding: 1rem 1.1rem 1rem .95rem }
    .actions { flex-wrap: wrap; gap: .5rem }
    .bouton.principal { flex: 1 1 100%; text-align: center; padding: .85rem 1.3rem }
    .raccourcis { display: none }
  }
</style>
</head><body>
<header>
  ${MARQUE}
  <small>${echapper(email)}</small>
</header>

<nav class="onglets">
  <button data-onglet="entrees" aria-pressed="true">Entrées <b id="n-entrees"></b></button>
  <button data-onglet="commentaires" aria-pressed="false">Commentaires <b id="n-commentaires"></b></button>
  <button data-onglet="notes" aria-pressed="false">Avis <b id="n-avis"></b></button>
</nav>

<div class="corps" id="corps">
  <aside class="file">
    <nav class="filtres" id="filtres">
      <button data-etat="" aria-pressed="true">Ce qui attend</button>
      <button data-etat="tout" aria-pressed="false">Tout</button>
      <button data-etat="refuse" aria-pressed="false">Refusés</button>
    </nav>
    <div class="legende" id="legende" hidden>
      <span><i></i>oui</span>
      <span><i class="moitie"></i>à moitié</span>
      <span><i class="non"></i>non</span>
    </div>
    <div id="liste"><p class="vide">Chargement.</p></div>
    <p class="raccourcis" id="raccourcis">j k parcourir · ↵ ouvrir · a approuver · c à corriger · r refuser</p>
  </aside>

  <section class="volet">
    <button id="retour" type="button">← la file</button>
    <div id="detail"></div>
    <div class="actions" id="actions"></div>
  </section>
</div>

<script type="module" nonce="${nonce}">
const SITE = "https://build-here.africa";

const $ = (s) => document.querySelector(s);
const api = (c, o) => fetch(c, { headers: { accept: "application/json" }, ...o }).then((r) => r.json());
const poste = (c, corps) =>
  api(c, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(corps || {}) });

const echappe = (s) => String(s ?? "").replace(/[<&]/g, (c) => (c === "<" ? "&lt;" : "&amp;"));
// Ce qui part dans un attribut perd aussi ses guillemets, sinon il en sort.
const attr = (s) => echappe(s).replace(/"/g, "&quot;");
const date = (t) => new Date(t * 1000).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });

// Meme raison que lienSur cote Worker, et elle compte davantage ici.
// encodeURI ne touche pas au schema : javascript: reste javascript:, et le
// navigateur decode avant d'executer. Un clic sur « son lien » faisait donc
// tourner le script de quelqu'un d'autre sur cette origine, dans la session
// Access, celle qui rend les coordonnees de tous les contributeurs.
//
// Le Worker filtre deja a l'ecriture. Ceci couvre les lignes ecrites avant.
const lien = (u) => (/^https?:\\/\\//i.test(u || "") ? encodeURI(u) : null);

// Un age se lit plus vite qu'une date quand on trie une file.
function depuis(t) {
  const s = Math.max(0, Math.floor(Date.now() / 1000) - (t || 0));
  if (s < 3600) return "il y a " + Math.max(1, Math.round(s / 60)) + " min";
  if (s < 86400) return "il y a " + Math.round(s / 3600) + " h";
  const j = Math.round(s / 86400);
  if (j <= 1) return "hier";
  if (j < 60) return "il y a " + j + " jours";
  return date(t);
}

const ETATS_LISIBLES = {
  recue: "attend",
  en_relecture: "en relecture",
  a_corriger: "à corriger",
  pr_ouverte: "pull request ouverte",
  refusee: "refusée",
  en_attente: "attend",
  publie: "publié",
  refuse: "refusé",
};

const LIBELLES = {
  abstrait: "Trop abstrait",
  "deja-su": "Je le savais déjà",
  desaccord: "Pas d'accord",
  exemple: "Il manque un exemple",
  autre: "Autre",
};

const TOUTES = "*";

let onglet = "entrees";
let filtre = "";
let ouvert = null;
let quelAvis = null;
let curseur = -1;

const tout = { entrees: [], commentaires: [], avis: { pages: [], raisons: [], commentaires: [] } };

// Les trois files sont petites et les compteurs des onglets ont besoin des
// trois de toute facon. Un chargement complet coute moins qu'un aller-retour
// par filtre, et les filtres deviennent instantanes.
async function charger(quoi) {
  const jobs = [];
  if (!quoi || quoi === "entrees") {
    jobs.push(api("/admin/contributions").then((r) => (tout.entrees = r.contributions || [])));
  }
  if (!quoi || quoi === "commentaires") {
    jobs.push(api("/admin/commentaires").then((r) => (tout.commentaires = r.commentaires || [])));
  }
  if (!quoi || quoi === "avis") {
    jobs.push(
      api("/admin/notes").then((r) => {
        if (!r.erreur) tout.avis = { pages: r.pages || [], raisons: r.raisons || [], commentaires: r.commentaires || [] };
      })
    );
  }
  await Promise.all(jobs);
  compteurs();
}

const enCours = (c) => c.etat !== "pr_ouverte" && c.etat !== "refusee";

function compteurs() {
  $("#n-entrees").textContent = tout.entrees.filter(enCours).length || "";
  $("#n-commentaires").textContent = tout.commentaires.filter((c) => c.etat === "en_attente").length || "";
  $("#n-avis").textContent = tout.avis.commentaires.length || "";
}

const repere = (bouts) => bouts.filter(Boolean).join('<span class="sep">/</span>');
const caseChiffre = (n, quoi) => '<div class="case"><b>' + n + "</b><span>" + quoi + "</span></div>";

const montrerVolet = () => ($("#corps").className = "corps ouvert");
const montrerFile = () => {
  $("#corps").className = "corps";
  ouvert = null;
};

// ---- La file ----

function visibles() {
  const t = onglet === "commentaires" ? tout.commentaires : tout.entrees;
  if (filtre === "tout") return t;
  if (filtre === "refuse") return t.filter((c) => c.etat === (onglet === "commentaires" ? "refuse" : "refusee"));
  return t.filter((c) => (onglet === "commentaires" ? c.etat === "en_attente" : enCours(c)));
}

const ligneEntree = (c) =>
  '<div class="ligne' + (c.id === ouvert ? " actif" : "") + (c.rang > 4 ? " douteux" : "") +
  '" data-id="' + attr(c.id) + '" tabindex="0">' +
  '<div class="ligne-titre">' + echappe(c.titre || "sans titre") + "</div>" +
  (c.rang > 4 ? '<div class="pastilles"><span class="pastille">rang ' + c.rang + "</span></div>" : "") +
  '<div class="ligne-meta"><span class="tronque">' + echappe(c.auteur) + " · " + depuis(c.cree_le) + "</span>" +
  (c.etat === "recue" ? "" : '<span class="etiquette">' + echappe(ETATS_LISIBLES[c.etat] || c.etat) + "</span>") +
  "</div></div>";

// Un commentaire se juge sur ce qu'il dit, donc la ligne montre ce qu'il dit,
// pas le titre de la page ou il est tombe.
const ligneCommentaire = (c) =>
  '<div class="ligne' + (c.id === ouvert ? " actif" : "") + (c.rang > 4 ? " douteux" : "") +
  '" data-id="' + attr(c.id) + '" tabindex="0">' +
  '<div class="ligne-extrait">' + (c.parent_id ? '<span class="fleche">&#8627;</span> ' : "") +
  echappe(c.extrait || c.titre || c.page) + (c.extrait && c.extrait.length >= 180 ? "…" : "") + "</div>" +
  (c.a_passage || c.rang > 4
    ? '<div class="pastilles">' +
      (c.a_passage ? '<span class="pastille">passage</span>' : "") +
      (c.rang > 4 ? '<span class="pastille">rang ' + c.rang + "</span>" : "") +
      "</div>"
    : "") +
  '<div class="ligne-meta"><span class="tronque">' + echappe(c.auteur) + " · " + depuis(c.cree_le) + "</span>" +
  (c.etat === "en_attente" ? "" : '<span class="etiquette">' + echappe(ETATS_LISIBLES[c.etat] || c.etat) + "</span>") +
  "</div></div>";

function rendreListe() {
  const items = visibles();

  if (!items.length) {
    $("#liste").innerHTML =
      '<p class="vide">' +
      (filtre === "refuse" ? "Rien de refusé." : filtre === "tout" ? "Rien pour l'instant." : "Rien n'attend.") +
      "</p>";
    return;
  }

  $("#liste").innerHTML = items.map(onglet === "commentaires" ? ligneCommentaire : ligneEntree).join("");
  $("#liste")
    .querySelectorAll("[data-id]")
    .forEach((l) => l.addEventListener("click", () => ouvrir(l.dataset.id)));
}

const ouvrir = (id) => (onglet === "commentaires" ? detailCommentaire(id) : detailEntree(id));

// L'ecran d'arrivee. Il dit l'etat de la file en un coup d'oeil, ce qu'une
// liste seule ne dit pas : ce qui n'a jamais ete ouvert, et depuis quand.
function accueil() {
  $("#actions").innerHTML = "";
  ouvert = null;

  if (onglet === "commentaires") {
    const n = tout.commentaires.filter((c) => c.etat === "en_attente").length;
    $("#detail").innerHTML =
      '<div class="accueil"><h2 class="libelle">Ce qui attend</h2><p class="souffle">' +
      (n ? n + (n > 1 ? " commentaires attendent votre lecture." : " commentaire attend votre lecture.") : "Aucun commentaire n'attend.") +
      '</p><p class="invite">' + "Choisissez un commentaire à gauche, ou appuyez sur j." + "</p></div>";
    return;
  }

  const par = (e) => tout.entrees.filter((c) => c.etat === e).length;
  const attend = tout.entrees.filter(enCours);
  const vieille = attend.reduce((a, c) => (!a || c.cree_le < a.cree_le ? c : a), null);

  $("#detail").innerHTML =
    '<div class="accueil"><h2 class="libelle">Ce qui attend</h2><div class="cases">' +
    caseChiffre(par("recue"), "jamais ouvertes") +
    caseChiffre(par("en_relecture"), "en relecture") +
    caseChiffre(par("a_corriger"), "à corriger, la balle est chez l'auteur") +
    caseChiffre(par("pr_ouverte"), "pull request ouverte") +
    "</div>" +
    (vieille ? '<p class="souffle">' + "La plus ancienne attend depuis " + depuis(vieille.cree_le).replace("il y a ", "") + "." + "</p>" : "") +
    '<p class="invite">' + "Choisissez une entrée à gauche, ou appuyez sur j." + "</p></div>";
}

// ---- Le detail ----

function brancherActions(cle, faire) {
  $("#actions")
    .querySelectorAll("[data-" + cle + "]")
    .forEach((b) => b.addEventListener("click", () => faire(b.dataset[cle], b)));
}

// Le refus se confirme sur place. Une fenetre de confirmation se clique sans
// la lire ; un bouton qui change de texte et passe au noir plein, non.
function confirmer(b, texte) {
  if (b.dataset.sur === "oui") return true;
  b.dataset.sur = "oui";
  b.className = "discret sur";
  b.textContent = texte;
  return false;
}

async function detailEntree(id) {
  const c = await api("/admin/contributions/" + id);
  if (c.erreur) return alert(c.erreur);

  ouvert = id;
  rendreListe();
  montrerVolet();

  let rapport = "";
  try {
    rapport = JSON.parse(c.rapport)?.texte || "";
  } catch (e) {}

  const mots = (String(c.markdown || "").match(/\\S+/g) || []).length;
  const l = lien(c.auteur_lien);

  $("#detail").scrollTop = 0;
  $("#detail").innerHTML =
    '<article class="piece"><h1>' + echappe(c.titre || "sans titre") + '</h1><p class="repere">' +
    repere([
      echappe(c.auteur),
      l ? '<a href="' + attr(l) + '" rel="noopener nofollow" target="_blank">son lien</a>' : null,
      c.contact ? echappe(c.contact.canal) + " · " + echappe(c.contact.valeur) : "aucun contact",
      "rang " + c.rang,
      echappe(ETATS_LISIBLES[c.etat] || c.etat),
      "reçue le " + date(c.cree_le),
    ]) +
    '</p><h2 class="libelle">Le contrôle des règles</h2><pre class="rapport">' +
    echappe(rapport || "Aucun rapport enregistré.") +
    '</pre><h2 class="libelle">Le texte <span class="mot">' + mots + ' mots</span></h2><pre class="texte">' +
    echappe(c.markdown) +
    "</pre></article>";

  const pr = lien(c.pr_url);
  $("#actions").innerHTML =
    (pr
      ? '<a class="bouton principal" href="' + attr(pr) + '" target="_blank" rel="noopener">Voir la pull request</a>'
      : '<button class="bouton principal" data-faire="approuver">Approuver, ouvrir la pull request</button>') +
    '<button class="bouton" data-faire="a-corriger">À corriger</button>' +
    '<span class="pousse"></span>' +
    '<button class="discret" data-faire="refuser">Refuser</button>';

  brancherActions("faire", async (quoi, b) => {
    if (quoi === "refuser" && !confirmer(b, "Refuser, c'est sûr ?")) return;
    b.disabled = true;
    const r = await poste("/admin/contributions/" + id + "/" + quoi);
    if (r.erreur) alert(r.erreur);
    await charger("entrees");
    await detailEntree(id);
  });
}

async function detailCommentaire(id) {
  const c = await api("/admin/commentaires/" + id);
  if (c.erreur) return alert(c.erreur);

  ouvert = id;
  rendreListe();
  montrerVolet();

  const l = lien(c.lien);

  $("#detail").scrollTop = 0;
  $("#detail").innerHTML =
    '<article class="piece"><h2 class="libelle">' + "Sur l'entrée" + '</h2><h1><a href="' +
    attr(SITE + encodeURI(c.page || "/")) + '" target="_blank" rel="noopener">' +
    echappe(c.titre || c.page) + '</a></h1><p class="repere">' +
    repere([
      echappe(c.auteur),
      c.ville ? echappe(c.ville) : null,
      l ? '<a href="' + attr(l) + '" rel="noopener nofollow" target="_blank">son lien</a>' : null,
      c.contact ? echappe(c.contact.canal) + " · " + echappe(c.contact.valeur) : "aucun contact",
      "rang " + c.rang,
      echappe(ETATS_LISIBLES[c.etat] || c.etat),
      depuis(c.cree_le),
    ]) +
    "</p>" +
    (c.passage
      ? '<h2 class="libelle">Sur ce passage</h2><p class="citation">' + echappe(c.passage) + "</p>"
      : "") +
    (c.parent
      ? '<h2 class="libelle">Il répond à</h2><div class="parent"><div class="parent-qui">' +
        echappe(c.parent.auteur) + "</div><p>" + echappe(c.parent.texte) + "</p></div>"
      : "") +
    '<h2 class="libelle">' + "Ce qu'il écrit" + '</h2><p class="prose">' + echappe(c.texte) +
    '</p><h2 class="libelle">Répondre, en public et tout de suite</h2>' +
    '<textarea class="reponse" id="reponse" rows="3"></textarea><p class="note">' +
    "Votre réponse paraît signée du livre, sans repasser par la file." +
    "</p></article>";

  $("#actions").innerHTML =
    '<button class="bouton principal" data-avis="repondre">Publier et répondre</button>' +
    '<button class="bouton" data-avis="publier">Publier seulement</button>' +
    '<span class="pousse"></span>' +
    '<button class="discret" data-avis="refuser">Refuser</button>';

  // Un avis se lit et se publie. Il ne se corrige pas : ce que quelqu'un a
  // ecrit lui appartient, et le seul arbitrage est de le publier ou non.
  brancherActions("avis", async (quoi, b) => {
    if (quoi === "refuser" && !confirmer(b, "Refuser, c'est sûr ?")) return;

    let texte = "";
    if (quoi === "repondre") {
      texte = ($("#reponse").value || "").trim();
      if (!texte) return alert("Le texte de la réponse manque.");
    }

    b.disabled = true;

    if (quoi === "refuser") {
      const r = await poste("/admin/commentaires/" + id + "/refuser");
      if (r.erreur) alert(r.erreur);
    } else {
      const r = await poste("/admin/commentaires/" + id + "/publier");
      if (r.erreur) {
        alert(r.erreur);
        b.disabled = false;
        return;
      }
      if (quoi === "repondre") {
        const r2 = await poste("/admin/commentaires/" + id + "/repondre", { texte });
        if (r2.erreur) alert(r2.erreur);
      }
    }

    await charger("commentaires");
    montrerFile();
    rendreListe();
    accueil();
  });
}

// ---- Les avis ----
//
// Ils ne se moderent pas, ils se lisent. C'est la seule raison de les avoir
// collectes : voir quelle entree ne sert pas, et pourquoi. A gauche ce qui
// appelle une reparation, a droite ce que les gens ont ecrit.

const lignePage = (p) =>
  '<div class="ligne' + (p.page === quelAvis ? " actif" : "") + '" data-page="' + attr(p.page) + '" tabindex="0">' +
  '<div class="ligne-titre">' + echappe(p.titre || p.page) + "</div>" +
  '<div class="jauge"><i data-part="' + p.oui + '"></i><i class="moitie" data-part="' + p.moitie +
  '"></i><i class="non" data-part="' + p.non + '"></i></div>' +
  '<div class="ligne-meta"><span class="chiffres">' + p.oui + " oui · " + p.moitie + " à moitié · " + p.non +
  ' non</span><span class="chiffres">' + p.total + " avis</span></div></div>";

const ecrit = (m) =>
  '<div class="ecrit ' + (m.valeur === "non" ? "non" : m.valeur === "moitie" ? "moitie" : "") + '"><p>' +
  echappe(m.commentaire) + '</p><div class="note">' +
  (m.valeur === "moitie" ? "à moitié" : echappe(m.valeur)) +
  (m.raison ? " · " + echappe(LIBELLES[m.raison] || m.raison) : "") + " · " + date(m.maj_le) + "</div></div>";

const puce = (r) => '<span class="puce">' + echappe(LIBELLES[r.raison] || r.raison) + " <b>" + r.n + "</b></span>";

function cumul(rs) {
  const par = {};
  rs.forEach((r) => (par[r.raison] = (par[r.raison] || 0) + r.n));
  return Object.keys(par)
    .map((k) => ({ raison: k, n: par[k] }))
    .sort((a, b) => b.n - a.n);
}

// Les largeurs sont une donnee, donc elles ne peuvent pas vivre dans un
// attribut style : la politique n'accepte que le style porte par le nonce.
// Le CSSOM, lui, n'est pas concerne.
function jauges() {
  $("#liste")
    .querySelectorAll("[data-part]")
    .forEach((i) => (i.style.flexGrow = i.dataset.part || 0));
}

function rendreAvis() {
  $("#actions").innerHTML = "";

  const pages = tout.avis.pages || [];
  if (!pages.length) {
    $("#liste").innerHTML = '<p class="vide">' + "Personne n'a encore répondu." + "</p>";
    $("#detail").innerHTML = "";
    return;
  }

  if (!quelAvis || (quelAvis !== TOUTES && !pages.some((p) => p.page === quelAvis))) quelAvis = pages[0].page;

  $("#liste").innerHTML =
    '<div class="ligne' + (quelAvis === TOUTES ? " actif" : "") + '" data-page="' + TOUTES + '" tabindex="0">' +
    '<div class="ligne-titre">Toutes les entrées</div><div class="ligne-meta"><span>' +
    tout.avis.commentaires.length + " avis écrits</span></div></div>" +
    pages.map(lignePage).join("");

  $("#liste")
    .querySelectorAll("[data-page]")
    .forEach((l) =>
      l.addEventListener("click", () => {
        quelAvis = l.dataset.page;
        rendreAvis();
        montrerVolet();
      })
    );

  jauges();

  const toutes = quelAvis === TOUTES;
  const p = toutes ? null : pages.find((x) => x.page === quelAvis);
  const mots = (tout.avis.commentaires || []).filter((m) => toutes || m.page === quelAvis);
  const raisons = cumul((tout.avis.raisons || []).filter((r) => toutes || r.page === quelAvis));

  $("#detail").scrollTop = 0;
  $("#detail").innerHTML =
    '<article class="piece"><h1>' +
    (toutes
      ? "Toutes les entrées"
      : '<a href="' + attr(SITE + encodeURI(p.page)) + '" target="_blank" rel="noopener">' + echappe(p.titre || p.page) + "</a>") +
    "</h1>" +
    (raisons.length
      ? '<h2 class="libelle">' + "Ce qui manque, d'après ceux qui n'ont pas dit oui" + '</h2><div class="puces">' +
        raisons.map(puce).join("") + "</div>"
      : "") +
    '<h2 class="libelle">Ce que les gens ont écrit</h2>' +
    (mots.length ? mots.map(ecrit).join("") : '<p class="note">' + "Personne n'a écrit ici." + "</p>") +
    "</article>";
}

// ---- Le clavier ----
//
// Une file se vide au clavier ou elle ne se vide pas. Les raccourcis sont
// ecrits en bas de la colonne, sinon ils n'existent pas.

const lignes = () => Array.from($("#liste").querySelectorAll("[data-id], [data-page]"));

function bouger(pas) {
  const l = lignes();
  if (!l.length) return;
  curseur = Math.max(0, Math.min(l.length - 1, curseur + pas));
  const c = l[curseur];
  if (c.scrollIntoView) c.scrollIntoView({ block: "nearest" });
  if (c.focus) c.focus();
}

function ouvrirCurseur() {
  const c = lignes()[curseur];
  if (!c) return;
  if (c.dataset.id) return ouvrir(c.dataset.id);
  if (c.dataset.page) {
    quelAvis = c.dataset.page;
    rendreAvis();
    montrerVolet();
  }
}

function frapper(touche) {
  const cle = onglet === "commentaires" ? "avis" : "faire";
  const table =
    onglet === "commentaires"
      ? { p: "publier", r: "refuser" }
      : { a: "approuver", c: "a-corriger", r: "refuser" };
  const quoi = table[touche];
  if (!quoi) return;
  const b = $("#actions").querySelector("[data-" + cle + '="' + quoi + '"]');
  if (b && b.click) b.click();
}

document.addEventListener("keydown", (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const ou = e.target && e.target.tagName;
  if (ou === "TEXTAREA" || ou === "INPUT") return;

  if (e.key === "j") return bouger(1);
  if (e.key === "k") return bouger(-1);
  if (e.key === "Enter") return ouvrirCurseur();
  if (e.key === "Escape") {
    montrerFile();
    rendreListe();
    if (onglet !== "notes") accueil();
    return;
  }
  if (onglet !== "notes") frapper(e.key);
});

// ---- Le cablage ----

$("#retour").addEventListener("click", () => {
  montrerFile();
  rendreListe();
  if (onglet !== "notes") accueil();
});

document.querySelectorAll("[data-onglet]").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll("[data-onglet]").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
    onglet = b.dataset.onglet;
    curseur = -1;
    montrerFile();

    const avis = onglet === "notes";
    $("#filtres").hidden = avis;
    $("#legende").hidden = !avis;
    $("#raccourcis").textContent = avis
      ? "Un « non » pèse deux fois un « à moitié »."
      : onglet === "commentaires"
      ? "j k parcourir · ↵ ouvrir · p publier · r refuser"
      : "j k parcourir · ↵ ouvrir · a approuver · c à corriger · r refuser";

    if (avis) rendreAvis();
    else {
      rendreListe();
      accueil();
    }
  })
);

document.querySelectorAll("[data-etat]").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll("[data-etat]").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
    filtre = b.dataset.etat;
    curseur = -1;
    montrerFile();
    rendreListe();
    accueil();
  })
);

charger().then(
  () => {
    rendreListe();
    accueil();
  },
  () => ($("#liste").innerHTML = '<p class="vide">' + "La file ne répond pas." + "</p>")
);
</script>
</body></html>`;
}
