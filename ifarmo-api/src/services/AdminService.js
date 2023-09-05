const connectionProcess = require("../database/ConnectDatabase");
const {verify} = require("jsonwebtoken");

class AdminService {
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

    static async getAllData(req, res) {
        const connection = await connectionProcess();
        const search = req.query.search ? req.query.search.toLowerCase() : null;
        const maxPrice = req.query.maxPrice;
        const minSalary = req.query.minSalary;

        const queries = [
            `SELECT * FROM Farms${search ? ` WHERE LOWER(name) LIKE '%${search}%'` : ''}`,
            `SELECT * FROM Products${search ? ` WHERE LOWER(title) LIKE '%${search}%'` : ''}${maxPrice ? ` AND price <= ${maxPrice}` : ''}`,
            `SELECT * FROM Equipments${search ? ` WHERE LOWER(title) LIKE '%${search}%'` : ''}${maxPrice ? ` AND price <= ${maxPrice}` : ''}`,
            `SELECT * FROM Jobs${search ? ` WHERE LOWER(title) LIKE '%${search}%'` : ''}${minSalary ? ` AND salary >= ${minSalary}` : ''}`
        ];

        const results = await Promise.all(queries.map(query => {
            return new Promise((resolve, reject) => {
                connection.query(query, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }));

        const [farms, products, equipment, jobs] = results;
        const allData = {
            farms,
            products,
            equipment,
            jobs
        };
        return res.status(200).json(allData);
    }


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

    static async getAllJobs(req, res) {
        const connection = await connectionProcess();
        const search = req.query.search ? req.query.search.toLowerCase() : null;
        const minSalary = req.query.minSalary;
        let query = 'SELECT * FROM Jobs';
        const conditions = [];
        if (search) {
            conditions.push(`LOWER(title) LIKE '%${search}%'`);
        }
        if (minSalary) {
            conditions.push(`salary >= ${minSalary}`);
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

    // static async assignFarm(req, res) {
    //     const { name, location, workingHours, ownerId } = req.body;
    //     try {
    //         const connection = await connectionProcess();
    //         const token = req.cookies['access-token'];
    //         if (!token) {
    //             return res.status(401).send('Access denied');
    //         }
    //         console.log('Token:', token);
    //
    //         try {
    //             const decodedToken = verify(token, process.env.TOKEN_SECRET);
    //             console.log('Decoded Token:', decodedToken);
    //
    //             // Access the role property from the decoded token
    //             const userRole = decodedToken
    //             console.log('User Role:', JSON.stringify(userRole.userId, null, 2));
    //
    //             // Check if the authenticated user has admin privileges
    //             if (userRole.userId !== 41) {
    //                 console.log('Role:', userRole);
    //                 return res.status(403).send('Permission denied');
    //             }
    //
    //             // Insert the farm details into the Farms table with the specified ownerId
    //             const insertFarmQuery = 'INSERT INTO Farms (name, location, workingHours, ownerId) VALUES (?, ?, ?, ?)';
    //             console.log('Query:', insertFarmQuery);
    //
    //             connection.query(insertFarmQuery, [name, location, workingHours, ownerId], (error) => {
    //                 if (error) {
    //                     console.error('Error executing query:', error);
    //                     return res.status(500).send('Database error');
    //                 }
    //
    //                 console.log('Farm created successfully');
    //                 return res.status(201).send('Farm created successfully');
    //             });
    //         } catch (error) {
    //             console.error('Token Verification Error:', error);
    //             return res.status(401).send('Invalid token');
    //         }
    //     } catch (error) {
    //         console.error('Server Error:', error);
    //         return res.status(500).send('Server error');
    //     }
    // }

}

module.exports = AdminService;
