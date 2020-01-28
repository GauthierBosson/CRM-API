const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['bill', 'quotation'],
        required: true
    }
});

const Client = mongoose.model('Bill', billSchema);
module.exports = Client;