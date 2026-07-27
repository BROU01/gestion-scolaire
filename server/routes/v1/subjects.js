const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../../database');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');
const { tenantFilter, withTenant } = require('../../middleware/tenant');
const { auditLog } = require('../../middleware/audit');

const router = express.Router();

router.get('/', authenticate, requirePermission('subjects.read'), (req, res) => {
  try {
    const db = getDb();
    const tf = tenantFilter(req);
    const subjects = db.prepare(`
      SELECT sub.*, t.userId as teacherUserId, u.firstName as teacherFirstName, u.lastName as teacherLastName
      FROM subjects sub
      LEFT JOIN teachers t ON t.id = sub.teacherId
      LEFT JOIN users u ON u.id = t.userId
      WHERE ${tf.sql}
    `).all(...tf.params);
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
