const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'gestion_scolaire.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema();
  }
  return db;
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin','teacher','student','parent')),
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      phone TEXT,
      profileUrl TEXT UNIQUE,
      isActive INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE NOT NULL,
      hireDate TEXT,
      speciality TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS parents (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE NOT NULL,
      classId TEXT,
      birthDate TEXT,
      parentId TEXT,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (parentId) REFERENCES parents(id)
    );

    CREATE TABLE IF NOT EXISTS academic_years (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      startYear INTEGER NOT NULL,
      endYear INTEGER NOT NULL,
      isActive INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS filieres (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      yearId TEXT,
      FOREIGN KEY (yearId) REFERENCES academic_years(id)
    );

    CREATE TABLE IF NOT EXISTS specialites (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      filiereId TEXT,
      FOREIGN KEY (filiereId) REFERENCES filieres(id)
    );

    CREATE TABLE IF NOT EXISTS classes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      level TEXT,
      filiereId TEXT,
      specialiteId TEXT,
      yearId TEXT,
      capacity INTEGER DEFAULT 35,
      FOREIGN KEY (filiereId) REFERENCES filieres(id),
      FOREIGN KEY (specialiteId) REFERENCES specialites(id),
      FOREIGN KEY (yearId) REFERENCES academic_years(id)
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT,
      credits INTEGER DEFAULT 0,
      teacherId TEXT,
      classId TEXT,
      FOREIGN KEY (teacherId) REFERENCES teachers(id),
      FOREIGN KEY (classId) REFERENCES classes(id)
    );

    CREATE TABLE IF NOT EXISTS grades (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      subjectId TEXT NOT NULL,
      grade REAL NOT NULL,
      maxGrade REAL DEFAULT 20,
      type TEXT CHECK(type IN ('interro','devoir','partiel')),
      label TEXT,
      date TEXT,
      FOREIGN KEY (studentId) REFERENCES students(id),
      FOREIGN KEY (subjectId) REFERENCES subjects(id)
    );

    CREATE TABLE IF NOT EXISTS absences (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      date TEXT NOT NULL,
      reason TEXT,
      justified INTEGER DEFAULT 0,
      type TEXT CHECK(type IN ('absence','retard')),
      duration INTEGER,
      FOREIGN KEY (studentId) REFERENCES students(id)
    );

    CREATE TABLE IF NOT EXISTS punitions (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      type TEXT CHECK(type IN ('colle','punition','exclusion_temp','avertissement')),
      description TEXT,
      hours INTEGER,
      duration TEXT,
      date TEXT,
      teacherId TEXT,
      FOREIGN KEY (studentId) REFERENCES students(id),
      FOREIGN KEY (teacherId) REFERENCES teachers(id)
    );

    CREATE TABLE IF NOT EXISTS bonus_malus (
      id TEXT PRIMARY KEY,
      studentId TEXT NOT NULL,
      teacherId TEXT NOT NULL,
      value INTEGER NOT NULL,
      reason TEXT,
      date TEXT,
      FOREIGN KEY (studentId) REFERENCES students(id),
      FOREIGN KEY (teacherId) REFERENCES teachers(id)
    );

    CREATE TABLE IF NOT EXISTS calendar_events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      endDate TEXT,
      type TEXT CHECK(type IN ('academic','cultural','sport','holiday')),
      description TEXT,
      createdAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT CHECK(type IN ('extrascolaire','culturelle')),
      description TEXT,
      schedule TEXT,
      maxStudents INTEGER DEFAULT 20,
      teacherId TEXT,
      FOREIGN KEY (teacherId) REFERENCES teachers(id)
    );

    CREATE TABLE IF NOT EXISTS activity_enrollments (
      id TEXT PRIMARY KEY,
      activityId TEXT NOT NULL,
      studentId TEXT NOT NULL,
      FOREIGN KEY (activityId) REFERENCES activities(id),
      FOREIGN KEY (studentId) REFERENCES students(id)
    );

    CREATE TABLE IF NOT EXISTS scholarships (
      id TEXT PRIMARY KEY,
      country TEXT NOT NULL,
      flag TEXT,
      name TEXT NOT NULL,
      eligibility TEXT,
      deadline TEXT,
      amount TEXT,
      process TEXT,
      url TEXT
    );

    CREATE TABLE IF NOT EXISTS candidates (
      id TEXT PRIMARY KEY,
      nom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      age INTEGER,
      phone TEXT,
      email TEXT,
      diplome TEXT,
      etablissement TEXT,
      moyenne TEXT,
      filiere TEXT,
      specialite TEXT,
      motivation TEXT,
      rdvDate TEXT,
      rdvTime TEXT,
      notes TEXT,
      status TEXT DEFAULT 'pending',
      createdAt TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS rdv_slots (
      id TEXT PRIMARY KEY,
      time TEXT NOT NULL,
      isActive INTEGER DEFAULT 1
    );
  `);
}

module.exports = { getDb };
