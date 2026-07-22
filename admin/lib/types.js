/* ============================================
   FT3 — lib/types.js
   Data Layer Centralisé — Schémas, Helpers, Stores
   Types : Candidate, Appointment, ThemeConfig
   ============================================ */

/**
 * @typedef {Object} ThemeConfig
 * @property {string} primary - Couleur primaire (#hex)
 * @property {string} primaryLight - Teinte claire primaire
 * @property {string} primaryDark - Teinte foncée primaire
 * @property {string} bg - Couleur d'arrière-plan
 * @property {string} surface - Couleur des cartes
 * @property {string} text - Texte principal
 * @property {string} textSecondary - Texte secondaire
 * @property {string} border - Bordures
 * @property {string} accent - Couleur d'accentuation
 * @property {string} schoolName - Nom de l'établissement
 * @property {string} schoolSlogan - Slogan de l'école
 */

/**
 * @typedef {Object} Candidate
 * @property {number} id - Identifiant unique
 * @property {string} nom - Nom de famille
 * @property {string} prenom - Prénom
 * @property {string} age - Âge
 * @property {string} phone - Numéro de téléphone
 * @property {string} email - Adresse email
 * @property {string} diplome - Dernier diplôme obtenu
 * @property {string} filiere - Cursus demandé
 * @property {string} specialite - Spécialité choisie
 * @property {string} rdvDate - Date du rendez-vous
 * @property {string} rdvTime - Heure du rendez-vous
 * @property {'pending'|'accepted'|'rejected'} status - Statut de la candidature
 * @property {string} createdAt - Date de création ISO
 */

/**
 * @typedef {Object} Appointment
 * @property {number} id - Identifiant unique
 * @property {number|null} candidateId - ID du candidat lié
 * @property {string} candidateName - Nom du candidat
 * @property {string} date - Date du rendez-vous
 * @property {string} time - Heure du rendez-vous
 * @property {'pending'|'confirmed'|'cancelled'|'done'} status - Statut
 * @property {string} createdAt - Date de création ISO
 */

/* ============================================
   STORE THEME — Configuration du thème public
   ============================================ */

/** @type {ThemeConfig} */

var STORE_THEME = (function() {
  var STORAGE_KEY = 'pub_theme_config';

  var DEFAULTS = {
    primary:        '#0F766E',
    primaryLight:   '#CCFBF1',
    primaryDark:    '#115E59',
    bg:             '#FAFAFA',
    surface:        '#FFFFFF',
    text:           '#0F172A',
    textSecondary:  '#475569',
    border:         '#E2E8F0',
    accent:         '#2563EB',
    schoolName:     'Gestion Scolaire',
    schoolSlogan:   'Excellence académique et ouverture sur le monde'
  };

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return JSON.parse(JSON.stringify(DEFAULTS));
  }

  function save(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  function getLabel(key) {
    var labels = {
      primary: 'Couleur primaire',
      primaryLight: 'Primaire (teinte claire)',
      primaryDark: 'Primaire (teinte foncée)',
      bg: 'Arrière-plan',
      surface: 'Surface (cartes)',
      text: 'Texte principal',
      textSecondary: 'Texte secondaire',
      border: 'Bordures',
      accent: 'Couleur d\'accentuation',
      schoolName: 'Nom de l\'établissement',
      schoolSlogan: 'Slogan'
    };
    return labels[key] || key;
  }

  function reset() {
    save(JSON.parse(JSON.stringify(DEFAULTS)));
    return load();
  }

  return { load: load, save: save, reset: reset, getLabel: getLabel, DEFAULTS: DEFAULTS, STORAGE_KEY: STORAGE_KEY };
})();

/* ============================================
   STORE CANDIDATES — Candidatures des étudiants
   ============================================ */
var STORE_CANDIDATES = (function() {
  var STORAGE_KEY = 'pub_candidates';
  var RDV_KEY = 'pub_appointments';

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch(e) { return []; }
  }

  function getById(id) {
    var list = getAll();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function save(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function updateStatus(id, newStatus) {
    var list = getAll();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].status = newStatus;
        save(list);
        return true;
      }
    }
    return false;
  }

  function getStats() {
    var list = getAll();
    return {
      total: list.length,
      pending: list.filter(function(c) { return c.status === 'pending'; }).length,
      accepted: list.filter(function(c) { return c.status === 'accepted'; }).length,
      rejected: list.filter(function(c) { return c.status === 'rejected'; }).length
    };
  }

  function addCandidate(data) {
    var list = getAll();
    var candidate = {
      id: Date.now(),
      nom: data.nom || '',
      prenom: data.prenom || '',
      age: data.age || '',
      phone: data.phone || '',
      email: data.email || '',
      diplome: data.diplome || '',
      etablissement: data.etablissement || '',
      moyenne: data.moyenne || '',
      filiere: data.filiere || '',
      specialite: data.specialite || '',
      motivation: data.motivation || '',
      rdvDate: data.rdvDate || '',
      rdvTime: data.rdvTime || '',
      notes: data.notes || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    list.push(candidate);
    save(list);
    return candidate;
  }

  /* --- Appointments Store --- */
  function getAppointments() {
    try {
      return JSON.parse(localStorage.getItem(RDV_KEY) || '[]');
    } catch(e) { return []; }
  }

  function saveAppointments(list) {
    localStorage.setItem(RDV_KEY, JSON.stringify(list));
  }

  function addAppointment(data) {
    var list = getAppointments();
    var apt = {
      id: Date.now(),
      candidateId: data.candidateId || null,
      candidateName: data.candidateName || '',
      date: data.date || '',
      time: data.time || '',
      status: 'pending',
      notes: data.notes || '',
      createdAt: new Date().toISOString()
    };
    list.push(apt);
    saveAppointments(list);
    return apt;
  }

  function updateAppointmentStatus(id, newStatus) {
    var list = getAppointments();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].status = newStatus;
        saveAppointments(list);
        return true;
      }
    }
    return false;
  }

  /* --- Time slots configurables --- */
  var DEFAULT_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00',
    '14:00', '14:30', '15:00', '15:30', '16:00'
  ];

  function getSlots() {
    try {
      var raw = localStorage.getItem('pub_slots_config');
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return DEFAULT_SLOTS.slice();
  }

  function saveSlots(slots) {
    localStorage.setItem('pub_slots_config', JSON.stringify(slots));
  }

  return {
    getAll: getAll,
    getById: getById,
    save: save,
    updateStatus: updateStatus,
    getStats: getStats,
    addCandidate: addCandidate,
    getAppointments: getAppointments,
    saveAppointments: saveAppointments,
    addAppointment: addAppointment,
    updateAppointmentStatus: updateAppointmentStatus,
    getSlots: getSlots,
    saveSlots: saveSlots,
    defaultSlots: DEFAULT_SLOTS,
    STORAGE_KEY: STORAGE_KEY,
    RDV_KEY: RDV_KEY
  };
})();

/* ============================================
   UTILS — Helpers généraux
   ============================================ */
var APP_UTILS = {
  formatDate: function(d) {
    if (!d) return '';
    var parts = d.split('-');
    if (parts.length !== 3) return d;
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  },

  formatDateTime: function(dateStr, timeStr) {
    return APP_UTILS.formatDate(dateStr) + ' à ' + (timeStr || '—');
  },

  getStatusBadge: function(status) {
    var map = {
      pending:   '<span class="badge badge-warning">En attente</span>',
      accepted:  '<span class="badge badge-success">Accepté</span>',
      rejected:  '<span class="badge badge-danger">Rejeté</span>',
      confirmed: '<span class="badge badge-success">Confirmé</span>',
      cancelled: '<span class="badge badge-danger">Annulé</span>',
      done:      '<span class="badge badge-primary">Effectué</span>'
    };
    return map[status] || '<span class="badge badge-neutral">' + status + '</span>';
  },

  getDiplomeLabel: function(val) {
    var map = {
      brevet: 'Brevet des collèges',
      bac_general: 'Baccalauréat Général',
      bac_pro: 'Baccalauréat Professionnel',
      bac_tech: 'Baccalauréat Technologique',
      licence: 'Licence (L3)',
      master: 'Master (M1/M2)',
      autre: 'Autre'
    };
    return map[val] || val;
  },

  getFiliereLabel: function(val) {
    var map = {
      info: 'Informatique',
      gestion: 'Gestion',
      commerce: 'Commerce International'
    };
    return map[val] || val;
  },

  getSpecialiteLabel: function(val) {
    var map = {
      'dev-web': 'Développement Web',
      reseaux: 'Réseaux & Systèmes',
      finance: 'Finance',
      compta: 'Comptabilité',
      marketing: 'Marketing Digital',
      'commerce-intl': 'Commerce International'
    };
    return map[val] || val;
  },

  today: function() {
    return new Date().toISOString().split('T')[0];
  },

  addDays: function(dateStr, days) {
    var d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  }
};
