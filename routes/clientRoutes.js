const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authController = require('./../controllers/authController');
const Client = require('../models/clientModel');


router.post('/login', authController.login(Client));

// Protect all routes after this middleware
router.use(authController.protect);

router.delete('/deleteMe', clientController.deleteMe);

module.exports = router;