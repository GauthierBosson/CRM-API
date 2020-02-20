const Project = require('../models/projectModel');
const base = require('../controllers/baseController');

exports.createProject = base.createOne(Project);
exports.deleteProject = base.deleteOne(Project);
exports.getAllProjects = base.getAll(Project);
exports.getOneProject = base.getOne(Project);
exports.updateProject = base.updateOne(Project);
exports.getProjectsByUserId = base.getByUserId(Project);