// L'interface de moderation. Servie par le Worker, derriere Cloudflare Access,
// donc sur la meme origine que l'API : aucun jeton a gerer dans le navigateur,
// ce sont les cookies d'Access qui portent l'authentification.
//
// Volontairement minimale. Le conseil a nomme le vrai cout de ce calque, et ce
// n'est pas le code : commentaires, notes commentees et contributions tombent
// au meme endroit et une seule personne peut vider la file. Une interface qui
// demande trois clics par contribution coute plus cher qu'elle ne rapporte.

// Attention en modifiant le script plus bas. Il vit dans un gabarit a accents
// graves, donc il traverse deux couches d'echappement : une apostrophe dans une
// chaine JavaScript s'ecrit `\\'` ici, et pas `\'`, sinon elle sort nue et casse
// la page entiere au chargement.
//
// bin/verifier-admin analyse le script produit. Il tourne dans la CI, parce que
// rien d'autre ne le fait : ce n'est du JavaScript qu'une fois la chaine rendue.
export function pageAdmin(email) {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>La file | Build Here</title>
<style>
  :root { color-scheme: light }
  body { font-family: system-ui, sans-serif; line-height: 1.6; margin: 0; color: #2B2925; background: #FAF7F0 }
  header { background: #1C1A17; color: #fff; padding: .8rem 1.2rem; display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; flex-wrap: wrap }
  header b { font-weight: 600 }
  header small { opacity: .6 }
  main { max-width: 62rem; margin: 0 auto; padding: 1.2rem }
  .vide { padding: 3rem 0; color: #8A6100 }
  table { width: 100%; border-collapse: collapse; background: #fff; font-size: .92rem }
  th, td { text-align: left; padding: .6rem .7rem; border-bottom: 1px solid #E8E3D9; vertical-align: top }
  th { font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; color: #8A6100 }
  tr[data-rang="douteux"] td:first-child::before { content: "· "; color: #8A6100 }
  button { font: inherit; padding: .3rem .7rem; border: 1px solid #1C1A17; background: #fff; cursor: pointer }
  button:hover { background: #FBEEC1 }
  button.principal { background: #1C1A17; color: #fff }
  .detail { background: #fff; border-top: 3px solid #F5B301; padding: 1.2rem; margin-top: 1.2rem }
  .detail h2 { margin: 0 0 .2rem; font-size: 1.2rem }
  .detail .meta { color: #8A6100; font-size: .88rem; margin-bottom: 1rem }
  pre { white-space: pre-wrap; background: #FAF7F0; padding: .9rem; font-size: .82rem; overflow-x: auto }
  .actions { display: flex; gap: .5rem; flex-wrap: wrap; margin-top: 1rem }
  .mot { font-size: .82rem; color: #8A6100 }
  .onglets { display: flex; gap: .5rem; margin-bottom: 1.2rem }
  .onglets button[aria-pressed="true"] { background: #1C1A17; color: #fff }
  h2.section { font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; color: #8A6100; margin: 1.8rem 0 .6rem }
  h2.section:first-child { margin-top: 0 }
  .avis { background: #fff; border-left: 3px solid #E8E3D9; padding: .8rem 1rem; margin-bottom: .7rem; font-size: .92rem }
  .avis .meta { color: #8A6100; font-size: .8rem; margin-top: .35rem }
  .chiffre { text-align: right; font-variant-numeric: tabular-nums }
</style>
</head><body>
<header>
  <b>La file</b>
  <small>${email}</small>
</header>
<main>
  <nav class="onglets">
    <button data-onglet="file" aria-pressed="true">La file</button>
    <button data-onglet="notes" aria-pressed="false">Les notes</button>
  </nav>
  <div id="file">
    <div id="liste"><p class="vide">Chargement.</p></div>
    <div id="detail"></div>
  </div>
  <div id="notes" hidden></div>
</main>
<script type="module">
const $ = (s) => document.querySelector(s);
const api = (c, o) => fetch(c, { headers: { accept: "application/json" }, ...o }).then((r) => r.json());
const date = (t) => new Date(t * 1000).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
const echappe = (s) => String(s ?? "").replace(/[<&]/g, (c) => (c === "<" ? "&lt;" : "&amp;"));

async function liste() {
  const { contributions = [], erreur } = await api("/admin/contributions");
  if (erreur) return ($("#liste").innerHTML = '<p class="vide">' + echappe(erreur) + "</p>");
  if (!contributions.length) return ($("#liste").innerHTML = '<p class="vide">Rien n\\'attend.</p>');

  $("#liste").innerHTML =
    "<table><thead><tr><th>Entrée</th><th>Qui</th><th>État</th><th>Arrivée</th><th></th></tr></thead><tbody>" +
    contributions
      .map(
        (c) =>
          '<tr data-rang="' + (c.rang > 4 ? "douteux" : "ok") + '"><td>' + echappe(c.titre || "sans titre") +
          "</td><td>" + echappe(c.auteur) + "</td><td>" + echappe(c.etat) +
          "</td><td>" + date(c.cree_le) + '</td><td><button data-id="' + c.id + '">Ouvrir</button></td></tr>'
      )
      .join("") +
    "</tbody></table>";

  $("#liste").querySelectorAll("button[data-id]").forEach((b) =>
    b.addEventListener("click", () => detail(b.dataset.id))
  );
}

async function detail(id) {
  const c = await api("/admin/contributions/" + id);
  if (c.erreur) return alert(c.erreur);

  let rapport = "";
  try { rapport = JSON.parse(c.rapport)?.texte || ""; } catch (e) {}
  const mots = (c.markdown.match(/\\S+/g) || []).length;

  $("#detail").innerHTML =
    '<div class="detail"><h2>' + echappe(c.titre || "sans titre") + "</h2>" +
    '<p class="meta">' + echappe(c.auteur) + (c.auteur_lien ? ' · <a href="' + encodeURI(c.auteur_lien) + '" rel="noopener nofollow" target="_blank">son lien</a>' : "") +
    (c.contact ? " · " + echappe(c.contact.canal) + " " + echappe(c.contact.valeur) : " · aucun contact") +
    " · " + echappe(c.etat) + ' · rang ' + c.rang + '</p>' +
    "<h3>Le contrôle des règles</h3><pre>" + echappe(rapport) + "</pre>" +
    '<h3>Le texte <span class="mot">' + mots + " mots</span></h3><pre>" + echappe(c.markdown) + "</pre>" +
    '<div class="actions">' +
    (c.pr_url
      ? '<a href="' + encodeURI(c.pr_url) + '" target="_blank" rel="noopener"><button class="principal">Voir la pull request</button></a>'
      : '<button class="principal" data-faire="approuver">Approuver, ouvrir la pull request</button>') +
    '<button data-faire="a-corriger">À corriger</button>' +
    '<button data-faire="refuser">Refuser</button>' +
    "</div></div>";

  $("#detail").querySelectorAll("button[data-faire]").forEach((b) =>
    b.addEventListener("click", async () => {
      if (b.dataset.faire !== "approuver" && !confirm("Marquer « " + b.dataset.faire + " » ?")) return;
      b.disabled = true;
      b.textContent = "…";
      const r = await api("/admin/contributions/" + id + "/" + b.dataset.faire, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: "{}",
      });
      if (r.erreur) alert(r.erreur);
      await liste();
      await detail(id);
    })
  );
}

// ---- Les notes ----
//
// Elles ne se moderent pas, elles se lisent. C'est la seule raison de les
// avoir collectees : voir quelle entree ne sert pas, et pourquoi.

const LIBELLES = {
  abstrait: "Trop abstrait",
  "deja-su": "Je le savais déjà",
  desaccord: "Pas d'accord",
  exemple: "Il manque un exemple",
  autre: "Autre",
};

async function notes() {
  const d = await api("/admin/notes");
  if (d.erreur) return ($("#notes").innerHTML = '<p class="vide">' + echappe(d.erreur) + "</p>");
  if (!d.pages || !d.pages.length) return ($("#notes").innerHTML = '<p class="vide">Personne n\\'a encore répondu.</p>');

  // Les entrees qui appellent une reparation d'abord. Un « non » pese deux
  // fois un « a moitie » : c'est un tri, pas une note.
  const table =
    '<h2 class="section">Ce qui appelle une réparation</h2>' +
    '<table><thead><tr><th>Entrée</th><th class="chiffre">Oui</th><th class="chiffre">À moitié</th><th class="chiffre">Non</th></tr></thead><tbody>' +
    d.pages
      .map(
        (p) =>
          '<tr><td><a href="https://build-here.africa' + encodeURI(p.page) + '" target="_blank" rel="noopener">' +
          echappe(p.titre || p.page) + "</a></td>" +
          '<td class="chiffre">' + p.oui + '</td><td class="chiffre">' + p.moitie + '</td><td class="chiffre">' + p.non + "</td></tr>"
      )
      .join("") +
    "</tbody></table>";

  const raisons = d.raisons.length
    ? '<h2 class="section">Ce qui manque, tous textes confondus</h2><table><tbody>' +
      d.raisons.map((r) => "<tr><td>" + echappe(LIBELLES[r.raison] || r.raison) + '</td><td class="chiffre">' + r.n + "</td></tr>").join("") +
      "</tbody></table>"
    : "";

  // Les commentaires ne sont agreges nulle part. Une phrase de quelqu'un qui
  // a lu vaut mieux que n'importe quel compte.
  const mots = d.commentaires.length
    ? '<h2 class="section">Ce que les gens ont écrit</h2>' +
      d.commentaires
        .map(
          (c) =>
            '<div class="avis">' + echappe(c.commentaire) +
            '<div class="meta">' + echappe(c.titre || c.page) + " · " + echappe(c.valeur) +
            (c.raison ? " · " + echappe(LIBELLES[c.raison] || c.raison) : "") + " · " + date(c.maj_le) + "</div></div>"
        )
        .join("")
    : "";

  $("#notes").innerHTML = table + raisons + mots;
}

document.querySelectorAll("[data-onglet]").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll("[data-onglet]").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
    $("#file").hidden = b.dataset.onglet !== "file";
    $("#notes").hidden = b.dataset.onglet !== "notes";
    if (b.dataset.onglet === "notes") notes();
  })
);

liste();
</script>
</body></html>`;
}
