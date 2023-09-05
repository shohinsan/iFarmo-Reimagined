const mysql = require('mysql2');
const {connectionProcess} = require("../database/ConnectDatabase");
const {createTransport} = require("nodemailer");

class RecoveryService {

    static async forgotPassword(req, res) {
        const {email} = req.body;
        const token = Math.random().toString(20).substr(2, 12);

        const insertResetQuery = `INSERT INTO Recoveries (email, token)
                                  VALUES (?, ?)`;

        const selectLastInsertIdQuery = 'SELECT LAST_INSERT_ID() as recoveryId';

        const transporter = createTransport({
            host: '0.0.0.0',
            port: 1025,
        });

        const url = `http://localhost:3000/reset/${token}`;

        await transporter.sendMail({
            from: 'from@example.com',
            to: email,
            subject: 'Password Reset',
            html: `Click <a href="${url}">here</a> to reset your password.`
        });

        try {
            const [insertResult] = await connectionProcess.promise().query(insertResetQuery, [email, token]);
            const [recoveryIdResult] = await connectionProcess.promise().query(selectLastInsertIdQuery);

            const recoveryId = recoveryIdResult[0].recoveryId;

            res.status(200).send({
                message: 'Please check your email to reset your password.',
                email: email,
                token: token,
                recoveryId: recoveryId
            });
        } catch (err) {
            console.error('Error executing query:', err);
            return res.status(500).send({
                message: 'Internal server error.',
            });
        }
    }

    static async resetPassword(req, res) {
        const { token, password, password_confirm } = req.body;

        // if (password !== password_confirm) {
        //     return res.status(400).send("Passwords do not match");
        // }

        const selectResetQuery = 'SELECT email FROM Recoveries WHERE token = ?';
        const updatePasswordQuery = 'UPDATE Users SET password = ?, salt = ? WHERE email = ?';

        try {
            const [resetResult] = await connectionProcess.promise().query(selectResetQuery, [token]);

            if (resetResult.length === 0) {
                return res.status(400).send({
                    message: 'Invalid credentials.',
                });
            }

            const email = resetResult[0].email;

            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await connectionProcess.promise().query(updatePasswordQuery, [hashedPassword, saltRounds, email]);

            res.send({
                message: 'Password reset successfully.',
            });

        } catch (err) {
            console.error('Error executing query:', err);
            return res.status(500).send({
                message: 'Internal server error.',
            });
        }
    }



}

module.exports = RecoveryService;
