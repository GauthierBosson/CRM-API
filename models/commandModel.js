const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  prestations: [
    {
        prestation : {
            type: mongoose.Types.ObjectId,
            ref: 'Prestation',
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
    ref: 'Client',
    required: true
  }
});

commandSchema.pre('find', function() {
  this.populate('prestations.prestation');
  this.populate('client')
});

commandSchema.pre('findOne', function() {
  this.populate('prestations.prestation');
  this.populate('client')
});

const Command = mongoose.model('Command', commandSchema);
module.exports = Command;