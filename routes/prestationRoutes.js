const express = require('express');
const router = express.Router();
const prestationController = require('../controllers/prestationController');
const authController = require('../controllers/authController');

// Only admin have permission to access for the below APIs 
router.use(authController.restrictTo('admin'));

router
    .route('/')
    .get(prestationController.addPrestation);


router
    .route('/:id')
    .delete(prestationController.deletePrestation);

module.exports = router;