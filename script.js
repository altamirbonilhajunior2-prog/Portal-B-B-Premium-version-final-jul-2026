const galleries = {
  casa: [
    "galeria/foto-casa-00-fachada-principal.png",
    "galeria/foto-casa-08.jpg",
    "galeria/foto-casa-45.jpg",
    "galeria/foto-casa-48.jpg",
    "galeria/foto-casa-10.jpg",
    "galeria/foto-casa-02.jpg",
    "galeria/foto-casa-19.jpg",
    "galeria/foto-casa-03.jpg",
    "galeria/foto-casa-04.jpg",
    "galeria/foto-casa-28.jpg",
    "galeria/foto-casa-09.jpg",
    "galeria/foto-casa-13.jpg",
    "galeria/foto-casa-17.jpg",
    "galeria/foto-casa-26.jpg",
    "galeria/foto-casa-27.jpg",
    "galeria/foto-casa-12.jpg",
    "galeria/foto-casa-14.jpg",
    "galeria/foto-casa-15.jpg",
    "galeria/foto-casa-25.jpg",
    "galeria/foto-casa-21.jpg",
    "galeria/foto-casa-41.jpg",
    "galeria/foto-casa-46.jpg",
    "galeria/foto-casa-47.jpg",
    "galeria/foto-casa-01.jpg",
    "galeria/foto-casa-05.jpg",
    "galeria/foto-casa-06.jpg",
    "galeria/foto-casa-11.jpg",
    "galeria/foto-casa-23.jpg",
    "galeria/foto-casa-24.jpg",
    "galeria/foto-casa-34.jpg",
    "galeria/foto-casa-38.jpg",
    "galeria/foto-casa-33.jpg",
    "galeria/foto-casa-35.jpg",
    "galeria/foto-casa-36.jpg",
    "galeria/foto-casa-07.jpg",
    "galeria/foto-casa-29.jpg",
    "galeria/foto-casa-30.jpg",
    "galeria/foto-casa-37.jpg",
    "galeria/foto-casa-39.jpg",
    "galeria/foto-casa-40.jpg",
    "galeria/foto-casa-42.jpg",
    "galeria/foto-casa-43.jpg",
    "galeria/foto-casa-44.jpg",
    "galeria/foto-casa-31.jpg",
    "galeria/foto-casa-32.jpg",
    "galeria/foto-casa-16.jpg",
    "galeria/foto-casa-18.jpg",
    "galeria/foto-casa-20.jpg",
    "galeria/foto-casa-22.jpg"
  ],
  clube: Array.from(
    { length: 14 },
    (_, index) => `assets/clube/clube-${String(index + 1).padStart(2, "0")}.jpg`
  )
};

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupLightbox();
  setupWhatsAppTracking();
});

function setupMobileMenu() {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-header .nav");
  const toggle = document.querySelector(".menu-toggle");

  if (!nav || !toggle) return;

  const setMenuState = (open) => {
    document.body.classList.toggle("mobile-menu-open", open);
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };

  setMenuState(false);

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuState(!document.body.classList.contains("mobile-menu-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("mobile-menu-open")) return;
    if (header?.contains(event.target)) return;
    setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) setMenuState(false);
  });
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-img");
  const count = document.getElementById("lightbox-count");
  const closeButton = document.querySelector(".lightbox-close");
  const previousButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  if (!lightbox || !image || !count || !closeButton || !previousButton || !nextButton) return;

  let currentGallery = "casa";
  let currentIndex = 0;

  const render = () => {
    const items = galleries[currentGallery];
    image.src = items[currentIndex];
    image.alt = `Foto ampliada ${currentIndex + 1} de ${items.length}`;
    count.textContent = `${currentIndex + 1} / ${items.length}`;
  };

  const open = (gallery, index) => {
    if (!galleries[gallery]) return;
    currentGallery = gallery;
    currentIndex = index;
    render();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  const close = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  };

  const move = (direction) => {
    const items = galleries[currentGallery];
    currentIndex = (currentIndex + direction + items.length) % items.length;
    render();
  };

  document.querySelectorAll(".photo-card").forEach((button) => {
    button.addEventListener("click", () => {
      open(button.dataset.gallery, Number(button.dataset.index));
    });
  });

  closeButton.addEventListener("click", close);
  previousButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") move(1);
    if (event.key === "ArrowLeft") move(-1);
  });
}

function setupWhatsAppTracking() {
  document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof window.gtag !== "function") return;

      const ctaLocation = link.dataset.ctaLocation || "nao_identificado";

      window.gtag("event", "generate_lead", {
        event_category: "WhatsApp",
        event_label: "Casa Alphaville II",
        cta_location: ctaLocation,
        link_url: link.href,
        transport_type: "beacon"
      });

      window.gtag("event", "whatsapp_click", {
        property_name: "Casa Alphaville II",
        cta_location: ctaLocation,
        transport_type: "beacon"
      });

      window.gtag("event", "conversion", {
        send_to: "AW-18217048699/fHmNCKmp2rkcEPu0yO5D",
        value: 1.0,
        currency: "BRL",
        transport_type: "beacon"
      });
    });
  });
}
