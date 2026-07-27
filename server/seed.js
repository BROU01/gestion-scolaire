const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('./database');

const db = getDb();

console.log('🌱 Seed : Création des données de démonstration...');

// Vider les tables dans l'ordre (contraintes FK)
const tables = ['audit_log','activity_enrollments','activities','candidates','grades','bonus_malus','punitions','absences','subjects','students','parents','teachers','classes','specialites','filieres','academic_years','calendar_events','scholarships','rdv_slots','role_permissions','roles','users','schools'];
tables.forEach(t => { db.prepare(`DELETE FROM ${t}`).run(); });

console.log('  ✅ Tables vidées');

const hash = bcrypt.hashSync('password123', 10);

// ============================================
// ÉCOLE DE DÉMONSTRATION
// ============================================
const schoolId = uuidv4();
db.prepare(`
  INSERT INTO schools (id, code, name, subdomain, email, phone, address, config)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  schoolId,
  'SM-LOME',
  'Collège Saint-Michel de Lomé',
  'saint-michel',
  'contact@saint-michel.tg',
  '+228 22 00 00 00',
  '123 Rue des Écoles, Lomé, Togo',
  JSON.stringify({
    academicTerm: 'trimestre',
    teacherLabel: 'Professeur Principal',
    dateFormat: 'DD/MM/YYYY',
    lang: 'fr'
  })
);
console.log('  ✅ 1 école (Collège Saint-Michel de Lomé)');

// ============================================
// RÔLES + PERMISSIONS (via les seeds de la migration)
// ============================================
// Les rôles système sont liés à l'école
const roleIds = {};
const defaultRoles = ['admin', 'teacher', 'student', 'parent'];
for (const roleName of defaultRoles) {
  const id = uuidv4();
  db.prepare('INSERT INTO roles (id, school_id, name, description, is_system) VALUES (?,?,?,?,1)')
    .run(id, schoolId, roleName, `Rôle ${roleName}`);
  roleIds[roleName] = id;
}
console.log('  ✅ 4 rôles créés');

// Associer les permissions aux rôles
const allPerms = db.prepare('SELECT id, code FROM permissions').all();
const permByCode = {};
for (const p of allPerms) {
  permByCode[p.code] = p.id;
}

const rolePerms = {
  admin: Object.keys(permByCode).filter(c => !c.startsWith('superadmin')),
  teacher: ['dashboard.read','students.read','teachers.read','classes.read','subjects.read',
    'grades.read','grades.create','absences.read','absences.create','punitions.read','punitions.create',
    'bonus_malus.read','bonus_malus.create','calendar.read','activities.read'],
  student: ['dashboard.read','students.read','grades.read','absences.read','punitions.read',
    'bonus_malus.read','calendar.read','activities.read','classes.read','subjects.read',
    'filieres.read','specialites.read'],
  parent: ['dashboard.read','students.read','grades.read','absences.read','punitions.read',
    'bonus_malus.read','calendar.read','activities.read','classes.read','subjects.read']
};

const insertRP = db.prepare('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?,?)');
for (const [roleName, permCodes] of Object.entries(rolePerms)) {
  const roleId = roleIds[roleName];
  for (const code of permCodes) {
    if (permByCode[code]) {
      insertRP.run(roleId, permByCode[code]);
    }
  }
}
console.log('  ✅ Permissions associées aux rôles');

// ============================================
// UTILISATEURS
// ============================================
const users = [
  { email: 'admin@ecole.fr', role: 'admin', firstName: 'Admin', lastName: 'Système', phone: '06 00 00 00 01' },
  { email: 'dupont@ecole.fr', role: 'teacher', firstName: 'Jean-Pierre', lastName: 'Dupont', phone: '06 11 22 33 44' },
  { email: 'fontaine@ecole.fr', role: 'teacher', firstName: 'Claire', lastName: 'Fontaine', phone: '06 22 33 44 55' },
  { email: 'benali@ecole.fr', role: 'teacher', firstName: 'Ahmed', lastName: 'Benali', phone: '06 33 44 55 66' },
  { email: 'martin@ecole.fr', role: 'student', firstName: 'Jean', lastName: 'Martin', phone: '06 12 34 56 78' },
  { email: 'durand@ecole.fr', role: 'student', firstName: 'Marie', lastName: 'Durand', phone: '06 23 45 67 89' },
  { email: 'leroy@ecole.fr', role: 'student', firstName: 'Pierre', lastName: 'Leroy', phone: '06 34 56 78 90' },
  { email: 'parent@ecole.fr', role: 'parent', firstName: 'Catherine', lastName: 'Martin', phone: '06 00 11 22 33' },
  { email: 'durand.parent@ecole.fr', role: 'parent', firstName: 'Michel', lastName: 'Durand', phone: '06 00 22 33 44' }
].map(u => ({
  ...u,
  id: uuidv4(),
  profileUrl: u.role + '-' + uuidv4().substring(0, 8),
  school_id: schoolId
}));

const insertUser = db.prepare('INSERT INTO users (id, email, password, role, firstName, lastName, phone, profileUrl, school_id) VALUES (?,?,?,?,?,?,?,?,?)');
users.forEach(u => insertUser.run(u.id, u.email, hash, u.role, u.firstName, u.lastName, u.phone, u.profileUrl, u.school_id));
console.log(`  ✅ ${users.length} utilisateurs`);

// ============================================
// ENSEIGNANTS
// ============================================
const t1Id = uuidv4(), t2Id = uuidv4(), t3Id = uuidv4();
db.prepare('INSERT INTO teachers (id, userId, hireDate, speciality, school_id) VALUES (?,?,?,?,?)').run(t1Id, users[1].id, '2018-09-01', 'Développement Web', schoolId);
db.prepare('INSERT INTO teachers (id, userId, hireDate, speciality, school_id) VALUES (?,?,?,?,?)').run(t2Id, users[2].id, '2019-01-15', 'Réseaux', schoolId);
db.prepare('INSERT INTO teachers (id, userId, hireDate, speciality, school_id) VALUES (?,?,?,?,?)').run(t3Id, users[3].id, '2020-09-01', 'Finance', schoolId);
console.log('  ✅ 3 enseignants');

// ============================================
// PARENTS
// ============================================
const p1Id = uuidv4(), p2Id = uuidv4();
db.prepare('INSERT INTO parents (id, userId, school_id) VALUES (?,?,?)').run(p1Id, users[7].id, schoolId);
db.prepare('INSERT INTO parents (id, userId, school_id) VALUES (?,?,?)').run(p2Id, users[8].id, schoolId);
console.log('  ✅ 2 parents');

// ============================================
// ANNÉE ACADÉMIQUE
// ============================================
const yearId = uuidv4();
db.prepare('INSERT INTO academic_years (id, label, startYear, endYear, isActive, school_id) VALUES (?,?,?,?,?,?)').run(yearId, '2025-2026', 2025, 2026, 1, schoolId);

// ============================================
// FILIÈRES
// ============================================
const fInf = uuidv4(), fGes = uuidv4(), fCom = uuidv4();
db.prepare('INSERT INTO filieres (id, code, name, description, yearId, school_id) VALUES (?,?,?,?,?,?)').run(fInf, 'INFO', 'Informatique', 'Développement et systèmes', yearId, schoolId);
db.prepare('INSERT INTO filieres (id, code, name, description, yearId, school_id) VALUES (?,?,?,?,?,?)').run(fGes, 'GEST', 'Gestion', 'Gestion des entreprises', yearId, schoolId);
db.prepare('INSERT INTO filieres (id, code, name, description, yearId, school_id) VALUES (?,?,?,?,?,?)').run(fCom, 'COM', 'Commerce', 'Commerce international', yearId, schoolId);

// ============================================
// SPÉCIALITÉS
// ============================================
const sDev = uuidv4(), sRes = uuidv4(), sFin = uuidv4(), sMkt = uuidv4();
db.prepare('INSERT INTO specialites (id, name, filiereId, school_id) VALUES (?,?,?,?)').run(sDev, 'Développement Web', fInf, schoolId);
db.prepare('INSERT INTO specialites (id, name, filiereId, school_id) VALUES (?,?,?,?)').run(sRes, 'Réseaux & Systèmes', fInf, schoolId);
db.prepare('INSERT INTO specialites (id, name, filiereId, school_id) VALUES (?,?,?,?)').run(sFin, 'Finance', fGes, schoolId);
db.prepare('INSERT INTO specialites (id, name, filiereId, school_id) VALUES (?,?,?,?)').run(sMkt, 'Marketing Digital', fCom, schoolId);

// ============================================
// CLASSES
// ============================================
const c1 = uuidv4(), c2 = uuidv4(), c3 = uuidv4();
db.prepare('INSERT INTO classes (id, name, level, filiereId, specialiteId, yearId, capacity, school_id) VALUES (?,?,?,?,?,?,?,?)').run(c1, 'L3 INFO A', 'L3', fInf, sDev, yearId, 35, schoolId);
db.prepare('INSERT INTO classes (id, name, level, filiereId, specialiteId, yearId, capacity, school_id) VALUES (?,?,?,?,?,?,?,?)').run(c2, 'L3 INFO B', 'L3', fInf, sRes, yearId, 30, schoolId);
db.prepare('INSERT INTO classes (id, name, level, filiereId, specialiteId, yearId, capacity, school_id) VALUES (?,?,?,?,?,?,?,?)').run(c3, 'L3 GEST A', 'L3', fGes, sFin, yearId, 40, schoolId);

// ============================================
// ÉTUDIANTS
// ============================================
const s1 = uuidv4(), s2 = uuidv4(), s3 = uuidv4();
db.prepare('INSERT INTO students (id, userId, classId, birthDate, parentId, school_id) VALUES (?,?,?,?,?,?)').run(s1, users[4].id, c1, '2003-05-12', p1Id, schoolId);
db.prepare('INSERT INTO students (id, userId, classId, birthDate, parentId, school_id) VALUES (?,?,?,?,?,?)').run(s2, users[5].id, c1, '2002-11-23', p2Id, schoolId);
db.prepare('INSERT INTO students (id, userId, classId, birthDate, parentId, school_id) VALUES (?,?,?,?,?,?)').run(s3, users[6].id, c1, '2003-02-14', p2Id, schoolId);
console.log('  ✅ 3 étudiants');

// ============================================
// MATIÈRES
// ============================================
const sub1 = uuidv4(), sub2 = uuidv4(), sub3 = uuidv4(), sub4 = uuidv4();
db.prepare('INSERT INTO subjects (id, name, code, credits, teacherId, classId, school_id) VALUES (?,?,?,?,?,?,?)').run(sub1, 'HTML/CSS/JS', 'WEB101', 6, t1Id, c1, schoolId);
db.prepare('INSERT INTO subjects (id, name, code, credits, teacherId, classId, school_id) VALUES (?,?,?,?,?,?,?)').run(sub2, 'Base de données', 'DB201', 5, t2Id, c1, schoolId);
db.prepare('INSERT INTO subjects (id, name, code, credits, teacherId, classId, school_id) VALUES (?,?,?,?,?,?,?)').run(sub3, 'Node.js', 'WEB201', 5, t1Id, c1, schoolId);
db.prepare('INSERT INTO subjects (id, name, code, credits, teacherId, classId, school_id) VALUES (?,?,?,?,?,?,?)').run(sub4, 'Comptabilité', 'GES101', 4, t3Id, c3, schoolId);

// ============================================
// NOTES
// ============================================
const grades = [
  [s1, sub1, 15, 'interro', 'Interrogation 1', '2025-09-15'],
  [s1, sub1, 13, 'devoir', 'DS 1', '2025-10-10'],
  [s1, sub2, 16, 'partiel', 'Partiel S1', '2025-12-20'],
  [s1, sub3, 17, 'interro', 'Interrogation 1', '2025-09-22'],
  [s2, sub1, 18, 'interro', 'Interrogation 1', '2025-09-15'],
  [s2, sub1, 14, 'devoir', 'DS 1', '2025-10-10'],
  [s3, sub1, 11, 'interro', 'Interrogation 1', '2025-09-15']
];
grades.forEach(g => db.prepare('INSERT INTO grades (id, studentId, subjectId, grade, maxGrade, type, label, date, school_id) VALUES (?,?,?,?,20,?,?,?,?)').run(uuidv4(), g[0], g[1], g[2], g[3], g[4], g[5], schoolId));

// ============================================
// ABSENCES
// ============================================
const absences = [
  [s1, '2025-09-10', 'Maladie', 1, 'absence', null],
  [s1, '2025-10-05', '', 0, 'retard', 15],
  [s2, '2025-09-22', 'Rendez-vous médical', 1, 'absence', null],
  [s3, '2025-11-03', '', 0, 'absence', null]
];
absences.forEach(a => db.prepare('INSERT INTO absences (id, studentId, date, reason, justified, type, duration, school_id) VALUES (?,?,?,?,?,?,?,?)').run(uuidv4(), a[0], a[1], a[2], a[3], a[4], a[5], schoolId));

// ============================================
// ÉVÉNEMENTS CALENDRIER
// ============================================
const events = [
  ['Rentrée universitaire', '2025-09-02', '2025-09-02', 'academic'],
  ['DS Groupe 1', '2025-10-10', '2025-10-10', 'academic'],
  ['Vacances de la Toussaint', '2025-10-18', '2025-11-03', 'holiday'],
  ["Fête de l'école", '2025-11-15', '2025-11-15', 'cultural'],
  ['Tournoi sportif', '2025-11-22', '2025-11-23', 'sport'],
  ['Examens semestre 1', '2025-12-15', '2025-12-20', 'academic'],
  ['Vacances de Noël', '2025-12-21', '2026-01-05', 'holiday'],
  ['Concert de musique', '2026-01-20', '2026-01-20', 'cultural'],
  ['DS Groupe 2', '2026-02-10', '2026-02-10', 'academic'],
  ["Vacances d'hiver", '2026-02-14', '2026-03-02', 'holiday'],
  ['Exposition artistique', '2026-03-10', '2026-03-12', 'cultural'],
  ['Examens semestre 2', '2026-05-25', '2026-05-30', 'academic']
];
events.forEach(e => db.prepare('INSERT INTO calendar_events (id, title, date, endDate, type, school_id) VALUES (?,?,?,?,?,?)').run(uuidv4(), e[0], e[1], e[2], e[3], schoolId));

// BOURSES
const bourses = [
  ['Chine', '🇨🇳', 'Bourse CSC', 'Bachelors/Masters, <35 ans', 'Avril', 'Frais + 800 USD/mois', 'Via site CSC', 'https://www.csc.edu.cn'],
  ['Japon', '🇯🇵', 'MEXT Scholarship', '18-30 ans, bon dossier', 'Avril-Mai', '117-145K JPY/mois', 'Via ambassade', 'https://www.studyinjapan.go.jp'],
  ['Corée du Sud', '🇰🇷', 'KGSP', 'GPA > 80%', 'Février-Mars', '900K KRW/mois', 'Via ambassade', 'https://www.studyinkorea.go.kr']
];
const insertBourse = db.prepare('INSERT INTO scholarships (id, country, flag, name, eligibility, deadline, amount, process, url, school_id) VALUES (?,?,?,?,?,?,?,?,?,?)');
bourses.forEach(b => insertBourse.run(uuidv4(), b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], schoolId));

// CRÉNEAUX RDV
['09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00','15:30','16:00'].forEach(t =>
  db.prepare('INSERT INTO rdv_slots (id, time, school_id) VALUES (?,?,?)').run(uuidv4(), t, schoolId));

// ACTIVITÉS
const act1 = uuidv4();
db.prepare('INSERT INTO activities (id, name, type, description, schedule, maxStudents, teacherId, school_id) VALUES (?,?,?,?,?,?,?,?)').run(act1, 'Club Informatique', 'extrascolaire', 'Développement web et mobile', 'Mercredi 14h-16h', 20, t1Id, schoolId);

// SUPER-ADMIN (compte spécial sans école)
const superAdminId = uuidv4();
db.prepare('INSERT INTO users (id, email, password, role, firstName, lastName, phone, profileUrl) VALUES (?,?,?,?,?,?,?,?)')
  .run(superAdminId, 'superadmin@ecole.fr', hash, 'superadmin', 'Super', 'Admin', '06 00 00 00 00', 'superadmin-main');
console.log('  ✅ 1 super-admin (superadmin@ecole.fr / password123)');

console.log('\n🎉 Seed terminé !');
console.log('🔑 Identifiants de connexion :');
console.log('   Super-admin : superadmin@ecole.fr / password123');
console.log('   Admin   : admin@ecole.fr / password123');
console.log('   Prof    : dupont@ecole.fr / password123');
console.log('   Étudiant: martin@ecole.fr / password123');
console.log('   Parent  : parent@ecole.fr / password123');
