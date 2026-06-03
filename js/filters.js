/* =============================================
   WIVOO — Filtres : pills expertise + dropdown secteur
   Page realisations.html
============================================== */

(function () {

  /* ---- État ---- */
  var activeExpertise = new Set(['all']);
  var activeSecteur   = new Set(['all']);

  /* ---- DOM ---- */
  var cards           = document.querySelectorAll('.case-card');
  var resetBtn        = document.getElementById('filtersReset');
  var countEl         = document.getElementById('resultsCount');
  var noResultsEl     = document.getElementById('noResults');
  var expertiseGroup  = document.querySelector('.pills-group[data-dimension="expertise"]');
  var secteurDropdown = document.getElementById('secteurDropdown');
  var secteurTrigger  = document.getElementById('secteurTrigger');
  var secteurMenu     = document.getElementById('secteurMenu');
  var triggerLabel    = secteurTrigger && secteurTrigger.querySelector('.secteur-trigger__label');

  /* ---- Labels originaux (avant que updateCounts les modifie) ---- */
  var pillLabels = new Map();
  if (expertiseGroup) {
    expertiseGroup.querySelectorAll('.pill').forEach(function (p) {
      pillLabels.set(p, p.textContent.trim());
    });
  }

  var optionLabels = new Map();
  document.querySelectorAll('.secteur-option').forEach(function (o) {
    var textEl = o.querySelector('span:first-child');
    optionLabels.set(o, textEl ? textEl.textContent.trim() : o.dataset.value);
  });

  /* ---- Pills expertise ---- */
  if (expertiseGroup) {
    expertiseGroup.querySelectorAll('.pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        toggleSet(activeExpertise, pill.dataset.value);
        syncPills(expertiseGroup, activeExpertise);
        run();
      });
    });
  }

  /* ---- Dropdown secteur : ouverture / fermeture ---- */
  if (secteurTrigger) {
    secteurTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = secteurDropdown.classList.toggle('is-open');
      secteurMenu.hidden = !open;
      secteurTrigger.setAttribute('aria-expanded', open);
    });
  }

  document.addEventListener('click', closeDropdown);
  if (secteurDropdown) {
    secteurDropdown.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  function closeDropdown() {
    if (!secteurDropdown) return;
    secteurDropdown.classList.remove('is-open');
    if (secteurMenu) secteurMenu.hidden = true;
    if (secteurTrigger) secteurTrigger.setAttribute('aria-expanded', 'false');
  }

  /* ---- Options secteur ---- */
  document.querySelectorAll('.secteur-option').forEach(function (opt) {
    opt.addEventListener('click', function () {
      toggleSet(activeSecteur, opt.dataset.value);
      syncOptions();
      syncTrigger();
      run();
    });
  });

  /* ---- Logique toggle ---- */
  function toggleSet(set, value) {
    if (value === 'all') { set.clear(); set.add('all'); return; }
    set.delete('all');
    if (set.has(value)) { set.delete(value); if (set.size === 0) set.add('all'); }
    else { set.add(value); }
  }

  /* ---- Sync visuels ---- */
  function syncPills(group, activeSet) {
    group.querySelectorAll('.pill').forEach(function (p) {
      p.classList.toggle('is-active', activeSet.has(p.dataset.value));
    });
  }

  function syncOptions() {
    document.querySelectorAll('.secteur-option').forEach(function (o) {
      o.classList.toggle('is-active', activeSecteur.has(o.dataset.value));
    });
  }

  function syncTrigger() {
    if (!triggerLabel || !secteurTrigger) return;
    if (activeSecteur.has('all')) {
      triggerLabel.textContent = 'Secteur';
      secteurTrigger.classList.remove('is-active');
    } else {
      var names = [];
      document.querySelectorAll('.secteur-option:not([data-value="all"])').forEach(function (o) {
        if (activeSecteur.has(o.dataset.value)) names.push(optionLabels.get(o));
      });
      triggerLabel.textContent = names.length === 1 ? names[0] : names.length + ' secteurs';
      secteurTrigger.classList.add('is-active');
    }
  }

  /* ---- Filtrage ---- */
  function applyFilters() {
    var visible = 0;
    cards.forEach(function (card) {
      var match = matches(card.dataset.expertise, activeExpertise) &&
                  matches(card.dataset.secteur, activeSecteur);
      card.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });
    if (countEl) countEl.textContent = visible + (visible <= 1 ? ' résultat' : ' résultats');
    if (noResultsEl) noResultsEl.classList.toggle('is-visible', visible === 0);
  }

  function matches(dataVal, activeSet) {
    if (activeSet.has('all')) return true;
    if (!dataVal) return false;
    return dataVal.split(' ').some(function (v) { return activeSet.has(v); });
  }

  /* ---- Compteurs ---- */
  function updateCounts() {
    if (expertiseGroup) {
      expertiseGroup.querySelectorAll('.pill').forEach(function (pill) {
        var n = countFor('expertise', pill.dataset.value);
        var label = pillLabels.get(pill) || pill.dataset.value;
        pill.innerHTML = label + '<span class="pill__count"> · ' + n + '</span>';
        if (pill.dataset.value !== 'all') pill.classList.toggle('is-empty', n === 0);
      });
    }

    document.querySelectorAll('.secteur-option').forEach(function (opt) {
      var n = countFor('secteur', opt.dataset.value);
      var countSpan = opt.querySelector('.secteur-option__count');
      if (countSpan) countSpan.textContent = n;
      if (opt.dataset.value !== 'all') opt.classList.toggle('is-empty', n === 0);
    });
  }

  function countFor(dim, value) {
    var n = 0;
    cards.forEach(function (card) {
      var eOk = dim === 'expertise'
        ? (value === 'all' ? true : matches(card.dataset.expertise, new Set([value])))
        : matches(card.dataset.expertise, activeExpertise);
      var sOk = dim === 'secteur'
        ? (value === 'all' ? true : matches(card.dataset.secteur, new Set([value])))
        : matches(card.dataset.secteur, activeSecteur);
      if (eOk && sOk) n++;
    });
    return n;
  }

  /* ---- Reset ---- */
  function syncReset() {
    var active = !activeExpertise.has('all') || !activeSecteur.has('all');
    if (resetBtn) resetBtn.classList.toggle('is-visible', active);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      activeExpertise.clear(); activeExpertise.add('all');
      activeSecteur.clear();   activeSecteur.add('all');
      if (expertiseGroup) syncPills(expertiseGroup, activeExpertise);
      syncOptions();
      syncTrigger();
      closeDropdown();
      run();
    });
  }

  /* ---- Pipeline ---- */
  function run() { applyFilters(); updateCounts(); syncReset(); }

  /* ---- Init ---- */
  run();

})();
