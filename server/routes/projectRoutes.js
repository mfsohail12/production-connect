const express = require('express');
const router = express.Router();
const { auth } = require('../middleware');
const projectController = require('../controllers/projectController');

// All routes protected
router.use(auth);
router.post('/', projectController.createProject);
router.put('/:id', projectController.editProject);
router.delete('/:id', projectController.deleteProject);
router.get('/', projectController.listProjects);

module.exports = router;