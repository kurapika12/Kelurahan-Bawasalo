/* =========================================================
   Kelurahan Bawasalo - script.js
   Vanilla JS untuk seluruh interaksi website
   ========================================================= */

// ---------- Loading screen ----------
window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader").classList.add("hidden"),
    500,
  );
});

// ---------- AOS ----------
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) AOS.init({ duration: 800, once: true, offset: 80 });
});

// ---------- Navbar scroll behaviour ----------
const navbar = document.getElementById("navbar");
const scrollTop = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
  if (window.scrollY > 400) scrollTop.classList.add("show");
  else scrollTop.classList.remove("show");
  // Active nav link based on section in view
  document.querySelectorAll("section[id]").forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top && window.scrollY < top + sec.offsetHeight) {
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) link.classList.add("active");
    }
  });
});

scrollTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
document
  .querySelectorAll("#mobileMenu a")
  .forEach((a) =>
    a.addEventListener("click", () => mobileMenu.classList.remove("open")),
  );

// ---------- Counter animation ----------
const counters = document.querySelectorAll(".counter");
const runCounter = (el) => {
  const target = +el.dataset.target;
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(p * target).toLocaleString("id-ID");
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        runCounter(en.target);
        counterObs.unobserve(en.target);
      }
    });
  },
  { threshold: 0.4 },
);
counters.forEach((c) => counterObs.observe(c));

// ---------- FAQ Accordion ----------
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    document.querySelectorAll(".faq-item").forEach((i) => {
      if (i !== item) i.classList.remove("open");
    });
    item.classList.toggle("open");
  });
});

// ---------- Berita search & filter ----------
const searchInput = document.getElementById("searchBerita");
const filterBtns = document.querySelectorAll(".filter-btn");
const beritaCards = document.querySelectorAll(".berita-card");
let currentCat = "semua";

function applyBeritaFilter() {
  const q = (searchInput?.value || "").toLowerCase();
  beritaCards.forEach((c) => {
    const cat = c.dataset.category;
    const text = c.textContent.toLowerCase();
    const okCat = currentCat === "semua" || cat === currentCat;
    const okQ = text.includes(q);
    c.style.display = okCat && okQ ? "" : "none";
  });
}
searchInput?.addEventListener("input", applyBeritaFilter);
filterBtns.forEach((b) =>
  b.addEventListener("click", () => {
    filterBtns.forEach((x) => x.classList.remove("bg-blue-600", "text-white"));
    b.classList.add("bg-blue-600", "text-white");
    currentCat = b.dataset.cat;
    applyBeritaFilter();
  }),
);

// ---------- Swiper (UMKM) ----------
if (window.Swiper) {
  new Swiper(".umkm-swiper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 16,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".umkm-pagination",
      clickable: true,
    },

    breakpoints: {
      0: {
        slidesPerView: 1.15,
      },
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

// ---------- Chart.js visualisasi ----------
if (window.Chart) {
  Chart.defaults.font.family = "Poppins";
  Chart.defaults.color = "#64748B";

  const genderCtx = document.getElementById("genderChart");
  if (genderCtx)
    new Chart(genderCtx, {
      type: "doughnut",
      data: {
        labels: ["Laki-laki", "Perempuan"],
        datasets: [
          {
            data: [1240, 1310],
            backgroundColor: ["#2563EB", "#10B981"],
            borderWidth: 0,
          },
        ],
      },
      options: { plugins: { legend: { position: "bottom" } }, cutout: "65%" },
    });

  const eduCtx = document.getElementById("eduChart");
  if (eduCtx)
    new Chart(eduCtx, {
      type: "bar",
      data: {
        labels: ["SD", "SMP", "SMA", "D3", "S1", "S2"],
        datasets: [
          {
            label: "Jumlah",
            data: [520, 410, 680, 120, 210, 25],
            backgroundColor: "#2563EB",
            borderRadius: 8,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });

  const jobCtx = document.getElementById("jobChart");
  if (jobCtx)
    new Chart(jobCtx, {
      type: "polarArea",
      data: {
        labels: ["Petani", "Nelayan", "PNS", "Wiraswasta", "Lainnya"],
        datasets: [
          {
            data: [420, 260, 90, 380, 250],
            backgroundColor: [
              "#2563EB",
              "#3B82F6",
              "#60A5FA",
              "#10B981",
              "#94A3B8",
            ],
          },
        ],
      },
      options: { plugins: { legend: { position: "bottom" } } },
    });

  const relCtx = document.getElementById("relChart");
  if (relCtx)
    new Chart(relCtx, {
      type: "pie",
      data: {
        labels: ["Islam", "Kristen", "Katolik", "Hindu", "Budha"],
        datasets: [
          {
            data: [2480, 40, 15, 8, 7],
            backgroundColor: [
              "#2563EB",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#8B5CF6",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: { plugins: { legend: { position: "bottom" } } },
    });
}
