const connectionProcess = require('../database/ConnectDatabase');
const {verify} = require("jsonwebtoken");

class ProductService {
    static async getAllProducts(req, res) {
        const connection = await connectionProcess();
        const search = req.query.search ? req.query.search.toLowerCase() : null;
        const maxPrice = req.query.maxPrice;
        const types = req.query.type ? req.query.type.split(',') : null;

        let query = 'SELECT * FROM Products';
        const conditions = [];
        if (search) {
            conditions.push(`LOWER(title) LIKE '%${search}%'`);
        }
        if (maxPrice) {
            conditions.push(`price <= ${maxPrice}`);
        }
        if (types && types.length > 0) {
            const typeConditions = types.map(type => `LOWER(type) LIKE '%${type}'`);
            conditions.push(`(${typeConditions.join(' OR ')})`);
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

    static async pushNotify(req, res) {
        // Implement push notification here, send/receive interested in product from client and accepting from farmer
    }

    static async deleteProduct(req, res) {
        const productId = req.body.productId;
        const connection = await connectionProcess();
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).json({error: 'Access denied'});
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const farmCountQuery = 'SELECT COUNT(*) as farmCount FROM Farms WHERE ownerId = ?';
        const [farmCountResult] = await connection.promise().query(farmCountQuery, [decodedToken.userId]);
        const farmCount = parseInt(farmCountResult[0].farmCount);
        const deleteProductQuery = 'DELETE FROM Products WHERE productId = ?';
        const [deleteResult] = await connection.promise().query(deleteProductQuery, [productId]);
        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({error: 'Product not found'});
        }
        return res.status(200).json({message: 'Product deleted successfully'});
    }

    // static async sendProductPushNotification(userId, productId) {
    //     const userSubscriptions = await ProductService.getPushSubscriptionsByUser(userId);
    //
    //     async function sendPushNotification(subscription, title, message) {
    //         const webPush = require('web-push');
    //         const vapidKeys = {
    //             publicKey: process.env.VAPID_PUBLIC_KEY,
    //             privateKey: process.env.VAPID_PRIVATE_KEY,
    //         };
    //         webPush.setVapidDetails(
    //             vapidKeys.publicKey,
    //             vapidKeys.privateKey
    //         );
    //
    //         try {
    //             await webPush.sendNotification(subscription, JSON.stringify({ title, message }));
    //         } catch (error) {
    //             console.error('Error sending push notification:', error);
    //         }
    //     }
    //
    //     async function getFarmerPushSubscription(productId) {
    //         const connection = await connectionProcess();
    //         const query = 'SELECT subscription FROM Users WHERE userId = (SELECT farmerId FROM Products WHERE productId = ?)';
    //         const [results] = await connection.promise().query(query, [productId]);
    //         if (results.length === 0) {
    //             return null;
    //         }
    //         return JSON.parse(results[0].subscription);
    //     }
    //
    //     for (const subscription of userSubscriptions) {
    //         // Send a notification to the user about their interest being sent to the farmer.
    //         await sendPushNotification(subscription, 'Interest Sent', 'Your interest in a product has been sent to the farmer.');
    //         // Now, you can also notify the farmer about the user's interest.
    //         // Assuming you have a way to identify the relevant farmer for this product.
    //         const farmerSubscription = await getFarmerPushSubscription(productId); // Replace with your logic to get the farmer's subscription
    //         if (farmerSubscription) {
    //             await sendPushNotification(farmerSubscription, 'Interest Received', 'A user is interested in your product.');
    //         }
    //     }
    // }

}

module.exports = ProductService;
