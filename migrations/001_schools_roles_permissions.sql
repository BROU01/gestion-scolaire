-- ============================================
-- Migration 001 : Tables système multi-tenant
-- Date : 2026-07-27
-- ============================================

-- Table des écoles (tenants)
CREATE TABLE IF NOT EXISTS schools (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE,
  email TEXT,
  phone TEXT,
  address TEXT,
  logo_url TEXT,
  is_active INTEGER DEFAULT 1,
  config TEXT DEFAULT '{}',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Rôles (par école, configurables)
CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  school_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_system INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (school_id) REFERENCES schools(id)
);

-- Permissions système
CREATE TABLE IF NOT EXISTS permissions (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  module TEXT NOT NULL,
  description TEXT
);

-- Liaison rôles ↔ permissions
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id TEXT NOT NULL,
  permission_id TEXT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Journal d'audit (toute mutation métier)
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  school_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  old_values TEXT,
  new_values TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (school_id) REFERENCES schools(id)
);

-- Index pour les performances d'audit
CREATE INDEX IF NOT EXISTS idx_audit_school ON audit_log(school_id);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_date ON audit_log(created_at);

-- ============================================
-- Seed : Permissions système
-- ============================================
INSERT OR IGNORE INTO permissions (id, code, label, module, description) VALUES
  -- Dashboard
  ('p001', 'dashboard.read', 'Voir le tableau de bord', 'dashboard', 'Accès à la page d''accueil du tableau de bord'),

  -- Utilisateurs
  ('p010', 'users.read', 'Lister les utilisateurs', 'users', 'Voir la liste des utilisateurs'),
  ('p011', 'users.create', 'Créer un utilisateur', 'users', 'Ajouter un nouvel utilisateur'),
  ('p012', 'users.update', 'Modifier un utilisateur', 'users', 'Modifier les informations d''un utilisateur'),
  ('p013', 'users.delete', 'Supprimer un utilisateur', 'users', 'Supprimer un utilisateur'),

  -- Étudiants
  ('p020', 'students.read', 'Lister les étudiants', 'students', 'Voir la liste des étudiants'),
  ('p021', 'students.create', 'Créer un étudiant', 'students', 'Ajouter un nouvel étudiant'),
  ('p022', 'students.update', 'Modifier un étudiant', 'students', 'Modifier les informations d''un étudiant'),
  ('p023', 'students.delete', 'Supprimer un étudiant', 'students', 'Supprimer un étudiant'),

  -- Enseignants
  ('p030', 'teachers.read', 'Lister les enseignants', 'teachers', 'Voir la liste des enseignants'),
  ('p031', 'teachers.create', 'Créer un enseignant', 'teachers', 'Ajouter un nouvel enseignant'),
  ('p032', 'teachers.update', 'Modifier un enseignant', 'teachers', 'Modifier les informations d''un enseignant'),
  ('p033', 'teachers.delete', 'Supprimer un enseignant', 'teachers', 'Supprimer un enseignant'),

  -- Classes
  ('p040', 'classes.read', 'Lister les classes', 'classes', 'Voir la liste des classes'),
  ('p041', 'classes.create', 'Créer une classe', 'classes', 'Ajouter une nouvelle classe'),
  ('p042', 'classes.update', 'Modifier une classe', 'classes', 'Modifier les informations d''une classe'),
  ('p043', 'classes.delete', 'Supprimer une classe', 'classes', 'Supprimer une classe'),

  -- Matières
  ('p050', 'subjects.read', 'Lister les matières', 'subjects', 'Voir la liste des matières'),
  ('p051', 'subjects.create', 'Créer une matière', 'subjects', 'Ajouter une nouvelle matière'),
  ('p052', 'subjects.update', 'Modifier une matière', 'subjects', 'Modifier une matière'),
  ('p053', 'subjects.delete', 'Supprimer une matière', 'subjects', 'Supprimer une matière'),

  -- Notes
  ('p060', 'grades.read', 'Consulter les notes', 'grades', 'Voir les notes des étudiants'),
  ('p061', 'grades.create', 'Saisir une note', 'grades', 'Ajouter ou modifier une note'),
  ('p062', 'grades.delete', 'Supprimer une note', 'grades', 'Supprimer une note'),

  -- Absences
  ('p070', 'absences.read', 'Consulter les absences', 'absences', 'Voir les absences et retards'),
  ('p071', 'absences.create', 'Signaler une absence', 'absences', 'Ajouter une absence ou un retard'),
  ('p072', 'absences.delete', 'Supprimer une absence', 'absences', 'Supprimer une absence'),

  -- Punitions
  ('p080', 'punitions.read', 'Consulter les punitions', 'punitions', 'Voir les punitions'),
  ('p081', 'punitions.create', 'Ajouter une punition', 'punitions', 'Ajouter une punition'),
  ('p082', 'punitions.delete', 'Supprimer une punition', 'punitions', 'Supprimer une punition'),

  -- Filières
  ('p090', 'filieres.read', 'Lister les filières', 'filieres', 'Voir les filières'),
  ('p091', 'filieres.manage', 'Gérer les filières', 'filieres', 'Ajouter, modifier ou supprimer des filières'),

  -- Spécialités
  ('p100', 'specialites.read', 'Lister les spécialités', 'specialites', 'Voir les spécialités'),
  ('p101', 'specialites.manage', 'Gérer les spécialités', 'specialites', 'Ajouter, modifier ou supprimer des spécialités'),

  -- Années académiques
  ('p110', 'academic_years.manage', 'Gérer les années académiques', 'years', 'Ajouter, modifier ou supprimer des années académiques'),

  -- Calendrier
  ('p120', 'calendar.read', 'Voir le calendrier', 'calendar', 'Consulter le calendrier des événements'),
  ('p121', 'calendar.manage', 'Gérer les événements', 'calendar', 'Ajouter, modifier ou supprimer des événements'),

  -- Activités
  ('p130', 'activities.read', 'Voir les activités', 'activities', 'Consulter les activités parascolaires'),
  ('p131', 'activities.manage', 'Gérer les activités', 'activities', 'Ajouter, modifier ou supprimer des activités'),

  -- Bonus/Malus
  ('p140', 'bonus_malus.read', 'Voir bonus/malus', 'bonus_malus', 'Consulter les points bonus/malus'),
  ('p141', 'bonus_malus.create', 'Attribuer bonus/malus', 'bonus_malus', 'Attribuer des points bonus ou malus'),

  -- Candidatures
  ('p150', 'candidates.read', 'Voir les candidatures', 'candidates', 'Consulter les candidatures'),
  ('p151', 'candidates.manage', 'Gérer les candidatures', 'candidates', 'Traiter les candidatures'),

  -- École (admin tenant)
  ('p200', 'school.read', 'Voir les paramètres', 'school', 'Consulter les paramètres de l''école'),
  ('p201', 'school.update', 'Modifier les paramètres', 'school', 'Modifier les paramètres de l''école'),
  ('p202', 'school.users.manage', 'Gérer les utilisateurs', 'school', 'Gérer les comptes utilisateurs de l''école'),
  ('p203', 'school.roles.manage', 'Gérer les rôles', 'school', 'Configurer les rôles et permissions'),

  -- Super-admin (plateforme)
  ('p900', 'superadmin.all', 'Super-administration', 'superadmin', 'Accès complet à toutes les écoles et à la plateforme'),
  ('p901', 'superadmin.schools', 'Gérer les écoles', 'superadmin', 'Créer, activer, désactiver des écoles'),
  ('p902', 'superadmin.stats', 'Voir les stats globales', 'superadmin', 'Consulter les statistiques de la plateforme');

-- ============================================
-- Seed : Rôles système par défaut
-- ============================================
-- Les rôles sont créés par école via le code, pas ici.
-- Ce fichier définit seulement la structure.
