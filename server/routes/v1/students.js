const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const { getDb } = require('../../database');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');
const { tenantFilter, withTenant } = require('../../middleware/tenant');
const { auditLog, captureOldValues } = require('../../middleware/audit');

const router = express.Router();

// GET /api/v1/:school/students
router.get('/', authenticate, requirePermission('students.read'), (req, res) => {
  try {
    const db = getDb();
    const tf = tenantFilter(req);
    const students = db.prepare(`
      SELECT s.*, u.email, u.firstName, u.lastName, u.phone, u.profileUrl,
             c.name as className
      FROM students s
      JOIN users u ON u.id = s.userId
      LEFT JOIN classes c ON c.id = s.classId
      WHERE ${tf.sql}
    `).all(...tf.params);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/v1/:school/students
router.post('/', authenticate, requirePermission('students.create'), auditLog('CREATE', 'student'), (req, res) => {
  try {
    const db = getDb();

    // Validation
    if (!req.body.email || !req.body.firstName || !req.body.lastName) {
      return res.status(400).json({ error: 'Email, prénom et nom requis' });
    }

    // Créer user + student en 2 étapes
    // (l'utilisateur doit d'abord exister dans users, créé via /api/auth/register)
    // Ici, on suppose que l'étudiant existe déjà dans users
    const { userId, classId, birthDate, parentId } = req.body;
    const data = withTenant(req, { userId, classId, birthDate, parentId });

    const id = uuidv4();
    db.prepare('INSERT INTO students (id, userId, classId, birthDate, parentId, school_id) VALUES (?,?,?,?,?,?)')
      .run(id, data.userId, data.classId || null, data.birthDate || null, data.parentId || null, data.school_id || null);

    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/v1/:school/students/:id
router.put('/:id', authenticate, requirePermission('students.update'), auditLog('UPDATE', 'student'), (req, res) => {
  try {
    const db = getDb();
    req.auditOld = captureOldValues('students', req.params.id);

    const { classId, birthDate, parentId } = req.body;
    db.prepare('UPDATE students SET classId=?, birthDate=?, parentId=? WHERE id=?')
      .run(classId, birthDate, parentId, req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/v1/:school/students/:id
router.delete('/:id', authenticate, requirePermission('students.delete'), auditLog('DELETE', 'student'), (req, res) => {
  try {
    const db = getDb();
    db.prepare('DELETE FROM students WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
