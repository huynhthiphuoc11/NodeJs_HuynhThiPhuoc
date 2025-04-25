const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// API để lấy danh sách phòng trọ
router.get('/rentals', (req, res) => {
    const query = `
        SELECT 
            r.id, 
            r.room_code AS roomCode, 
            r.tenant_name AS tenantName, 
            r.phone_number AS phoneNumber, 
            r.start_date AS startDate, 
            r.payment_type_id AS paymentType, 
            r.notes 
        FROM room_rentals r
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch rentals' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;