// registrationModel.js

const mongoose = require('mongoose');

const RegistrationSchema = mongoose.Schema({
    name: String,
    email: String,
    dob: Date,
    batch: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Registration = mongoose.model('Registration', RegistrationSchema);
module.exports = Registration;
