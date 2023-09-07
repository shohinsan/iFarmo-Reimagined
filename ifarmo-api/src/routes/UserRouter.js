const router = require('express').Router();
const UserService = require("../services/UserService");
const UserController = require("../controllers/UserController");
const AdminService = require("../services/AdminService");

router.get('/users', UserService.getAllUsers);
router.get('/user', UserController.getUserById);
router.get('/:username', UserService.getUserProfile);
router.put('/update', UserController.updateUser);
router.put('/change_password', UserService.changePassword);
router.delete('/delete', UserService.deleteUser);

module.exports = router;