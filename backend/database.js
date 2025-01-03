const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'wishlist.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database', err);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

const initializeDatabase = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS wishlist (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Destination TEXT NOT NULL,
            Country TEXT,
            Cost TEXT,
            Priority TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Table "wishlist" is ready.');
        }
    });
};

module.exports = db;