const mongoose = require('mongoose');
const Event = require('../models/eventModel');

exports.addEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
        userId: req.userId,
        description: req.description,
    })

    res.status(201).json({
        status: 'success',
        data: {
            event
        }
    })
  } catch (error) {
    next(error)
  }
};
