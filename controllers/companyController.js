const Company = require('../models/companyModel');
const base = require('../controllers/baseController');

exports.createCompany = base.createOne(Company);
exports.deleteCompany = base.deleteOne(Company);
exports.getAllCompanies = base.getAll(Company);
exports.getOneCompany = base.getOne(Company);
exports.updateCompany = base.updateOne(Company);