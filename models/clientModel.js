const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const clientSchema = new mongoose.Schema({
    company: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
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
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
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
        validate: [validator.isMobilePhone, 'Veuillez founir un numéro de téléphone valide']
    },
    notes: {
        text: {
            type: String,
        },
        date: {
            type: Date
        }
    },
    active: {
        type: Boolean,
        default: false,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
clientSchema.pre('save', async function (next) {
    // check the password if it is modified
    if (!this.isModified('password')) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

clientSchema.pre('find', function() {
    this.populate('company');
});
  
clientSchema.pre('findOne', function() {
    this.populate('company');
});

// This is Instance Method that is gonna be available on all documents in a certain collection
clientSchema.methods.correctPassword = async function (typedPassword, originalPassword) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;