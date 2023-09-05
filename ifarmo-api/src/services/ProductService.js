const connectionProcess = require('../database/ConnectDatabase');
const {verify} = require("jsonwebtoken");

class ProductService {
    productId;
    static async getProductById(req, res) {
        const productId = req.params.productId;
        const connection = await connectionProcess();
        const getProductQuery = `
            SELECT Products.*, Users.username
            FROM Products
                     LEFT JOIN Users ON Products.userId = Users.userId
            WHERE Products.productId = ?;
        `;

        connection.query(getProductQuery, [productId], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).json({error: 'Database error'});
            }
            if (results.length === 0) {
                return res.status(404).json({error: 'Product not found'});
            }

            const product = results[0];
            return res.status(200).json(product);
        });
    }

    static async createProduct(req, res) {
        const {title, type, description, quantity, unitType, price, city, userId} = req.body;
        console.log(req.body)
        const connection = await connectionProcess();

        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).send('Access denied');
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const checkFarmQuery = 'SELECT COUNT(*) as farmCount FROM Farms WHERE ownerId = ?';
        connection.query(checkFarmQuery, [decodedToken.userId], (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).send('Database error');
            }
            results[0].farmCount = parseInt(results[0].farmCount);
            const farmCount = results[0].farmCount;
            if (farmCount === 0) {
                return res.status(400).send('Farm does not exist for this user');
            }
            const insertProductQuery = `
                INSERT INTO Products (title, type, description, quantity, unitType, price, city, userId)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(insertProductQuery, [title, type, description, quantity, unitType, price, city, userId], (error) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).send('Database error');
                }
                return res.status(201).send('Product created successfully');
            });
        });
    }

    static async updateProduct(req, res) {
        const productId = req.body.productId;
        console.log(productId)
        const {title, type, description, quantity, unitType, price, city} = req.body;
        const connection = await connectionProcess();
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).json({error: 'Access denied'});
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const farmCountQuery = 'SELECT COUNT(*) as farmCount FROM Farms WHERE ownerId = ?';
        const [farmCountResult] = await connection.promise().query(farmCountQuery, [decodedToken.userId]);
        const farmCount = parseInt(farmCountResult[0].farmCount);
        if (farmCount === 0) {
            return res.status(400).json({error: 'Farm does not exist for this user'});
        }
        const updateProductQuery = `
            UPDATE Products
            SET title       = ?,
                type        = ?,
                description = ?,
                quantity    = ?,
                unitType    = ?,
                price       = ?,
                city        = ?
            WHERE productId = ?`;
        const [updateResult] = await connection.promise().query(updateProductQuery, [title, type, description, quantity, unitType, price, city, productId]);
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({error: 'Product not found'});
        }
        return res.status(200).json({message: 'Product updated successfully'});
    }

    static async deleteProduct(req, res) {
        const productId = req.body.productId;
        console.log(productId)
        const connection = await connectionProcess();
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).json({error: 'Access denied'});
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const farmCountQuery = 'SELECT COUNT(*) as farmCount FROM Farms WHERE ownerId = ?';
        const [farmCountResult] = await connection.promise().query(farmCountQuery, [decodedToken.userId]);
        const farmCount = parseInt(farmCountResult[0].farmCount);
        if (farmCount === 0) {
            return res.status(400).json({error: 'Farm does not exist for this user'});
        }
        const deleteProductQuery = 'DELETE FROM Products WHERE productId = ?';
        const [deleteResult] = await connection.promise().query(deleteProductQuery, [productId]);
        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({error: 'Product not found'});
        }
        return res.status(200).json({message: 'Product deleted successfully'});
    }
}

module.exports = ProductService;
