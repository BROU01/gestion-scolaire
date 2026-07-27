const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../../database');
const { authenticate } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');

const router = express.Router();

// GET /api/v1/schools - Liste toutes les écoles (super-admin)
router.get('/', authenticate, requirePermission('superadmin.schools'), (req, res) => {
  try {
    const db = getDb();
    const schools = db.prepare(`
      SELECT s.*,
        (SELECT COUNT(*) FROM users u WHERE u.school_id = s.id) as user_count,
        (SELECT COUNT(*) FROM students st JOIN users u ON u.id = st.userId WHERE u.school_id = s.id) as student_count
      FROM schools s
      ORDER BY s.name
    `).all();
    res.json(schools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/v1/schools - Créer une école (super-admin)
router.post('/', authenticate, requirePermission('superadmin.schools'), (req, res) => {
  try {
    const db = getDb();
    const { code, name, subdomain, email, phone, address } = req.body;

    if (!code || !name) {
      return res.status(400).json({ error: 'Code et nom requis' });
    }

    // Vérifier unicité
    const existing = db.prepare('SELECT id FROM schools WHERE code = ? OR subdomain = ?').get(code, subdomain);
    if (existing) {
      return res.status(400).json({ error: 'Ce code ou sous-domaine existe déjà' });
    }

    const id = uuidv4();
    db.prepare(`
      INSERT INTO schools (id, code, name, subdomain, email, phone, address)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, code, name, subdomain || null, email || null, phone || null, address || null);

    // Créer les rôles par défaut pour cette école
    const defaultRoles = [
      { name: 'admin', description: 'Administrateur de l\'établissement' },
      { name: 'teacher', description: 'Enseignant' },
      { name: 'student', description: 'Étudiant' },
      { name: 'parent', description: 'Parent d\'étudiant' }
    ];

    const insertRole = db.prepare('INSERT INTO roles (id, school_id, name, description, is_system) VALUES (?, ?, ?, ?, 1)');
    for (const role of defaultRoles) {
      insertRole.run(uuidv4(), id, role.name, role.description);
    }

    // Associer les permissions par défaut à chaque rôle
    const allPerms = db.prepare('SELECT id, code FROM permissions').all();
    const rolePermMap = {
      admin: allPerms.filter(p => !p.code.startsWith('superadmin')).map(p => p.id),
      teacher: allPerms.filter(p => ['dashboard.read','students.read','teachers.read','classes.read','subjects.read',
        'grades.read','grades.create','absences.read','absences.create','punitions.read','punitions.create',
        'bonus_malus.read','bonus_malus.create','calendar.read','activities.read'].includes(p.code)).map(p => p.id),
      student: allPerms.filter(p => ['dashboard.read','students.read','grades.read','absences.read','punitions.read',
        'bonus_malus.read','calendar.read','activities.read','classes.read','subjects.read','filieres.read','specialites.read']
        .includes(p.code)).map(p => p.id),
      parent: allPerms.filter(p => ['dashboard.read','students.read','grades.read','absences.read','punitions.read',
        'bonus_malus.read','calendar.read','activities.read','classes.read','subjects.read'].includes(p.code)).map(p => p.id)
    };

    const insertRP = db.prepare('INSERT OR IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)');
    const adminRole = db.prepare('SELECT id FROM roles WHERE school_id = ? AND name = ?').get(id, 'admin');

    for (const [roleName, permIds] of Object.entries(rolePermMap)) {
      const roleData = db.prepare('SELECT id FROM roles WHERE school_id = ? AND name = ?').get(id, roleName);
      if (roleData) {
        for (const permId of permIds) {
          insertRP.run(roleData.id, permId);
        }
      }
    }

    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/v1/schools/:id - Détail d'une école
router.get('/:id', authenticate, requirePermission('school.read'), (req, res) => {
  try {
    const db = getDb();
    const school = db.prepare('SELECT * FROM schools WHERE id = ?').get(req.params.id);
    if (!school) return res.status(404).json({ error: 'École non trouvée' });
    res.json(school);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/v1/schools/:id - Modifier une école
router.put('/:id', authenticate, requirePermission('school.update'), (req, res) => {
  try {
    const db = getDb();
    const { name, email, phone, address, logo_url, is_active, config } = req.body;

    db.prepare(`
      UPDATE schools SET name=COALESCE(?,name), email=COALESCE(?,email), phone=COALESCE(?,phone),
        address=COALESCE(?,address), logo_url=COALESCE(?,logo_url),
        is_active=COALESCE(?,is_active), config=COALESCE(?,config),
        updated_at=datetime('now')
      WHERE id=?
    `).run(name, email, phone, address, logo_url, is_active, config, req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/v1/schools/:id - Supprimer une école (super-admin seulement)
router.delete('/:id', authenticate, requirePermission('superadmin.schools'), (req, res) => {
  try {
    const db = getDb();
    db.prepare('DELETE FROM schools WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/v1/schools/:id/roles - Rôles d'une école
router.get('/:id/roles', authenticate, requirePermission('school.roles.manage'), (req, res) => {
  try {
    const db = getDb();
    const roles = db.prepare(`
      SELECT r.*, GROUP_CONCAT(p.code) as permissions
      FROM roles r
      LEFT JOIN role_permissions rp ON rp.role_id = r.id
      LEFT JOIN permissions p ON p.id = rp.permission_id
      WHERE r.school_id = ?
      GROUP BY r.id
    `).all(req.params.id);
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/v1/stats/global - Statistiques globales (super-admin)
router.get('/stats/global', authenticate, requirePermission('superadmin.stats'), (req, res) => {
  try {
    const db = getDb();
    const totalSchools = db.prepare('SELECT COUNT(*) as count FROM schools').get();
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
    const totalStudents = db.prepare('SELECT COUNT(*) as count FROM students').get();
    const totalTeachers = db.prepare('SELECT COUNT(*) as count FROM teachers').get();
    const activeSchools = db.prepare('SELECT COUNT(*) as count FROM schools WHERE is_active = 1').get();

    res.json({
      schools: totalSchools.count,
      activeSchools: activeSchools.count,
      users: totalUsers.count,
      students: totalStudents.count,
      teachers: totalTeachers.count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
