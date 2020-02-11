const mongoose = require('mongoose');
const Event = require('../models/eventModel');

exports.addEvent = async (req, res, next) => {
  try {
    await Event.create({
        userId: req.userId,
        description: req.description,
    })

    next();
  } catch (error) {
    next(error)
  }
};
