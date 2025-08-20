const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all mobiles
router.get('/', (req, res) => {
  db.query('SELECT * FROM mobiles', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a mobile by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM mobiles WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// Add a new mobile
router.post('/', (req, res) => {
  const { mobile, price, ram, storage } = req.body;
  db.query(
    'INSERT INTO mobiles (mobile, price, ram, storage) VALUES (?, ?, ?, ?)',
    [mobile, price, ram, storage],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, message: 'Mobile added' });
    }
  );
});

// Update a mobile
router.put('/:id', (req, res) => {
  const { mobile, price, ram, storage } = req.body;
  db.query(
    'UPDATE mobiles SET mobile = ?, price = ?, ram = ?, storage = ? WHERE id = ?',
    [mobile, price, ram, storage, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Mobile updated' });
    }
  );
});

// Delete a mobile
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM mobiles WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Mobile deleted' });
  });
});

module.exports = router;
