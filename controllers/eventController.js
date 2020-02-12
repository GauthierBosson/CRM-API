const mongoose = require('mongoose');
const Event = require('../models/eventModel');
const base = require('./baseController');

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

exports.getAllEvents = base.getAll(Event);
exports.getOneEvent = base.getOne(Event);
exports.getEventsByUser = base.getByUserId(Event);
