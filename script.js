/* ============================================
   NIDO — script.js
   ============================================ */

'use strict';

/* -----------------------------------------------
   DATA — Property details for modal
----------------------------------------------- */
const properties = [
  {
    img: 'img/prop-1.jpg',
    badge: 'Bilocale',
    title: 'Bilocale luminoso al centro',
    location: '📍 Napoli, Vomero',
    price: '€ 185.000',
    desc: 'Splendido bilocale al quinto piano con ascensore, in ottime condizioni. Doppia esposizione, cucina abitabile e ampio soggiorno con parquet. Ideale per una giovane coppia.',
    details: ['🛏 2 camere', '🛁 1 bagno', '📐 65 m²', '🏢 5° piano', '🅿️ Posto auto', '🌡 Riscaldamento centralizzato'],
  },
  {
    img: 'img/prop-2.jpg',
    badge: 'Trilocale',
    title: 'Trilocale con terrazza panoramica',
    location: '📍 Napoli, Posillipo',
    price: '€ 310.000',
    desc: 'Elegante trilocale con terrazza di 25 mq e vista mozzafiato sul golfo di Napoli. Completamente ristrutturato con materiali di pregio. Attualmente non disponibile.',
    details: ['🛏 3 camere', '🛁 2 bagni', '📐 92 m²', '🌅 Terrazza 25 m²', '🅿️ Box auto', '🔒 Portiere h24'],
  },
  {
    img: 'img/prop-3.jpg',
    badge: 'Attico',
    title: 'Attico con vista mare',
    location: '📍 Napoli, Chiaia',
    price: '€ 520.000',
    desc: 'Attico esclusivo di 130 mq al piano più alto di un elegante palazzo d\'epoca. Doppia terrazza, cucina open space, tre camere e due bagni con finiture di lusso.',
    details: ['🛏 4 camere', '🛁 2 bagni', '📐 130 m²', '🌅 2 terrazze', '🅿️ 2 Box auto', '🏊 Uso piscina condominiale'],
  },
  {
    img: 'img/prop-4.jpg',
    badge: 'Bilocale',
    title: 'Bilocale ristrutturato con balcone',
    location: '📍 Napoli, Fuorigrotta',
    price: '€ 162.000',
    desc: 'Bilocale completamente ristrutturato nel 2023. Cucina nuova, bagno con box doccia, pavimenti in gres porcellanato e impianto di climatizzazione.',
    details: ['🛏 2 camere', '🛁 1 bagno', '📐 58 m²', '🌿 Balcone 6 m²', '🅿️ Posto auto', '🏢 2° piano'],
  },
  {
    img: 'img/prop-5.jpg',
    badge: 'Trilocale',
    title: 'Trilocale in residence con giardino',
    location: '📍 Pozzuoli, Rione Toiano',
    price: '€ 228.000',
    desc: 'Appartamento in residence privato con giardino condominiale, piscina e area barbecue. Perfetto per chi vuole vivere in un contesto tranquillo e verde, a soli 20 minuti dal centro.',
    details: ['🛏 3 camere', '🛁 1 bagno', '📐 80 m²', '🌿 Giardino comune', '🅿️ 2 posti auto', '🏊 Piscina in residence'],
  },
  {
    img: 'img/prop-6.jpg',
    badge: 'Attico',
    title: 'Attico duplex in nuova costruzione',
    location: '📍 Napoli, Bagnoli',
    price: '€ 395.000',
    desc: 'Nuovissimo attico su due livelli nella zona più rinnovata di Napoli. Classe energetica A, domotica integrata, terrazza roof-top di 40 mq e finiture selezionate.',
    details: ['🛏 3 camere', '🛁 2 bagni', '📐 110 m²', '🌅 Roof-top 40 m²', '🅿️ Box auto', '⚡ Classe A'],
  },
];


/* -----------------------------------------------
   NAV — sticky + blur on scroll
----------------------------------------------- */
const nav = document.getElementById('nav');

const handleNavScroll = () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();


/* -----------------------------------------------
   MOBILE MENU — burger toggle
----------------------------------------------- */
const burger = document.getElementById('burger');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = document.querySelectorAll('.mobile-nav__link');

const openMenu = () => {
  burger.classList.add('active');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  burger.classList.remove('active');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
};

burger.addEventListener('click', () => {
  if (mobileOverlay.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});


/* -----------------------------------------------
   REVEAL on scroll — IntersectionObserver
----------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));


/* -----------------------------------------------
   SIDEBAR FILTER SYSTEM
----------------------------------------------- */
const filterSidebarEl = document.getElementById('filterSidebar');
const filterToggleBtn = document.getElementById('filterToggle');
const filterCloseBtn = document.getElementById('filterClose');
const filterResetBtn = document.getElementById('filterReset');
const filterOverlayEl = document.getElementById('filterOverlay');
const filterBadgeEl = document.getElementById('filterBadge');
const resultsCountEl = document.getElementById('resultsCount');
const activeFiltersEl = document.getElementById('activeFilters');
const noResultsEl = document.getElementById('noResults');

const filterLabels = {
  type:   { bilocale: 'Bilocale', trilocale: 'Trilocale', attico: 'Attico' },
  price:  { '0-200000': 'Fino a €200k', '200000-350000': '€200k–€350k', '350000-9999999': 'Oltre €350k' },
  mq:     { '0-70': 'Fino a 70 m²', '70-100': '70–100 m²', '100-9999': 'Oltre 100 m²' },
  rooms:  { '2': '2 camere', '3': '3 camere', '4': '4+ camere' },
  status: { disponibile: 'Disponibile', venduto: 'Venduto' },
  zone:   { 'napoli-centro': 'Napoli Centro', 'napoli-collina': 'Napoli Collina', 'napoli-periferia': 'Napoli Periferia', pozzuoli: 'Pozzuoli' },
};

function openFilterSidebar() {
  filterSidebarEl.classList.add('open');
  filterOverlayEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFilterSidebar() {
  filterSidebarEl.classList.remove('open');
  filterOverlayEl.classList.remove('open');
  document.body.style.overflow = '';
}

filterToggleBtn && filterToggleBtn.addEventListener('click', openFilterSidebar);
filterCloseBtn && filterCloseBtn.addEventListener('click', closeFilterSidebar);
filterOverlayEl && filterOverlayEl.addEventListener('click', closeFilterSidebar);

function getActiveFilters() {
  const filters = {};
  document.querySelectorAll('.filter-check input:checked').forEach(cb => {
    if (!filters[cb.name]) filters[cb.name] = [];
    filters[cb.name].push(cb.value);
  });
  return filters;
}

function cardMatchesFilters(card, filters) {
  for (const [key, values] of Object.entries(filters)) {
    if (!values.length) continue;
    if (key === 'price' || key === 'mq') {
      const cardVal = parseInt(card.dataset[key]);
      const match = values.some(v => {
        const [min, max] = v.split('-').map(Number);
        return cardVal >= min && cardVal <= max;
      });
      if (!match) return false;
    } else if (key === 'rooms') {
      const cardRooms = parseInt(card.dataset.rooms);
      const match = values.some(v => {
        const n = parseInt(v);
        return n === 4 ? cardRooms >= 4 : cardRooms === n;
      });
      if (!match) return false;
    } else {
      if (!values.includes(card.dataset[key])) return false;
    }
  }
  return true;
}

function applyFilters() {
  const filters = getActiveFilters();
  const cards = document.querySelectorAll('.property-card');
  let visible = 0;

  cards.forEach(card => {
    const show = cardMatchesFilters(card, filters);
    card.classList.toggle('hidden', !show);
    if (show) {
      card.classList.remove('visible');
      void card.offsetWidth;
      card.classList.add('visible');
      visible++;
    }
  });

  const total = cards.length;
  resultsCountEl.textContent = visible === total
    ? `${total} immobili trovati`
    : `${visible} di ${total} immobili`;

  noResultsEl.style.display = visible === 0 ? 'block' : 'none';

  const activeCount = Object.values(filters).flat().length;
  filterBadgeEl.textContent = activeCount;
  filterBadgeEl.style.display = activeCount > 0 ? 'inline-flex' : 'none';

  renderActiveFilterChips(filters);
}

function renderActiveFilterChips(filters) {
  activeFiltersEl.innerHTML = '';
  for (const [key, values] of Object.entries(filters)) {
    values.forEach(val => {
      const label = filterLabels[key]?.[val] || val;
      const chip = document.createElement('div');
      chip.className = 'active-filter-chip';
      chip.innerHTML = `${label}<button class="active-filter-chip__remove" data-name="${key}" data-value="${val}" aria-label="Rimuovi filtro">✕</button>`;
      activeFiltersEl.appendChild(chip);
    });
  }
  activeFiltersEl.querySelectorAll('.active-filter-chip__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const cb = document.querySelector(`.filter-check input[name="${btn.dataset.name}"][value="${btn.dataset.value}"]`);
      if (cb) { cb.checked = false; applyFilters(); }
    });
  });
}

function resetFilters() {
  document.querySelectorAll('.filter-check input:checked').forEach(cb => { cb.checked = false; });
  applyFilters();
}

document.querySelectorAll('.filter-check input').forEach(cb => {
  cb.addEventListener('change', applyFilters);
});

filterResetBtn && filterResetBtn.addEventListener('click', resetFilters);

applyFilters();


/* -----------------------------------------------
   MODAL
----------------------------------------------- */
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalLocation = document.getElementById('modalLocation');
const modalDesc = document.getElementById('modalDesc');
const modalDetails = document.getElementById('modalDetails');
const modalPrice = document.getElementById('modalPrice');

function openModal(index) {
  const p = properties[index];
  if (!p) return;

  modalImg.src = p.img;
  modalImg.alt = p.title;
  modalBadge.textContent = p.badge;
  modalTitle.textContent = p.title;
  modalLocation.textContent = p.location;
  modalDesc.textContent = p.desc;
  modalPrice.textContent = p.price;

  modalDetails.innerHTML = p.details
    .map(d => `<span>${d}</span>`)
    .join('');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


/* -----------------------------------------------
   INQUIRY FORM — fake submission
----------------------------------------------- */
const inquiryForm = document.getElementById('inquiryForm');
const inquirySuccess = document.getElementById('inquirySuccess');

inquiryForm && inquiryForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = inquiryForm.querySelector('button[type="submit"]');
  btn.textContent = 'Invio in corso...';
  btn.disabled = true;

  setTimeout(() => {
    btn.style.display = 'none';
    inquirySuccess.style.display = 'block';
    inquiryForm.reset();
    setTimeout(() => {
      btn.textContent = 'Invia la mia richiesta →';
      btn.disabled = false;
      btn.style.display = '';
      inquirySuccess.style.display = 'none';
    }, 5000);
  }, 1400);
});


/* -----------------------------------------------
   CONTACT FORM — fake submission
----------------------------------------------- */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Invio in corso...';
  btn.disabled = true;

  setTimeout(() => {
    btn.style.display = 'none';
    formSuccess.style.display = 'block';
    contactForm.reset();

    // Reset after 5 seconds
    setTimeout(() => {
      btn.textContent = 'Invia il messaggio ✉️';
      btn.disabled = false;
      btn.style.display = '';
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1400);
});


/* -----------------------------------------------
   SMOOTH SCROLL for nav links
----------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '64');
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* -----------------------------------------------
   ACTIVE NAV LINK on scroll (highlight current section)
----------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--terra)';
          }
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach(s => sectionObserver.observe(s));



/* -----------------------------------------------
   BACK TO TOP
----------------------------------------------- */
const backToTopBtn = document.getElementById('backToTop');
const aboutSection = document.getElementById('about');

function checkBackToTop() {
  if (!aboutSection || !backToTopBtn) return;
  const threshold = aboutSection.offsetTop + aboutSection.offsetHeight * 0.5;
  backToTopBtn.classList.toggle('visible', window.scrollY > threshold);
}

window.addEventListener('scroll', checkBackToTop, { passive: true });
checkBackToTop();

backToTopBtn && backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* -----------------------------------------------
   BOTTOM BAR — active link highlight
----------------------------------------------- */
const bottomBarItems = document.querySelectorAll('.bottom-bar__item[data-section]');

const bottomBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bottomBarItems.forEach(item => {
          item.classList.toggle('active', item.dataset.section === entry.target.id);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => bottomBarObserver.observe(s));


/* -----------------------------------------------
   STRIP COUNT-UP
----------------------------------------------- */
function countUp(el, target, suffix, duration) {
  const t0 = performance.now();
  (function step(now) {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

const stripStats = document.querySelector('.strip__stats');
if (stripStats) {
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting) return;
    stripStats.querySelectorAll('.strip__num').forEach(el => {
      countUp(el, +el.dataset.target, el.dataset.suffix, 1800);
    });
    obs.disconnect();
  }, { threshold: 0.5 }).observe(stripStats);
}
