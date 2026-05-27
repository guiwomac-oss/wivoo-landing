/* =============================================
   WIVOO — Interactions et animations
   JavaScript vanilla — pas de framework
============================================== */

/* ---- Menu mobile : ouvrir / fermer ---- */
(function () {
  const burger = document.querySelector('.nav__burger');
  const links  = document.querySelector('.nav__links');

  if (!burger || !links) return;

  burger.addEventListener('click', function () {
    const isOpen = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Ferme le menu quand on clique sur un lien
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---- Navigation : fond légèrement opaque au scroll ---- */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.25)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
})();
