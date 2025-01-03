const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// Get entire wishlist
app.get('/api/', (req, res) => {
    db.all('SELECT * FROM wishlist', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Replace the wishlist
app.put('/api/', (req, res) => {
    db.serialize(() => {
        db.run('DELETE FROM wishlist', (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
        });

        const stmt = db.prepare('INSERT INTO wishlist (Destination, Country, Cost, Priority) VALUES (?, ?, ?, ?)');
        req.body.forEach(item => {
            stmt.run(item.Destination, item.Country, item.Cost, item.Priority);
        });
        stmt.finalize();
        res.json({ status: 'REPLACE COLLECTION SUCCESSFUL' });
    });
});

// Add a new destination
app.post('/api/', (req, res) => {
    const { Destination, Country, Cost, Priority } = req.body;
    db.run(
        'INSERT INTO wishlist (Destination, Country, Cost, Priority) VALUES (?, ?, ?, ?)',
        [Destination, Country, Cost, Priority],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ status: 'CREATE ENTRY SUCCESSFUL', id: this.lastID });
            }
        }
    );
});

// Delete the entire wishlist
app.delete('/api/', (req, res) => {
    db.run('DELETE FROM wishlist', (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ status: 'DELETE COLLECTION SUCCESSFUL' });
        }
    });
});

// Get a destination by ID
app.get('/api/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM wishlist WHERE ID = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.json(row);
        }
    });
});

// Update a destination by ID
app.put('/api/:id', (req, res) => {
    const id = req.params.id;
    const { Destination, Country, Cost, Priority } = req.body;
    db.run(
        'UPDATE wishlist SET Destination = ?, Country = ?, Cost = ?, Priority = ? WHERE ID = ?',
        [Destination, Country, Cost, Priority, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ status: 'UPDATE ITEM SUCCESSFUL' });
            }
        }
    );
});

// Delete a destination by ID
app.delete('/api/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM wishlist WHERE ID = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ status: 'DELETE ITEM SUCCESSFUL' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
