const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  dueDate: {
    type: Date,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

commandSchema.pre('find', function() {
  this.populate('prestations.prestation');
  this.populate({
    path: 'project',
    populate: {
      path: 'clientId',
      model: 'Company'
    }
  })
});

commandSchema.pre('findOne', function() {
  this.populate('prestations.prestation');
  this.populate({
    path: 'project',
    populate: {
      path: 'clientId',
      model: 'Company'
    }
  })
});

const Command = mongoose.model('Command', commandSchema);
module.exports = Command;