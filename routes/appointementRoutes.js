const express = require('express');
const router = express.Router();
const appointementController = require('../controllers/appointementController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(appointementController.getAllAppointements)

router
  .route('/:id')
  .get(appointementController.getOneAppointement)
  .post(appointementController.createAppointement)

router
  .route('/confirm/:id')
  .post(appointementController.updateAppointement)


router
  .route('/generateIcs')
  .post(appointementController.createEvents)

module.exports = router;