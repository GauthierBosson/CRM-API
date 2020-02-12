const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/add', eventController.addEvent);

router
  .route('/user/:id')
  .get(eventController.getEventsByUser)

module.exports = router;