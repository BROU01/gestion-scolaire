# ARCHITECTURE.md — Architecture du système

> **Rôle :** Tech Lead  
> **Date :** 2026-07-27  
> **Version :** 1.0

---

## 1. Vision d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    Clients (Navigateurs)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Secrétaire│  │  Prof    │  │  Parent  │  │  Admin   │   │
│  │  (desktop)│  │ (mobile) │  │ (mobile) │  │ (desktop)│   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │              │        │
└───────┼──────────────┼──────────────┼──────────────┼────────┘
        │              │              │              │
        ▼              ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Couche HTTP (Express)                       │
│  ┌────────────┐ ┌──────────────┐ ┌──────────────────────┐  │
│  │  Helmet    │ │ CORS         │ │ Rate Limiting        │  │
│  │  (secu)    │ │ (CORS_ORIGIN)│ │ (100 req/15min)      │  │
│  └────────────┘ └──────────────┘ └──────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Router v1 (/api/v1/)                                  │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │  │
│  │  │ Auth     │ │ Tenants  │ │ Schools  │ │ Users  │  │  │
│  │  ├──────────┤ ├──────────┤ ├──────────┤ ├────────┤  │  │
│  │  │ Teachers │ │ Students │ │ Classes  │ │Grades  │  │  │
│  │  ├──────────┤ ├──────────┤ ├──────────┤ ├────────┤  │  │
│  │  │ Notes    │ │ Absences │ │ Bull.    │ │ PDF    │  │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Couche Middleware                             │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐  │
│  │ authenticate │ │ requirePerm  │ │ validate (express- │  │
│  │ (JWT vérif)  │ │ (RBAC)       │ │ validator)         │  │
│  └──────────────┘ └──────────────┘ └────────────────────┘  │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐  │
│  │ tenantScope  │ │ auditLog    │ │ errorHandler       │  │
│  │ (school_id)  │ │ (toute mut.) │ │ (centralisé)       │  │
│  └──────────────┘ └──────────────┘ └────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Base de données (SQLite → PostgreSQL)      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Tables métier (18) avec school_id sur CHAQUE table    │  │
│  │  Tables système : schools, roles, permissions,         │  │
│  │  role_permissions, audit_log, site_settings, ...       │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Stack technique (confirmée)

| Couche | Technologie | Justification |
|---|---|---|
| Frontend | HTML + CSS + JS vanilla | ZÉRO build step, ZÉRO framework |
| Web Components | Natifs | Composants réutilisables sans framework |
| Backend | Node.js + Express 4.x | Déjà en place, stable, grand écosystème |
| Base de données | SQLite (better-sqlite3) → PostgreSQL (Phase 6) | Phase 0-5 : SQLite pour simplicité |
| Auth | JWT (jsonwebtoken) | Stateless, déjà en place |
| Mots de passe | bcrypt (10 rounds) | Déjà en place |
| PDF | pdfkit | À ajouter pour bulletins |
| Images | sharp | À ajouter pour médiathèque |
| Éditeur riche | Quill.js via CDN | À ajouter pour CMS Phase 2 |
| Tests | node:test natif | ZÉRO dépendance supplémentaire |
| CI/CD | GitHub Actions | Gratuit pour repos publics |

---

## 3. Modèle de données cible (Multi-tenant)

### 3.1 Tables système (nouvelles)

```sql
-- Écoles (tenants)
CREATE TABLE schools (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,          -- Ex: SM-LOME
  name TEXT NOT NULL,                  -- Ex: Collège Saint-Michel
  subdomain TEXT UNIQUE,              -- Ex: saint-michel
  email TEXT,
  phone TEXT,
  address TEXT,
  logo_url TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Rôles
CREATE TABLE roles (
  id TEXT PRIMARY KEY,
  school_id TEXT NOT NULL,
  name TEXT NOT NULL,                  -- Ex: 'admin', 'teacher', 'student', 'parent'
  description TEXT,
  FOREIGN KEY (school_id) REFERENCES schools(id)
);

-- Permissions
CREATE TABLE permissions (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,           -- Ex: 'grades.create', 'students.read'
  label TEXT NOT NULL,
  description TEXT
);

-- Liaison rôles ↔ permissions
CREATE TABLE role_permissions (
  role_id TEXT NOT NULL,
  permission_id TEXT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

-- Audit log (toute mutation)
CREATE TABLE audit_log (
  id TEXT PRIMARY KEY,
  school_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,               -- Ex: 'CREATE', 'UPDATE', 'DELETE'
  entity_type TEXT NOT NULL,          -- Ex: 'grade', 'student'
  entity_id TEXT,
  old_values TEXT,                    -- JSON
  new_values TEXT,                    -- JSON
  ip_address TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (school_id) REFERENCES schools(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 3.2 Migration des tables existantes

Chaque table métier existante reçoit :
- ✅ Ajout de `school_id TEXT NOT NULL`
- ✅ Ajout de `FOREIGN KEY (school_id) REFERENCES schools(id)`
- ✅ Création d'un index sur `school_id`
- ✅ Toutes les requêtes SELECT filtrées par `school_id`

---

## 4. API Design (v1)

```
GET  /api/v1/health
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me

GET  /api/v1/schools                    # Super-admin seulement
POST /api/v1/schools                    # Super-admin seulement

GET    /api/v1/:school/students         # Filtré par school
POST   /api/v1/:school/students
PUT    /api/v1/:school/students/:id
DELETE /api/v1/:school/students/:id

GET    /api/v1/:school/teachers
POST   /api/v1/:school/teachers

GET    /api/v1/:school/classes
POST   /api/v1/:school/classes

GET    /api/v1/:school/subjects
POST   /api/v1/:school/subjects

GET    /api/v1/:school/grades
POST   /api/v1/:school/grades

GET    /api/v1/:school/absences
POST   /api/v1/:school/absences

GET    /api/v1/:school/punitions
POST   /api/v1/:school/punitions

GET    /api/v1/:school/grades/report/:studentId  # Bulletin PDF
```

---

## 5. Middleware architecture

### 5.1 authenticate (JWT)
- Extrait et vérifie le token Bearer
- Décode : `{ id, email, role, school_id }`
- Injecte `req.user`

### 5.2 requirePermission(permissionCode)
- Vérifie dans `role_permissions` si le rôle de l'utilisateur a cette permission
- Bloque avec 403 si absent

### 5.3 tenantScope
- Vérifie que `req.user.school_id === req.params.school`
- Bloque avec 403 si différent
- Injecte automatiquement le filtre `school_id` dans les requêtes SQL

### 5.4 validate(schema)
- Vérifie les entrées avec express-validator
- Renvoie 400 avec la liste des erreurs

### 5.5 auditLog(action, entityType)
- Middleware post-mutation qui enregistre dans `audit_log`

---

## 6. Frontend — Architecture Web Components

```
components/
├── grille-notes/        # Web Component <grille-notes>
│   ├── template.html
│   ├── style.css
│   └── script.js
├── media-picker/        # <media-picker>
├── form-etape/          # <form-etape>
├── data-table/          # <data-table>
├── modal-dialog/        # <modal-dialog>
├── toast-notification/  # <toast-notification>
└── context-help/        # <context-help>
```

Chaque composant :
- ✅ Custom Elements natifs (pas de polyfill)
- ✅ Shadow DOM pour isolation CSS
- ✅ Attributs pour configuration
- ✅ Events custom pour communication
- ✅ Documenté en /docs/components/

---

## 7. Sécurité

| Mesure | Statut actuel | Cible Phase 1 |
|---|---|---|
| Helmet | ✅ | ✅ |
| CORS | ✅ | ✅ |
| Rate limiting | ✅ (global) | ✅ + endpoints sensibles |
| JWT | ✅ (24h) | ✅ + refresh tokens |
| bcrypt | ✅ (10 rounds) | ✅ |
| Validation entrées | ❌ | ✅ express-validator |
| Isolation tenant | ❌ | ✅ school_id partout |
| RBAC | ❌ | ✅ requirePermission |
| Audit log | ❌ | ✅ chaîne de confiance |
| Secret en .env | ❌ | ✅ JWT_SECRET + autres |
| CSP | ⚠️ désactivé | ✅ en production |

---

## 8. Tests

| Type | Outil | Cible |
|---|---|---|
| Unitaires | node:test | Fonctions pures, helpers, validation |
| Intégration | node:test + chai | Tous les endpoints REST |
| Isolation tenant | node:test | Test d'intrusion : tenant A ne voit pas tenant B |
| Accessibilité | axe-core (CI) | Nav clavier, contrastes, ARIA |
| Performance | Lighthouse CI | Score > 90 mobile 3G |

---

*Fin de l'architecture initiale — À valider avec le développeur.*
