const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../../database');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');
const { tenantFilter, withTenant } = require('../../middleware/tenant');
const { auditLog } = require('../../middleware/audit');

const router = express.Router();

// GET /api/v1/:school/teachers
router.get('/', authenticate, requirePermission('teachers.read'), (req, res) => {
  try {
    const db = getDb();
    const tf = tenantFilter(req);
    const teachers = db.prepare(`
      SELECT t.*, u.email, u.firstName, u.lastName, u.phone, u.profileUrl
      FROM teachers t
      JOIN users u ON u.id = t.userId
      WHERE ${tf.sql}
    `).all(...tf.params);
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/v1/:school/teachers/:id/classes
router.get('/:id/classes', authenticate, requirePermission('classes.read'), (req, res) => {
  try {
    const db = getDb();
    const tf = tenantFilter(req);
    const classes = db.prepare(`
      SELECT DISTINCT c.* FROM classes c
      JOIN subjects s ON s.classId = c.id
      WHERE s.teacherId = ? AND ${tf.sql}
    `).all(req.params.id, ...tf.params);
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
