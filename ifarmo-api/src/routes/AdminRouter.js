const router = require('express').Router();
const AdminService = require("../services/AdminService");

router.get('/users', AdminService.getAllUsers);
router.get('/products', AdminService.getAllProducts);
router.get('/farms', AdminService.getAllFarms);
router.get('/jobs', AdminService.getAllJobs);
router.get('/equipment', AdminService.getAllEquipment);
router.get('/all', AdminService.getAllData);
// router.get('/workers', AdminService.getAllAdmins);
// router.get('/farmers', AdminService.getAllFarmers);
// router.get('/produce', AdminService.getAllProduce);
// router.get('/admins', AdminService.getAllAdmins);
// router.post('/assign_farm', AdminService.assignFarm);
// router.post('/assign_admin', AdminService.assign_admin);
// router.put('/update_user', AdminService.updateUser);
// router.put('/update_farm', AdminService.updateFarm);
// router.put('/update_job', AdminService.updateJob);
// router.put('/update_produce', AdminService.updateProduce);
// router.put('/update_equipment', AdminService.updateEquipment);
// router.delete('/delete_user', AdminService.deleteUser);
// router.delete('/delete_farm', AdminService.deleteFarm);
// router.delete('/delete_job', AdminService.deleteJob);
// router.delete('/delete_produce', AdminService.deleteProduce);
// router.delete('/delete_equipment', AdminService.deleteEquipment);
// router.post('/refresh', AuthService.refreshAuthToken); // not working properly
module.exports = router;