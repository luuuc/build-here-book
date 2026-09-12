// La page de contribution.
//
// Le formulaire fonctionne sans JavaScript : il part en POST classique vers le
// Worker, qui repond une page. Un envoi doit passer sur une mauvaise connexion,
// depuis un telephone. Tout ce qui suit est du confort par-dessus.
//
// Le confort en question : les deux portes, le controle immediat du format, et
// le jeton de formulaire. Le jeton ne peut pas etre pose par le gabarit, parce
// que la page est statique et servie par un cache : il se demande au Worker au
// chargement. Sans JavaScript il est donc absent, et le Worker le sait, il
// classe l'envoi plus bas dans la file au lieu de le refuser.

(function () {
  const zone = document.getElementById("contrib");
  if (!zone) return;

  const api = zone.dataset.api;
  const form = zone.querySelector(".contrib-form");
  const rapport = zone.querySelector(".contrib-rapport");
  const etat = zone.querySelector(".contrib-etat");
  const envoyer = zone.querySelector(".contrib-envoyer");
  const champJeton = form.querySelector('[name="jeton"]');
  const champClient = form.querySelector('[name="client"]');
  const champMd = form.querySelector('[name="markdown"]');

  // ---- Les deux portes ----
  //
  // Une seule mecanique derriere : les deux menent a la meme zone de collage,
  // seul le texte d'aide au-dessus change.

  const portes = zone.querySelectorAll("[data-porte]");
  const aides = zone.querySelectorAll("[data-aide]");

  portes.forEach((b) =>
    b.addEventListener("click", function () {
      const quel = b.dataset.porte;
      portes.forEach((p) => p.setAttribute("aria-pressed", String(p === b)));
      aides.forEach((a) => (a.hidden = a.dataset.aide !== quel));
      try {
        localStorage.setItem("build-here:porte", quel);
      } catch (e) {}
    })
  );

  // Celui qui revient retrouve la porte qu'il avait prise.
  let derniere = null;
  try {
    derniere = localStorage.getItem("build-here:porte");
  } catch (e) {}
  const ouvrir = zone.querySelector(`[data-porte="${derniere === "soi" ? "soi" : "ia"}"]`);
  if (ouvrir) ouvrir.click();

  // ---- Copier l'entretien ----

  zone.querySelectorAll("[data-copier]").forEach((b) =>
    b.addEventListener("click", async function () {
      const source = document.getElementById(b.dataset.copier);
      if (!source) return;
      const libelle = b.textContent;
      try {
        await navigator.clipboard.writeText(source.textContent);
      } catch (e) {
        // Presse-papier refuse : on selectionne, le lecteur fait le reste.
        const plage = document.createRange();
        plage.selectNodeContents(source);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(plage);
      }
      b.textContent = "Copié";
      setTimeout(() => (b.textContent = libelle), 1400);
    })
  );

  // ---- L'identifiant local et le jeton ----

  function client() {
    try {
      let c = localStorage.getItem("build-here:client");
      if (!c) {
        c = crypto.randomUUID();
        localStorage.setItem("build-here:client", c);
      }
      return c;
    } catch (e) {
      // Navigation privee : pas d'identifiant stable, donc pas de limite par
      // personne. Le garde-fou par reseau et la moderation restent.
      return "";
    }
  }

  champClient.value = client();

  fetch(`${api}/jeton`)
    .then((r) => r.json())
    .then((d) => {
      if (d.jeton) champJeton.value = d.jeton;
    })
    .catch(() => {});

  // ---- Le controle du format, avant l'envoi ----

  const verifier = async function () {
    const source = champMd.value.trim();
    if (!source) return null;

    try {
      const r = await fetch(`${api}/lint`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ source, nouvelle: true }),
      });
      const d = await r.json();
      return d.rapport || d.erreur || null;
    } catch (e) {
      return null;
    }
  };

  let dernierTexte = "";
  champMd.addEventListener("blur", async function () {
    const source = champMd.value.trim();
    if (!source || source === dernierTexte) return;
    dernierTexte = source;
    etat.textContent = "Je regarde le format.";
    const texte = await verifier();
    etat.textContent = "";
    if (texte) {
      rapport.textContent = texte;
      rapport.hidden = false;
    }
  });

  // ---- L'envoi ----

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    envoyer.disabled = true;
    etat.textContent = "Envoi.";

    const corps = Object.fromEntries(new FormData(form).entries());

    try {
      const r = await fetch(`${api}/contribution`, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(corps),
      });
      const d = await r.json();

      if (!r.ok) {
        etat.textContent = d.erreur || "Quelque chose n'a pas marché.";
        envoyer.disabled = false;
        return;
      }

      if (d.rapport) {
        rapport.textContent = d.rapport;
        rapport.hidden = false;
      }
      etat.textContent = zone.dataset.recue || "Reçue.";
      form.querySelectorAll("input, textarea, button").forEach((c) => (c.disabled = true));
    } catch (e) {
      // Le reseau a lache. Le formulaire reste rempli et le bouton revient :
      // personne ne doit retaper son entree.
      etat.textContent = "L'envoi n'est pas parti. Réessaie, ton texte est encore là.";
      envoyer.disabled = false;
    }
  });
})();
