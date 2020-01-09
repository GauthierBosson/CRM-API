const Prestation = require('../models/prestationModel');

exports.addPrestation = async (req, res, next) => {
  try {

  } catch (error) {

  }
};

exports.deletePrestation = async (req, res, next) => {
    try {
        await Prestation.findByIdAndUpdate(req.user.id, {
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