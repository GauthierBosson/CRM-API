const Category = require('../models/categoryModel');
const base = require('../controllers/baseController');

exports.createCategory = base.createOne(Category);
exports.deleteCategory = base.deleteOne(Category);
exports.getAllCategories = base.getAll(Category);
exports.getOneCategory = base.getOne(Category);
exports.updateCategory = base.updateOne(Category);