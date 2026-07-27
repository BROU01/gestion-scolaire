const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../../database');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');
const { tenantFilter, withTenant } = require('../../middleware/tenant');
const { auditLog } = require('../../middleware/audit');

const router = express.Router();

router.get('/', authenticate, requirePermission('absences.read'), (req, res) => {
  try {
    const db = getDb();
    const { studentId } = req.query;
    const tf = tenantFilter(req);
    let query = `SELECT * FROM absences WHERE ${tf.sql}`;
    const params = [...tf.params];
    if (studentId) {
      query += ' AND studentId = ?';
      params.push(studentId);
    }
    query += ' ORDER BY date DESC';
    res.json(db.prepare(query).all(...params));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, requirePermission('absences.create'), auditLog('CREATE', 'absence'), (req, res) => {
  try {
    const db = getDb();
    const data = withTenant(req, req.body);
    const id = uuidv4();
    db.prepare('INSERT INTO absences (id, studentId, date, reason, justified, type, duration, school_id) VALUES (?,?,?,?,?,?,?,?)')
      .run(id, data.studentId, data.date, data.reason || '', data.justified ? 1 : 0, data.type || 'absence', data.duration || null, data.school_id || null);
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, requirePermission('absences.delete'), auditLog('DELETE', 'absence'), (req, res) => {
  try {
    const db = getDb();
    db.prepare('DELETE FROM absences WHERE id=?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
