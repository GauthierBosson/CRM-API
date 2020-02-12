const express = require('express');
const router = express.Router();
const appointementController = require('../controllers/appointementController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router
  .route('/user/:id')
  .get(appointementController.getAppointementsByUserId)

router
  .route('/')
  .get(appointementController.getAllAppointements)

router
  .route('/:id')
  .get(appointementController.getOneAppointement)
  .patch(appointementController.updateAppointement)

router
  .route('/add')
  .post(appointementController.createAppointement)

router
  .route('/generateIcs')
  .post(appointementController.createEvents)

module.exports = router;