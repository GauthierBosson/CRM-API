const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authController = require('./../controllers/authController');


router.post('/login', authController.login);

// Protect all routes after this middleware
router.use(authController.protect);

router.delete('/deleteMe', clientController.deleteMe);

module.exports = router;