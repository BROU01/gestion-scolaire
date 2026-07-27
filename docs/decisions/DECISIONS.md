# Décisions à valider — Phase 0 → Phase 1

> **Rôle :** Tech Lead  
> **À valider par :** Développeur humain  
> **Date :** 2026-07-27

---

## Décision 1 — Hébergement : où déployer le backend ?

**Contexte :** Tu as déjà le repo sur GitHub Pages, mais GitHub Pages sert uniquement des fichiers statiques. Le backend Node.js nécessite un serveur.

**Options :**

| Option | Prix | Avantage | Inconvénient |
|---|---|---|---|
| **Render** | Gratuit (0-1$ pour dev) | Déploiement GitHub, SSL auto, facile | Dors après inactivité (cold start) |
| **Railway** | Gratuit (5$ crédit) | Simple, déploiement GitHub | Plus cher ensuite |
| **VPS (Hetzner/OVH)** | ~3-5€/mois | Contrôle total, pas de cold start | Configuration manuelle |
| **Fly.io** | Gratuit (3$ crédit) | Edge compute, proche Afrique Ouest | Moins mature |

**💡 Recommandation Tech Lead :** Render (gratuit + rapidité) comme POC, VPS Hetzner à 3.5€/mois pour la production.

## Décision 2 — Multi-tenant : sous-domaines vs paramètre URL

**Contexte :** Comment distinguer les écoles dans l'URL ?

**Options :**

| Option | Exemple |
|---|---|
| **Sous-domaines** | `saint-michel.tondomaine.com` |
| **Paramètre URL** | `tondomaine.com/?school=saint-michel` |
| **Chemin** | `tondomaine.com/saint-michel/` |

**💡 Recommandation Tech Lead :** Sous-domaines. Plus propre, meilleur SEO, isolation naturelle. Nécessite wildcard DNS (facile avec Render ou VPS).

## Décision 3 — JWT_SECRET : stockage et rotation

**Contexte :** Actuellement en dur dans le code.

**Option retenue :** `.env` + génération automatique avec `openssl rand -hex 32` si absent.
- Rotation trimestrielle via script
- Support multi-clés (ancien + nouveau pour transition)

## Décision 4 — Validation entrées : niveau de sévérité

**Contexte :** `express-validator` est déjà installé mais jamais utilisé.

**Proposition :**
- ✅ Types : vérifier que `grade` est bien un nombre, `email` un email, etc.
- ✅ Longueurs : limiter les strings (`VARCHAR(255)` sur les champs libres)
- ✅ Présence : champs obligatoires vérifiés (déjà fait manuellement, à standardiser)
- ✅ Sanitization : trim + escape HTML basique

## Décision 5 — Tests : périmètre initial

**Proposition :**
- Tests d'intégration sur les endpoints REST (priorité 1)
- Tests d'isolation multi-tenant (priorité 2)
- Tests de validation d'entrée (priorité 3)
- Pas de tests E2E dans cette phase (trop coûteux)

## Décision 6 — Migration SQLite → PostgreSQL : quand ?

**Contexte :** Le brief dit "Phase 6", mais si tu as déjà GitHub Pages, tu n'as pas de backend en ligne.

**Proposition :**
- SQLite suffit pour Phase 1-5 (3 écoles pilotes, < 1000 élèves chacune)
- PostgreSQL en Phase 6 quand on passe à 20+ écoles
- **Abstraction DB dès maintenant** : un helper `db.js` qui encapsule better-sqlite3
  - Toutes les requêtes passent par ce helper
  - Le jour où on migre vers PostgreSQL, on change UN fichier

## Décision 7 — Branche git : passer en workflow git flow

**Proposition :**
- `main` → production (protégée, pas de push direct)
- `develop` → intégration courante
- `feature/phase1-*` → branches de fonctionnalité
- PR obligatoire pour merger dans `develop`

## Décision 8 — Priorité : PostgreSQL ou tests d'abord ?

**Contexte :** Ta question initiale portait sur "migration postgreSQL, tests automatisés, puis déploiement".

**Analyse :**
1. **Tests d'abord** → Essentiel avant toute modification majeure
2. **Multi-tenant (Phase 1)** → Bloque toute la suite du projet
3. **Déploiement Render** → Peut se faire en parallèle de la Phase 1
4. **PostgreSQL** → À repousser à Phase 6 comme prévu dans le brief

**💡 Recommandation Tech Lead :** Ne PAS faire PostgreSQL maintenant. Faire dans l'ordre :
1. ✅ Phase 0 (AUDIT + ARCHITECTURE + PLAN) — en cours
2. 🔜 Tests de base + GitHub Actions CI
3. 🔜 Phase 1 (Multi-tenant + RBAC)
4. 🔜 Déploiement Render (backend) + GitHub Pages (frontend statique)
5. 🔜 PostgreSQL bien plus tard (Phase 6)

---

## Décision 9 — Déploiement : architecture cible

```
GitHub Pages (public/)  ← Frontend statique (HTML/CSS/JS)
    ↕ API calls
Render / VPS (server/)  ← Backend Node.js + SQLite → PostgreSQL
```

- ✅ GitHub Pages : pages publiques (accueil, activités, bourses, inscription)
- ✅ Admin panel : servi par le backend Express (comme maintenant) OU sur GitHub Pages
- ✅ Avantage : zéro coût d'hébergement frontend

---

## Récapitulatif des validations attendues

| # | Décision | Recommandation | ✅ / ❌ |
|---|---|---|---|
| 1 | Hébergement backend | Render (POC) → VPS Hetzner (prod) | — |
| 2 | Multi-tenant | Sous-domaines | — |
| 3 | JWT_SECRET | .env + rotation trimestrielle | — |
| 4 | Validation entrées | express-validator actif | — |
| 5 | Tests périmètre | Intégration + isolation tenant | — |
| 6 | SQLite → PostgreSQL | Phase 6 (abstraction DB dès maintenant) | — |
| 7 | Git workflow | feature branches + PR | — |
| 8 | Ordre priorités | Tests → Multi-tenant → Déploiement → PG | — |
| 9 | Architecture déploiement | GH Pages frontend + Node.js backend | — |

---

**En attente de TA validation avant de passer à la Phase 1.** Dis-moi ce que tu valides/invalides/modifies ! 🎯
