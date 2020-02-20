const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      country: String,
      state: String,
      city: String,
      zip_code: Number,
      street: String,
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
