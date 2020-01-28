const Client = require('../models/clientModel');
const base = require('./baseController');

exports.deleteMe = async (req, res, next) => {
    try {
        await Client.findByIdAndUpdate(req.user.id, {
            active: false
        });

        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};

exports.createClient = base.createOne(Client);
exports.getAllClients = base.getAll(Client);
exports.getClients = base.getOne(Client);

// Don't update password on this 
exports.updateClient = base.updateOne(Client);
exports.deleteClient = base.deleteOne(Client);