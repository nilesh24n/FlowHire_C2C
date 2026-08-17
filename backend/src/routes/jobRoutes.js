const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getJobs);
router.post('/scan', jobController.scanLinkedinJobs);
router.post('/', jobController.createJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
