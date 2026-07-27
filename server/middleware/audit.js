const { getDb } = require('../database');
const { v4: uuidv4 } = require('uuid');

/**
 * Middleware : enregistre une entrée d'audit après une mutation.
 * Usage : router.post('/students', authenticate, auditLog('CREATE', 'student'), handler)
 * 
 * Pour capturer les valeurs avant/après, appeler auditLog() AVANT le handler
 * et utiliser req.audit = { oldValues, newValues } dans le handler.
 */
function auditLog(action, entityType) {
  return (req, res, next) => {
    // Intercepter la méthode json() pour capturer la réponse
    const originalJson = res.json.bind(res);

    res.json = function (body) {
      // Ne logger que les succès
      if (body && body.success) {
        try {
          const db = getDb();
          const entityId = req.params.id || body.id || null;

          db.prepare(`
            INSERT INTO audit_log (id, school_id, user_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(
            uuidv4(),
            req.tenant ? req.tenant.schoolId : null,
            req.user ? req.user.id : null,
            action,
            entityType,
            entityId,
            req.auditOld ? JSON.stringify(req.auditOld) : null,
            req.body ? JSON.stringify(req.body) : null,
            req.ip,
            req.headers['user-agent'] || null
          );
        } catch (err) {
          console.error('Audit log error:', err.message);
        }
      }

      return originalJson(body);
    };

    next();
  };
}

/**
 * Helper : capture les valeurs actuelles avant mutation (pour édition/suppression).
 * Usage : req.auditOld = captureOldValues('students', req.params.id);
 */
function captureOldValues(table, id) {
  try {
    const db = getDb();
    const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
    return row || null;
  } catch (err) {
    return null;
  }
}

module.exports = { auditLog, captureOldValues };
