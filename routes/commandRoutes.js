const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');
const authController = require('../controllers/authController');

router.use(authController.protect);
router.use(authController.restrictTo('admin', 'employee', 'client'));

router
  .route('/project/:id')
  .get(commandController.getCommandsByProject)


router.use(authController.restrictTo('admin', 'employee', 'client'));

router
  .route('/')
  .get(commandController.getAllCommands)

router
  .route('/add')
  .post(commandController.createCommand);

router
  .route('/:id')
  .get(commandController.getOneCommand)
  .delete(commandController.deleteCommand)

router
  .route('/user/:id')
  .get(commandController.getCommandsByUser)

module.exports = router;