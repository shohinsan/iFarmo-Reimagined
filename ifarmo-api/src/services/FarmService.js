const connectionProcess = require('../database/ConnectDatabase');
const {verify} = require("jsonwebtoken");

class FarmService {
    static async getFarmByOwnerId(req, res) {
        const token = req.cookies['access-token'];

        if (!token) {
            return res.status(401).send('Access denied');
        }
        const decoded = verify(token, process.env.TOKEN_SECRET);
        console.log(decoded);
        if (decoded.role !== 'farmer') {
            return res.status(401).send('Access denied');
        }
        console.log(decoded);
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
                name: farm.name,
                location: farm.location,
                workingHours: farm.workingHours,
                ownerId: farm.ownerId,
            };
            return res.status(200).json(farmData);
        });
    }

    static async createFarm(req, res) {
        const { name, location, workingHours } = req.body;

        try {
            const connection = await connectionProcess();
            const token = req.cookies['access-token'];

            if (!token) {
                return res.status(401).send('Access denied');
            }

            const decodedToken = verify(token, process.env.TOKEN_SECRET);

            const checkFarmQuery = 'SELECT COUNT(*) as farmCount FROM Farms WHERE ownerId = ?';
            console.log(decodedToken.userId);

            connection.query(checkFarmQuery, [decodedToken.userId], (checkError, checkResults) => {
                if (checkError) {
                    console.error('Error checking farm:', checkError);
                    return res.status(500).send('An error occurred while checking the farm');
                }

                if (parseInt(checkResults[0].farmCount) > 0) {
                    return res.status(400).send('Farm already exists for this user');
                }

                const insertFarmQuery = 'INSERT INTO Farms (name, location, workingHours, ownerId) VALUES (?, ?, ?, ?)';
                connection.query(insertFarmQuery, [name, location, workingHours, decodedToken.userId], (insertError) => {
                    if (insertError) {
                        console.error('Error inserting farm:', insertError);
                        return res.status(500).send('An error occurred while creating the farm');
                    }

                    return res.status(201).send('Farm created successfully');
                });
            });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send('An error occurred');
        }
    }


    static async updateFarm(req, res) {
        const {farmId, name, location, workingHours} = req.body;

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
                    const updateFarmQuery = 'UPDATE Farms SET name = ?, location = ?, workingHours = ? WHERE farmId = ?';
                    connection.query(updateFarmQuery, [name, location, workingHours, farmId], (updateError, updateResults) => {
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






