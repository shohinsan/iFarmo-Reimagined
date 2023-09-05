const {sign} = require('jsonwebtoken');
const {loginValidation, registerValidation} = require("../config/ValidationConfig");
const AuthService = require("../services/AuthService");
const bcrypt = require('bcrypt');
const authService = new AuthService();

class AuthController {
    // ------------------------------------------------------------
    static async loginUser(req, res) {
        const body = req.body;
        const {error} = loginValidation(body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        try {
            const results = await authService.getUserByUsername(body.username);

            if (results.length === 0) {
                return res.status(401).send('Username not found');
            }

            const user = results[0];

            const isPasswordValid = await comparePasswords(
                body.password,  // Change this line
                user.password
            );

            if (!isPasswordValid) {
                return res.status(401).send('Invalid password');
            }

            const token = sign({
                userId: user.userId,
                role: user.role,

            }, process.env.TOKEN_SECRET);

            res.cookie('access-token', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                secure: false,
            });

            const proceedAuthentication = {
                message: 'Login successful',
                user: {
                    userId: user.userId,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    createdAt: new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                },
                token: token,
            };
            console.log('token in the backend', token);
            return res.status(200).json(proceedAuthentication);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }

        async function comparePasswords(inputPassword, hashedPassword) {
            return await bcrypt.compare(inputPassword, hashedPassword);
        }
    }

    // ------------------------------------------------------------
    static async logoutUser(req, res) {
        try {
            res.clearCookie('access-token');
            const token = req.cookies['access-token'];

            if (!token) {
                return res.status(401).send('Token has been removed from the cookie.');
            }

            return res.status(200).send({
                message: 'Logout successful.',
                token: null,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }

    // ------------------------------------------------------------
    static async registerUser(req, res) {
        const body = req.body;
        const {error} = registerValidation(body);
        if (error) {
            return res.status(403).send(error.details[0].message);
        }
        if (body.password !== body.confirm_password) {
            return res.status(400).send('Passwords do not match');
        }

        try {
            const registrationError = await authService.registerDefaultUser(body);

            if (registrationError === 'Username or email already exists') {
                return res.status(400).send(registrationError);
            }

            const registeredUser = {
                name: body.name,
                username: body.username,
                email: body.email,
            };
            const newUser = {
                message: 'User registered successfully',
                user: registeredUser,
            };
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server error');
        }
    }
}

module.exports = AuthController;
