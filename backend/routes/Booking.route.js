const express = require('express');
const { 
    createBooking, 
    getAllBookings, 
    getBookingById, 
    updateBooking, 
    deleteBooking,
    getUserBookings 
} = require('../controllers/Booking.controller');

const router = express.Router();

// Create new booking
router.post('/create', createBooking);

// Get all bookings
router.get('/all', getAllBookings);

// Get single booking by ID
router.get('/:id', getBookingById);

// Update booking
router.put('/update/:id', updateBooking);

// Delete booking
router.delete('/delete/:id', deleteBooking);

// Get user's bookings
router.get('/user/:userId', getUserBookings);

module.exports = router;
