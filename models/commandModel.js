const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  project: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Project'
  },
  prestations: [
    {
      prestation: {
        type: mongoose.Types.ObjectId,
        ref: 'Prestation',
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
});

commandSchema.pre('find', function() {
  this.populate('prestations.prestation');
  this.populate('project')
});

commandSchema.pre('findOne', function() {
  this.populate('prestations.prestation');
  this.populate('project')
});

const Command = mongoose.model('Command', commandSchema);
module.exports = Command;