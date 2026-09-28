// Essayer une carte.
//
// Sous la section « a essayer », deux boutons. « J'essaie » ouvre un essai,
// « Je l'ai essaye » en note un deja fait, avec son resultat tout de suite :
// rien n'oblige a annoncer avant de faire. Un essai en cours sur la carte
// montre sa date, et la question de ce que ca a donne.
//
// Connecte, l'essai part dans le compte et se retrouve sur l'espace.
// Deconnecte, il reste dans le navigateur et rejoint le compte a la
// connexion. Dire si la carte a servi en fermant l'essai repond aussi a
// « ca t'a servi ? » plus bas, anonymement : le lecteur ne repond qu'une fois.

(function () {
  const bloc = document.getElementById("essai");
  const compte = window.BuildHereCompte;
  if (!bloc || !compte) return;

  const url = bloc.dataset.url;
  const titre = bloc.dataset.titre;
  const cle = compte.carte(url);
  if (!cle) return;

  // Juste apres la section qui dit quoi faire, avant « depuis ton siege ».
  // Une carte qui n'en a pas garde le bloc sous le texte.
  const SECTIONS = ["à-essayer", "try-this", "à-vérifier", "check-this", "la-décision", "the-decision"];
  const section = SECTIONS.map((id) => document.getElementById(id)).find(Boolean);
  if (section) {
    let suivant = section.nextElementSibling;
    while (suivant && suivant.tagName !== "H2") suivant = suivant.nextElementSibling;
    section.parentNode.insertBefore(bloc, suivant);
  }

  const boutons = bloc.querySelector(".essai-boutons");
  const enCours = bloc.querySelector(".essai-en-cours");
  const form = bloc.querySelector(".essai-form");
  const merci = bloc.querySelector(".essai-merci");
  const lang = document.documentElement.lang || "fr";

  let etat = null;
  // "bilan" ferme l'essai en cours, "fait" en note un deja fait.
  let mode = null;

  const essais = () => (etat ? etat.tries : compte.liste(compte.CLES.essais));
  const surCetteCarte = (e) => (e.card || compte.carte(e.url)) === cle;
  // Le plus recent des essais ouverts sur cette carte.
  const ouvert = () =>
    essais()
      .filter((e) => surCetteCarte(e) && !e.outcome)
      .sort((a, b) => (a.started_at < b.started_at ? 1 : -1))[0];

  function afficher() {
    const e = ouvert();
    form.hidden = true;
    boutons.hidden = Boolean(e);
    enCours.hidden = !e;
    if (e) {
      const date = new Date(e.started_at).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" });
      enCours.querySelector("[data-essai-depuis]").textContent = bloc.dataset.depuis.replace("[date]", date);
    }
  }

  function ouvrirForm(m) {
    mode = m;
    form.reset();
    boutons.hidden = true;
    enCours.hidden = true;
    merci.hidden = true;
    form.hidden = false;
    form.querySelector("input").focus();
  }

  function remercier() {
    merci.querySelector("[data-essai-merci]").textContent = etat ? bloc.dataset.merci : bloc.dataset.merciLocal;
    merci.querySelector("[data-essai-espace]").hidden = !etat;
    merci.querySelector("[data-essai-connexion]").hidden = Boolean(etat);
    merci.hidden = false;
  }

  // Deconnecte, la reponse part comme celle de « ca t'a servi ? », avec
  // l'identifiant du navigateur. Connecte, le serveur s'en charge. Dans les
  // deux cas, le bloc du bas se tait : il a sa reponse.
  function aServi(valeur) {
    if (!valeur) return;
    const note = document.getElementById("note");
    if (!etat && note && note.dataset.api) {
      const client = compte.client();
      if (client) {
        fetch(note.dataset.api + "/feedbacks", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ page: url, title: titre, value: valeur, client: client }),
        }).catch(() => {});
      }
    }
    compte.ecrire("build-here:note:" + url, { valeur: valeur, raison: null, parEssai: true });
    if (note) note.hidden = true;
  }

  bloc.querySelector("[data-essai-commencer]").addEventListener("click", async function () {
    const maintenant = new Date().toISOString();
    if (etat) {
      try {
        etat = await compte.appeler("POST", "/me/tries", { url: url, title: titre, source: "card" });
      } catch (e) {
        return;
      }
    } else {
      const liste = compte.liste(compte.CLES.essais);
      liste.push({ url: url, title: titre, source: "card", started_at: maintenant });
      compte.ecrire(compte.CLES.essais, liste);
    }
    afficher();
  });

  bloc.querySelector("[data-essai-fait]").addEventListener("click", () => ouvrirForm("fait"));
  bloc.querySelector("[data-essai-bilan]").addEventListener("click", () => ouvrirForm("bilan"));

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const donnees = new FormData(form);
    const issue = donnees.get("outcome");
    const lecon = String(donnees.get("lesson") || "").trim();
    const aide = donnees.get("helped");
    const e0 = ouvert();
    const maintenant = new Date().toISOString();

    if (etat) {
      const corps = { outcome: issue, lesson: lecon, helped: aide };
      try {
        etat = mode === "bilan" && e0
          ? await compte.appeler("PATCH", "/me/tries/" + e0.id, corps)
          : await compte.appeler("POST", "/me/tries", Object.assign({ url: url, title: titre, source: "card" }, corps));
      } catch (err) {
        return;
      }
    } else {
      const liste = compte.liste(compte.CLES.essais);
      const ferme = { outcome: issue, lesson: lecon, ended_at: maintenant };
      const i = mode === "bilan" && e0 ? liste.findIndex((x) => x.started_at === e0.started_at && surCetteCarte(x)) : -1;
      if (i > -1) Object.assign(liste[i], ferme);
      else liste.push(Object.assign({ url: url, title: titre, source: "card", started_at: maintenant }, ferme));
      compte.ecrire(compte.CLES.essais, liste);
    }

    aServi(aide);
    afficher();
    remercier();
  });

  compte.moi().then(function (e) {
    etat = e;
    afficher();
    bloc.hidden = false;
  });
})();
