/* ============================================
   FT3 — Thématisation Dynamique (Design Tokens)
   Admin édite → localStorage → Public applique
   ============================================ */
var PubTheme = (function() {
  var STORAGE_KEY = 'pub_theme_config';

  var defaults = {
    primary:      '#0F766E',
    primaryLight: '#CCFBF1',
    primaryDark:  '#115E59',
    bg:           '#FAFAFA',
    surface:      '#FFFFFF',
    text:         '#0F172A',
    textSecondary:'#475569',
    border:       '#E2E8F0',
    accent:       '#2563EB',
    schoolName:   'Gestion Scolaire',
    schoolSlogan: 'Excellence académique et ouverture sur le monde'
  };

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return defaults;
  }

  function save(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  function apply() {
    var c = load();
    var r = document.documentElement;
    if (!r) return;
    r.style.setProperty('--pub-primary',       c.primary || defaults.primary);
    r.style.setProperty('--pub-primary-light', c.primaryLight || defaults.primaryLight);
    r.style.setProperty('--pub-primary-dark',  c.primaryDark || defaults.primaryDark);
    r.style.setProperty('--pub-bg',            c.bg || defaults.bg);
    r.style.setProperty('--pub-surface',       c.surface || defaults.surface);
    r.style.setProperty('--pub-text',          c.text || defaults.text);
    r.style.setProperty('--pub-text-secondary',c.textSecondary || defaults.textSecondary);
    r.style.setProperty('--pub-border',        c.border || defaults.border);
    r.style.setProperty('--pub-accent',        c.accent || defaults.accent);
    /* Mettre à jour le nom de l'école dans le DOM */
    var nameEls = document.querySelectorAll('[data-pub="schoolName"]');
    for (var i = 0; i < nameEls.length; i++) nameEls[i].textContent = c.schoolName || defaults.schoolName;
    var sloganEls = document.querySelectorAll('[data-pub="schoolSlogan"]');
    for (var j = 0; j < sloganEls.length; j++) sloganEls[j].textContent = c.schoolSlogan || defaults.schoolSlogan;
  }

  function reset() {
    save(defaults);
    apply();
  }

  function getConfig() { return load(); }

  return { load: load, save: save, apply: apply, reset: reset, getConfig: getConfig, defaults: defaults };
})();

/* Auto-apply au chargement */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', PubTheme.apply);
} else {
  PubTheme.apply();
}
