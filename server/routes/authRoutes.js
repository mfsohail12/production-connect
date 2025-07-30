const express = require('express');
const router = express.Router();
const { auth } = require('../middleware');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);

// Protect delete account
router.delete('/delete', auth, authController.deleteAccount);

module.exports = router;