const connectionProcess = require('../database/ConnectDatabase');
const {verify} = require("jsonwebtoken");
const AuthService = require("./AuthService");
const authService = new AuthService();

class FarmService {

    static async getAllFarms(req, res) {
        const connection = await connectionProcess();
        const search = req.query.search ? req.query.search.toLowerCase() : null;
        let query = 'SELECT * FROM Farms';
        const conditions = [];
        if (search) {
            conditions.push(`LOWER(name) LIKE '%${search}%'`);
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

    static async getFarmByOwnerId(req, res) {
        const farmOwnerId = req.params.farmOwnerId;
        const connection = await connectionProcess();
        const getFarmQuery = 'SELECT * FROM Farms WHERE ownerId = ?';
        connection.query(getFarmQuery, [farmOwnerId], (error, farmResults) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).send('Database error');
            }
            if (farmResults.length === 0) {
                return res.status(404).send('Farm not found');
            }
            const farm = farmResults[0];
            const farmData = {
                farmId: farm.farmId,
                title: farm.title,
                location: farm.location,
                workingHours: farm.workingHours,
                ownerId: farm.ownerId,
            };
            return res.status(200).json(farmData);
        });
    }

    static async createFarm(req, res) {
        const { title, location, workingHours, username } = req.body;
        const connection = await connectionProcess();
        const getUserQuery = 'SELECT * FROM Users WHERE username = ?';
        const user = await new Promise((resolve) => {
            connection.query(getUserQuery, [username], (error, results) => {
                resolve(results[0]);
            });
        });
        if (!user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }
        const userId = user.userId;
        const checkFarmQuery = 'SELECT COUNT(*) as farmCount FROM Farms WHERE ownerId = ?';
        connection.query(checkFarmQuery, [userId], (checkError, checkResults) => {
            if (checkError) {
                console.error('Error checking farm:', checkError);
                return res.status(500).send('An error occurred while checking the farm');
            }
            if (parseInt(checkResults[0].farmCount) > 0) {
                return res.status(400).send('Farm already exists for this user');
            }
            const insertFarmQuery = 'INSERT INTO Farms (title, location, workingHours, ownerId) VALUES (?, ?, ?, ?)';
            connection.query(insertFarmQuery, [title, location, workingHours, userId], (insertError) => {
                if (insertError) {
                    console.error('Error inserting farm:', insertError);
                    return res.status(500).send('An error occurred while creating the farm');
                }
                return res.status(201).send('Farm created successfully');
            });
        });
    }

    static async updateFarm(req, res) {
        const {farmId, title, location, workingHours} = req.body;

        try {
            const connection = await connectionProcess();
            const token = req.cookies['access-token'];

            if (!token) {
                return res.status(401).send('Access denied');
            }

            try {
                const decodedToken = verify(token, process.env.TOKEN_SECRET);

                // Check if the farm exists
                const getFarmQuery = 'SELECT * FROM Farms WHERE farmId = ?';
                connection.query(getFarmQuery, [farmId], (error, farmResults) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        return res.status(500).send('Database error');
                    }

                    if (farmResults.length === 0) {
                        return res.status(404).send('Farm not found');
                    }

                    const farm = farmResults[0];

                    // Check if the farm is associated with the user
                    if (farm.ownerId !== decodedToken.userId) {
                        return res.status(401).send('Access denied');
                    }

                    // Update the farm details
                    const updateFarmQuery = 'UPDATE Farms SET title = ?, location = ?, workingHours = ? WHERE farmId = ?';
                    connection.query(updateFarmQuery, [title, location, workingHours, farmId], (updateError, updateResults) => {
                        if (updateError) {
                            console.error('Error executing query:', updateError);
                            return res.status(500).send('Database error');
                        }

                        return res.status(200).send('Farm updated successfully');
                    });
                });
            } catch (error) {
                console.error(error);
                return res.status(401).send('Invalid token');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

    static async deleteFarm(req, res) {
        const {farmId} = req.body;

        try {
            const connection = await connectionProcess();
            const token = req.cookies['access-token'];

            if (!token) {
                return res.status(401).send('Access denied');
            }

            try {
                const decodedToken = verify(token, process.env.TOKEN_SECRET);

                // Check if the farm exists
                const getFarmQuery = 'SELECT * FROM Farms WHERE farmId = ?';
                connection.query(getFarmQuery, [farmId], (error, farmResults) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        return res.status(500).send('Database error');
                    }

                    if (farmResults.length === 0) {
                        return res.status(404).send('Farm not found');
                    }

                    const farm = farmResults[0];

                    // Check if the farm is associated with the user
                    if (farm.ownerId !== decodedToken.userId) {
                        return res.status(401).send('Access denied');
                    }

                    // Delete the farm
                    const deleteFarmQuery = 'DELETE FROM Farms WHERE farmId = ?';
                    connection.query(deleteFarmQuery, [farmId], (deleteError, deleteResults) => {
                        if (deleteError) {
                            console.error('Error executing query:', deleteError);
                            return res.status(500).send('Database error');
                        }

                        return res.status(200).send('Farm deleted successfully');
                    });
                });
            } catch (error) {
                console.error(error);
                return res.status(401).send('Invalid token');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

}

module.exports = FarmService;






