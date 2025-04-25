class RentalModel {
    constructor(db) {
        this.db = db;
    }

    create(rentalData) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO rentals (title, description, price, location) VALUES (?, ?, ?, ?)';
            this.db.query(query, [rentalData.title, rentalData.description, rentalData.price, rentalData.location], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    }

    find() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM room_rentals';
            this.db.query(query, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    delete(rentalId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM rentals WHERE id = ?';
            this.db.query(query, [rentalId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            });
        });
    }
}

module.exports = RentalModel;