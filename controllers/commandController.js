const Command = require('../models/commandModel');
const base = require('./baseController');
const ObjectId = require('mongoose').Types.ObjectId;
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createCommand = base.createOne(Command);
exports.deleteCommand = base.deleteOne(Command);
exports.getAllCommands = base.getAll(Command);
exports.getOneCommand = base.getOne(Command);
exports.getCommandsByUser = base.getByUserId(Command)
exports.getCommandsByProject = async (req, res, next) => {
  const objId = ObjectId(req.params.id);

  try {
    const features = new APIFeatures(Command.find({ project: objId }), req.query)
      .sort()
      .paginate()

    const doc = await features.query;

    res.status(200).json({
      status: 'succes',
      results: doc.length,
      data: {
        data: {
          doc
        }
      }
    })
  } catch(error) {
    next(error);
  }
}