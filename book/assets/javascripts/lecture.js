// Ce que le livre retient du lecteur : la derniere carte ouverte, et celles
// qu'il a mises de cote.
//
// Deconnecte, tout reste dans le navigateur : aucun identifiant, aucun appel
// reseau. Connecte, ca part dans son compte, pour le retrouver sur son espace
// et sur un autre appareil. compte.js fait le lien.
//
// Pas de compteurs de lecture. « 17 explorees, 5 gardees » est un tableau
// d'avancement deguise, et ce livre se lit par ce qui t'agace cette semaine,
// pas de la premiere page a la derniere.

(function () {
  const compte = window.BuildHereCompte;
  const { CLES, lire, ecrire, liste } = compte;

  // ---- Sur une carte : retenir qu'on y est passe, et le bouton Garder ----

  const bouton = document.querySelector("[data-garder]");

  if (bouton) {
    const url = bouton.dataset.url;
    const titre = bouton.dataset.titre;
    const cle = compte.carte(url);
    let gardee = false;
    let etat = null;

    const marquer = () => {
      bouton.setAttribute("aria-pressed", String(gardee));
      // dataset.garder vaut la chaine vide : c'est l'attribut marqueur.
      // Le libelle est dans data-garder-libelle.
      bouton.title = gardee ? bouton.dataset.retirer : bouton.dataset.garderLibelle;
      bouton.setAttribute("aria-label", bouton.title);
    };

    compte.moi().then(function (e) {
      etat = e;
      if (etat) {
        if (cle) compte.appeler("PUT", "/me/resume", { url: url, title: titre }).catch(() => {});
        gardee = etat.kept.some((k) => k.card === cle);
      } else {
        ecrire(CLES.reprise, { url: url, titre: titre });
        gardee = liste(CLES.gardees).some((e) => e.url === url);
      }
      marquer();
    });

    bouton.addEventListener("click", function () {
      gardee = !gardee;
      marquer();
      if (etat) {
        const envoi = gardee
          ? compte.appeler("POST", "/me/kept", { url: url, title: titre })
          : compte.appeler("DELETE", "/me/kept/" + cle);
        envoi.catch(() => {
          gardee = !gardee;
          marquer();
        });
        return;
      }
      const l = liste(CLES.gardees);
      const i = l.findIndex((e) => e.url === url);
      // La plus recemment gardee passe devant : c'est celle qu'on vient de
      // decider, donc celle qu'on cherchera en premier.
      if (i > -1) l.splice(i, 1);
      if (gardee) l.unshift({ url: url, titre: titre });
      ecrire(CLES.gardees, l);
    });
  }

  // ---- Sur l'accueil : reprendre, et la liste des gardees ----

  const reprise = document.getElementById("reprise");

  if (reprise) {
    compte.moi().then(function (etat) {
      const derniere = etat
        ? etat.resume && { url: etat.resume.url, titre: etat.resume.title }
        : lire(CLES.reprise, null);
      const gardees = etat ? etat.kept.map((k) => ({ url: k.url, titre: k.title })) : liste(CLES.gardees);
      const lien = reprise.querySelector("[data-reprise]");
      const bloc = reprise.querySelector("[data-gardees]");

      if (derniere && derniere.url && derniere.titre) {
        lien.href = derniere.url;
        lien.querySelector("[data-titre]").textContent = derniere.titre;
        lien.hidden = false;
      }

      if (gardees.length) {
        const ul = bloc.querySelector("ul");
        gardees.forEach(function (e) {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = e.url;
          a.textContent = e.titre;
          li.appendChild(a);
          ul.appendChild(li);
        });
        bloc.hidden = false;
      }

      // Rien de retenu, rien a montrer. Un premier lecteur ne voit pas un
      // cadre vide qui lui annonce ce qu'il n'a pas encore fait.
      if (!lien.hidden || !bloc.hidden) reprise.hidden = false;
    });
  }

  // ---- Sur l'index par symptome : filtrer ----

  const index = document.querySelector("[data-filtre-symptomes]");

  if (index) {
    const champ = document.createElement("input");
    champ.type = "search";
    champ.className = "filtre-symptomes";
    champ.placeholder = index.dataset.filtreSymptomes;
    champ.setAttribute("aria-label", index.dataset.filtreSymptomes);

    const vide = document.createElement("p");
    vide.className = "filtre-vide";
    vide.textContent = index.dataset.filtreVide;
    vide.hidden = true;

    const zone = index.querySelector(".container") || index;
    const premier = zone.querySelector("h2");

    // La bande d'entree reserve une place au champ. Sans elle, il reprend
    // son ancienne place, juste avant le premier groupe.
    const cible = document.querySelector("[data-filtre-cible]");
    if (cible) {
      cible.appendChild(champ);
      if (premier) zone.insertBefore(vide, premier);
    } else if (premier) {
      zone.insertBefore(champ, premier);
      zone.insertBefore(vide, premier);
    }

    // Les accents ne doivent pas decider si une ligne correspond : quelqu'un
    // qui tape « reunion » cherche « réunion ».
    const plat = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

    const groupes = Array.from(zone.querySelectorAll("h2")).map((h) => ({
      titre: h,
      liste: h.nextElementSibling,
    }));

    champ.addEventListener("input", function () {
      const q = plat(champ.value.trim());
      let visibles = 0;

      groupes.forEach(function (g) {
        if (!g.liste) return;
        let restants = 0;

        Array.from(g.liste.children).forEach(function (li) {
          const ok = !q || plat(li.textContent).indexOf(q) > -1;
          li.hidden = !ok;
          if (ok) restants++;
        });

        // Un titre de groupe sans ligne dessous ne dit plus rien.
        g.titre.hidden = restants === 0;
        g.liste.hidden = restants === 0;
        visibles += restants;
      });

      vide.hidden = visibles > 0;
    });
  }
})();
