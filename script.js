/* =====================================================
   DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================= */
  const body = document.body;
  const navbar = document.querySelector(".navbar");
  const loader = document.querySelector(".loader");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");

  /* =========================
     LOADER (SMOOTH FADE)
  ========================= */
  window.addEventListener("load", () => {
    if (!loader) return;
    loader.classList.add("loader-hide");
  });

  /* =========================
     SCROLL PERFORMANCE (THROTTLE)
  ========================= */
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    if (Math.abs(window.scrollY - lastScroll) < 5) return;
    lastScroll = window.scrollY;

    /* Navbar shadow */
    navbar?.classList.toggle("navbar-scrolled", window.scrollY > 50);

    /* Active nav link */
    setActiveNav();
  });

  /* =========================
     MOBILE MENU
  ========================= */
  menuToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks?.classList.remove("active");
      menuToggle?.classList.remove("open");
    });
  });

  /* =========================
     SMOOTH SCROLL (NATIVE)
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* =========================
     ACTIVE NAV LINK
  ========================= */
  const sections = [...document.querySelectorAll("section")];
  const navItems = document.querySelectorAll(".nav-links a");

  function setActiveNav() {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) {
        current = section.id;
      }
    });

    navItems.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  /* =========================
     SCROLL REVEAL (PREMIUM)
  ========================= */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(".event-card, .feature-card, .cta-section")
    .forEach(el => {
      el.classList.add("reveal-hidden");
      revealObserver.observe(el);
    });

  /* =========================
     DARK MODE (SMOOTH)
  ========================= */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

});














/* =======================
   PREMIUM FLIP + HOVER FX
======================= */

document.querySelectorAll(".event-flip-card").forEach(card => {
  const inner = card.querySelector(".event-flip-inner");

  let hoverTimer = null;
  let isFlipped = false;
  let isAnimating = false;

  const FLIP_DURATION = 900; // sync with CSS
  const HOVER_DELAY = 140;

  // ---------- HOVER ENTER ----------
  card.addEventListener("mouseenter", () => {
    if (isAnimating || isFlipped) return;

    hoverTimer = setTimeout(() => {
      isAnimating = true;
      isFlipped = true;

      inner.style.transition =
        "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
      inner.style.transform = "rotateY(180deg)";

      setTimeout(() => (isAnimating = false), FLIP_DURATION);
    }, HOVER_DELAY);
  });

  // ---------- HOVER LEAVE ----------
  card.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    if (isAnimating || !isFlipped) return;

    isAnimating = true;
    isFlipped = false;

    inner.style.transition =
      "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)";
    inner.style.transform = "rotateY(0deg)";

    setTimeout(() => (isAnimating = false), FLIP_DURATION);
  });

  // ---------- MICRO TILT (DEPTH) ----------
  card.addEventListener("mousemove", e => {
    if (!isFlipped || isAnimating) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (-y / rect.height) * 6;
    const tiltY = (x / rect.width) * 6;

    inner.style.transform =
      `rotateY(180deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  // ---------- RESET TILT ----------
  card.addEventListener("mouseleave", () => {
    if (!isFlipped) return;
    inner.style.transform = "rotateY(180deg)";
  });

  // ---------- MOBILE TAP ----------
  card.addEventListener("click", () => {
    if (isAnimating) return;

    isAnimating = true;
    isFlipped = !isFlipped;

    inner.style.transition =
      "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)";
    inner.style.transform = isFlipped ? "rotateY(180deg)" : "rotateY(0deg)";

    setTimeout(() => (isAnimating = false), FLIP_DURATION);
  });
});
