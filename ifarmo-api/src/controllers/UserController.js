const jwt = require('jsonwebtoken');
const UserService = require("../services/UserService");
const {verify} = require("jsonwebtoken");
const {userValidation} = require("../utils/ValidationUtil");
const userService = new UserService();

class UserController {
    static async getUserById(req, res) {
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).send('Access denied');
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await userService.fetchUser(decodedToken.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        return res.status(200).json(user);
    }

    static async updateUser(req, res) {
        const body = req.body;
        const token = req.cookies['access-token'];
        if (!token) {
            return res.status(401).send('Access denied');
        }
        const { error } = userValidation(body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const decodedToken = verify(token, process.env.TOKEN_SECRET);
        const result = await userService.updateDB(decodedToken.userId, body);
        if (result.error) {
            console.error(result.error);
            return res.status(500).send('Database error');
        }
        if (result.notFound) {
            return res.status(404).send('User not found');
        }
        if (result.upToDate) {
            return res.status(200).send('User information is already up to date');
        }
        return res.status(200).send('User updated successfully');
    }

}

module.exports = UserController;
