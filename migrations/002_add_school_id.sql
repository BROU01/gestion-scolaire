-- ============================================
-- Migration 002 : Ajout de school_id sur les tables métier
-- Date : 2026-07-27
-- Nécessite migration 001 (table schools)
-- ============================================

-- ATTENTION : SQLite ne supporte pas ALTER TABLE ADD COLUMN avec contrainte NOT NULL
-- On ajoute la colonne NULLABLE d'abord, puis on la remplit, puis on crée les index.
-- Les contraintes NOT NULL seront gérées au niveau application.

-- users
ALTER TABLE users ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_users_school ON users(school_id);

-- teachers
ALTER TABLE teachers ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_teachers_school ON teachers(school_id);

-- students
ALTER TABLE students ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_students_school ON students(school_id);

-- parents
ALTER TABLE parents ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_parents_school ON parents(school_id);

-- academic_years
ALTER TABLE academic_years ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_academic_years_school ON academic_years(school_id);

-- filieres
ALTER TABLE filieres ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_filieres_school ON filieres(school_id);

-- specialites
ALTER TABLE specialites ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_specialites_school ON specialites(school_id);

-- classes
ALTER TABLE classes ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_classes_school ON classes(school_id);

-- subjects
ALTER TABLE subjects ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_subjects_school ON subjects(school_id);

-- grades
ALTER TABLE grades ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_grades_school ON grades(school_id);

-- absences
ALTER TABLE absences ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_absences_school ON absences(school_id);

-- punitions
ALTER TABLE punitions ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_punitions_school ON punitions(school_id);

-- bonus_malus
ALTER TABLE bonus_malus ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_bonus_malus_school ON bonus_malus(school_id);

-- calendar_events
ALTER TABLE calendar_events ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_school ON calendar_events(school_id);

-- activities
ALTER TABLE activities ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_activities_school ON activities(school_id);

-- activity_enrollments
ALTER TABLE activity_enrollments ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_activity_enrollments_school ON activity_enrollments(school_id);

-- scholarships
ALTER TABLE scholarships ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_scholarships_school ON scholarships(school_id);

-- candidates
ALTER TABLE candidates ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_candidates_school ON candidates(school_id);

-- rdv_slots
ALTER TABLE rdv_slots ADD COLUMN school_id TEXT REFERENCES schools(id);
CREATE INDEX IF NOT EXISTS idx_rdv_slots_school ON rdv_slots(school_id);
