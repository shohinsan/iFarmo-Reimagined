const router = require('express').Router();
const AuthController = require("../controllers/AuthController");

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/logout', AuthController.logoutUser);
// router.post('/refresh', AuthService.refreshAuthToken); // not working properly

module.exports = router;