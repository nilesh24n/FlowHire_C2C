const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.get('/master', resumeController.getMasterResume);
router.put('/master', resumeController.updateMasterResume);
router.post('/tailor', resumeController.tailorResume);
router.get('/tailored', resumeController.getTailoredResumes);

module.exports = router;
