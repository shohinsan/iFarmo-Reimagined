const router = require('express').Router();
const RecoveryService = require("../services/RecoveryService");

router.post('/forgot', RecoveryService.forgotPassword); // not working properly
router.post('/reset', RecoveryService.resetPassword); // not working properly

module.exports = router;