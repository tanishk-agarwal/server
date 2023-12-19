const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    name: String,
    email: String,
    dob: Date,
    batch: String,
    status: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
