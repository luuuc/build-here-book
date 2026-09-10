function toggleMenu() {
  const offcanvas = document.getElementById("offcanvas");
  const overlay = document.getElementById("overlay");

  if (offcanvas.classList.contains("open")) {
    offcanvas.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  } else {
    offcanvas.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
    centerCurrentEntry(offcanvas);
  }
}

// Le sommaire fait près de 4 000 px pour 98 entrées. À l'ouverture, on amène
// l'entrée courante au milieu du panneau.
//
// Deux précautions. On attend la fin de la transition `left` du panneau :
// avant, il est encore hors écran et la position est calculée sur des
// coordonnées fausses. Et pas de défilement animé — sur cette distance il
// donne le mal de mer, et le lecteur vient de demander à voir le sommaire,
// pas à le regarder défiler.
function centerCurrentEntry(offcanvas) {
  const current = offcanvas.querySelector('[aria-current="page"]');
  if (!current) return; // accueil, à propos : pas d'entrée courante

  let done = false;
  const center = () => {
    if (done) return;
    done = true;
    // Par rectangles plutot que par offsetTop : l'element courant a des
    // ancetres positionnes (le carre signal), donc offsetTop ne se compte
    // pas depuis le panneau.
    const rect = current.getBoundingClientRect();
    const panel = offcanvas.getBoundingClientRect();
    const top = rect.top - panel.top + offcanvas.scrollTop;
    offcanvas.scrollTop = Math.max(0, top - panel.height / 2 + rect.height / 2);
  };

  offcanvas.addEventListener("transitionend", center, { once: true });
  setTimeout(center, 400); // filet, si transitionend ne part pas
}

// Close menu when clicking on a link
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const offcanvas = document.getElementById("offcanvas");
      if (offcanvas.classList.contains("open")) {
        toggleMenu();
      }
    }
  });
});

// Smooth scrolling for anchor links.
// Uses getElementById rather than querySelector: kramdown gives footnotes ids
// like "fn:adams", and "#fn:adams" is not a valid CSS selector.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = decodeURIComponent(this.getAttribute("href").slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#" + id);
    });
  });
});
