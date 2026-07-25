const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/calendar - Liste tous les événements
router.get('/', (req, res) => {
  try {
    const db = getDb();
    const { month, year } = req.query;
    let query = 'SELECT * FROM calendar_events';
    const params = [];

    if (month !== undefined && year !== undefined) {
      const m = parseInt(month);
      const y = parseInt(year);
      query += ` WHERE CAST(strftime('%m', date) AS INTEGER) = ? AND CAST(strftime('%Y', date) AS INTEGER) = ?`;
      params.push(m, y);
    }

    query += ' ORDER BY date ASC';
    const events = db.prepare(query).all(...params);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/calendar - Ajouter un événement
router.post('/', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { title, date, endDate, type, description } = req.body;

    if (!title || !date || !type) {
      return res.status(400).json({ error: 'Titre, date et type requis' });
    }

    const validTypes = ['academic', 'cultural', 'sport', 'holiday'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Type invalide' });
    }

    const id = uuidv4();
    db.prepare('INSERT INTO calendar_events (id, title, date, endDate, type, description) VALUES (?,?,?,?,?,?)')
      .run(id, title, date, endDate || date, type, description || '');

    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/calendar/:id - Modifier un événement
router.put('/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    const { title, date, endDate, type, description } = req.body;
    const existing = db.prepare('SELECT id FROM calendar_events WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Événement non trouvé' });

    db.prepare('UPDATE calendar_events SET title=?, date=?, endDate=?, type=?, description=? WHERE id=?')
      .run(title, date, endDate || date, type, description || '', req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/calendar/:id - Supprimer un événement
router.delete('/:id', authenticate, (req, res) => {
  try {
    const db = getDb();
    const result = db.prepare('DELETE FROM calendar_events WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
