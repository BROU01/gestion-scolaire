/* ============================================
   FT3 — Système de traduction i18n
   Français / English
   ============================================ */

var LANG_DATA = {
  fr: {
    /* Navbar */
    'nav.home': 'Accueil',
    'nav.academic': 'Vie Académique',
    'nav.activities': 'Activités',
    'nav.scholarships': 'Bourses',
    'nav.register': "S'inscrire",
    'nav.login': 'Espace Privé',
    'nav.lang': 'English',

    /* Homepage Hero */
    'hero.badge': 'Année académique 2025–2026',
    'hero.title1': "L'excellence académique",
    'hero.title2': 'au service de l\'avenir',
    'hero.desc': 'Un établissement d\'enseignement moderne, transparent et connecté. Suivi en temps réel des notes, absences et comportement pour chaque élève.',
    'hero.cta': "S'inscrire maintenant",
    'hero.cta2': "Découvrir l'établissement",
    'hero.scroll': 'Découvrir',
    'hero.scholarships.title': 'Étudiez à l\'étranger',
    'hero.scholarships.desc': 'Un portail complet des bourses d\'études disponibles dans 28+ pays. Trouvez l\'opportunité idéale pour votre avenir.',

    /* Stats */
    'stat.success': 'Taux de réussite',
    'stat.students': 'Élèves inscrits',
    'stat.teachers': 'Enseignants qualifiés',
    'stat.programs': 'Filières & spécialités',

    /* Features */
    'features.title': 'Pourquoi nous choisir',
    'features.subtitle': 'Une infrastructure moderne et un suivi personnalisé pour chaque parcours académique',
    'feature.grades': 'Suivi des notes en temps réel',
    'feature.grades.desc': 'Interrogations, devoirs et partiels — accédez aux résultats de votre enfant instantanément via le portail parents.',
    'feature.attendance': 'Gestion de l\'assiduité',
    'feature.attendance.desc': 'Retards, absences et exclusions suivis rigoureusement. Notification en temps réel aux parents et tuteurs.',
    'feature.discipline': 'Discipline transparente',
    'feature.discipline.desc': 'Punitions, heures de colle et bonus/malus documentés. Un cadre éducatif clair pour la réussite de chacun.',
    'feature.scholarships': 'Bourses internationales',
    'feature.scholarships.desc': 'Un portail dédié aux bourses d\'études dans 28+ pays pour préparer un avenir sans frontières.',

    /* Parent Portal */
    'parents.title': 'Espace Parents',
    'parents.subtitle': 'Un portail dédié pour suivre la scolarité de votre enfant en toute transparence',
    'parents.grades': 'Notes & évaluations',
    'parents.grades.i1': "Notes d'interrogations et devoirs",
    'parents.grades.i2': 'Résultats des partiels',
    'parents.grades.i3': 'Moyennes par matière',
    'parents.behavior': 'Assiduité & comportement',
    'parents.behavior.i1': 'Absences et retards',
    'parents.behavior.i2': 'Punitions et heures de colle',
    'parents.behavior.i3': 'Bonus et malus enseignants',
    'parents.communication': 'Communication',
    'parents.communication.i1': 'Notifications en temps réel',
    'parents.communication.i2': 'Messages directs aux enseignants',
    'parents.communication.i3': 'Bulletins téléchargeables',
    'parents.cta': 'Accéder au Portail Parents',

    /* Academic Life */
    'academic.hero.title': 'Règles et processus académiques',
    'academic.hero.desc': 'Transparence totale sur les méthodes d\'évaluation, la discipline et le suivi comportemental de chaque élève.',
    'academic.eval.title': "Système d'évaluation",
    'academic.eval.subtitle': 'Trois types de notes pour un suivi complet des progrès',
    'academic.interro': 'Interrogations',
    'academic.interro.i1': 'Évaluations courtes (30 min à 1h)',
    'academic.interro.i2': 'Portée sur les chapitres récents',
    'academic.interro.i3': 'Coefficient 1 — 20% de la moyenne',
    'academic.devoir': 'Devoirs',
    'academic.devoir.i1': 'Évaluations sur une durée plus longue',
    'academic.devoir.i2': 'Travaux à rendre avant la date limite',
    'academic.devoir.i3': 'Coefficient 2 — 30% de la moyenne',
    'academic.partiel': 'Partiels',
    'academic.partiel.i1': 'Examens de fin de semestre',
    'academic.partiel.i2': 'Couverture de tous les chapitres',
    'academic.partiel.i3': 'Coefficient 3 — 50% de la moyenne',
    'academic.attendance.title': "Règles d'assiduité",
    'academic.attendance.subtitle': 'Un cadre strict pour garantir la qualité de l\'enseignement',
    'academic.behavior.title': 'Suivi comportemental',
    'academic.behavior.subtitle': 'Un système équilibré de sanctions et de reconnaissances',

    /* Activities */
    'activities.hero.title': 'Enrichissez votre parcours scolaire',
    'activities.hero.desc': 'Clubs, sports, ateliers créatifs et événements culturels pour développer des compétences au-delà des cours.',
    'activities.filter.all': 'Toutes',
    'activities.filter.clubs': 'Extrascolaires',
    'activities.filter.cultural': 'Culturelles',

    /* Scholarships Page */
    'scholarships.filter.all': 'Tous',
    'scholarships.search': 'Rechercher un pays, une bourse…',
    'scholarships.asia': 'Asie',
    'scholarships.europe': 'Europe',
    'scholarships.middleeast': 'Moyen-Orient',
    'scholarships.americas': 'Amérique',
    'scholarships.deadline': 'Deadline',
    'scholarships.eligibility': 'Éligibilité',
    'scholarships.website': 'Site officiel',
    'scholarships.tip.title': 'Conseil pour les parents',
    'scholarships.tip.text': 'Les pays mentionnés ci-dessus offrent des conditions d\'études abordables et un environnement sûr. La Chine, la Corée, la Thaïlande et la Turquie sont particulièrement intéressantes pour leur coût de vie faible et la qualité de leurs programmes.',

    /* CTA */
    'cta.title': 'Rejoignez notre établissement',
    'cta.desc': 'Inscrivez votre enfant dès maintenant et bénéficiez d\'un suivi scolaire moderne et transparent.',
    'cta.btn': "Commencer l'inscription",
    'cta.academic': 'Des questions sur le règlement ?',
    'cta.academic.desc': 'Contactez notre administration pour toute question sur les procédures académiques ou disciplinaires.',
    'cta.scholarships': 'Besoin d\'accompagnement ?',
    'cta.scholarships.desc': 'Notre équipe vous guide dans vos démarches de candidature pour les bourses internationales.',
    'cta.contact': 'Nous contacter',

    /* Footer */
    'footer.desc': 'Établissement d\'enseignement supérieur dédié à l\'excellence académique et à l\'ouverture internationale.',
    'footer.nav': 'Navigation',
    'footer.spaces': 'Espaces',
    'footer.contact': 'Contact',
    'footer.register': 'Inscription',
    'footer.private': 'Espace Privé',
    'footer.parents': 'Portail Parents',
    'footer.copyright': 'Tous droits réservés.',
    'footer.scholarship': 'Bourses disponibles dans 25+ pays',

    /* Registration */
    'register.title': 'Inscrivez votre enfant',
    'register.desc': 'Formulaire en 4 étapes pour inscrire votre enfant.',
    'register.step1': 'Informations',
    'register.step2': 'Parcours',
    'register.step3': 'Vœux',
    'register.step4': 'Rendez-vous',

    /* Filter chips */
    'filter.scholarships.tip': 'Cliquez sur un drapeau pour filtrer par pays',

    /* Admin */
    'admin.dashboard': 'Tableau de bord',
    'admin.logout': 'Déconnexion',
    'admin.students': 'Étudiants',
    'admin.teachers': 'Enseignants',
    'admin.classes': 'Classes',
    'admin.grades': 'Notes',
    'admin.attendance': 'Assiduité',
    'admin.discipline': 'Discipline',
    'admin.scholarships': 'Bourses d\'études',
    'admin.calendar': 'Calendrier',
    'admin.activities': 'Activités',
    'admin.profile': 'Profil',
    'admin.settings': 'Paramètres',
    'admin.site': 'Site Public',
    'admin.theme': 'Personnalisation',
    'admin.candidates': 'Candidatures',
    'admin.appointments': 'Rendez-vous',
    'admin.editor': 'Éditeur site',
    'admin.exams': 'Mes examens',
    'admin.subjects': 'Matières',
    'admin.punitions': 'Punitions',
    'admin.bonus': 'Bonus/Malus',
    'admin.filieres': 'Filières',
    'admin.recentGrades': 'Dernières notes',
    'admin.currentYear': 'Année en cours',
    'admin.international': 'Bourses internationales — 25+ pays',
    'admin.selectRole': 'Sélectionnez votre rôle'
  },

  en: {
    /* Navbar */
    'nav.home': 'Home',
    'nav.academic': 'Academic Life',
    'nav.activities': 'Activities',
    'nav.scholarships': 'Scholarships',
    'nav.register': 'Register',
    'nav.login': 'Private Area',
    'nav.lang': 'Français',

    /* Homepage Hero */
    'hero.badge': 'Academic Year 2025–2026',
    'hero.title1': 'Academic Excellence',
    'hero.title2': 'for Your Future',
    'hero.desc': 'A modern, transparent and connected educational institution. Real-time tracking of grades, absences and behavior for every student.',
    'hero.cta': 'Register Now',
    'hero.cta2': 'Discover the School',
    'hero.scroll': 'Discover',
    'hero.scholarships.title': 'Study Abroad',
    'hero.scholarships.desc': 'A complete portal of scholarships available in 28+ countries. Find the ideal opportunity for your future.',

    /* Stats */
    'stat.success': 'Success Rate',
    'stat.students': 'Enrolled Students',
    'stat.teachers': 'Qualified Teachers',
    'stat.programs': 'Programs & Specialties',

    /* Features */
    'features.title': 'Why Choose Us',
    'features.subtitle': 'Modern infrastructure and personalized monitoring for every academic path',
    'feature.grades': 'Real-time Grade Tracking',
    'feature.grades.desc': 'Quizzes, assignments and exams — access your child\'s results instantly via the parent portal.',
    'feature.attendance': 'Attendance Management',
    'feature.attendance.desc': 'Lates, absences and exclusions rigorously tracked. Real-time notification to parents and guardians.',
    'feature.discipline': 'Transparent Discipline',
    'feature.discipline.desc': 'Punishments, detentions and bonus/malus documented. A clear educational framework for everyone\'s success.',
    'feature.scholarships': 'International Scholarships',
    'feature.scholarships.desc': 'A dedicated portal for scholarships in 28+ countries to prepare a future without borders.',

    /* Parent Portal */
    'parents.title': 'Parent Portal',
    'parents.subtitle': 'A dedicated portal to monitor your child\'s education with complete transparency',
    'parents.grades': 'Grades & Assessments',
    'parents.grades.i1': 'Quiz and assignment grades',
    'parents.grades.i2': 'Exam results',
    'parents.grades.i3': 'Averages per subject',
    'parents.behavior': 'Attendance & Behavior',
    'parents.behavior.i1': 'Absences and lates',
    'parents.behavior.i2': 'Punishments and detentions',
    'parents.behavior.i3': 'Teacher bonus/malus',
    'parents.communication': 'Communication',
    'parents.communication.i1': 'Real-time notifications',
    'parents.communication.i2': 'Direct messages to teachers',
    'parents.communication.i3': 'Downloadable report cards',
    'parents.cta': 'Access Parent Portal',

    /* Academic Life */
    'academic.hero.title': 'Rules & Academic Processes',
    'academic.hero.desc': 'Full transparency on evaluation methods, discipline and behavioral monitoring for each student.',
    'academic.eval.title': 'Evaluation System',
    'academic.eval.subtitle': 'Three types of grades for complete progress tracking',
    'academic.interro': 'Quizzes',
    'academic.interro.i1': 'Short assessments (30 min to 1h)',
    'academic.interro.i2': 'Covers recent chapters',
    'academic.interro.i3': 'Coefficient 1 — 20% of average',
    'academic.devoir': 'Assignments',
    'academic.devoir.i1': 'Longer-duration assessments',
    'academic.devoir.i2': 'Work to submit before deadline',
    'academic.devoir.i3': 'Coefficient 2 — 30% of average',
    'academic.partiel': 'Exams',
    'academic.partiel.i1': 'End-of-semester exams',
    'academic.partiel.i2': 'Covers all chapters',
    'academic.partiel.i3': 'Coefficient 3 — 50% of average',
    'academic.attendance.title': 'Attendance Rules',
    'academic.attendance.subtitle': 'A strict framework to ensure teaching quality',
    'academic.behavior.title': 'Behavioral Monitoring',
    'academic.behavior.subtitle': 'A balanced system of sanctions and recognitions',

    /* Activities */
    'activities.hero.title': 'Enrich Your School Experience',
    'activities.hero.desc': 'Clubs, sports, creative workshops and cultural events to develop skills beyond the classroom.',
    'activities.filter.all': 'All',
    'activities.filter.clubs': 'Clubs',
    'activities.filter.cultural': 'Cultural',

    /* Scholarships Page */
    'scholarships.filter.all': 'All',
    'scholarships.search': 'Search for a country, scholarship…',
    'scholarships.asia': 'Asia',
    'scholarships.europe': 'Europe',
    'scholarships.middleeast': 'Middle East',
    'scholarships.americas': 'Americas',
    'scholarships.deadline': 'Deadline',
    'scholarships.eligibility': 'Eligibility',
    'scholarships.website': 'Official website',
    'scholarships.tip.title': 'Parent Tip',
    'scholarships.tip.text': 'The countries listed above offer affordable study conditions and a safe environment. China, Korea, Thailand and Turkey are particularly interesting for their low cost of living and quality programs.',

    /* CTA */
    'cta.title': 'Join Our Institution',
    'cta.desc': 'Register your child now and benefit from modern, transparent academic monitoring.',
    'cta.btn': 'Start Registration',
    'cta.academic': 'Questions about regulations?',
    'cta.academic.desc': 'Contact our administration for any questions about academic or disciplinary procedures.',
    'cta.scholarships': 'Need guidance?',
    'cta.scholarships.desc': 'Our team guides you through your application process for international scholarships.',
    'cta.contact': 'Contact Us',

    /* Footer */
    'footer.desc': 'Higher education institution dedicated to academic excellence and international openness.',
    'footer.nav': 'Navigation',
    'footer.spaces': 'Spaces',
    'footer.contact': 'Contact',
    'footer.register': 'Registration',
    'footer.private': 'Private Area',
    'footer.parents': 'Parent Portal',
    'footer.copyright': 'All rights reserved.',
    'footer.scholarship': 'Scholarships in 25+ countries',

    /* Registration */
    'register.title': 'Register Your Child',
    'register.desc': '4-step form to register your child.',
    'register.step1': 'Information',
    'register.step2': 'Background',
    'register.step3': 'Choices',
    'register.step4': 'Appointment',

    /* Filter chips */
    'filter.scholarships.tip': 'Click a flag to filter by country',

    /* Admin */
    'admin.dashboard': 'Dashboard',
    'admin.logout': 'Logout',
    'admin.students': 'Students',
    'admin.teachers': 'Teachers',
    'admin.classes': 'Classes',
    'admin.grades': 'Grades',
    'admin.attendance': 'Attendance',
    'admin.discipline': 'Discipline',
    'admin.scholarships': 'Scholarships',
    'admin.calendar': 'Calendar',
    'admin.activities': 'Activities',
    'admin.profile': 'Profile',
    'admin.settings': 'Settings',
    'admin.site': 'Public Site',
    'admin.theme': 'Customization',
    'admin.candidates': 'Candidates',
    'admin.appointments': 'Appointments',
    'admin.editor': 'Site Editor',
    'admin.exams': 'My Exams',
    'admin.subjects': 'Subjects',
    'admin.punitions': 'Punishments',
    'admin.bonus': 'Bonus/Malus',
    'admin.filieres': 'Programs',
    'admin.recentGrades': 'Recent Grades',
    'admin.currentYear': 'Current Year',
    'admin.international': 'International Scholarships — 25+ countries',
    'admin.selectRole': 'Select your role'
  }
};

/* Current language */
var CURRENT_LANG = localStorage.getItem('ft3_lang') || 'fr';

/* Get translation */
function __(key) {
  return LANG_DATA[CURRENT_LANG] && LANG_DATA[CURRENT_LANG][key] !== undefined
    ? LANG_DATA[CURRENT_LANG][key]
    : LANG_DATA['fr'][key] || key;
}

/* Switch language */
function switchLang(lang) {
  if (lang === CURRENT_LANG) return;
  CURRENT_LANG = lang;
  localStorage.setItem('ft3_lang', lang);
  applyTranslations();
  /* Update toggle button text */
  var toggles = document.querySelectorAll('[data-i18n-toggle]');
  toggles.forEach(function(el) { el.textContent = __('nav.lang'); });
}

/* Apply translations to all elements with data-i18n */
function applyTranslations() {
  var els = document.querySelectorAll('[data-i18n]');
  els.forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (!key) return;
    var trans = __(key);
    /* Check if element has child elements (like <span>) */
    var hasChildElements = false;
    for (var i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].nodeType === 1) { hasChildElements = true; break; }
    }
    if (hasChildElements) {
      /* Replace only text nodes, preserve child elements */
      var textNodes = [];
      for (var j = 0; j < el.childNodes.length; j++) {
        if (el.childNodes[j].nodeType === 3) { textNodes.push(el.childNodes[j]); }
      }
      if (textNodes.length > 0) {
        /* Replace first text node with translation, clear the rest */
        textNodes[0].textContent = trans;
        for (var k = 1; k < textNodes.length; k++) {
          textNodes[k].textContent = '';
        }
      } else {
        el.textContent = trans;
      }
    } else {
      el.textContent = trans;
    }
  });
  /* Update html lang attribute */
  document.documentElement.lang = CURRENT_LANG === 'en' ? 'en' : 'fr';
}

/* Run on DOM ready */
document.addEventListener('DOMContentLoaded', function() {
  CURRENT_LANG = localStorage.getItem('ft3_lang') || 'fr';
  applyTranslations();
});
