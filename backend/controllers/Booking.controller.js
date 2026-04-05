const Booking = require('../models/Booking.model');

// Create new booking
const createBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        console.error('Booking creation error:', err);
        return res.status(500).json({
            message: "Error creating booking",
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('userId', 'name email')
            .populate('packageId', 'name destination price');
        
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        
        return res.status(200).json(bookings);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Get booking by ID
const getBookingById = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id)
            .populate('userId', 'name email')
            .populate('packageId', 'name destination price');

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json(booking);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Update booking
const updateBooking = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const booking = await Booking.findById(id);
        
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        return res.status(200).json(updatedBooking);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Delete booking
const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id);
        
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await Booking.findByIdAndDelete(id);
        return res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};

// Get user's bookings
const getUserBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId })
            .populate('packageId', 'name destination price');

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        return res.status(200).json(bookings);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getUserBookings
};
