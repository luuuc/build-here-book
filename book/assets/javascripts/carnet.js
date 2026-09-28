// Les notes du lecteur sur une carte.
//
// Sur un passage, depuis la barre de selection, ou sur la carte entiere,
// depuis le champ du bas. Personne d'autre ne les lit. Connecte, elles
// partent dans le compte et se retrouvent sur l'espace. Deconnecte, elles
// restent dans le navigateur et rejoignent le compte a la connexion.

(function () {
  const bloc = document.getElementById("carnet");
  const compte = window.BuildHereCompte;
  if (!bloc || !compte) return;

  const url = bloc.dataset.url;
  const titre = bloc.dataset.titre;
  const cle = compte.carte(url);
  if (!cle) return;

  const ul = bloc.querySelector(".carnet-liste");
  const form = bloc.querySelector(".carnet-form");
  const citation = bloc.querySelector(".carnet-passage");
  const label = bloc.querySelector("[data-carnet-label]");
  const champ = form.querySelector("textarea");
  const sansPassage = bloc.querySelector("[data-carnet-sans-passage]");

  let etat = null;
  let passage = "";

  const notes = () =>
    (etat ? etat.notes : compte.liste(compte.CLES.notes)).filter((n) => (n.card || compte.carte(n.url)) === cle);

  function rendre() {
    ul.replaceChildren();
    notes().forEach(function (n) {
      const li = document.createElement("li");
      if (n.passage) {
        const q = document.createElement("blockquote");
        q.textContent = n.passage;
        li.appendChild(q);
      }
      const p = document.createElement("p");
      p.textContent = n.text;
      li.appendChild(p);
      const suppr = document.createElement("button");
      suppr.type = "button";
      suppr.textContent = bloc.dataset.supprimer;
      suppr.addEventListener("click", () => supprimer(n));
      li.appendChild(suppr);
      ul.appendChild(li);
    });
    bloc.querySelector("[data-carnet-local]").hidden = Boolean(etat);
  }

  function poserPassage(texte) {
    passage = texte || "";
    citation.textContent = passage;
    citation.hidden = !passage;
    sansPassage.hidden = !passage;
    label.textContent = passage ? bloc.dataset.labelPassage : bloc.dataset.label;
  }

  async function supprimer(n) {
    if (etat) {
      try {
        etat = await compte.appeler("DELETE", "/me/notes/" + n.id);
      } catch (e) {
        return;
      }
    } else {
      compte.ecrire(compte.CLES.notes, compte.liste(compte.CLES.notes).filter((x) => x.created_at !== n.created_at));
    }
    rendre();
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const texte = champ.value.trim();
    if (!texte) return;
    const note = { url: url, title: titre, passage: passage || null, text: texte };
    if (etat) {
      try {
        etat = await compte.appeler("POST", "/me/notes", note);
      } catch (err) {
        return;
      }
    } else {
      const liste = compte.liste(compte.CLES.notes);
      liste.push(Object.assign(note, { created_at: new Date().toISOString() }));
      if (!compte.ecrire(compte.CLES.notes, liste)) return;
    }
    champ.value = "";
    poserPassage("");
    rendre();
  });

  sansPassage.addEventListener("click", () => poserPassage(""));

  // La barre de selection passe ici le passage choisi.
  window.buildHereNoter = function (texte) {
    poserPassage(texte);
    bloc.scrollIntoView({ behavior: "smooth", block: "center" });
    champ.focus({ preventScroll: true });
  };

  compte.moi().then(function (e) {
    etat = e;
    rendre();
    bloc.hidden = false;
  });
})();
