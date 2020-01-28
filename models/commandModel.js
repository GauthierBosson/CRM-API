const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  prestations: [
    {
        prestation : {
            type: mongoose.Types.ObjectId,
            required: true
        },
        number: {
            type: Number,
            required: true
        }
    }
  ],
  client: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Command = mongoose.model('Command', commandSchema);
module.exports = Command;