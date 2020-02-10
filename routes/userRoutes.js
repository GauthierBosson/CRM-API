const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const User = require('../models/userModel');

router.post('/login', authController.login(User));
router.post('/signup', authController.signup);

router.use(authController.protect);

router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin', 'employee'));

router
    .route('/')
    .get(userController.getAllUsers);


router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.patch('/deactivate/:id', userController.deactivateUser);

module.exports = router;