# AUDIT.md — Audit du code existant

> **Rôle :** Tech Lead  
> **Date :** 2026-07-27  
> **Version :** 1.0

---

## 1. Vue d'ensemble

| Métrique | Valeur |
|---|---|
| Stack | Node.js + Express + SQLite (better-sqlite3) |
| Frontend | HTML/CSS/JS vanilla (ZÉRO framework) |
| Backend | Express 4.21, JWT auth, rate limiting (express-rate-limit) |
| Base de données | SQLite via better-sqlite3 (WAL mode, foreign keys ON) |
| Tests | ❌ Aucun |
| CI/CD | ❌ Aucun |
| Déploiement | ❌ Aucun (serveur local uniquement) |
| Authentification | JWT (jsonwebtoken), bcrypt pour mots de passe |
| Validation | express-validator présent dans package.json mais PAS utilisé |
| Sécurité | helmet, cors, rate limiting |
| Langue | Français + Anglais (i18n maison) |
| Templates | Serveur statique (pas de SSR) |
| Gestion fichiers | multer présent dans package.json mais PAS utilisé |

---

## 2. Architecture actuelle

### 2.1 Structure des dossiers

```
FT3/
├── admin/                    # Panneau d'administration
│   ├── css/
│   │   ├── style.css         # Styles admin (très long, ~3000 lignes)
│   │   └── utils.css         # Classes utilitaires
│   ├── js/
│   │   ├── app.js            # App admin principale (~3000 lignes)
│   │   ├── api.js            # Client API fetch
│   │   └── site-editor.js    # Éditeur de contenu du site
│   ├── lib/
│   │   └── types.js          # Définitions de types
│   └── index.html            # Page principale admin
├── public/                   # Pages publiques
│   ├── css/
│   │   ├── public.css        # Styles publics
│   │   └── i18n.css          # Styles internationalisation
│   ├── js/
│   │   ├── public.js         # JS public
│   │   ├── i18n.js           # Logique i18n (FR/EN)
│   │   └── theme.js          # Thème clair/sombre
│   ├── index.html            # Accueil
│   ├── login.html            # Connexion
│   ├── inscription.html      # Inscription
│   ├── activites.html        # Activités
│   ├── bourses.html          # Bourses d'études
│   └── vie-academique.html   # Vie académique
├── server/                   # Backend
│   ├── index.js              # Point d'entrée Express (~400 lignes)
│   ├── database.js           # Connexion SQLite + schémas
│   ├── seed.js               # Données de démonstration
│   ├── middleware/
│   │   └── auth.js           # JWT auth middleware
│   ├── routes/
│   │   ├── auth.js           # Routes d'authentification
│   │   └── calendar.js       # Routes calendrier
│   └── package.json
├── index.html                # Landing page racine
└── README.md
```

### 2.2 Schéma de base de données

**Tables actuelles (18 tables) :**

| Table | Rôle | Tenants ? |
|---|---|---|
| `users` | Utilisateurs (admin/teacher/student/parent) | ❌ |
| `teachers` | Profils enseignants | ❌ |
| `students` | Profils étudiants | ❌ |
| `parents` | Profils parents | ❌ |
| `academic_years` | Années académiques | ❌ |
| `filieres` | Filières | ❌ |
| `specialites` | Spécialités liées aux filières | ❌ |
| `classes` | Classes | ❌ |
| `subjects` | Matières | ❌ |
| `grades` | Notes | ❌ |
| `absences` | Absences et retards | ❌ |
| `punitions` | Punitions | ❌ |
| `bonus_malus` | Bonus/Malus points | ❌ |
| `calendar_events` | Événements calendrier | ❌ |
| `activities` | Activités parascolaires | ❌ |
| `activity_enrollments` | Inscriptions aux activités | ❌ |
| `scholarships` | Bourses d'études | ❌ |
| `candidates` | Candidatures | ❌ |
| `rdv_slots` | Créneaux RDV admission | ❌ |

**⚠️ Problème critique : Aucune isolation multi-tenant.** Aucune table ne porte de `school_id`. Le système suppose un tenant unique.

### 2.3 API Endpoints

| Méthode | Route | Auth | Validation |
|---|---|---|---|
| GET | `/api/health` | ❌ | ❌ |
| POST | `/api/auth/login` | ❌ | ❌ |
| POST | `/api/auth/register` | ✅ | ❌ |
| GET | `/api/auth/me` | ✅ | ❌ |
| PUT | `/api/auth/password` | ✅ | ❌ |
| GET | `/api/profile/:url` | ❌ | ❌ |
| GET/PUT/DELETE | `/api/users/:id` | ✅ | ❌ |
| GET | `/api/students` | ✅ | ❌ |
| GET | `/api/teachers` | ✅ | ❌ |
| GET | `/api/classes` | ✅ | ❌ |
| GET | `/api/subjects` | ✅ | ❌ |
| GET/POST/DELETE | `/api/grades[/:id]` | ✅ | ❌ |
| GET/POST/DELETE | `/api/absences[/:id]` | ✅ | ❌ |
| GET/POST | `/api/punitions` | ✅ | ❌ |
| GET/POST | `/api/bonus-malus` | ✅ | ❌ |
| GET/POST/DELETE | `/api/activities[/:id]` | ✅/❌* | ❌ |
| GET | `/api/scholarships` | ❌ | ❌ |
| GET/POST/PUT | `/api/candidates[/:id]` | ✅/❌* | ❌ |
| GET/POST/DELETE | `/api/slots[/:time]` | ✅/❌* | ❌ |
| GET | `/api/stats` | ✅ | ❌ |
| GET/POST/PUT/DELETE | `/api/calendar[/:id]` | ✅/❌* | ❌ |

*❌ = route publique, ✅ = authentification requise

**⚠️ Problème :** Lectures sans restrictions de rôle. Un étudiant peut lister tous les utilisateurs (`/api/users`).

### 2.4 Sécurité — État des lieux

- ✅ Helmet configuré (CSP désactivé en dev)
- ✅ CORS configuré
- ✅ Rate limiting général (100 req/15min) + login (5 req/15min)
- ✅ JWT avec expiration 24h
- ✅ Mots de passe hashés (bcrypt, 10 rounds)
- ✅ Comptes désactivables (`isActive`)
- ❌ **Aucune validation d'entrée** (express-validator installé mais jamais utilisé)
- ❌ **Aucune isolation multi-tenant**
- ❌ **JWT_SECRET en dur** dans le code (`middleware/auth.js` ligne 3)
- ❌ **Aucune restriction RBAC** sur les routes métier
- ❌ **Aucune table d'audit** (qui a fait quoi, quand)
- ❌ **Aucune sanitization** des entrées utilisateur

### 2.5 Qualité du code

| Critère | Statut | Commentaire |
|---|---|---|
| ESLint / Prettier | ❌ | Aucun outil de linting |
| Tests unitaires | ❌ | Aucun test |
| Tests intégration | ❌ | Aucun test |
| Tests E2E | ❌ | Aucun test |
| Documentation API | ❌ | Aucune |
| Commentaires | ⚠️ Partiel | Bien commenté en français, mais inégal |
| Variables nommées | ✅ | Correct |
| Gestion d'erreurs | ⚠️ | Try/catch partout mais pas de gestion centralisée |
| Modularité | ⚠️ | Routes regroupées dans index.js (au lieu de fichiers séparés) |
| Frontend | ⚠️ | Monolithe app.js de ~3000 lignes |

---

## 3. Problèmes identifiés par priorité

### 🔴 Critique (bloquant pour la mise en production)

1. **Absence totale d'isolation multi-tenant** — Toutes les données sont partagées
2. **JWT_SECRET en dur** dans le code source
3. **Aucune validation des entrées utilisateur** — Risque d'injection SQL (même avec better-sqlite3 qui est paramétré, des failles logiques persistent)
4. **Routes métier sans restriction RBAC** — N'importe quel rôle authentifié peut tout voir

### 🟡 Important

5. **index.js monolithique** — Toutes les routes sont dans le même fichier (~400 lignes)
6. **app.js monolithique** — Frontend de ~3000 lignes sans séparation
7. **Aucune gestion d'erreur centralisée** — Pas de middleware d'erreur Express
8. **Aucun test** — Aucune couverture
9. **Aucune migration SQL versionnée** — Schéma géré dans database.js
10. **Aucune documentation API**

### 🟢 Améliorations possibles

11. Pas de .env.example complet
12. Pas de CONTRIBUTING.md
13. Pas de CHANGELOG.md
14. Pas de script de backup automatisé fonctionnel
15. Logs non structurés (pas de JSON)

---

## 4. Recommandations immédiates

1. **Créer une branche `develop`** et ne plus jamais commiter sur `main`
2. **Déplacer JWT_SECRET dans .env** et le supprimer du code
3. **Ajouter .env.example** avec toutes les variables documentées
4. **Mettre en place ESLint + Prettier** avant toute modification
5. **Ajouter les tests** (node:test natif comme préconisé dans le brief)
6. **Versionner les migrations SQL** dans `/migrations/`
7. **Restructurer index.js** en modules par domaine

---

*Fin de l'audit — À valider avec le développeur avant de passer à la Phase 1.*
