const bcrypt = require('bcryptjs/dist/bcrypt');
const connectionProcess = require('../database/ConnectDatabase');
const {verify} = require("jsonwebtoken");
const {userValidation} = require("../utils/ValidationUtil");
const {passwordValidation} = require("../config/ValidationConfig");

class UserService {
    async fetchUser(userId) {
        const getUserQuery = `SELECT userId, name, username, email, role, createdAt FROM Users WHERE userId = ?`;
        const connection = await connectionProcess();
        return new Promise((resolve) => {
            connection.query(getUserQuery, [userId], (error, results) => {
                resolve(results.length === 0 ? null : results[0]);
            });
        });
    }

    async updateDB(userId, updatedUserData) {
        const getUserQuery = 'SELECT * FROM Users WHERE userId = ?';
        const connection = await connectionProcess();
        return new Promise((resolve) => {
            connection.query(getUserQuery, [userId], (getUserError, userResults) => {
                if (getUserError) {
                    resolve({error: getUserError})
                }
                if (userResults.length === 0) {
                    resolve({notFound: true})
                }
                const existingUser = userResults[0];
                if (existingUser.name === updatedUserData.name &&
                    existingUser.username === updatedUserData.username &&
                    existingUser.email === updatedUserData.email &&
                    existingUser.role === updatedUserData.role) {
                    resolve({upToDate: true});
                }
                const updateUserQuery = `UPDATE Users SET name = ?, username = ?, email = ?,  role = ? WHERE userId = ?`;
                connection.query(updateUserQuery,
                    [updatedUserData.name, updatedUserData.username, updatedUserData.email, updatedUserData.role, userId], (updateError) => {
                        if (updateError) {
                            resolve({error: updateError})
                        }
                        resolve({success: true});
                    });
            });
        });
    }


    static async getAllUsers(req, res) {
        const connection = await connectionProcess();
        const search = req.query.search ? req.query.search.toLowerCase() : null;
        const role = req.query.role;
        let query = 'SELECT userId, name, username, email, role FROM Users';
        const conditions = [];
        if (search) {
            conditions.push(`LOWER(name) LIKE '%${search}%'`);
        }
        if (role) {
            conditions.push(`role = '${role}'`);
        }
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).send('Database error');
            }
            return res.status(200).json(results);
        });
    }

    static async changePassword(req, res) {
        const body = req.body;
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).send('Access denied');
        }
        const {error} = passwordValidation(body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const getUserQuery = 'SELECT * FROM Users WHERE userId = ?';
        const connection = await connectionProcess();
        connection.query(getUserQuery, [decodedToken.userId], async (getUserError, userResults) => {
            if (getUserError) {
                console.error('Error executing query:', getUserError);
                return res.status(500).send('Database error');
            }
            if (userResults.length === 0) {
                return res.status(404).send('User not found');
            }
            const existingUser = userResults[0];
            const isPasswordValid = await bcrypt.compare(body.password, existingUser.password);
            if (!isPasswordValid) {
                return res.status(400).send('Invalid password');
            }
            if (body.new_password !== body.confirm_new_password) {
                return res.status(400).send('New passwords do not match');
            }
            const hashedPassword = await bcrypt.hash(body.new_password, 12);
            const changePasswordQuery = `UPDATE Users SET password = ? WHERE userId = ?`;
            connection.query(changePasswordQuery, [hashedPassword, decodedToken.userId], (updateError) => {
                if (updateError) {
                    console.error('Error executing query:', updateError);
                    return res.status(500).send('Database error');
                }
                return res.status(200).send('Password changed successfully');
            });
        });
    }

    static async deleteUser(req, res) {
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).send('Access denied');
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const deleteUserQuery = `DELETE FROM Users WHERE userId = ?`;
        const connection = await connectionProcess();
        connection.query(deleteUserQuery, [decodedToken.userId], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).send('Database error');
            }
            return res.status(200).send('User deleted successfully');
        });
    }

    static async getUserProfile(req, res) {
        const username = req.params.username;
        const connection = await connectionProcess();
        const getUserQuery = `SELECT userId, name, username, email, role, createdAt FROM Users WHERE username = ?`;
        const getProductsQuery = `SELECT Products.*, Users.username FROM Products LEFT JOIN Users ON Products.userId = Users.userId`;
        const getJobsQuery = `SELECT Jobs.*, Users.username FROM Jobs LEFT JOIN Users ON Jobs.userId = Users.userId`;
        const getEquipmentQuery = `SELECT Equipment.*, Users.username FROM Equipment LEFT JOIN Users ON Equipment.userId = Users.userId`;
        const userResults = await new Promise((resolve) => {
            connection.query(getUserQuery, [username], (error, results) => {
                resolve(results);
            });
        });
        const user = userResults[0];
        const userId = user ? user.userId : null;
        if (userId === null) {
            return res.status(404).send('User does not exist in the database');
        }
        const getFarmsQuery = `SELECT * FROM Farms WHERE ownerId = ?`;
        const farmResults = await new Promise((resolve) => {
            connection.query(getFarmsQuery, [userId], (error, results) => {
                resolve(results);
            });
        });
        const productResults = await new Promise((resolve) => {
            connection.query(getProductsQuery, [userId], (error, results) => {
                resolve(results);
            });
        });
        const jobResults = await new Promise((resolve) => {
            connection.query(getJobsQuery, [userId], (error, results) => {
                resolve(results);
            });
        });
        const equipmentResults = await new Promise((resolve) => {
            connection.query(getEquipmentQuery, [userId], (error, results) => {
                resolve(results);
            });
        });
        const userProfile = {
            user: user,
            farms: farmResults,
            products: productResults,
            jobs: jobResults,
            equipment: equipmentResults
        };
        res.status(200).json(userProfile);
    }
}

module.exports = UserService;
