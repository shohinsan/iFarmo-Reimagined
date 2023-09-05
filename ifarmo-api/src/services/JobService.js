const connectionProcess = require('../database/ConnectDatabase');
const {verify} = require("jsonwebtoken");

class JobService {
    static async getJobById(req, res) {
        const jobId = req.params.jobId;
        const connection = await connectionProcess();
        const getJobQuery = 'SELECT * FROM Jobs WHERE jobId = ?';
        connection.query(getJobQuery, [jobId], (error, jobResults) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).json({error: 'Database error'});
            }
            if (jobResults.length === 0) {
                return res.status(404).json({error: 'Job not found'});
            }

            const job = jobResults[0];
            return res.status(200).json(job);
        });
    }

    static async createJob(req, res) {
        const {title, type, description, salary, unitType, city, farmId} = req.body;
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
            const insertJobQuery = `
                INSERT INTO Jobs (title, type, description, salary, unitType, city)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            connection.query(insertJobQuery, [title, type, description, salary, unitType, city, farmId], () => {
                return res.status(201).send('Job created successfully');
            });
        });
    }

    static async updateJob(req, res) {
        const jobId = req.body.jobId;
        const { title, description, salary, unitType, city, farmId } = req.body;
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
            results[0].farmCount = parseInt(results[0].farmCount);
            const farmCount = results[0].farmCount;
            if (farmCount === 0) {
                return res.status(400).send('Farm does not exist for this user');
            }
            const updateJobQuery = `
                UPDATE Jobs
                SET title = ?, description = ?, salary = ?, unitType = ?, city = ?
                WHERE jobId = ?
            `;
            connection.query(updateJobQuery, [title, description, salary, unitType, city, jobId], () => {
                return res.status(200).send('Job updated successfully');
            });
        });
    }

    static async deleteJob(req, res) {
        const jobId = req.body.jobId;
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
            results[0].farmCount = parseInt(results[0].farmCount);
            const farmCount = results[0].farmCount;
            if (farmCount === 0) {
                return res.status(400).send('Farm does not exist for this user');
            }
            const deleteJobQuery = 'DELETE FROM Jobs WHERE jobId = ?';
            connection.query(deleteJobQuery, [jobId], () => {
                return res.status(200).send('Job deleted successfully');
            });
        });
    }

}

module.exports = JobService;