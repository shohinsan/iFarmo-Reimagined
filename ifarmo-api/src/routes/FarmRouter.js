const router = require('express').Router();
const FarmService = require("../services/FarmService");
const AdminService = require("../services/AdminService");

router.get('/farms', FarmService.getAllFarms);
router.get('/:farmOwnerId', FarmService.getFarmByOwnerId);
router.post('/create', FarmService.createFarm);
router.put('/update', FarmService.updateFarm);
router.delete('/delete', FarmService.deleteFarm);

module.exports = router;