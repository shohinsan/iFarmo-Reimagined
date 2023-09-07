const router = require('express').Router();
const JobService = require("../services/JobService");
const AdminService = require("../services/AdminService");

router.get('/jobs', JobService.getAllJobs);
router.get('/:jobId', JobService.getJobById);
router.post('/create', JobService.createJob);
router.put('/update', JobService.updateJob);
router.delete('/delete', JobService.deleteJob);

module.exports = router;