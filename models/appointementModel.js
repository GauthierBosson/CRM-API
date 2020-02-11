const mongoose = require('mongoose');

const appointementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  clientId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  begin: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  summary: {
    type: String
  },
  confirmed: {
    type: Boolean,
    required: true,
    default: false
  },
  cancelled: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Appointement = mongoose.model('Appointement', appointementSchema);
module.exports = Appointement;
