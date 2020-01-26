const Prestation = require('../models/prestationModel');
const base = require('../controllers/baseController');

exports.createPrestation = async (req, res, next) => {
    try {

        const prestation = Prestation.create
    } catch(err) {
        next(err)
    }
}

exports.deletePrestation = base.deleteOne(Prestation);
exports.getAllPrestations = base.getAll(Prestation);
exports.getOnePrestation = base.getOne(Prestation);
exports.updatePrestation = base.updateOne(Prestation);