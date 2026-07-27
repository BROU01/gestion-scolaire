const { getDb } = require('../database');

/**
 * Middleware : isole les requêtes par école (tenant).
 * Vérifie que l'utilisateur connecté appartient à l'école demandée.
 * Injecte req.tenant.schoolId pour tous les middlewares/filtres suivants.
 */
function tenantScope(req, res, next) {
  const db = getDb();
  const { school } = req.params;

  // Si pas de school dans l'URL et pas superadmin → on prend school_id du JWT
  if (!school) {
    if (req.user && req.user.school_id) {
      req.tenant = { schoolId: req.user.school_id };
      return next();
    }
    // Super-admin peut passer sans tenant
    if (req.user && req.user.role === 'superadmin') {
      req.tenant = { schoolId: null, isSuperAdmin: true };
      return next();
    }
    return res.status(400).json({ error: 'Identifiant d\'école requis.' });
  }

  try {
    // L'utilisateur doit appartenir à cette école (sauf superadmin)
    if (req.user && req.user.school_id !== school && req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Accès non autorisé à cette école.' });
    }

    // Vérifier que l'école existe et est active
    const schoolData = db.prepare('SELECT id, name, is_active FROM schools WHERE id = ? OR code = ? OR subdomain = ?')
      .get(school, school, school);

    if (!schoolData) {
      return res.status(404).json({ error: 'École non trouvée.' });
    }

    if (!schoolData.is_active) {
      return res.status(403).json({ error: 'Cette école est désactivée.' });
    }

    req.tenant = {
      schoolId: schoolData.id,
      schoolName: schoolData.name,
      isSuperAdmin: req.user && req.user.role === 'superadmin'
    };

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/**
 * Helper : ajoute le filtre school_id à une requête SQL si tenant actif.
 */
function tenantFilter(req) {
  if (req.tenant && req.tenant.schoolId) {
    return { sql: 'school_id = ?', params: [req.tenant.schoolId] };
  }
  return { sql: '1=1', params: [] };
}

/**
 * Helper : ajoute school_id aux INSERT.
 */
function withTenant(req, data) {
  if (req.tenant && req.tenant.schoolId) {
    data.school_id = req.tenant.schoolId;
  }
  return data;
}

module.exports = { tenantScope, tenantFilter, withTenant };
