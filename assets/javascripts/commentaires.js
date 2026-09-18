// Les discussions sous une entree.
//
// Elles sont servies par l'API et rendues ici. Si l'API tombe, le fil ne
// s'affiche pas et le livre se lit exactement pareil : c'est le principe qui
// tient tout le calque, aucun service dynamique n'est necessaire pour lire.
//
// Le formulaire reste ferme tant que personne ne l'ouvre. Un champ de saisie
// ouvert sous chaque entree est une invitation permanente a remplir, et ce
// livre demande plutot de reflechir avant d'ecrire.

(function () {
  const bloc = document.getElementById("discussion");
  if (!bloc) return;

  const API = "https://api.build-here.africa";
  const page = bloc.dataset.page;

  const fil = bloc.querySelector(".discussion-fil");
  const boite = bloc.querySelector(".discussion-boite");
  const form = bloc.querySelector(".discussion-form");
  const etat = bloc.querySelector(".discussion-etat");
  const champPassage = bloc.querySelector(".discussion-passage");
  const champParent = form.querySelector('[name="parent_id"]');
  const champTexte = form.querySelector('[name="texte"]');

  const echappe = (s) => String(s ?? "").replace(/[<&]/g, (c) => (c === "<" ? "&lt;" : "&amp;"));

  // Le lien laisse sous un nom part dans un href. encodeURI ne touche pas au
  // schema : `javascript:` y survit intact, et le navigateur decode avant
  // d'executer. Echapper ne sert a rien contre ca, seule une liste blanche de
  // schemas tient. L'API filtre deja a l'ecriture, ceci couvre les lignes
  // ecrites avant.
  const lien = (u) => (/^https?:\/\//i.test(u || "") ? encodeURI(u) : null);
  const quand = (t) =>
    new Date(t * 1000).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  function client() {
    try {
      let c = localStorage.getItem("build-here:client");
      if (!c) {
        c = crypto.randomUUID();
        localStorage.setItem("build-here:client", c);
      }
      return c;
    } catch (e) {
      return "";
    }
  }

  // Un commentaire, et ses reponses dessous. Un seul niveau : au-dela c'est
  // un forum, et ce n'est pas ce qu'on construit.
  function rendre(liste) {
    const racines = liste.filter((c) => !c.parent_id);
    const reponses = liste.filter((c) => c.parent_id);

    if (!racines.length) return "";

    return racines
      .map((c) => {
        const siennes = reponses.filter((r) => r.parent_id === c.id);
        return (
          '<article class="avis' + (c.auteur_du_livre ? " avis--auteur" : "") + '">' +
          (c.passage ? '<blockquote class="avis-passage">' + echappe(c.passage) + "</blockquote>" : "") +
          '<p class="avis-qui">' +
          (lien(c.lien)
            ? '<a href="' + lien(c.lien) + '" rel="noopener nofollow" target="_blank">' + echappe(c.auteur) + "</a>"
            : echappe(c.auteur)) +
          '<small>' + quand(c.cree_le) + "</small></p>" +
          '<div class="avis-texte">' + paragraphes(c.texte) + "</div>" +
          '<button type="button" class="avis-repondre" data-parent="' + c.id + '">' +
          (bloc.dataset.repondre || "Répondre") + "</button>" +
          siennes
            .map(
              (r) =>
                '<article class="avis avis--reponse' + (r.auteur_du_livre ? " avis--auteur" : "") + '">' +
                '<p class="avis-qui">' + echappe(r.auteur) + "<small>" + quand(r.cree_le) + "</small></p>" +
                '<div class="avis-texte">' + paragraphes(r.texte) + "</div></article>"
            )
            .join("") +
          "</article>"
        );
      })
      .join("");
  }

  const paragraphes = (t) =>
    echappe(t)
      .split(/\n{2,}/)
      .map((p) => "<p>" + p.replace(/\n/g, "<br>") + "</p>")
      .join("");

  async function charger() {
    try {
      const r = await fetch(`${API}/commentaires?page=${encodeURIComponent(page)}`);
      const d = await r.json();
      const html = rendre(d.commentaires || []);
      if (html) {
        fil.innerHTML = html;
        fil.hidden = false;
        fil.querySelectorAll("[data-parent]").forEach((b) =>
          b.addEventListener("click", () => ouvrir(b.dataset.parent))
        );
      }
    } catch (e) {
      // L'API ne repond pas. Le fil reste cache, l'entree se lit.
    }
  }


  // ---- L'indicatif ----
  //
  // Le pays vient de Cloudflare, rendu avec le jeton : la page est statique,
  // elle ne peut pas le savoir autrement. Si la detection echoue, rien n'est
  // preselectionne et la personne choisit.
  function brancherIndicatif(racine, classeRadio) {
    const champs = racine.querySelector(".contact-champs");
    if (!champs) return null;

    const select = champs.querySelector('[name="indicatif"]');

    // La liste est servie une fois pour tout le site plutot que rendue dans
    // chaque page : 187 options sur 87 cartes pesaient onze kilo-octets par
    // page, pour un champ que presque personne ne remplit. Sans JavaScript le
    // select reste vide, et la personne tape son numero en entier, ce que le
    // serveur accepte.
    let remplie = null;
    const remplir = () =>
      (remplie =
        remplie ||
        fetch("/indicatifs.json")
          .then((r) => r.json())
          .then((liste) => {
            select.innerHTML = liste
              .map((p) => '<option value="' + p.indicatif + '" data-code="' + p.code + '">' + p.nom + " +" + p.indicatif + "</option>")
              .join("");
          })
          .catch(() => {}));
    const radios = racine.querySelectorAll('[name="canal"]');

    const afficher = () => {
      const w = racine.querySelector('[name="canal"]:checked')?.value === "whatsapp";
      champs.dataset.canal = w ? "whatsapp" : "mail";
    };

    radios.forEach((r) => r.addEventListener("change", afficher));
    afficher();

    return async (pays) => {
      await remplir();
      if (!pays) return;
      const o = select.querySelector('[data-code="' + pays + '"]');
      if (o) select.value = o.value;
    };
  }

  const poserPays = brancherIndicatif(bloc);

  // ---- Ouvrir le formulaire ----

  let jeton = null;

  function ouvrir(parentId, passage) {
    boite.hidden = false;
    champParent.value = parentId || "";

    if (passage) {
      champPassage.textContent = "« " + passage + " »";
      champPassage.hidden = false;
    } else {
      champPassage.hidden = true;
      champPassage.textContent = "";
    }

    if (!jeton) {
      fetch(`${API}/jeton`)
        .then((r) => r.json())
        .then((d) => {
          jeton = d.jeton;
          if (poserPays) poserPays(d.pays);
        })
        .catch(() => {});
    }

    champTexte.focus();
    boite.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // La barre de selection appelle ici. C'est le bouton « Commenter » laisse
  // en attente quand le partage a ete livre : il n'avait pas de destination.
  window.buildHereCommenter = (passage) => ouvrir(null, passage);

  const declencheur = document.createElement("button");
  declencheur.type = "button";
  declencheur.className = "discussion-ouvrir";
  declencheur.textContent = bloc.dataset.ouvrir || "Écrire";
  declencheur.addEventListener("click", function () {
    declencheur.hidden = true;
    ouvrir(null);
  });
  bloc.querySelector(".discussion-titre").insertAdjacentElement("afterend", declencheur);

  // ---- L'envoi ----

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const bouton = form.querySelector('button[type="submit"]');
    bouton.disabled = true;
    etat.textContent = "Envoi.";

    const corps = Object.fromEntries(new FormData(form).entries());
    corps.page = page;
    corps.titre = bloc.dataset.titre;
    corps.client = client();
    corps.jeton = jeton;
    if (!champPassage.hidden) corps.passage = champPassage.textContent.replace(/^«\s*|\s*»$/g, "");

    try {
      const r = await fetch(`${API}/commentaire`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(corps),
      });
      const d = await r.json();

      if (!r.ok) {
        etat.textContent = d.erreur || "Quelque chose n'a pas marché.";
        bouton.disabled = false;
        return;
      }

      form.hidden = true;
      etat.textContent = "";
      boite.insertAdjacentHTML("beforeend", '<p class="discussion-merci">' + echappe(bloc.dataset.envoye) + "</p>");
    } catch (e) {
      // Le formulaire reste rempli : personne ne doit retaper ce qu'il a ecrit.
      etat.textContent = "L'envoi n'est pas parti. Réessaie, ton texte est encore là.";
      bouton.disabled = false;
    }
  });

  charger();
})();
