// Le compte, vu du livre.
//
// Le livre est statique et se lit sans compte. Quand le lecteur est connecte,
// le site repond a /me sur le meme domaine, avec le cookie de session : ce
// que le livre retient part alors dans le compte. Deconnecte, ou si le
// serveur ne repond pas, tout reste dans le navigateur, et le livre se lit
// pareil.
//
// La premiere fois qu'un navigateur rencontre le compte, ce qu'il gardait
// le rejoint, puis quitte le navigateur : ensuite, le compte fait foi.
//
// Le site charge aussi ce fichier, sur l'espace, le test et les parcours.

(function () {
  const CLES = {
    reprise: "build-here:reprendre",
    gardees: "build-here:gardees",
    notes: "build-here:notes",
    essais: "build-here:tries",
    but: "build-here:goal",
    test: "build-here:test-builder:reponses",
  };

  // En navigation privee, sur un stockage sature ou bloque, chaque acces peut
  // lever. On echoue en silence et on rend l'etat vide.
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
      return true;
    } catch (e) {
      return false;
    }
  }

  function effacer(cle) {
    try {
      localStorage.removeItem(cle);
    } catch (e) {}
  }

  const liste = (cle) => {
    const l = lire(cle, []);
    return Array.isArray(l) ? l : [];
  };

  // La cle d'une carte : son numero de principe, lu dans son adresse.
  // 05-05-essayer-coute-moins-cher-que-demander.html donne « 5.05 ».
  function carte(url) {
    const m = /\/(\d{2})-(\d{2})-[a-z0-9-]+\.html$/.exec(url || "");
    return m ? Number(m[1]) + "." + m[2] : null;
  }

  async function appeler(methode, chemin, corps) {
    const reponse = await fetch(chemin, {
      method: methode,
      credentials: "same-origin",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: corps === undefined ? undefined : JSON.stringify(corps),
    });
    if (!reponse.ok) throw new Error(String(reponse.status));
    return reponse.status === 204 ? null : reponse.json();
  }

  // Ce que le test a trouve, dans la forme que le compte garde. Le calcul
  // vit dans le modele du test : ce fichier ne fait que le lire.
  function resultat(modele, reponses, estimation, date) {
    const r = modele.level(reponses);
    const cible = r.suivante || r.steps[r.steps.length - 1];
    return {
      taken_on: date || new Date().toISOString().slice(0, 10),
      answers: reponses,
      estimate: Array.isArray(estimation) ? estimation : null,
      level: r.palier ? r.palier.numero : null,
      level_name: r.palier ? r.palier.nom : null,
      step: r.niveau,
      blocking_step: r.suivante ? r.suivante.step : null,
      blocking_name: r.suivante ? r.suivante.capability.name : null,
      move: r.palier ? cible.capability.plan : null,
      cards: r.palier ? cible.capability.cards.map((c) => ({ url: c.url, title: c.title })) : [],
    };
  }

  // Les reponses gardees sur l'appareil ne deviennent un resultat que si la
  // page a charge les regles du test. Sinon elles attendent une page qui les
  // a : l'espace ou le test.
  function testGarde() {
    const garde = lire(CLES.test, null);
    if (!garde || !garde.responses || !window.BuilderTestModele || !window.BuilderTestContenu) return null;
    const modele = window.BuilderTestModele.creer(window.BuilderTestContenu);
    return modele ? resultat(modele, garde.responses, null, garde.date) : null;
  }

  // Tout ce que le navigateur a garde deconnecte, ou null s'il n'a rien.
  function aRejoindre() {
    const reprise = lire(CLES.reprise, null);
    const corps = {
      resume: reprise && reprise.url ? { url: reprise.url, title: reprise.titre } : null,
      kept: liste(CLES.gardees).map((g) => ({ url: g.url, title: g.titre })),
      notes: liste(CLES.notes),
      tries: liste(CLES.essais),
      goal: lire(CLES.but, null),
      test_result: testGarde(),
    };
    const vide = !corps.resume && !corps.kept.length && !corps.notes.length && !corps.tries.length &&
      !corps.goal && !corps.test_result;
    return vide ? null : corps;
  }

  async function rejoindre(etat) {
    const corps = etat && aRejoindre();
    if (!corps) return etat;
    try {
      const nouveau = await appeler("POST", "/me/sync", corps);
      [CLES.reprise, CLES.gardees, CLES.notes, CLES.essais, CLES.but].forEach(effacer);
      if (corps.test_result) effacer(CLES.test);
      // L'espace est rendu par le serveur : il se recharge pour montrer ce
      // qui vient d'arriver. Seulement si le navigateur s'est bien vide,
      // sinon il rejoindrait et rechargerait sans fin.
      if (document.querySelector("[data-espace]") && !aRejoindre()) location.reload();
      return nouveau;
    } catch (e) {
      return etat;
    }
  }

  // L'etat du compte, ou null deconnecte. Une seule requete par page.
  let promesse = null;
  function moi() {
    if (!promesse) promesse = appeler("GET", "/me").catch(() => null).then(rejoindre);
    return promesse;
  }

  // Un identifiant local, pour que le serveur remplace au lieu d'ajouter.
  // Il ne quitte jamais le navigateur autrement que comme clef.
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

  window.BuildHereCompte = { CLES, lire, ecrire, liste, carte, appeler, moi, resultat, client };

  moi();
})();
