/* =============================================
   WIVOO — Filtres multi-critères
   Page realisations.html
   Dernière mise à jour : 28/05/2026
============================================== */

(function () {
  /* État actuel des filtres */
  var activeFilters = {
    expertise: 'all',
    secteur:   'all',
    format:    'all',
    type:      'all'
  };

  var cards        = document.querySelectorAll('.case-card');
  var resetBtn     = document.getElementById('filtersReset');
  var countEl      = document.getElementById('resultsCount');
  var noResultsEl  = document.getElementById('noResults');
  var dropdowns    = document.querySelectorAll('.filter-dropdown');

  /* ---- Ouvrir / fermer les dropdowns ---- */
  dropdowns.forEach(function (dd) {
    var btn  = dd.querySelector('.filter-dropdown__btn');
    var menu = dd.querySelector('.filter-dropdown__menu');
    if (!btn || !menu) return;

    /* Ouvrir au clic sur le bouton */
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = dd.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));

      /* Ferme les autres dropdowns */
      dropdowns.forEach(function (other) {
        if (other !== dd) {
          other.classList.remove('is-open');
          var otherBtn = other.querySelector('.filter-dropdown__btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    /* Sélection d'une option */
    menu.querySelectorAll('.filter-dropdown__option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        /* Dé-sélectionner toutes les options de ce dropdown */
        menu.querySelectorAll('.filter-dropdown__option').forEach(function (o) {
          o.classList.remove('is-selected');
        });
        opt.classList.add('is-selected');

        /* Identifier quel filtre c'est */
        var filterKey = dd.id.replace('dd-', '');
        var filterVal = opt.dataset.value;
        activeFilters[filterKey] = filterVal;

        /* Mettre à jour le label du bouton */
        btn.innerHTML = (filterVal === 'all'
          ? btn.innerHTML.replace(/^[^<]+/, getLabelForKey(filterKey) + ' ')
          : opt.textContent + ' ') + '<span class="filter-dropdown__arrow">▾</span>';

        /* Style actif du bouton */
        btn.classList.toggle('has-selection', filterVal !== 'all');

        /* Fermer le dropdown */
        dd.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');

        applyFilters();
      });
    });
  });

  /* Ferme tous les dropdowns au clic hors */
  document.addEventListener('click', function () {
    dropdowns.forEach(function (dd) {
      dd.classList.remove('is-open');
      var btn = dd.querySelector('.filter-dropdown__btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Application des filtres ---- */
  function applyFilters () {
    var visible = 0;

    cards.forEach(function (card) {
      var matchExpertise = matches(card.dataset.expertise, activeFilters.expertise);
      var matchSecteur   = matches(card.dataset.secteur,   activeFilters.secteur);
      var matchFormat    = matches(card.dataset.format,    activeFilters.format);
      var matchType      = matches(card.dataset.type,      activeFilters.type);

      if (matchExpertise && matchSecteur && matchFormat && matchType) {
        card.classList.remove('is-hidden');
        visible++;
      } else {
        card.classList.add('is-hidden');
      }
    });

    /* Mise à jour du compteur */
    if (countEl) {
      countEl.textContent = visible + (visible <= 1 ? ' résultat' : ' résultats');
    }

    /* Afficher le message "aucun résultat" */
    if (noResultsEl) {
      noResultsEl.classList.toggle('is-visible', visible === 0);
    }

    /* Afficher/masquer le bouton reset */
    var hasActiveFilter = Object.values(activeFilters).some(function (v) { return v !== 'all'; });
    if (resetBtn) resetBtn.classList.toggle('is-visible', hasActiveFilter);
  }

  /* Vérifie si la valeur du dataset correspond au filtre actif */
  function matches (dataValue, filterValue) {
    if (!filterValue || filterValue === 'all') return true;
    if (!dataValue) return false;
    /* Gère les valeurs multiples séparées par espace (ex: "ai data") */
    return dataValue.split(' ').indexOf(filterValue) !== -1;
  }

  /* Labels par défaut des dropdowns */
  function getLabelForKey (key) {
    var labels = {
      expertise: 'Expertise',
      secteur:   'Secteur',
      format:    'Format',
      type:      'Type de produit'
    };
    return labels[key] || key;
  }

  /* ---- Reset ---- */
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      /* Réinitialiser l'état */
      Object.keys(activeFilters).forEach(function (k) { activeFilters[k] = 'all'; });

      /* Réinitialiser les boutons */
      dropdowns.forEach(function (dd) {
        var filterKey = dd.id.replace('dd-', '');
        var btn  = dd.querySelector('.filter-dropdown__btn');
        var menu = dd.querySelector('.filter-dropdown__menu');

        if (btn) {
          btn.innerHTML = getLabelForKey(filterKey) + ' <span class="filter-dropdown__arrow">▾</span>';
          btn.classList.remove('has-selection');
        }

        if (menu) {
          menu.querySelectorAll('.filter-dropdown__option').forEach(function (o, i) {
            o.classList.toggle('is-selected', i === 0);
          });
        }
      });

      applyFilters();
    });
  }
})();
