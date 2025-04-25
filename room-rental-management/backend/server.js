// server.js - Node.js server with Express
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Database connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'password', // Replace with your MySQL password
    database: 'room_rental_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create table if not exists (run once at startup)
async function initDatabase() {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            CREATE TABLE IF NOT EXISTS rentals (
                id INT AUTO_INCREMENT PRIMARY KEY,
                roomCode VARCHAR(20) UNIQUE NOT NULL,
                tenantName VARCHAR(100) NOT NULL,
                phoneNumber VARCHAR(20) NOT NULL,
                startDate DATE NOT NULL,
                paymentType INT NOT NULL,
                notes TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        connection.release();
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Initialize database when server starts
initDatabase();

// API Routes

// Get all rentals
app.get('/api/rentals', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rentals ORDER BY id');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching rentals:', error);
        res.status(500).json({ error: 'Failed to fetch rentals' });
    }
});

// Check if room code exists
app.get('/api/rentals/checkRoomCode', async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).json({ error: 'Room code is required' });
    }
    
    try {
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM rentals WHERE roomCode = ?', [code]);
        res.json({ exists: rows[0].count > 0 });
    } catch (error) {
        console.error('Error checking room code:', error);
        res.status(500).json({ error: 'Failed to check room code' });
    }
});

// Create a new rental
app.post('/api/rentals', async (req, res) => {
    const { roomCode, tenantName, phoneNumber, startDate, paymentType, notes } = req.body;

    if (!roomCode || !tenantName || !phoneNumber || !startDate || !paymentType) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO rentals (roomCode, tenantName, phoneNumber, startDate, paymentType, notes) VALUES (?, ?, ?, ?, ?, ?)',
            [roomCode, tenantName, phoneNumber, startDate, paymentType, notes]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error('Error creating rental:', error);
        res.status(500).json({ error: 'Failed to create rental' });
    }
});

// Delete a rental by ID
app.delete('/api/rentals/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM rentals WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Rental deleted successfully' });
        } else {
            res.status(404).json({ error: 'Rental not found' });
        }
    } catch (error) {
        console.error('Error deleting rental:', error);
        res.status(500).json({ error: 'Failed to delete rental' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});