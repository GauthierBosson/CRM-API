const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authController = require('./../controllers/authController');
const Client = require('../models/clientModel');


router.post('/login', authController.login(Client));

// Protect all routes after this middleware
router.use(authController.protect);

router.delete('/deleteMe', clientController.deleteMe);

router.use(authController.restrictTo('employee', 'admin', 'client'));

router
  .route('/clientRole')
  .get(clientController.getClientsByRole)

router
  .route('/prospectRole')
  .get(clientController.getProspectsByRole)

router
  .route('/')
  .get(clientController.getAllClients)

router
  .route('/signupClient')
  .post(authController.signupClient)

router
  .route('/:id')
  .get(clientController.getClients)
  .patch(clientController.updateClient)
  .delete(clientController.deleteClient)

router.post('/signupClient', authController.signupClient);

router.patch('/deactivate/:id', clientController.deactivateClient);

module.exports = router;