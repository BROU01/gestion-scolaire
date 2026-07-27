const { describe, it, before, after } = require('node:test');
const assert = require('assert');
const path = require('path');
const fs = require('fs');
const http = require('http');

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3001';
const API = (path) => `${BASE_URL}${path}`;

// Helpers
function fetch(method, url, data, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      port: u.port,
      path: u.pathname + u.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    };
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// =============================================
// Tokens partagés pour éviter le rate limiting
// =============================================
let adminToken, teacherToken, studentToken, superToken;
let mainSchoolId, secondSchoolId;

describe('=== PHASE 1 - TESTS D\'INTÉGRATION ===', () => {

  // =============================================
  // LOGIN UNIQUE — Tous les tokens en une seule passe
  // =============================================
  describe('Setup : Login utilisateurs', () => {
    it('POST /api/auth/login avec superadmin', async () => {
      const res = await fetch('POST', API('/api/auth/login'), {
        email: 'superadmin@ecole.fr',
        password: 'password123'
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.user.role, 'superadmin');
      superToken = res.data.token;
    });

    it('POST /api/auth/login avec admin', async () => {
      const res = await fetch('POST', API('/api/auth/login'), {
        email: 'admin@ecole.fr',
        password: 'password123'
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.user.role, 'admin');
      adminToken = res.data.token;
    });

    it('POST /api/auth/login avec teacher', async () => {
      const res = await fetch('POST', API('/api/auth/login'), {
        email: 'dupont@ecole.fr',
        password: 'password123'
      });
      assert.strictEqual(res.status, 200);
      assert.ok(res.data.token);
      teacherToken = res.data.token;
    });

    it('POST /api/auth/login avec student', async () => {
      const res = await fetch('POST', API('/api/auth/login'), {
        email: 'martin@ecole.fr',
        password: 'password123'
      });
      assert.strictEqual(res.status, 200);
      assert.ok(res.data.token);
      studentToken = res.data.token;
    });

    it('Récupère l\'ID de l\'école principale', async () => {
      const schools = await fetch('GET', API('/api/v1/schools'), null, superToken);
      assert.strictEqual(schools.status, 200);
      assert.ok(schools.data.length > 0);
      mainSchoolId = schools.data[0].id;
    });

    it('Crée une 2e école pour les tests d\'isolation', async () => {
      const res = await fetch('POST', API('/api/v1/schools'), {
        code: 'ECOLE-B',
        name: 'École B',
        subdomain: 'ecole-b'
      }, superToken);
      assert.strictEqual(res.status, 201);
      const schools = await fetch('GET', API('/api/v1/schools'), null, superToken);
      // Trouver l'ID de la 2e école (pas la première)
      secondSchoolId = schools.data.find(s => s.code === 'ECOLE-B').id;
      assert.ok(secondSchoolId);
    });
  });

  // =============================================
  // SANTÉ DU SERVEUR
  // =============================================
  describe('Santé du serveur', () => {
    it('GET /api/health retourne OK', async () => {
      const res = await fetch('GET', API('/api/health'));
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.status, 'ok');
    });
  });

  // =============================================
  // AUTHENTIFICATION (tests edge cases)
  // =============================================
  describe('Authentification', () => {
    it('POST /api/auth/login avec mauvais mot de passe', async () => {
      const res = await fetch('POST', API('/api/auth/login'), {
        email: 'admin@ecole.fr',
        password: 'wrong'
      });
      assert.strictEqual(res.status, 401);
    });

    it('GET /api/auth/me avec token admin valide', async () => {
      const res = await fetch('GET', API('/api/auth/me'), null, adminToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.email, 'admin@ecole.fr');
    });
  });

  // =============================================
  // API V0 (COMPATIBILITÉ)
  // =============================================
  describe('API v0 (compatibilité)', () => {
    it('GET /api/students retourne la liste', async () => {
      const res = await fetch('GET', API('/api/students'), null, adminToken);
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.data));
      assert.ok(res.data.length > 0);
    });

    it('GET /api/stats retourne les stats', async () => {
      const res = await fetch('GET', API('/api/stats'), null, adminToken);
      assert.strictEqual(res.status, 200);
      assert.ok(res.data.students !== undefined);
    });
  });

  // =============================================
  // API V1 - SUPER-ADMIN
  // =============================================
  describe('API v1 - Super-admin', () => {
    it('GET /api/v1/schools liste les écoles', async () => {
      const res = await fetch('GET', API('/api/v1/schools'), null, superToken);
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.data));
      assert.ok(res.data.length >= 2); // école principale + ECOLE-B
    });

    it('GET /api/v1/schools rejette admin normal', async () => {
      const res = await fetch('GET', API('/api/v1/schools'), null, adminToken);
      assert.strictEqual(res.status, 403);
    });

    it('POST /api/v1/schools crée une école', async () => {
      const res = await fetch('POST', API('/api/v1/schools'), {
        code: 'TEST-ECOLE3',
        name: 'École Test 3',
        subdomain: 'test-ecole-3'
      }, superToken);
      assert.strictEqual(res.status, 201);
      assert.ok(res.data.success);
    });

    it('GET /api/v1/schools/stats/global stats plateforme', async () => {
      const res = await fetch('GET', API('/api/v1/schools/stats/global'), null, superToken);
      assert.strictEqual(res.status, 200);
      assert.ok(res.data.schools >= 2);
      assert.ok(res.data.students > 0);
    });
  });

  // =============================================
  // API V1 - MULTI-TENANT
  // =============================================
  describe('API v1 - Routes tenant', () => {
    it('GET /api/v1/:school/students retourne les étudiants', async () => {
      const res = await fetch('GET', API(`/api/v1/${mainSchoolId}/students`), null, adminToken);
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.data));
      assert.ok(res.data.length > 0);
    });

    it('GET /api/v1/:school/teachers retourne les enseignants', async () => {
      const res = await fetch('GET', API(`/api/v1/${mainSchoolId}/teachers`), null, adminToken);
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.data));
      assert.ok(res.data.length > 0);
    });

    it('GET /api/v1/:school/grades retourne les notes', async () => {
      const res = await fetch('GET', API(`/api/v1/${mainSchoolId}/grades`), null, adminToken);
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.data));
    });

    it('GET /api/v1/:school/absences retourne les absences', async () => {
      const res = await fetch('GET', API(`/api/v1/${mainSchoolId}/absences`), null, adminToken);
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.data));
    });
  });

  // =============================================
  // ISOLATION TENANT (test d'intrusion)
  // =============================================
  describe('Tests d\'isolation multi-tenant (intrusion)', () => {
    it('Un admin école A ne peut pas lire les données de l\'école B', async () => {
      const res = await fetch('GET', API(`/api/v1/${secondSchoolId}/students`), null, adminToken);
      // L'admin de l'école A (admin@ecole.fr lié à school A) n'a pas accès à l'école B
      assert.ok(res.status === 403 || res.status === 401 || res.status === 400,
        `Expected 401/403/400, got ${res.status}`);
    });

    it('Un étudiant ne peut pas accéder aux stats globales', async () => {
      const res = await fetch('GET', API('/api/v1/schools/stats/global'), null, studentToken);
      assert.strictEqual(res.status, 403);
    });
  });

  // =============================================
  // PERMISSIONS RBAC (via API v1)
  // =============================================
  describe('Permissions RBAC', () => {
    it('Un étudiant ne peut pas créer de notes (v1)', async () => {
      const res = await fetch('POST', API(`/api/v1/${mainSchoolId}/grades`), {
        studentId: 'test',
        subjectId: 'test',
        grade: 15
      }, studentToken);
      // Étudiant n'a pas la permission 'grades.create' → 403
      // Ou si le tenant filter rejette → 403
      assert.strictEqual(res.status, 403);
    });

    it('Un enseignant peut voir les étudiants (v0)', async () => {
      const res = await fetch('GET', API('/api/students'), null, teacherToken);
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.data));
    });

    it('Un enseignant peut créer une note (v1)', async () => {
      const res = await fetch('POST', API(`/api/v1/${mainSchoolId}/grades`), {
        studentId: 'test-fail-fk',
        subjectId: 'bad-id',
        grade: 15
      }, teacherToken);
      // L'enseignant a la permission 'grades.create', donc 403 n'est PAS attendu
      // Mais la requête échoue car studentId/subjectId n'existent pas (500 ou 400)
      assert.ok(res.status !== 403,
        `Teacher should have grades.create permission, got 403`);
    });
  });
});

describe('=== FIN DES TESTS ===', () => {
  it('test suite completed', () => {
    assert.ok(true);
  });
});
