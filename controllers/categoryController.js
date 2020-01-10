const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
const base = require('../controllers/baseController');

/*exports.addCategory = async (req, res, next) => {
  try {
    const category = await Category.create({
        name: req.body.name
    })

    res.status(201).json({
        status: 'success',
        data: {
            category
        }
    })
  } catch (error) {
    next(err)
  }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        await Category.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) });

        res.status(202).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};*/

exports.createCategory = base.createOne(Category);
exports.deleteCategory = base.deleteOne(Category);
exports.getAllCategories = base.getAll(Category);
exports.getOneCategory = base.getOne(Category);
exports.updateCategory = base.updateOne(Category);