const mongoose = require('mongoose');

const prestationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});

const Prestation = mongoose.model('Prestation', prestationSchema);
module.exports = Prestation;