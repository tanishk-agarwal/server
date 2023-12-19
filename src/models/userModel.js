const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    dob: Date,
    batch: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;