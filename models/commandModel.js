const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  project: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Project'
  },
  prestations: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Prestation',
      required: true
    }
  ],
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: 'Client',
    required: true
  }
});

commandSchema.pre('find', function() {
  this.populate('prestations');
  this.populate('client')
});

commandSchema.pre('findOne', function() {
  this.populate('prestations');
  this.populate('client')
});

const Command = mongoose.model('Command', commandSchema);
module.exports = Command;