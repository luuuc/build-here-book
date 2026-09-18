// Dire si une entree a servi.
//
// Trois reponses, et une raison quand ce n'est pas oui. Pas d'etoiles, pas de
// score : ce qui vaut n'est pas le compte des « oui », c'est « il manque un
// exemple » sur une entree precise, parce que ca se repare.
//
// L'envoi part des le premier clic, avant la raison. Quelqu'un qui repond et
// s'en va a quand meme repondu, et le serveur remplace au lieu d'ajouter, donc
// preciser ensuite ne compte pas deux fois.

(function () {
  const bloc = document.getElementById("note");
  if (!bloc) return;

  const API = "https://api.build-here.africa";
  const page = bloc.dataset.page;
  const CLE = "build-here:note:" + page;

  const valeurs = bloc.querySelector(".note-valeurs");
  const suite = bloc.querySelector(".note-suite");
  const merci = bloc.querySelector(".note-merci");
  const libre = bloc.querySelector(".note-libre textarea");
  const envoyer = bloc.querySelector(".note-envoyer");

  let etat = { valeur: null, raison: null };

  // Le meme identifiant que les commentaires : une seule identite
  // locale, et elle ne quitte jamais le navigateur autrement que comme
  // clef de deduplication.
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

  async function envoyerNote() {
    const c = client();
    if (!c) return; // stockage bloque : on ne peut pas dedupliquer, on s'abstient

    try {
      await fetch(`${API}/note`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          page,
          titre: bloc.dataset.titre,
          valeur: etat.valeur,
          raison: etat.raison,
          commentaire: libre.value.trim() || null,
          client: c,
        }),
      });
    } catch (e) {
      // Le reseau a lache. On ne dit rien : le lecteur a donne son avis, ce
      // n'est pas son probleme que le serveur ne reponde pas.
    }
  }

  function marquer() {
    valeurs.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.valeur === etat.valeur))
    );
    suite.querySelectorAll("[data-raison]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.raison === etat.raison))
    );
  }

  function retenir() {
    try {
      localStorage.setItem(CLE, JSON.stringify(etat));
    } catch (e) {}
  }

  valeurs.querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", function () {
      // Changer d'avis repart de zero sur le detail. Sans ce vidage, un
      // commentaire ecrit pour l'ancienne reponse restait dans le champ et
      // partait attache a la nouvelle, invisible pour celui qui l'a ecrit.
      etat = { valeur: b.dataset.valeur, raison: null };
      libre.value = "";
      envoyer.disabled = false;
      marquer();
      retenir();
      envoyerNote();

      // Un oui n'a pas de suite : on ne demande pas a quelqu'un de justifier
      // qu'il est content.
      const detail = etat.valeur !== "oui";
      suite.hidden = !detail;
      merci.hidden = detail;
    })
  );

  suite.querySelectorAll("[data-raison]").forEach((b) =>
    b.addEventListener("click", function () {
      etat.raison = etat.raison === b.dataset.raison ? null : b.dataset.raison;
      marquer();
      retenir();
      envoyerNote();
    })
  );

  envoyer.addEventListener("click", async function () {
    envoyer.disabled = true;
    await envoyerNote();
    suite.hidden = true;
    merci.hidden = false;
  });

  // Celui qui revient retrouve sa reponse, et peut la changer.
  try {
    const garde = JSON.parse(localStorage.getItem(CLE) || "null");
    if (garde && garde.valeur) {
      etat = garde;
      marquer();
    }
  } catch (e) {}

  bloc.hidden = false;
})();
