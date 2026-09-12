// Partager un passage.
//
// Le lecteur selectionne du texte dans l'entree, une barre minuscule apparait
// au-dessus, et elle ne propose qu'une chose. Tout le reste vit au niveau de
// la page. C'est la seule interaction contextuelle du livre.
//
// Aucun appel reseau ici. Rien n'est compte, rien n'est envoye. Le jour ou
// l'evenement de partage anonyme existera, il aura son propre fichier.

(function () {
  const barre = document.getElementById("partage");
  const zone = document.querySelector("main.content");
  if (!barre || !zone) return; // accueil, a propos : pas de texte de livre

  const canaux = barre.querySelector(".partage-canaux");
  const rangee = barre.querySelector(".partage-barre");
  const ouvrir = barre.querySelector("[data-ouvrir]");
  const signature = barre.dataset.signature;

  // Deux modes. Un passage selectionne, avec son ancre vers la phrase exacte.
  // Ou la page entiere, depuis l'icone du fil d'ariane : c'est le titre qui
  // part, et le lien n'a pas d'ancre puisqu'il n'y a rien a pointer dedans.
  const boutonPage = document.querySelector("[data-partage-page]");

  let passage = "";
  let ancrage = true;

  // Un passage de plus de 280 caracteres n'est plus une citation, c'est une
  // entree recopiee. On coupe pour le texte partage. L'ancre, elle, reste
  // calculee sur la selection entiere.
  const LIMITE = 280;

  function citation() {
    return passage.length > LIMITE ? passage.slice(0, LIMITE).trimEnd() + "..." : passage;
  }

  // Les fragments de texte du navigateur. Le destinataire arrive sur la phrase
  // surlignee au lieu du haut de la page. Chrome, Edge, Safari 16.1 et au-dela.
  // Ailleurs le lien reste bon, il ouvre simplement la page.
  //
  // La virgule et le tiret sont les delimiteurs de la syntaxe : encodes, sinon
  // un passage qui en contient casse l'ancre.
  // On coupe par caracteres et pas par mots : un passage long sans espaces,
  // une URL selectionnee par exemple, compte deux mots et fabriquerait une
  // ancre aussi longue que lui.
  function debutDe(s, n) {
    if (s.length <= n) return s;
    const t = s.slice(0, n);
    const i = t.lastIndexOf(" ");
    return i > 10 ? t.slice(0, i) : t;
  }

  function finDe(s, n) {
    if (s.length <= n) return s;
    const t = s.slice(-n);
    const i = t.indexOf(" ");
    return i > -1 && i < n - 10 ? t.slice(i + 1) : t;
  }

  function ancre() {
    if (!ancrage) return "";
    const enc = (s) => encodeURIComponent(s).replace(/-/g, "%2D");
    if (passage.length <= 90) return "#:~:text=" + enc(passage);
    // Au-dela, on donne un debut et une fin : le navigateur surligne tout ce
    // qui se trouve entre les deux.
    return "#:~:text=" + enc(debutDe(passage, 40)) + "," + enc(finDe(passage, 40));
  }

  function lien() {
    return location.origin + location.pathname + ancre();
  }

  function texteComplet() {
    return "« " + citation() + " »\n\n" + signature + "\n" + lien();
  }

  function majCanaux() {
    const url = lien();
    const avecCitation = "« " + citation() + " »\n\n" + signature;

    barre.querySelector('[data-canal="whatsapp"]').href =
      "https://wa.me/?text=" + encodeURIComponent(texteComplet());

    barre.querySelector('[data-canal="x"]').href =
      "https://x.com/intent/post?text=" +
      encodeURIComponent(avecCitation) +
      "&url=" +
      encodeURIComponent(url);

    // LinkedIn n'accepte plus de texte pre-rempli depuis une URL de partage :
    // il ne lit que le parametre `url` et va chercher lui-meme le titre et la
    // description dans les balises Open Graph. La citation ne voyage donc pas,
    // et il n'y a pas de contournement propre.
    barre.querySelector('[data-canal="linkedin"]').href =
      "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
  }

  function fermer() {
    ancrage = true;
    if (boutonPage) boutonPage.setAttribute("aria-expanded", "false");
    barre.hidden = true;
    canaux.hidden = true;
    rangee.hidden = false;
    rangee.dataset.etat = "ferme";
    ouvrir.textContent = ouvrir.dataset.libelle || ouvrir.textContent;
  }

  // La barre se place au-dessus du passage. Si le passage touche le haut de
  // l'ecran, elle passe en dessous : le header est fixe et la recouvrirait.
  function placer(rect) {
    const header = document.querySelector(".header");
    const plafond = (header ? header.getBoundingClientRect().bottom : 0) + 8;

    barre.hidden = false;
    const h = barre.offsetHeight;
    const dessus = rect.top - h - 8;
    const dessous = rect.bottom + 8;
    const y = dessus < plafond ? dessous : dessus;

    const centre = rect.left + rect.width / 2 - barre.offsetWidth / 2;
    const x = Math.max(8, Math.min(centre, window.innerWidth - barre.offsetWidth - 8));

    barre.style.top = y + window.scrollY + "px";
    barre.style.left = x + window.scrollX + "px";
  }

  function surSelection() {
    const sel = window.getSelection();
    // En mode page le menu vient d'etre ouvert au doigt ou a la souris :
    // l'absence de selection est normale et ne doit pas le refermer.
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return ancrage ? fermer() : undefined;

    const plage = sel.getRangeAt(0);
    if (!zone.contains(plage.commonAncestorContainer)) return ancrage ? fermer() : undefined;

    // Le livre est ecrit en hard_wrap : une selection de deux lignes contient
    // des retours a la ligne. On les ecrase, sinon l'ancre et la citation
    // partent avec.
    const texte = sel.toString().replace(/\s+/g, " ").trim();
    if (texte.length < 12) return fermer(); // un mot attrape par erreur

    passage = texte;
    ancrage = true;
    majCanaux();
    placer(plage.getBoundingClientRect());
  }

  // mouseup plutot que selectionchange : selectionchange part a chaque
  // caractere pendant qu'on glisse, et la barre sauterait sous le curseur.
  document.addEventListener("mouseup", () => setTimeout(surSelection, 10));
  document.addEventListener("touchend", () => setTimeout(surSelection, 10));

  // Cliquer la barre ne doit pas effacer la selection qu'elle sert.
  barre.addEventListener("mousedown", (e) => e.preventDefault());

  ouvrir.addEventListener("click", function () {
    rangee.hidden = true;
    canaux.hidden = false;
    rangee.dataset.etat = "ouvert";
  });

  barre.querySelector('[data-canal="copier"]').addEventListener("click", function () {
    const bouton = this;
    const libelle = bouton.textContent;
    const dit = () => {
      bouton.textContent = barre.dataset.copie;
      setTimeout(() => {
        bouton.textContent = libelle;
        fermer();
      }, 1200);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texteComplet()).then(dit, dit);
      return;
    }
    // Safari ancien et pages servies sans HTTPS : le presse-papier moderne
    // n'existe pas, on repasse par un champ hors ecran.
    const champ = document.createElement("textarea");
    champ.value = texteComplet();
    champ.style.position = "fixed";
    champ.style.opacity = "0";
    document.body.appendChild(champ);
    champ.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(champ);
    dit();
  });

  canaux.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setTimeout(fermer, 50)));

  // Le partage de la page saute l'etape du bouton « Partager » : cliquer
  // l'icone est deja l'intention, il n'y a pas de raison de la redemander.
  if (boutonPage) {
    boutonPage.addEventListener("click", function (e) {
      e.stopPropagation(); // sinon le clic ferme ce qu'il vient d'ouvrir
      if (!canaux.hidden && !ancrage) return fermer(); // deuxieme clic
      passage = boutonPage.dataset.partagePage;
      ancrage = false;
      majCanaux();
      rangee.hidden = true;
      canaux.hidden = false;
      boutonPage.setAttribute("aria-expanded", "true");
      placer(boutonPage.getBoundingClientRect());
    });
  }

  // Le mode passage se referme au mouseup suivant. Le menu de page, lui,
  // reste ouvert jusqu'a un clic ailleurs.
  document.addEventListener("click", function (e) {
    if (ancrage) return;
    if (barre.contains(e.target)) return;
    fermer();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fermer();
  });
  window.addEventListener("scroll", fermer, { passive: true });
})();
