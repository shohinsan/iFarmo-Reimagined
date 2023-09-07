const connectionProcess = require('../database/ConnectDatabase');
const {verify} = require("jsonwebtoken");

class EquipmentService {

    static async getAllEquipment(req, res) {
        const connection = await connectionProcess();
        const search = req.query.search ? req.query.search.toLowerCase() : null;
        const maxPrice = req.query.maxPrice;
        let query = 'SELECT * FROM Equipment';
        const conditions = [];
        if (search) {
            conditions.push(`LOWER(title) LIKE '%${search}%'`);
        }
        if (maxPrice) {
            conditions.push(`price <= ${maxPrice}`);
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


    static async getEquipmentById(req, res) {
        const equipmentId = req.params.equipmentId;
        const connection = await connectionProcess();
        const getEquipmentQuery = 'SELECT * FROM Equipment WHERE equipmentId = ?';
        connection.query(getEquipmentQuery, [equipmentId], (error, equipmentResults) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).json({error: 'Database error'});
            }
            if (equipmentResults.length === 0) {
                return res.status(404).json({error: 'Equipment not found'});
            }

            const equipment = equipmentResults[0];
            return res.status(200).json(equipment);
        });
    }

    static async createEquipment(req, res) {
        const {title, type, description, quantity, unitType, price, city, farmId} = req.body;
        const connection = await connectionProcess();
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).send('Access denied');
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const checkFarmQuery = 'SELECT COUNT(*) as farmCount FROM Farms WHERE ownerId = ?';
        connection.query(checkFarmQuery, [decodedToken.userId], (error, results) => {
            results[0].farmCount = parseInt(results[0].farmCount);
            const farmCount = results[0].farmCount;
            if (farmCount === 0) {
                return res.status(400).send('Farm does not exist for this user');
            }
            const insertEquipmentQuery = `
                INSERT INTO Equipment (title, type, description, quantity, unitType, price, city)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(insertEquipmentQuery, [title, type, description, quantity, unitType, price, city, farmId], () => {
                return res.status(201).send('Equipment created successfully');
            });
        });
    }

    static async updateEquipment(req, res) {
        const equipmentId = req.body.equipmentId;
        const { title, type, description, quantity, unitType, price, city, farmId } = req.body;
        const connection = await connectionProcess();
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).send('Access denied');
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const checkFarmQuery = 'SELECT COUNT(*) as farmCount FROM Farms WHERE ownerId = ?';
        connection.query(checkFarmQuery, [decodedToken.userId], async (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database error' });
            }
            const farmCount = parseInt(results[0].farmCount);
            if (farmCount === 0) {
                return res.status(400).send('Farm does not exist for this user');
            }
            const updateEquipmentQuery = `UPDATE Equipment SET title = ?, type = ?, description = ?, quantity = ?, unitType = ?, price = ?, city = ? WHERE equipmentId = ?`;
            connection.query(updateEquipmentQuery, [title, type, description, quantity, unitType, price, city, equipmentId], (updateError, updateResults) => {
                if (updateError) {
                    return res.status(500).json({ error: 'Update error' });
                }
                if (updateResults.affectedRows === 0) {
                    return res.status(404).json({ error: 'Equipment not found' });
                }
                return res.status(201).send('Equipment updated successfully');
            });
        });
    }

    static async deleteEquipment(req, res) {
        const equipmentId = req.body.equipmentId;
        const connection = await connectionProcess();
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).send('Access denied');
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const checkFarmQuery = 'SELECT COUNT(*) as farmCount FROM Farms WHERE ownerId = ?';
        connection.query(checkFarmQuery, [decodedToken.userId], async (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database error' });
            }
            const farmCount = parseInt(results[0].farmCount);
            if (farmCount === 0) {
                return res.status(400).send('Farm does not exist for this user');
            }
            const deleteEquipmentQuery = `DELETE FROM Equipment WHERE equipmentId = ?`;
            connection.query(deleteEquipmentQuery, [equipmentId], (deleteError, deleteResults) => {
                if (deleteError) {
                    return res.status(500).json({ error: 'Delete error' });
                }
                if (deleteResults.affectedRows === 0) {
                    return res.status(404).json({ error: 'Equipment not found' });
                }
                return res.status(201).send('Equipment deleted successfully');
            });
        });
    }

}

module.exports = EquipmentService;