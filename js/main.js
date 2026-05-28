/* =============================================
   WIVOO — Interactions communes
   JavaScript vanilla — pas de framework
   Dernière mise à jour : 28/05/2026
============================================== */

/* ---- 1. Menu mobile : burger ---- */
(function () {
  var burger = document.getElementById('navBurger');
  var links  = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Ferme le menu quand on clique sur un lien direct (pas les dropdowns) */
  links.querySelectorAll('a:not(.nav__item.has-dropdown > a)').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---- 2. Navigation : ombre au scroll ---- */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 40
      ? '0 2px 20px rgba(0,0,0,0.35)'
      : 'none';
  }, { passive: true });
})();

/* ---- 3. Fade-in au scroll (IntersectionObserver) ---- */
(function () {
  var targets = document.querySelectorAll(
    '.expertise__card, .rex__card, .case-card, .chiffre__item, ' +
    '.rejoindre__arg, .section__header, .hero__container, ' +
    '.rejoindre__inner, .footer__container, .kpi-band, ' +
    '.consultant-block, .client-quote'
  );

  targets.forEach(function (el) { el.classList.add('fade-in'); });

  /* Décalage en cascade pour les grilles */
  var grids = [
    '.expertises__grid .expertise__card',
    '.chiffres__grid .chiffre__item',
    '.rex__grid .rex__card',
    '.cases-grid .case-card',
    '.rejoindre__args .rejoindre__arg',
    '.related-articles__grid .mini-card'
  ];

  grids.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.style.transitionDelay = (i * 0.07) + 's';
    });
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(function (el) { observer.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();

/* ---- 4. Filtrage simple (index.html — si présent) ---- */
(function () {
  var filters = document.querySelectorAll('.rex__filter');
  var cards   = document.querySelectorAll('.rex__card');
  if (!filters.length || !cards.length) return;

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var selected = btn.dataset.filter;

      cards.forEach(function (card) {
        if (selected === 'all' || card.dataset.domain === selected) {
          card.classList.remove('is-hidden');
          setTimeout(function () { card.classList.add('is-visible'); }, 10);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
})();
