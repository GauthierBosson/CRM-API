const mongoose = require('mongoose');
const Event = require('../models/eventModel');

exports.addEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
        name: req.body.name,
        description: req.body.description,
        user: mongoose.Types.ObjectId(req.body.user)
    })

    res.status(201).json({
        status: 'success',
        data: {
            event
        }
    })
  } catch (error) {
    next(err)
  }
};
