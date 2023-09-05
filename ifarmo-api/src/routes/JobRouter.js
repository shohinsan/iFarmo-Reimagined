const router = require('express').Router();
const JobService = require("../services/JobService");

router.get('/:jobId', JobService.getJobById);
router.post('/create', JobService.createJob);
router.put('/update', JobService.updateJob);
router.delete('/delete', JobService.deleteJob);

module.exports = router;