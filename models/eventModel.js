const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
