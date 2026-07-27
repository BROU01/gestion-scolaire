require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const { getDb } = require('./database');
const authRoutes = require('./routes/auth');
const calendarRoutes = require('./routes/calendar');
const v1Router = require('./routes/v1');
const { authenticate, authorize } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

/* --- Sécurité --- */
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/* Rate limiting global */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: { error: 'Trop de requêtes. Veuillez réessayer dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', apiLimiter);

/* Rate limiting strict pour login */
const AUTH_RATE_LIMIT = process.env.NODE_ENV === 'test' ? 100 : (parseInt(process.env.RATE_LIMIT_AUTH_MAX) || 5);
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: AUTH_RATE_LIMIT,
  message: { error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/auth/login', authLimiter);

app.use(express.json({ limit: '10mb' }));

/* --- Health Check --- */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

/* --- API v1 (multi-tenant) --- */
app.use('/api/v1', v1Router);

/* --- API v0 (compatibilité existante, pas de tenant) --- */
app.use('/api/auth', authRoutes);
app.use('/api/calendar', calendarRoutes);

// Routes compatibilité (existantes, inchangées)
app.get('/api/profile/:url', (req, res) => {
  try {
    const db = getDb();
    const user = db.prepare('SELECT id, email, role, firstName, lastName, phone, profileUrl FROM users WHERE profileUrl = ?').get(req.params.url);
    if (!user) return res.status(404).json({ error: 'Profil non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', authenticate, (req, res) => {
  try {
    const db = getDb();
    const users = db.prepare('SELECT id, email, role, firstName, lastName, phone, profileUrl, isActive, createdAt FROM users').all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { firstName, lastName, email, phone, isActive } = req.body;
    db.prepare('UPDATE users SET firstName=?, lastName=?, email=?, phone=?, isActive=? WHERE id=?')
      .run(firstName, lastName, email, phone, isActive ? 1 : 0, req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    db.prepare('DELETE FROM users WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Students (compatibilité)
app.get('/api/students', authenticate, (req, res) => {
  try {
    const db = getDb();
    const students = db.prepare(`
      SELECT s.*, u.email, u.firstName, u.lastName, u.phone, u.profileUrl,
             c.name as className
      FROM students s
      JOIN users u ON u.id = s.userId
      LEFT JOIN classes c ON c.id = s.classId
    `).all();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/teachers', authenticate, (req, res) => {
  try {
    const db = getDb();
    const teachers = db.prepare(`
      SELECT t.*, u.email, u.firstName, u.lastName, u.phone, u.profileUrl
      FROM teachers t
      JOIN users u ON u.id = t.userId
    `).all();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/classes', authenticate, (req, res) => {
  try {
    const db = getDb();
    const classes = db.prepare('SELECT * FROM classes').all();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/subjects', authenticate, (req, res) => {
  try {
    const db = getDb();
    const subjects = db.prepare(`
      SELECT sub.*, t.userId as teacherUserId, u.firstName as teacherFirstName, u.lastName as teacherLastName
      FROM subjects sub
      LEFT JOIN teachers t ON t.id = sub.teacherId
      LEFT JOIN users u ON u.id = t.userId
    `).all();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/grades', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { studentId } = req.query;
    let query = `SELECT g.*, sub.name as subjectName, sub.code as subjectCode FROM grades g JOIN subjects sub ON sub.id = g.subjectId`;
    const params = [];
    if (studentId) { query += ' WHERE g.studentId = ?'; params.push(studentId); }
    query += ' ORDER BY g.date DESC';
    res.json(db.prepare(query).all(...params));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/grades', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { studentId, subjectId, grade, maxGrade, type, label, date } = req.body;
    const id = require('uuid').v4();
    db.prepare('INSERT INTO grades (id, studentId, subjectId, grade, maxGrade, type, label, date) VALUES (?,?,?,?,?,?,?,?)')
      .run(id, studentId, subjectId, grade, maxGrade || 20, type, label, date);
    res.json({ success: true, id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/grades/:id', authenticate, (req, res) => {
  try { const db = getDb(); db.prepare('DELETE FROM grades WHERE id=?').run(req.params.id); res.json({ success: true }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/absences', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { studentId } = req.query;
    let query = 'SELECT * FROM absences';
    const params = [];
    if (studentId) { query += ' WHERE studentId = ?'; params.push(studentId); }
    query += ' ORDER BY date DESC';
    res.json(db.prepare(query).all(...params));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/absences', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { studentId, date, reason, justified, type, duration } = req.body;
    const id = require('uuid').v4();
    db.prepare('INSERT INTO absences (id, studentId, date, reason, justified, type, duration) VALUES (?,?,?,?,?,?,?)')
      .run(id, studentId, date, reason, justified ? 1 : 0, type, duration);
    res.json({ success: true, id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/absences/:id', authenticate, (req, res) => {
  try { const db = getDb(); db.prepare('DELETE FROM absences WHERE id=?').run(req.params.id); res.json({ success: true }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/punitions', authenticate, (req, res) => {
  try { const db = getDb(); res.json(db.prepare('SELECT * FROM punitions ORDER BY date DESC').all()); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/punitions', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { studentId, type, description, hours, duration, date, teacherId } = req.body;
    const id = require('uuid').v4();
    db.prepare('INSERT INTO punitions (id, studentId, type, description, hours, duration, date, teacherId) VALUES (?,?,?,?,?,?,?,?)')
      .run(id, studentId, type, description, hours, duration, date, teacherId);
    res.json({ success: true, id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/bonus-malus', authenticate, (req, res) => {
  try {
    const db = getDb();
    res.json(db.prepare('SELECT bm.*, u.firstName, u.lastName FROM bonus_malus bm JOIN users u ON u.id = (SELECT userId FROM students WHERE id = bm.studentId) ORDER BY date DESC').all());
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/bonus-malus', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { studentId, teacherId, value, reason, date } = req.body;
    const id = require('uuid').v4();
    db.prepare('INSERT INTO bonus_malus (id, studentId, teacherId, value, reason, date) VALUES (?,?,?,?,?,?)').run(id, studentId, teacherId, value, reason, date);
    res.json({ success: true, id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/activities', (req, res) => {
  try {
    const db = getDb();
    res.json(db.prepare(`SELECT a.*, u.firstName as teacherFirstName, u.lastName as teacherLastName, (SELECT COUNT(*) FROM activity_enrollments ae WHERE ae.activityId = a.id) as enrolled FROM activities a LEFT JOIN teachers t ON t.id = a.teacherId LEFT JOIN users u ON u.id = t.userId`).all());
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/activities', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { name, type, description, schedule, maxStudents, teacherId } = req.body;
    const id = require('uuid').v4();
    db.prepare('INSERT INTO activities (id, name, type, description, schedule, maxStudents, teacherId) VALUES (?,?,?,?,?,?,?)').run(id, name, type, description, schedule, maxStudents, teacherId);
    res.json({ success: true, id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/activities/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    db.prepare('DELETE FROM activities WHERE id=?').run(req.params.id);
    db.prepare('DELETE FROM activity_enrollments WHERE activityId=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/scholarships', (req, res) => {
  try { const db = getDb(); res.json(db.prepare('SELECT * FROM scholarships ORDER BY country').all()); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/candidates', authenticate, (req, res) => {
  try { const db = getDb(); res.json(db.prepare('SELECT * FROM candidates ORDER BY createdAt DESC').all()); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/candidates', (req, res) => {
  try {
    const db = getDb();
    const data = req.body;
    const id = require('uuid').v4();
    db.prepare(`INSERT INTO candidates (id, nom, prenom, age, phone, email, diplome, etablissement, moyenne, filiere, specialite, motivation, rdvDate, rdvTime, notes, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'pending')`).run(id, data.nom, data.prenom, data.age, data.phone, data.email, data.diplome, data.etablissement, data.moyenne, data.filiere, data.specialite, data.motivation, data.rdvDate, data.rdvTime, data.notes);
    res.json({ success: true, id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/candidates/:id', authenticate, (req, res) => {
  try { const db = getDb(); db.prepare('UPDATE candidates SET status=? WHERE id=?').run(req.body.status, req.params.id); res.json({ success: true }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/slots', (req, res) => {
  try {
    const db = getDb();
    let slots = db.prepare('SELECT time FROM rdv_slots WHERE isActive = 1 ORDER BY time').all();
    if (slots.length === 0) {
      const defaults = ['09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00','15:30','16:00'];
      const insert = db.prepare('INSERT INTO rdv_slots (id, time) VALUES (?,?)');
      defaults.forEach(t => insert.run(require('uuid').v4(), t));
      slots = defaults.map(t => ({ time: t }));
    }
    res.json(slots);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/slots', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { time } = req.body;
    if (db.prepare('SELECT id FROM rdv_slots WHERE time=?').get(time)) return res.status(400).json({ error: 'Ce créneau existe déjà' });
    db.prepare('INSERT INTO rdv_slots (id, time) VALUES (?,?)').run(require('uuid').v4(), time);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/slots/:time', authenticate, (req, res) => {
  try { const db = getDb(); db.prepare('DELETE FROM rdv_slots WHERE time=?').run(req.params.time); res.json({ success: true }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/stats', authenticate, (req, res) => {
  try {
    const db = getDb();
    const students = db.prepare('SELECT COUNT(*) as count FROM students').get();
    const teachers = db.prepare('SELECT COUNT(*) as count FROM teachers').get();
    const classes = db.prepare('SELECT COUNT(*) as count FROM classes').get();
    const users = db.prepare('SELECT COUNT(*) as count FROM users').get();
    const pendingCandidates = db.prepare("SELECT COUNT(*) as count FROM candidates WHERE status='pending'").get();
    const events = db.prepare('SELECT COUNT(*) as count FROM calendar_events').get();
    res.json({ students: students.count, teachers: teachers.count, classes: classes.count, users: users.count, pendingCandidates: pendingCandidates.count, events: events.count });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Routes de login par rôle
['/admin/login','/enseignant/login','/prof/login','/etudiant/login','/eleve/login','/parent/login'].forEach(route => {
  app.get(route, (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'login.html')));
});

// Fichiers statiques
app.use(express.static(path.join(__dirname, '..')));

// Fallback SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

/* --- Middleware d'erreur global (doit être APRÈS toutes les routes) --- */
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Erreur interne du serveur' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur Gestion Scolaire démarré sur http://localhost:${PORT}`);
  console.log(`📦 API disponible sur http://localhost:${PORT}/api`);
  console.log(`🔀 API v1 (multi-tenant) sur http://localhost:${PORT}/api/v1`);
});
