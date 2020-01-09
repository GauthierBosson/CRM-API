const mongoose = require('mongoose');
const Prestation = require('../models/prestationModel');

exports.addPrestation = async (req, res, next) => {
  try {
    const prestation = await Prestation.create({
        category: mongoose.Types.ObjectId(req.body.category),
        name: req.body.name,
        price: req.body.price,
    })

    res.status(201).json({
        status: 'success',
        data: {
            prestation
        }
    })
  } catch (error) {
    next(err)
  }
};

exports.deletePrestation = async (req, res, next) => {
    try {
        await Prestation.findByIdAndUpdate(req.body.id, {
            active: false
        });

        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};