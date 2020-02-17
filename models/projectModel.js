const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
