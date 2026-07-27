const express = require('express');
const router = express.Router();

const schoolsRouter = require('./schools');
const studentsRouter = require('./students');
const teachersRouter = require('./teachers');
const classesRouter = require('./classes');
const subjectsRouter = require('./subjects');
const gradesRouter = require('./grades');
const absencesRouter = require('./absences');

// Routes schools (y compris stats globales)
router.use('/schools', schoolsRouter);

// Routes métier avec paramètre :school
router.use('/:school/students', studentsRouter);
router.use('/:school/teachers', teachersRouter);
router.use('/:school/classes', classesRouter);
router.use('/:school/subjects', subjectsRouter);
router.use('/:school/grades', gradesRouter);
router.use('/:school/absences', absencesRouter);

module.exports = router;
