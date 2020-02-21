const mongoose = require('mongoose');

const prestationSchema = new mongoose.Schema({
    category: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
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