const router = require('express').Router();
const EquipmentService = require("../services/EquipmentService");

router.get('/:equipmentId', EquipmentService.getEquipmentById);
router.post('/create', EquipmentService.createEquipment);
router.put('/update', EquipmentService.updateEquipment);
router.delete('/delete', EquipmentService.deleteEquipment);

module.exports = router;