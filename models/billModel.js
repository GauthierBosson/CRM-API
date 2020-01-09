const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const billSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please fill your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please fill your password'],
        minLength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'student'
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

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
billSchema.pre('save', async function (next) {
    // check the password if it is modified
    if (!this.isModified('password')) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
billSchema.methods.correctPassword = async function (typedPassword, originalPassword) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;