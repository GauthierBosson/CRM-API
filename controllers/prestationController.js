const Prestation = require('../models/prestationModel');
const base = require('../controllers/baseController');

exports.createPrestation = base.createOne(Prestation);
exports.deletePrestation = base.deleteOne(Prestation);
exports.getAllPrestations = base.getAll(Prestation);
exports.getOnePrestation = base.getOne(Prestation);
exports.updatePrestation = base.updateOne(Prestation);