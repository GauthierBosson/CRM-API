const Client = require('../models/clientModel');
const Company = require('../models/companyModel');
const base = require('./baseController');
const ObjectId = require('mongoose').Types.ObjectId;

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

exports.getAllClients = base.getAll(Client);
exports.getClients = base.getOne(Client);
exports.getClientsByRole = async (req, res, next) => {
    try {
        const doc = await Client.find({ role: 'client' })

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        })
    } catch(error) {
        next(error)
    }
}

exports.getClientsByCompany = async (req, res, next) => {
    const objId = ObjectId(req.params.id);

    try {
        const doc = await Client.find({ company: objId })

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        })
    } catch (error) {
        next(error);
    }
}

exports.getProspectsByRole = async (req, res, next) => {
    try {
        const doc = await Client.find({ role: 'prospect' })

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        })
    } catch(error) {
        next(error)
    }
}

// Don't update password on this 
exports.updateClient = base.updateOne(Client);
exports.deleteClient = base.deleteOne(Client);
exports.deactivateClient = base.deactivate(Client);