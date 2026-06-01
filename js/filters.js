/* =============================================
   WIVOO — Filtres pills multi-sélection
   Page realisations.html — Option A + B
   - Option A : compteurs de résultats + pills grisées si vides
   - Option B : fond teinté + checkmark sur pills actives
   Logique : OR au sein de chaque dimension, AND entre dimensions
   Dernière mise à jour : 29/05/2026
============================================== */

(function () {

  /* ---- État des filtres ---- */
  var activeExpertise = new Set(['all']);
  var activeSecteur   = new Set(['all']);

  /* ---- Éléments DOM ---- */
  var cards       = document.querySelectorAll('.case-card');
  var resetBtn    = document.getElementById('filtersReset');
  var countEl     = document.getElementById('resultsCount');
  var noResultsEl = document.getElementById('noResults');

  /* ---- Mémoriser les labels originaux des pills (avant tout innerHTML) ---- */
  var pillLabels = new Map();
  document.querySelectorAll('.pill').forEach(function (pill) {
    pillLabels.set(pill, pill.textContent.trim());
  });

  /* ---- Brancher les clics sur les pills ---- */
  document.querySelectorAll('.pills-group').forEach(function (group) {
    var dimension = group.dataset.dimension;

    group.querySelectorAll('.pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        var value = pill.dataset.value;

        if (dimension === 'expertise') {
          togglePill(activeExpertise, value);
        } else if (dimension === 'secteur') {
          togglePill(activeSecteur, value);
        }

        syncPillStates(group, dimension === 'expertise' ? activeExpertise : activeSecteur);
        applyFilters();
        updateCounts();
        syncResetBtn();
      });
    });
  });

  /* ---- Logique de bascule dans un Set ---- */
  function togglePill (activeSet, value) {
    if (value === 'all') {
      activeSet.clear();
      activeSet.add('all');
      return;
    }
    activeSet.delete('all');
    if (activeSet.has(value)) {
      activeSet.delete(value);
      if (activeSet.size === 0) activeSet.add('all');
    } else {
      activeSet.add(value);
    }
  }

  /* ---- Synchronise l'état visuel (is-active) des pills d'un groupe ---- */
  function syncPillStates (group, activeSet) {
    group.querySelectorAll('.pill').forEach(function (p) {
      p.classList.toggle('is-active', activeSet.has(p.dataset.value));
    });
  }

  /* ---- Application des filtres sur les cards ---- */
  function applyFilters () {
    var visible = 0;

    cards.forEach(function (card) {
      var match = matchesDimension(card.dataset.expertise, activeExpertise) &&
                  matchesDimension(card.dataset.secteur,   activeSecteur);

      card.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });

    if (countEl) {
      countEl.textContent = visible + (visible <= 1 ? ' résultat' : ' résultats');
    }
    if (noResultsEl) {
      noResultsEl.classList.toggle('is-visible', visible === 0);
    }
  }

  /* ---- Vérifie si une card correspond à un Set de filtres (OR intra-dimension) ---- */
  function matchesDimension (dataValue, activeSet) {
    if (activeSet.has('all')) return true;
    if (!dataValue) return false;
    return dataValue.split(' ').some(function (v) { return activeSet.has(v); });
  }

  /* ============================================================
     Option A — Compteurs de résultats
     Pour chaque pill : nombre de cards qui matcheraient SI cette
     valeur était sélectionnée, compte tenu de l'autre dimension.
  ============================================================ */

  function updateCounts () {
    document.querySelectorAll('.pills-group').forEach(function (group) {
      var dimension = group.dataset.dimension;

      group.querySelectorAll('.pill').forEach(function (pill) {
        var value = pill.dataset.value;
        var label = pillLabels.get(pill);  /* label original, jamais altéré */
        var count = getCountForPill(dimension, value);

        /* Mettre à jour le texte : "Label · N" */
        pill.innerHTML = label + '<span class="pill__count"> · ' + count + '</span>';

        /* Griser si 0 résultat (jamais sur "Tous") */
        if (value !== 'all') {
          pill.classList.toggle('is-empty', count === 0);
        }
      });
    });
  }

  /* Compte les cards qui correspondraient à cette pill + l'autre dimension active */
  function getCountForPill (dimension, value) {
    var count = 0;

    cards.forEach(function (card) {
      var expertiseMatch, secteurMatch;

      if (dimension === 'expertise') {
        /* Pour les pills d'expertise : fixer cette valeur, garder le filtre secteur actuel */
        expertiseMatch = (value === 'all')
          ? true
          : matchesDimension(card.dataset.expertise, new Set([value]));
        secteurMatch = matchesDimension(card.dataset.secteur, activeSecteur);
      } else {
        /* Pour les pills de secteur : garder le filtre expertise actuel, fixer cette valeur */
        expertiseMatch = matchesDimension(card.dataset.expertise, activeExpertise);
        secteurMatch = (value === 'all')
          ? true
          : matchesDimension(card.dataset.secteur, new Set([value]));
      }

      if (expertiseMatch && secteurMatch) count++;
    });

    return count;
  }

  /* ---- Affiche/masque le bouton reset ---- */
  function syncResetBtn () {
    var hasFilter = !activeExpertise.has('all') || !activeSecteur.has('all');
    if (resetBtn) resetBtn.classList.toggle('is-visible', hasFilter);
  }

  /* ---- Reset complet ---- */
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      activeExpertise.clear(); activeExpertise.add('all');
      activeSecteur.clear();   activeSecteur.add('all');

      document.querySelectorAll('.pills-group').forEach(function (group) {
        var dimension = group.dataset.dimension;
        syncPillStates(group, dimension === 'expertise' ? activeExpertise : activeSecteur);
      });

      applyFilters();
      updateCounts();
      syncResetBtn();
    });
  }

  /* ---- Initialisation au chargement ---- */
  applyFilters();
  updateCounts();
  syncResetBtn();

})();
