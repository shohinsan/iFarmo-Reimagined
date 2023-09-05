const mysql = require('mysql2');
require('dotenv').config();

function connectionProcess() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
        });
        connection.connect(err => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

module.exports = connectionProcess;