const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router
  .route('/user/:id')
  .get(projectController.getProjectsByUserId)

router
  .route('/')
  .get(projectController.getAllProjects)

router.use(authController.restrictTo('admin', 'client'));

router
  .route('/add')
  .post(projectController.createProject)
  
router
  .route('/:id')
  .get(projectController.getOneProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject)

module.exports = router;