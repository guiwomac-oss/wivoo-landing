/* =============================================
   WIVOO — Interactions et animations
   JavaScript vanilla — pas de framework
   Dernière mise à jour : 27/05/2026
============================================== */

/* ---- 1. Menu mobile : ouvrir / fermer ---- */
(function () {
  var burger = document.getElementById('navBurger');
  var links  = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Ferme le menu quand on clique sur un lien */
  links.querySelectorAll('a').forEach(function (link) {
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


/* ---- 3. Apparition des éléments au scroll (fade-in) ---- */
(function () {
  /* Cible : sections entières et cartes */
  var targets = document.querySelectorAll(
    '.expertise__card, .rex__card, .chiffre__item, .rejoindre__arg, ' +
    '.section__header, .hero__container, .rejoindre__inner, .footer__container'
  );

  targets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  /* Décalage progressif pour les grilles */
  document.querySelectorAll('.expertises__grid .expertise__card').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
  document.querySelectorAll('.chiffres__grid .chiffre__item').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.07) + 's';
  });
  document.querySelectorAll('.rex__grid .rex__card').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.07) + 's';
  });
  document.querySelectorAll('.rejoindre__args .rejoindre__arg').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  /* Observer les éléments et les révéler quand ils entrent dans le viewport */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); /* Ne se répète pas */
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback pour anciens navigateurs : tout afficher */
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();


/* ---- 4. Filtrage des fiches REX par domaine ---- */
(function () {
  var filters = document.querySelectorAll('.rex__filter');
  var cards   = document.querySelectorAll('.rex__card');
  if (!filters.length || !cards.length) return;

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      /* Mettre à jour le bouton actif */
      filters.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var selected = btn.dataset.filter;

      /* Afficher / masquer les cartes selon le domaine */
      cards.forEach(function (card) {
        if (selected === 'all' || card.dataset.domain === selected) {
          card.classList.remove('is-hidden');
          /* Relancer le fade-in si la carte était masquée */
          setTimeout(function () {
            card.classList.add('is-visible');
          }, 10);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
})();
