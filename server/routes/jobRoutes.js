const express = require('express');
const router = express.Router();
const { auth } = require('../middleware');
const jobController = require('../controllers/jobController');

// All routes require authentication
router.use(auth);
router.post('/', jobController.createJob);
router.put('/:id/assign', jobController.assignEditor);
router.post('/:id/quit', jobController.quitJob);

module.exports = router;