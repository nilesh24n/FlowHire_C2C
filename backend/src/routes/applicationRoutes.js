const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/', applicationController.getApplications);
router.post('/', applicationController.createApplication);
router.patch('/:id', applicationController.updateApplicationStatus);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
