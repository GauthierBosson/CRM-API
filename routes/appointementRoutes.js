const express = require('express');
const router = express.Router();
const appointementController = require('../controllers/appointementController');

router
  .route('/')
  .post(appointementController.createEvents)

module.exports = router;