# Plan Phase 1 — Multi-tenant + RBAC

> **Rôle :** Tech Lead  
> **Date :** 2026-07-27  
> **Version :** 1.0  
> **Durée estimée :** 5-8 jours ouvrés

---

## PT-1 — Fondations et migration (2 jours)

### 1.1 Migration 001 : tables système (3h)

**Fichier :** `/migrations/001_schools_roles_permissions.sql`

```sql
-- Créer les nouvelles tables système
CREATE TABLE schools (...);
CREATE TABLE roles (...);
CREATE TABLE permissions (...);
CREATE TABLE role_permissions (...);
CREATE TABLE audit_log (...);
```

- ✅ Script de migration versionné avec rollback
- ✅ Insertion des rôles par défaut (admin, teacher, student, parent)
- ✅ Insertion des permissions par défaut (~30 permissions)
- ✅ Association rôles ↔ permissions par défaut

**Rôle :** Backend Engineer  
**Tests :** Vérifier que les tables sont créées, que les seeds rôles/permissions existent

### 1.2 Migration 002 : school_id + tenant setup (4h)

**Fichier :** `/migrations/002_add_school_id.sql`

```sql
-- Ajouter school_id à toutes les tables métier (18 tables)
ALTER TABLE users ADD COLUMN school_id TEXT REFERENCES schools(id);
-- ... et ainsi de suite pour les 17 autres tables

-- Créer les index
CREATE INDEX idx_users_school ON users(school_id);
-- ...
```

- ✅ `school_id` sur CHAQUE table métier
- ✅ Index sur chaque colonne `school_id`
- ✅ Migration rétrocompatible (school_id nullable pendant la migration)
- ✅ Seed : création de l'école "Collège Saint-Michel de Lomé"

**Rôle :** Backend Engineer  
**Tests :** Vérifier la présence de school_id + index sur toutes les tables

---

## PT-2 — Middleware (1.5 jours)

### 2.1 Middleware tenantScope (3h)

**Fichier :** `/server/middleware/tenant.js`

```js
function tenantScope(req, res, next) {
  const { school } = req.params;
  // Vérifier que l'utilisateur appartient à cette école
  // Injecter schoolId dans req.tenant
  // Bloquer si différent
}
```

- ✅ Extraction du `school` depuis le sous-domaine ou paramètre URL
- ✅ Vérification que l'utilisateur JWT appartient à cette école
- ✅ Injection de `req.tenant.schoolId` pour tous les middlewares suivants

**Rôle :** Backend Engineer  
**Tests :** Test d'accès cross-tenant (utilisateur école A ne voit pas données école B)

### 2.2 Middleware requirePermission (3h)

**Fichier :** `/server/middleware/permissions.js`

```js
function requirePermission(code) {
  return (req, res, next) => {
    // Vérifier dans role_permissions si l'utilisateur a cette permission
  };
}
```

- ✅ Lecture en cache du rôle et des permissions (1 requête au lieu de N)
- ✅ Tableau statique des codes permission pour autocomplétion

**Rôle :** Backend Engineer  
**Tests :** Vérifier qu'un étudiant ne peut pas créer de notes

### 2.3 Middleware auditLog (3h)

**Fichier :** `/server/middleware/audit.js`

```js
function auditLog(action, entityType) {
  return (req, res, next) => {
    // Intercepter la réponse
    // Enregistrer dans audit_log : qui, quoi, quand, valeurs avant/après
  };
}
```

- ✅ Capture des valeurs avant/après en JSON
- ✅ Enregistrement de l'IP
- ✅ Fonctionne comme middleware post-route

**Rôle :** Backend Engineer  
**Tests :** Vérifier qu'une création d'étudiant génère une entrée d'audit

### 2.4 Restructuration index.js (4h)

- ✅ Déplacer chaque groupe de routes dans `/server/routes/v1/`
- ✅ Appliquer `tenantScope` + `requirePermission` + `validate` sur chaque route
- ✅ Centraliser la gestion d'erreurs dans un middleware dédié
- ✅ Versionner l'API sous `/api/v1/`

**Rôle :** Backend Engineer  
**Tests :** Tester que toutes les routes fonctionnent après refactoring

---

## PT-3 — Super-admin (1 jour)

### 3.1 Interface super-admin (4h)

- ✅ Page de connexion super-admin (admin plateforme)
- ✅ Dashboard multi-écoles (liste des tenants, statut, nb utilisateurs)
- ✅ CRUD écoles (créer, activer/désactiver, supprimer)
- ✅ Statistiques globales

**Rôle :** Frontend Engineer  
**Tests :** Vérifier que seul le super-admin peut voir la liste des écoles

### 3.2 Page de configuration école (4h)

- ✅ Paramètres généraux (nom, code, sous-domaine, logo)
- ✅ Gestion des rôles et permissions par école
- ✅ Configuration académique (filières, classes, matières, coefficients)

**Rôle :** Frontend Engineer + Backend Engineer  
**Tests :** Vérifier qu'un admin d'école peut configurer SES paramètres seulement

---

## PT-4 — Tests d'isolation multi-tenant (1 jour)

### 4.1 Suite de tests d'intrusion tenant (4h)

```js
const { describe, it } = require('node:test');
const assert = require('assert');

describe('Isolation multi-tenant', () => {
  it('un étudiant de l\'école A ne peut pas lire les notes de l\'école B');
  it('un admin d\'école ne peut pas voir les autres écoles');
  it('le super-admin peut tout voir');
  it('une requête sans school_id est rejetée');
  it('un token JWT d\'une école A ne fonctionne pas sur l\'API école B');
});
```

- ✅ Scénarios de test exhaustifs (5+ tests)
- ✅ Tests automatisés dans GitHub Actions
- ✅ Rapport de couverture

**Rôle :** QA Engineer  
**Tests :** Exécuter la suite complète, 0 échec attendu

---

## PT-5 — CI/CD + Documentation (0.5 jour)

### 5.1 GitHub Actions CI (2h)

- ✅ Workflow `.github/workflows/ci.yml`
- ✅ `npm install` → `npm run lint` → `npm test`
- ✅ Tests d'isolation tenant exécutés en priorité

**Rôle :** DevOps

### 5.2 Documentation (2h)

- ✅ ADR : choix de l'architecture multi-tenant
- ✅ `docs/api/openapi.yaml` : routes v1 documentées
- ✅ `docs/db/` : diagramme ER mis à jour

**Rôle :** Tech Lead

---

## Tableau récapitulatif

| PT | Tâche | Durée | Rôle principal | Dépendances |
|---|---|---|---|---|
| 1.1 | Migration tables système | 3h | Backend | Aucune |
| 1.2 | Migration school_id | 4h | Backend | 1.1 |
| 2.1 | Middleware tenantScope | 3h | Backend | 1.2 |
| 2.2 | Middleware requirePermission | 3h | Backend | 1.1 |
| 2.3 | Middleware auditLog | 3h | Backend | 1.1 |
| 2.4 | Restructuration index.js | 4h | Backend | 2.1, 2.2, 2.3 |
| 3.1 | Interface super-admin | 4h | Frontend + Backend | 2.4 |
| 3.2 | Configuration école | 4h | Frontend + Backend | 2.4 |
| 4.1 | Tests isolation tenant | 4h | QA | 2.4 |
| 5.1 | GitHub Actions CI | 2h | DevOps | 4.1 |
| 5.2 | Documentation | 2h | Tech Lead | 4.1 |
| **Total** | | **~36h (5-8 jours)** | | |

---

*Livrables de la Phase 1 : AUDIT.md (déjà fait) + ARCHITECTURE.md (déjà fait) + Migrations numérotées + Middlewares + Tests d'isolation + CI + Documentation.*
