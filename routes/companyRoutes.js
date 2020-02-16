const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authController = require('../controllers/authController');

router.use(authController.protect);

router
  .route('/')
  .get(companyController.getAllCompanies)

router.use(authController.restrictTo('admin'));

router
  .route('/add')
  .post(companyController.createCompany)
  
router
  .route('/:id')
  .get(companyController.getOneCompany)
  .patch(companyController.updateCompany)
  .delete(companyController.deleteCompany)

module.exports = router;