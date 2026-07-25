const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('./database');

const db = getDb();

console.log('🌱 Seed : Création des données de démonstration...');

// Vider les tables
const tables = ['activity_enrollments','activities','candidates','grades','bonus_malus','punitions','absences','subjects','students','parents','teachers','classes','specialites','filieres','academic_years','calendar_events','scholarships','rdv_slots','users'];
tables.forEach(t => { db.prepare(`DELETE FROM ${t}`).run(); });

const hash = bcrypt.hashSync('password123', 10);

// === USERS ===
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
].map(u => ({ ...u, id: uuidv4(), profileUrl: u.role + '-' + uuidv4().substring(0,8) }));

const insertUser = db.prepare('INSERT INTO users (id, email, password, role, firstName, lastName, phone, profileUrl) VALUES (?,?,?,?,?,?,?,?)');
users.forEach(u => insertUser.run(u.id, u.email, hash, u.role, u.firstName, u.lastName, u.phone, u.profileUrl));
console.log(`  ✅ ${users.length} utilisateurs`);

// === TEACHERS ===
const t1Id = uuidv4(), t2Id = uuidv4(), t3Id = uuidv4();
db.prepare('INSERT INTO teachers (id, userId, hireDate, speciality) VALUES (?,?,?,?)').run(t1Id, users[1].id, '2018-09-01', 'Développement Web');
db.prepare('INSERT INTO teachers (id, userId, hireDate, speciality) VALUES (?,?,?,?)').run(t2Id, users[2].id, '2019-01-15', 'Réseaux');
db.prepare('INSERT INTO teachers (id, userId, hireDate, speciality) VALUES (?,?,?,?)').run(t3Id, users[3].id, '2020-09-01', 'Finance');
console.log('  ✅ 3 enseignants');

// === PARENTS === (store parent IDs for student FK)
const p1Id = uuidv4(), p2Id = uuidv4();
db.prepare('INSERT INTO parents (id, userId) VALUES (?,?)').run(p1Id, users[7].id);
db.prepare('INSERT INTO parents (id, userId) VALUES (?,?)').run(p2Id, users[8].id);
console.log('  ✅ 2 parents');

// === ANNÉE ACADÉMIQUE ===
const yearId = uuidv4();
db.prepare('INSERT INTO academic_years (id, label, startYear, endYear, isActive) VALUES (?,?,?,?,?)').run(yearId, '2025-2026', 2025, 2026, 1);

// === FILIÈRES ===
const fInf = uuidv4(), fGes = uuidv4(), fCom = uuidv4();
db.prepare('INSERT INTO filieres (id, code, name, description, yearId) VALUES (?,?,?,?,?)').run(fInf, 'INFO', 'Informatique', 'Développement et systèmes', yearId);
db.prepare('INSERT INTO filieres (id, code, name, description, yearId) VALUES (?,?,?,?,?)').run(fGes, 'GEST', 'Gestion', 'Gestion des entreprises', yearId);
db.prepare('INSERT INTO filieres (id, code, name, description, yearId) VALUES (?,?,?,?,?)').run(fCom, 'COM', 'Commerce', 'Commerce international', yearId);

// === SPÉCIALITÉS ===
const sDev = uuidv4(), sRes = uuidv4(), sFin = uuidv4(), sMkt = uuidv4();
db.prepare('INSERT INTO specialites (id, name, filiereId) VALUES (?,?,?)').run(sDev, 'Développement Web', fInf);
db.prepare('INSERT INTO specialites (id, name, filiereId) VALUES (?,?,?)').run(sRes, 'Réseaux & Systèmes', fInf);
db.prepare('INSERT INTO specialites (id, name, filiereId) VALUES (?,?,?)').run(sFin, 'Finance', fGes);
db.prepare('INSERT INTO specialites (id, name, filiereId) VALUES (?,?,?)').run(sMkt, 'Marketing Digital', fCom);

// === CLASSES ===
const c1 = uuidv4(), c2 = uuidv4(), c3 = uuidv4();
db.prepare('INSERT INTO classes (id, name, level, filiereId, specialiteId, yearId, capacity) VALUES (?,?,?,?,?,?,?)').run(c1, 'L3 INFO A', 'L3', fInf, sDev, yearId, 35);
db.prepare('INSERT INTO classes (id, name, level, filiereId, specialiteId, yearId, capacity) VALUES (?,?,?,?,?,?,?)').run(c2, 'L3 INFO B', 'L3', fInf, sRes, yearId, 30);
db.prepare('INSERT INTO classes (id, name, level, filiereId, specialiteId, yearId, capacity) VALUES (?,?,?,?,?,?,?)').run(c3, 'L3 GEST A', 'L3', fGes, sFin, yearId, 40);

// === STUDENTS === (using parent table IDs for FK)
const s1 = uuidv4(), s2 = uuidv4(), s3 = uuidv4();
db.prepare('INSERT INTO students (id, userId, classId, birthDate, parentId) VALUES (?,?,?,?,?)').run(s1, users[4].id, c1, '2003-05-12', p1Id);
db.prepare('INSERT INTO students (id, userId, classId, birthDate, parentId) VALUES (?,?,?,?,?)').run(s2, users[5].id, c1, '2002-11-23', p2Id);
db.prepare('INSERT INTO students (id, userId, classId, birthDate, parentId) VALUES (?,?,?,?,?)').run(s3, users[6].id, c1, '2003-02-14', p2Id);
console.log('  ✅ 3 étudiants');

// === MATIÈRES ===
const sub1 = uuidv4(), sub2 = uuidv4(), sub3 = uuidv4(), sub4 = uuidv4();
db.prepare('INSERT INTO subjects (id, name, code, credits, teacherId, classId) VALUES (?,?,?,?,?,?)').run(sub1, 'HTML/CSS/JS', 'WEB101', 6, t1Id, c1);
db.prepare('INSERT INTO subjects (id, name, code, credits, teacherId, classId) VALUES (?,?,?,?,?,?)').run(sub2, 'Base de données', 'DB201', 5, t2Id, c1);
db.prepare('INSERT INTO subjects (id, name, code, credits, teacherId, classId) VALUES (?,?,?,?,?,?)').run(sub3, 'Node.js', 'WEB201', 5, t1Id, c1);
db.prepare('INSERT INTO subjects (id, name, code, credits, teacherId, classId) VALUES (?,?,?,?,?,?)').run(sub4, 'Comptabilité', 'GES101', 4, t3Id, c3);

// === NOTES ===
const grades = [
  [s1, sub1, 15, 'interro', 'Interrogation 1', '2025-09-15'],
  [s1, sub1, 13, 'devoir', 'DS 1', '2025-10-10'],
  [s1, sub2, 16, 'partiel', 'Partiel S1', '2025-12-20'],
  [s1, sub3, 17, 'interro', 'Interrogation 1', '2025-09-22'],
  [s2, sub1, 18, 'interro', 'Interrogation 1', '2025-09-15'],
  [s2, sub1, 14, 'devoir', 'DS 1', '2025-10-10'],
  [s3, sub1, 11, 'interro', 'Interrogation 1', '2025-09-15']
];
grades.forEach(g => db.prepare('INSERT INTO grades (id, studentId, subjectId, grade, maxGrade, type, label, date) VALUES (?,?,?,?,20,?,?,?)').run(uuidv4(), g[0], g[1], g[2], g[3], g[4], g[5]));

// === ABSENCES ===
const absences = [
  [s1, '2025-09-10', 'Maladie', 1, 'absence', null],
  [s1, '2025-10-05', '', 0, 'retard', 15],
  [s2, '2025-09-22', 'Rendez-vous médical', 1, 'absence', null],
  [s3, '2025-11-03', '', 0, 'absence', null]
];
absences.forEach(a => db.prepare('INSERT INTO absences (id, studentId, date, reason, justified, type, duration) VALUES (?,?,?,?,?,?,?)').run(uuidv4(), a[0], a[1], a[2], a[3], a[4], a[5]));

// === ÉVÉNEMENTS CALENDRIER ===
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
events.forEach(e => db.prepare('INSERT INTO calendar_events (id, title, date, endDate, type) VALUES (?,?,?,?,?)').run(uuidv4(), e[0], e[1], e[2], e[3]));
console.log(`  ✅ ${events.length} événements`);

// === ACTIVITÉS ===
const act1 = uuidv4(), act2 = uuidv4(), act3 = uuidv4(), act4 = uuidv4(), act5 = uuidv4();
db.prepare('INSERT INTO activities (id, name, type, description, schedule, maxStudents, teacherId) VALUES (?,?,?,?,?,?,?)').run(act1, 'Club Informatique', 'extrascolaire', 'Développement web et mobile', 'Mercredi 14h-16h', 20, t1Id);
db.prepare('INSERT INTO activities (id, name, type, description, schedule, maxStudents, teacherId) VALUES (?,?,?,?,?,?,?)').run(act2, 'Club de Musique', 'culturelle', 'Pratique instrumentale et chorale', 'Vendredi 16h-18h', 25, t2Id);
db.prepare('INSERT INTO activities (id, name, type, description, schedule, maxStudents, teacherId) VALUES (?,?,?,?,?,?,?)').run(act3, 'Débat & Éloquence', 'culturelle', 'Art oratoire', 'Jeudi 15h-17h', 15, t3Id);
db.prepare('INSERT INTO activities (id, name, type, description, schedule, maxStudents, teacherId) VALUES (?,?,?,?,?,?,?)').run(act4, 'Football', 'extrascolaire', 'Entraînement et matchs', 'Mardi/Jeudi 17h-18h30', 22, t2Id);
db.prepare('INSERT INTO activities (id, name, type, description, schedule, maxStudents, teacherId) VALUES (?,?,?,?,?,?,?)').run(act5, 'Atelier Photo', 'culturelle', 'Prise de vue et retouche', 'Lundi 16h-18h', 12, t1Id);

// === BOURSES (25 pays avec drapeaux) ===
const bourses = [
  ['Chine', '🇨🇳', 'Bourse CSC', 'Bachelors/Masters, <35 ans', 'Avril', 'Frais + 800 USD/mois', 'Via site CSC', 'https://www.csc.edu.cn'],
  ['Japon', '🇯🇵', 'MEXT Scholarship', '18-30 ans, bon dossier', 'Avril-Mai', '117-145K JPY/mois', 'Via ambassade', 'https://www.studyinjapan.go.jp'],
  ['Corée du Sud', '🇰🇷', 'KGSP', 'GPA > 80%', 'Février-Mars', '900K KRW/mois', 'Via ambassade', 'https://www.studyinkorea.go.kr'],
  ['Luxembourg', '🇱🇺', 'Bourse OFPIL', 'Master, <28 ans', 'Décembre', '1 954 EUR/mois', 'Via université', 'https://wwwfruni.lu'],
  ['Suède', '🇸🇪', 'SISS', 'Pays éligibles, expérience pro', 'Février', 'Frais + vie + voyage', 'Via universités', 'https://si.se'],
  ['Norvège', '🇳🇴', 'Quota Scheme', 'Pays en développement', 'Décembre', '~NOK 12 000/mois', 'Via universités', 'https://www.studyinnorway.no'],
  ['Turquie', '🇹🇷', 'Türkiye Burslari', '18-35 ans', 'Février', 'Frais + logement', 'Via site officiel', 'https://www.turkiyeburslari.gov.tr'],
  ['Allemagne', '🇩🇪', 'DAAD', 'Tous niveaux', 'Octobre', 'Allocation + frais', 'Via DAAD', 'https://www.daad.de'],
  ['Arabie Saoudite', '🇸🇦', 'KAUST', 'Masters/PhD STEM', 'Janvier', 'Frais complets + allocation', 'Via université', 'https://www.kaust.edu.sa'],
  ['Qatar', '🇶🇦', 'Qatar University', 'GPA > 2.5', 'Mars-Octobre', 'Frais + logement', 'Via université', 'https://www.qu.edu.qa'],
  ['Mexique', '🇲🇽', 'AMEXCID', 'Masters/PhD', 'Août', 'Allocation + frais', 'Via gouvernement', 'https://www.gob.mx/amexcid'],
  ['Brésil', '🇧🇷', 'CAPES/CSF', 'Masters/PhD STEM', 'Octobre', 'Allocation mensuelle', 'Via CAPES', 'https://www.capes.gov.br'],
  ['Thaïlande', '🇹🇭', 'Royal Thai Gov.', 'Masters/PhD STEM', 'Mars', 'Frais complets', 'Via gouvernement', ''],
  ['Écosse', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Saltire Scholarships', 'Masters pays éligibles', 'Mai', '£8 000', 'Via universités', 'https://www.studyscotland.ac.uk'],
  ['Finlande', '🇫🇮', 'Finland Scholarship', 'Masters non-UE', 'Janvier', 'Frais réduits + allocation', 'Via universités', 'https://www.studyinfinland.fi'],
  ['Russie', '🇷🇺', 'Bourse Gouvernementale Russe', 'Bachelors/Masters, <35 ans', 'Mars', 'Frais + allocation (~25K RUB)', 'Via ambassade', 'https://rfauaa.org'],
  ['Danemark', '🇩🇰', 'Danish Scholarships', 'Masters/PhD', 'Janvier-Mars', 'Frais réduits + allocation', 'Via universités', 'https://studyindenmark.dk'],
  ['Grèce', '🇬🇷', 'IKY Scholarships', 'Masters/PhD', 'Mai', 'Allocation + frais', 'Via IKY', 'https://www.iky.gr'],
  ['Taïwan', '🇹🇼', 'MOFA Scholarship', 'Bachelors/Masters/PhD', 'Mars', 'NTD 40 000/mois + frais', 'Via ambassade', 'https://www.taiwanexperience.org.tw'],
  ['Uruguay', '🇺🇾', 'ANII Scholarships', 'Masters/PhD', 'Mai', 'Allocation mensuelle', 'Via ANII', 'https://www.anii.uy'],
  ['Estonie', '🇪🇪', 'Estonian Gov. Scholarships', 'Masters/PhD', 'Mars', 'Frais + vie', 'Via Study in Estonia', 'https://studyinestonia.ee'],
  ['Lettonie', '🇱🇻', 'Latvia State Scholarships', 'Masters/PhD, échange', 'Avril', '500-700 EUR/mois', 'Via VIAA', 'https://www.viaa.gov.lv'],
  ['Moldavie', '🇲🇩', 'Bourse Gouvernement Moldavie', 'Bachelors/Masters', 'Juillet', 'Allocation mensuelle', 'Via ambassade', 'https://www.mecc.gov.md'],
  ['Biélorussie', '🇧🇾', 'Bourse Gouvernement Biélorussie', 'Bachelors/Masters', 'Juillet', 'Frais + allocation', 'Via ambassade', 'http://www.education.gov.by'],
  ['Brunei', '🇧🇳', 'Brunei Gov. Scholarship', '<28 ans, Bachelors/Masters', 'Février', 'Frais + BND 600/mois', 'Via ambassade', 'https://www.moe.gov.bn']
];
bourses.forEach(b => db.prepare('INSERT INTO scholarships (id, country, flag, name, eligibility, deadline, amount, process, url) VALUES (?,?,?,?,?,?,?,?,?)').run(uuidv4(), b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]));
console.log(`  ✅ ${bourses.length} bourses`);

// === CRÉNEAUX RDV ===
['09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00','15:30','16:00'].forEach(t => 
  db.prepare('INSERT INTO rdv_slots (id, time) VALUES (?,?)').run(uuidv4(), t));

console.log('\n🎉 Seed terminé !');
console.log('🔑 Identifiants de connexion :');
console.log('   Admin   : admin@ecole.fr / password123');
console.log('   Prof    : dupont@ecole.fr / password123');
console.log('   Étudiant: martin@ecole.fr / password123');
console.log('   Parent  : parent@ecole.fr / password123');
