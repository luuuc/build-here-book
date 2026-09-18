// Tableau de bord prive, servi par le Worker derriere Cloudflare Access.
// Trois signaux seulement : conversations a moderer, utilite des cartes et
// distribution anonyme des resultats du test.

const echapper = (s) =>
  String(s ?? "").replace(/[<&"]/g, (c) => (c === "<" ? "&lt;" : c === "&" ? "&amp;" : "&quot;"));

export function pageAdmin(email, nonce) {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Signaux | Build Here</title>
<style nonce="${nonce}">
:root{--encre:#1C1A17;--papier:#FAF7F0;--coquille:#F2EFE9;--filet:#E8E3D9;--bande:#FBEEC1;--signal:#F5B301;--ambre:#8A6100}
*{box-sizing:border-box}body{margin:0;background:var(--papier);color:var(--encre);font-family:system-ui,-apple-system,sans-serif;line-height:1.5}
header{background:var(--bande);border-bottom:3px solid var(--signal);display:flex;justify-content:space-between;gap:1rem;padding:1rem 1.5rem}header b{font-family:Georgia,serif;font-size:1.25rem}header small{color:var(--ambre)}
nav{display:flex;gap:.5rem;padding:1rem 1.5rem;border-bottom:1px solid var(--filet)}button{background:#fff;border:1px solid var(--filet);color:var(--encre);cursor:pointer;font:inherit;padding:.55rem .9rem}button:hover{background:var(--bande)}button[aria-pressed=true]{background:var(--encre);border-color:var(--encre);color:#fff}button.danger{color:#8B1E1E}button:disabled{opacity:.4}
main{max-width:1100px;margin:0 auto;padding:1.5rem}.etat{color:var(--ambre);font-size:.85rem}.grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}.carte{background:#fff;border:1px solid var(--filet);padding:1rem}.carte h2,.carte h3{font-family:Georgia,serif;margin-top:0}.meta{color:var(--ambre);font-size:.78rem}.actions{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:1rem}.passage{border-left:3px solid var(--signal);padding-left:.8rem}.barre{background:var(--filet);height:8px;margin:.35rem 0}.barre i{background:var(--ambre);display:block;height:100%}.table{border-collapse:collapse;width:100%;background:#fff}.table td,.table th{border-bottom:1px solid var(--filet);padding:.65rem;text-align:left}.table th{font-size:.75rem;text-transform:uppercase;color:var(--ambre)}.vide{background:var(--coquille);padding:1rem}@media(max-width:600px){header{align-items:flex-start;flex-direction:column}nav{overflow:auto}main{padding:1rem}.table{font-size:.8rem}}
</style></head><body>
<header><b>Build Here · Signaux</b><small>${echapper(email)}</small></header>
<nav aria-label="Sections">
  <button data-tab="commentaires" aria-pressed="true">Commentaires</button>
  <button data-tab="notes" aria-pressed="false">Notes</button>
  <button data-tab="evaluations" aria-pressed="false">Ultimate Builder Test</button>
</nav>
<main><p class="etat" data-etat>Chargement…</p><section data-contenu></section></main>
<script type="module" nonce="${nonce}">
const contenu=document.querySelector("[data-contenu]");
const etat=document.querySelector("[data-etat]");
const esc=s=>String(s??"").replace(/[<&"]/g,c=>c==="<"?"&lt;":c==="&"?"&amp;":"&quot;");
const date=n=>n?new Date(n*1000).toLocaleDateString("fr-FR"):"";
async function api(url,init){const r=await fetch(url,init);const d=await r.json();if(!r.ok)throw new Error(d.erreur||"Erreur API");return d}
async function agir(url,corps={}){return api(url,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(corps)})}
function vide(texte){contenu.innerHTML='<p class="vide">'+esc(texte)+'</p>'}

async function commentaires(){
  const d=await api("/admin/commentaires?etat=en_attente");
  const lignes=d.commentaires||[];if(!lignes.length)return vide("Aucun commentaire en attente.");
  contenu.innerHTML='<div class="grid">'+lignes.map(c=>'<article class="carte" data-commentaire="'+esc(c.id)+'"><p class="meta">'+esc(c.titre||c.page)+' · '+esc(c.auteur)+' · '+date(c.cree_le)+'</p>'+(c.passage?'<p class="passage">'+esc(c.passage)+'</p>':'')+'<p>'+esc(c.extrait||c.texte||'')+'</p><div class="actions"><button data-action="publier">Publier</button><button data-action="repondre">Répondre</button><button class="danger" data-action="refuser">Refuser</button></div></article>').join('')+'</div>';
  contenu.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",async()=>{const article=b.closest("[data-commentaire]");let corps={};if(b.dataset.action==="repondre"){const texte=window.prompt("Réponse publique");if(!texte)return;corps={texte}}b.disabled=true;try{await agir("/admin/commentaires/"+article.dataset.commentaire+"/"+b.dataset.action,corps);if(b.dataset.action==="repondre"){etat.textContent="Réponse publiée";b.disabled=false}else{article.remove();if(!contenu.querySelector("[data-commentaire]"))vide("Aucun commentaire en attente.")}}catch(e){etat.textContent=e.message;b.disabled=false}}));
}

async function notes(){
  const d=await api("/admin/notes");const pages=d.pages||[];
  if(!pages.length)return vide("Aucune note reçue.");
  contenu.innerHTML='<table class="table"><thead><tr><th>Carte</th><th>Total</th><th>Oui</th><th>À moitié</th><th>Non</th></tr></thead><tbody>'+pages.map(p=>'<tr><td>'+esc(p.titre||p.page)+'</td><td>'+p.total+'</td><td>'+p.oui+'</td><td>'+p.moitie+'</td><td>'+p.non+'</td></tr>').join('')+'</tbody></table>'+(d.commentaires||[]).map(c=>'<article class="carte"><p class="meta">'+esc(c.titre||c.page)+' · '+esc(c.valeur)+' · '+esc(c.raison||'')+'</p><p>'+esc(c.commentaire)+'</p></article>').join('');
}

async function evaluations(){
  const d=await api("/admin/evaluations");
  if(!d.total)return vide("Aucun test terminé.");
  const noms=["État d'esprit","Métier","Autonomie","Compréhension","Livraison","Ownership","Systèmes","Levier","Leadership","Référence"];
  contenu.innerHTML='<article class="carte"><h2>'+d.total+' tests terminés</h2><div>'+d.moyennes.map((m,i)=>'<div><span>'+(i+1)+'. '+noms[i]+' · '+m+'%</span><div class="barre"><i data-largeur="'+m+'"></i></div></div>').join('')+'</div></article><table class="table"><thead><tr><th>Niveau</th><th>Prochain</th><th>Tests</th></tr></thead><tbody>'+d.niveaux.map(n=>'<tr><td>'+n.niveau+'</td><td>'+n.prochain+'</td><td>'+n.total+'</td></tr>').join('')+'</tbody></table>';
  contenu.querySelectorAll("[data-largeur]").forEach(i=>i.style.width=i.dataset.largeur+"%");
}

const vues={commentaires,notes,evaluations};
async function ouvrir(nom){document.querySelectorAll("[data-tab]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.tab===nom)));contenu.innerHTML="";etat.textContent="Chargement…";try{await vues[nom]();etat.textContent="À jour"}catch(e){etat.textContent=e.message;vide("Impossible de charger ces signaux.")}}
document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>ouvrir(b.dataset.tab)));
ouvrir("commentaires");
</script></body></html>`;
}
