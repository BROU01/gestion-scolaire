const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../../database');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');
const { tenantFilter, withTenant } = require('../../middleware/tenant');
const { auditLog } = require('../../middleware/audit');

const router = express.Router();

router.get('/', authenticate, requirePermission('classes.read'), (req, res) => {
  try {
    const db = getDb();
    const tf = tenantFilter(req);
    const classes = db.prepare(`SELECT * FROM classes WHERE ${tf.sql}`).all(...tf.params);
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
