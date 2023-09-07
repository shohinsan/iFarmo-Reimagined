const router = require('express').Router();
const AdminService = require("../services/AdminService");

router.get('/all', AdminService.getAllData);

module.exports = router;