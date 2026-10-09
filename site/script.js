const siteConfig = {
  contact: {
    whatsappNumber: "",
    phone: "",
    address: "",
    hours: "",
    instagram: "",
  },
  ctaFallbackTarget: "#contato",
};

const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const year = document.querySelector("[data-current-year]");
const form = document.querySelector("[data-contact-form]");
const formFeedback = document.querySelector("[data-form-feedback]");

if (year) {
  year.textContent = new Date().getFullYear();
}

function closeMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("is-open");
  document.body.classList.remove("is-menu-open");
}

function openMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", "true");
  mobileMenu.classList.add("is-open");
  document.body.classList.add("is-menu-open");
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

if (form && formFeedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const interest = String(data.get("interest") || "").trim();

    if (!name || !interest) {
      formFeedback.textContent = "Informe seu nome e o interesse para preparar a mensagem.";
      return;
    }

    if (siteConfig.contact.whatsappNumber) {
      const message = encodeURIComponent(
        `Olá, sou ${name}. Tenho interesse em ${interest} na Garra Academia.`
      );
      window.location.href = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${message}`;
      return;
    }

    formFeedback.textContent =
      "Mensagem preparada. Configure o WhatsApp oficial no arquivo script.js para ativar o envio.";
  });
}
