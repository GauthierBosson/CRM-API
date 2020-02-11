const base = require('./baseController');
const Appointement = require('../models/appointementModel');
const { createEvents } = require('../utils/icsGenerator');

exports.createEvents = async (req, res, next) => {
  try {
    const cal = createEvents(req.body.cal);
    cal.serve(res);
  } catch (error) {
    next(error)
  }
}

exports.createAppointement = base.createOne(Appointement);
exports.updateAppointement = base.updateOne(Appointement);
exports.getAllAppointements = base.getAll(Appointement);
exports.getOneAppointement = base.getOne(Appointement);
