// Ce que le livre retient du lecteur.
//
// Deux choses, et elles ne quittent jamais le navigateur : la derniere entree
// ouverte, et celles qu'il a mises de cote. Aucun identifiant, aucun appel
// reseau, rien a effacer chez qui que ce soit.
//
// Pas de compteurs. « 17 explorees, 5 gardees » est un tableau d'avancement
// deguise, et ce livre se lit par ce qui t'agace cette semaine, pas de la
// premiere page a la derniere.

(function () {
  const CLE_REPRISE = "build-here:reprendre";
  const CLE_GARDEES = "build-here:gardees";

  // En navigation privee, sur un stockage sature ou bloque, chaque acces peut
  // lever. Le livre doit se lire pareil : on echoue en silence et on rend
  // l'etat vide.
  function lire(cle, defaut) {
    try {
      const v = localStorage.getItem(cle);
      return v ? JSON.parse(v) : defaut;
    } catch (e) {
      return defaut;
    }
  }

  function ecrire(cle, valeur) {
    try {
      localStorage.setItem(cle, JSON.stringify(valeur));
    } catch (e) {}
  }

  const gardees = () => {
    const g = lire(CLE_GARDEES, []);
    return Array.isArray(g) ? g : [];
  };

  // ---- Sur une entree : retenir qu'on y est passe, et le bouton Garder ----

  const bouton = document.querySelector("[data-garder]");

  if (bouton) {
    const url = bouton.dataset.url;
    const titre = bouton.dataset.titre;

    ecrire(CLE_REPRISE, { url: url, titre: titre });

    const etat = () => {
      const dedans = gardees().some((e) => e.url === url);
      bouton.setAttribute("aria-pressed", String(dedans));
      // dataset.garder vaut la chaine vide : c'est l'attribut marqueur.
      // Le libelle est dans data-garder-libelle.
      bouton.title = dedans ? bouton.dataset.retirer : bouton.dataset.garderLibelle;
      bouton.setAttribute("aria-label", bouton.title);
    };

    etat();

    bouton.addEventListener("click", function () {
      const liste = gardees();
      const i = liste.findIndex((e) => e.url === url);
      // La plus recemment gardee passe devant : c'est celle qu'on vient de
      // decider, donc celle qu'on cherchera en premier.
      if (i > -1) liste.splice(i, 1);
      else liste.unshift({ url: url, titre: titre });
      ecrire(CLE_GARDEES, liste);
      etat();
    });
  }

  // ---- Sur l'accueil : reprendre, et la liste des gardees ----

  const reprise = document.getElementById("reprise");

  if (reprise) {
    const derniere = lire(CLE_REPRISE, null);
    const liste = gardees();
    const lien = reprise.querySelector("[data-reprise]");
    const bloc = reprise.querySelector("[data-gardees]");

    if (derniere && derniere.url && derniere.titre) {
      lien.href = derniere.url;
      lien.querySelector("[data-titre]").textContent = derniere.titre;
      lien.hidden = false;
    }

    if (liste.length) {
      const ul = bloc.querySelector("ul");
      liste.forEach(function (e) {
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
    if (premier) {
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
