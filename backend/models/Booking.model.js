const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    packageId: {
        type: String,
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        default: 'pending'
    },
    specialRequests: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
