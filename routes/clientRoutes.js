const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authController = require('./../controllers/authController');
const Client = require('../models/clientModel');


router.post('/login', authController.login(Client));

// Protect all routes after this middleware
router.use(authController.protect);

router.delete('/deleteMe', clientController.deleteMe);

router.use(authController.restrictTo('employee'));

router
  .route('/')
  .get(clientController.getAllClients)

router
  .route('/:id')
  .get(clientController.getClients)
  .patch(clientController.updateClient)
  .delete(clientController.deleteClient)

module.exports = router;