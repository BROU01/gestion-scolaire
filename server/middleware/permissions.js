const { getDb } = require('../database');

/**
 * Cache des permissions par rôle (rafraîchi toutes les 5 minutes)
 */
let _permCache = null;
let _permCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

function getPermissionsForRole(roleId) {
  const now = Date.now();
  if (_permCache && (now - _permCacheTime) < CACHE_TTL) {
    return _permCache;
  }

  const db = getDb();
  const rows = db.prepare(`
    SELECT rp.role_id, p.code
    FROM role_permissions rp
    JOIN permissions p ON p.id = rp.permission_id
  `).all();

  _permCache = {};
  for (const row of rows) {
    if (!_permCache[row.role_id]) _permCache[row.role_id] = new Set();
    _permCache[row.role_id].add(row.code);
  }
  _permCacheTime = now;
  return _permCache;
}

function invalidatePermCache() {
  _permCache = null;
  _permCacheTime = 0;
}

/**
 * Middleware : vérifie que l'utilisateur a une permission spécifique.
 * usage : router.get('/grades', authenticate, requirePermission('grades.read'), handler)
 */
function requirePermission(permissionCode) {
  return (req, res, next) => {
    // Super-admin a toutes les permissions
    if (req.user && req.user.role === 'superadmin') {
      return next();
    }

    const role = req.user ? req.user.role : null;
    if (!role) {
      return res.status(401).json({ error: 'Authentification requise.' });
    }

    // Si pas de multi-tenant (phase transition), utiliser le rôle directement
    if (!req.tenant || !req.tenant.schoolId) {
      // Fallback : permissions basées sur le rôle string
      const rolePermissions = {
        admin: new Set([
          'dashboard.read', 'users.read', 'users.create', 'users.update', 'users.delete',
          'students.read', 'students.create', 'students.update', 'students.delete',
          'teachers.read', 'teachers.create', 'teachers.update', 'teachers.delete',
          'classes.read', 'classes.create', 'classes.update', 'classes.delete',
          'subjects.read', 'subjects.create', 'subjects.update', 'subjects.delete',
          'grades.read', 'grades.create', 'grades.delete',
          'absences.read', 'absences.create', 'absences.delete',
          'punitions.read', 'punitions.create', 'punitions.delete',
          'filieres.read', 'filieres.manage', 'specialites.read', 'specialites.manage',
          'academic_years.manage', 'calendar.read', 'calendar.manage',
          'activities.read', 'activities.manage',
          'bonus_malus.read', 'bonus_malus.create',
          'candidates.read', 'candidates.manage',
          'school.read', 'school.update', 'school.users.manage', 'school.roles.manage'
        ]),
        teacher: new Set([
          'dashboard.read',
          'students.read', 'teachers.read', 'classes.read', 'subjects.read',
          'grades.read', 'grades.create',
          'absences.read', 'absences.create',
          'punitions.read', 'punitions.create',
          'bonus_malus.read', 'bonus_malus.create',
          'calendar.read', 'activities.read'
        ]),
        student: new Set([
          'dashboard.read',
          'students.read',
          'grades.read', 'absences.read', 'punitions.read',
          'bonus_malus.read',
          'calendar.read', 'activities.read',
          'classes.read', 'subjects.read', 'filieres.read', 'specialites.read'
        ]),
        parent: new Set([
          'dashboard.read',
          'students.read', 'grades.read', 'absences.read', 'punitions.read',
          'bonus_malus.read',
          'calendar.read', 'activities.read',
          'classes.read', 'subjects.read'
        ])
      };

      const perms = rolePermissions[role] || new Set();
      if (perms.has(permissionCode)) {
        return next();
      }
      return res.status(403).json({ error: 'Permission insuffisante.' });
    }

    // Mode multi-tenant : charger les permissions depuis la BDD
    const db = getDb();
    const userRole = db.prepare(`
      SELECT r.id FROM roles r
      JOIN users u ON u.role = r.name
      WHERE u.id = ? AND r.school_id = ?
    `).get(req.user.id, req.tenant.schoolId);

    if (!userRole) {
      return res.status(403).json({ error: 'Rôle non trouvé pour cette école.' });
    }

    const cache = getPermissionsForRole(userRole.id);
    const rolePerms = cache[userRole.id];

    if (rolePerms && rolePerms.has(permissionCode)) {
      return next();
    }

    return res.status(403).json({ error: 'Permission insuffisante.' });
  };
}

module.exports = { requirePermission, invalidatePermCache };
