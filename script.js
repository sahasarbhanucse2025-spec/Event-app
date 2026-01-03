/* =====================================================
   DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     LOADER
  ========================= */
  const loader = document.querySelector(".loader");
  window.addEventListener("load", () => {
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", 400);
    }
  });

  /* =========================
     NAVBAR SCROLL EFFECT
  ========================= */
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,0.35)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

  /* =========================
     MOBILE MENU TOGGLE
  ========================= */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  /* Close menu on link click (mobile) */
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  /* =========================
     SMOOTH SCROLL
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* =========================
     ACTIVE NAV LINK ON SCROLL
  ========================= */
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("class");
      }
    });

    navItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href")?.includes(current)) {
        link.classList.add("active");
      }
    });
  });

  /* =========================
     SCROLL REVEAL (LIGHTWEIGHT)
  ========================= */
  const revealElements = document.querySelectorAll(
    ".event-card, .feature-card, .cta-section"
  );

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s ease";
    revealObserver.observe(el);
  });

});



/* =========================
   DARK MODE TOGGLE
========================= */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
