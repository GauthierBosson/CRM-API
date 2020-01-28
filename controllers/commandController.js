const Command = require('../models/commandModel');
const base = require('./baseController');

exports.createCommand = base.createOne(Command);
exports.deleteCommand = base.deleteOne(Command);
exports.getAllCommands = base.getAll(Command);
exports.getOneCommand = base.getOne(Command);