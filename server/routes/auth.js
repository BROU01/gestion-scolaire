const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../database');
const { generateToken, authenticate } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Compte désactivé. Contactez l\'administration.' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        profileUrl: user.profileUrl
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/register (admin only - inscrire un nouvel utilisateur)
router.post('/register', authenticate, (req, res) => {
  try {
    const { email, password, role, firstName, lastName, phone } = req.body;
    if (!email || !password || !role || !firstName || !lastName) {
      return res.status(400).json({ error: 'Champs obligatoires manquants' });
    }

    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    const id = uuidv4();
    const profileUrl = role + '-' + id.substring(0, 8);
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.prepare('INSERT INTO users (id, email, password, role, firstName, lastName, phone, profileUrl) VALUES (?,?,?,?,?,?,?,?)')
      .run(id, email, hashedPassword, role, firstName, lastName, phone || '', profileUrl);

    // Créer l'entrée dans la table spécifique au rôle
    if (role === 'teacher') {
      db.prepare('INSERT INTO teachers (id, userId, hireDate, speciality) VALUES (?,?,datetime(\'now\'),?)')
        .run(uuidv4(), id, req.body.speciality || '');
    } else if (role === 'student') {
      db.prepare('INSERT INTO students (id, userId, classId, birthDate, parentId) VALUES (?,?,?,?,?)')
        .run(uuidv4(), id, req.body.classId || null, req.body.birthDate || null, req.body.parentId || null);
    } else if (role === 'parent') {
      db.prepare('INSERT INTO parents (id, userId) VALUES (?,?)')
        .run(uuidv4(), id);
    }

    const token = generateToken({ id, email, role });
    res.status(201).json({
      token,
      user: { id, email, role, firstName, lastName, phone, profileUrl }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me - profil de l'utilisateur connecté
router.get('/me', authenticate, (req, res) => {
  try {
    const db = getDb();
    const user = db.prepare('SELECT id, email, role, firstName, lastName, phone, profileUrl, createdAt FROM users WHERE id = ?').get(req.user.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/auth/password - changer mot de passe
router.put('/password', authenticate, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(400).json({ error: 'Mot de passe actuel incorrect' });
    }
    const hashed = bcrypt.hashSync(newPassword, 10);
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashed, req.user.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
