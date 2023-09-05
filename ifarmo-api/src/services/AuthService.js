const bcrypt = require('bcryptjs/dist/bcrypt');
const connectionProcess = require("../database/ConnectDatabase");

class AuthService {
    async getUserByUsername(username) {
        const getUserQuery = `SELECT * FROM Users  WHERE username = ?`;
        return new Promise(async (resolve) => {
            const connection = await connectionProcess();
            connection.query(getUserQuery, [username], (error, results) => {
                resolve(results);
            });
        });
    }

    async checkExistingUser(connection, userData) {
        const checkExistingUserQuery = 'SELECT * FROM Users WHERE username = ? OR email = ?';
        return new Promise((resolve) => {
            connection.query(checkExistingUserQuery, [userData.username, userData.email], (error, results) => {
                resolve(results.length > 0);
            });
        });
    }

    async registerDefaultUser(userData) {
        const connection = await connectionProcess();
        const userExists = await this.checkExistingUser(connection, userData);
        if (userExists) { return 'Username or email already exists'}
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        const insertUserQuery = 'INSERT INTO Users (name, email, username, password) VALUES (?, ?, ?, ?)';
        await new Promise((resolve) => {
            connection.query(insertUserQuery, [userData.name, userData.email, userData.username, hashedPassword], () => {
                resolve();
            });
        });
    }

}

module.exports = AuthService;

/*
 static async refreshAuthToken(req, res) {
        try {
            const refreshToken = req.cookies['refresh-token'];
            if (!refreshToken) {
                return res.status(401).send({
                    message: 'Refresh token not found.',
                });
            }
            const payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (!payload) {
                return res.status(401).send({
                    message: 'User is not authenticated.',
                });
            }
            const userId = payload.userId;
            const refreshTokenQuery = `SELECT token, expiredAt FROM Tokens WHERE userId = ? AND token = ? AND expiredAt >= NOW()`;

            const results = await connectionProcess.query(refreshTokenQuery, [userId, refreshToken]);

            if (results.length === 0) {
                return res.status(401).send({
                    message: 'Refresh token is invalid or expired.',
                });
            }

            const token = sign({ userId: payload.userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

            return res.status(200).send({
                message: 'Token refreshed.',
                token: token,
            });
        } catch (error) {
            console.error('Error during token refresh:', error);
            return res.status(500).send({ message: 'An error occurred during token refresh.' });
        }
    }
 */