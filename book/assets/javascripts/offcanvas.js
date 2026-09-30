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

// Scroll the current card to the middle of the menu. Waits for the slide-in
// transition, or the position is computed off-screen. No smooth scroll: too long.
function centerCurrentEntry(offcanvas) {
  const current = offcanvas.querySelector('[aria-current="page"]');
  if (!current) return; // pages that aren't cards

  let done = false;
  const center = () => {
    if (done) return;
    done = true;
    // Not offsetTop: the entry has positioned ancestors, so it isn't relative to the panel.
    const rect = current.getBoundingClientRect();
    const panel = offcanvas.getBoundingClientRect();
    const top = rect.top - panel.top + offcanvas.scrollTop;
    offcanvas.scrollTop = Math.max(0, top - panel.height / 2 + rect.height / 2);
  };

  offcanvas.addEventListener("transitionend", center, { once: true });
  setTimeout(center, 400); // fallback if transitionend never fires
}

document.addEventListener("DOMContentLoaded", function () {
  // No inline onclick: the CSP blocks it.
  document.querySelectorAll("[data-toggle-menu]").forEach((el) => {
    el.addEventListener("click", () => toggleMenu());
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const offcanvas = document.getElementById("offcanvas");
      if (offcanvas.classList.contains("open")) {
        toggleMenu();
      }
    }
  });
});

// Smooth scroll for anchor links. getElementById, not querySelector: kramdown
// footnote ids like "fn:adams" are not valid CSS selectors.
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

// Header dropdowns (language, download). "Send to Kindle" downloads the EPUB and
// opens Amazon's send page: there is no API to push a file to a Kindle.
document.addEventListener("DOMContentLoaded", function () {
  const menus = [...document.querySelectorAll(".header .download")].map(function (box) {
    return { toggle: box.querySelector(".download-toggle"), menu: box.querySelector(".download-menu") };
  });

  function close(m) {
    m.menu.hidden = true;
    m.toggle.setAttribute("aria-expanded", "false");
  }

  menus.forEach(function (m) {
    m.toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const opening = m.menu.hidden;
      menus.forEach(close);
      m.menu.hidden = !opening;
      m.toggle.setAttribute("aria-expanded", String(opening));
    });
  });

  document.addEventListener("click", function (e) {
    menus.forEach(function (m) {
      if (!m.menu.hidden && !m.menu.contains(e.target)) close(m);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") menus.forEach(close);
  });

  const kindle = document.querySelector(".download-menu [data-kindle]");
  if (kindle) {
    kindle.addEventListener("click", function () {
      window.open(kindle.dataset.kindle, "_blank", "noopener");
      menus.forEach(close);
    });
  }
});
