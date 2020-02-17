const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(projectController.getAllProjects)

router.use(authController.restrictTo('admin'));

router
  .route('/add')
  .post(projectController.createProject)
  
router
  .route('/:id')
  .get(projectController.getOneProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject)

router
  .route('/user/:id')
  .get(projectController.getProjectsByUserId)

module.exports = router;