class UserModel {
    constructor(db) {
        this.db = db;
    }

    createUser(userData) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
            this.db.query(query, [userData.name, userData.email], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users';
            this.db.query(query, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
}

module.exports = UserModel;