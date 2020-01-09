const mongoose = require('mongoose');
const validator = require('validator');


const clientSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please fill your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    lastname: {
        type: String
    },
    firstname: {
        type: String
    },
    password: {
        type: String,
        minLength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['client', 'prospect'],
        default: 'prospect'
    },
    phone: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, 'Veuillez founir un numéro de téléphone valide']
    },
    address: {
        country: String,
        state: String,
        city: String,
        zip_code: Number,
        street: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;