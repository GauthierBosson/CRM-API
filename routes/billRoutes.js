const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.use(authController.restrictTo('admin', 'employee'));

router
  .route('/create/:id')
  .post(billController.createBill)

module.exports = router;