const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router.use(authController.restrictTo('admin', 'employee'));

router
  .route('/create/invoice/:id')
  .post(billController.createBill)

router
  .route('/create/quote/:id')
  .post(billController.createQuote)

module.exports = router;