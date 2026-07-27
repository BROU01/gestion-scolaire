const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../../database');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');
const { tenantFilter, withTenant } = require('../../middleware/tenant');
const { auditLog, captureOldValues } = require('../../middleware/audit');

const router = express.Router();

// GET /api/v1/:school/grades
router.get('/', authenticate, requirePermission('grades.read'), (req, res) => {
  try {
    const db = getDb();
    const { studentId } = req.query;
    const tf = tenantFilter(req);

    let query = `
      SELECT g.*, sub.name as subjectName, sub.code as subjectCode
      FROM grades g
      JOIN subjects sub ON sub.id = g.subjectId
      WHERE ${tf.sql}
    `;
    const params = [...tf.params];
    if (studentId) {
      query += ' AND g.studentId = ?';
      params.push(studentId);
    }
    query += ' ORDER BY g.date DESC';

    const grades = db.prepare(query).all(...params);
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/v1/:school/grades
router.post('/', authenticate, requirePermission('grades.create'), auditLog('CREATE', 'grade'), (req, res) => {
  try {
    const db = getDb();
    const { studentId, subjectId, grade, maxGrade, type, label, date } = req.body;

    if (!studentId || !subjectId || grade === undefined) {
      return res.status(400).json({ error: 'Étudiant, matière et note requis' });
    }

    const data = withTenant(req, { studentId, subjectId, grade, maxGrade: maxGrade || 20, type, label, date });
    const id = uuidv4();

    db.prepare('INSERT INTO grades (id, studentId, subjectId, grade, maxGrade, type, label, date, school_id) VALUES (?,?,?,?,?,?,?,?,?)')
      .run(id, data.studentId, data.subjectId, data.grade, data.maxGrade, data.type || 'interro', data.label || '', data.date || new Date().toISOString().split('T')[0], data.school_id || null);

    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/v1/:school/grades/:id
router.delete('/:id', authenticate, requirePermission('grades.delete'), auditLog('DELETE', 'grade'), (req, res) => {
  try {
    const db = getDb();
    db.prepare('DELETE FROM grades WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
