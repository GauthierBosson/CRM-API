const express = require('express');
const router = express.Router();
const prestationController = require('../controllers/prestationController');
const authController = require('../controllers/authController');

// Only admin have permission to access for the below APIs 
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router
    .route('/')
    .get(prestationController.getAllPrestations);

router
    .route('/:id')
    .get(prestationController.getOnePrestation)
    .post(prestationController.createPrestation)
    .patch(prestationController.updatePrestation)
    .delete(prestationController.deletePrestation)

module.exports = router;