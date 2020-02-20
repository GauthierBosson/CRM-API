const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    clientId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Company'
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
