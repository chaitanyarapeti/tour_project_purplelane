const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
 dotenv.config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/student.routes');
const packageRoute = require('./routes/Tourpackage.route');
const bookingRoutes = require('./routes/Booking.route');

const app = express();
const path = require('path');

// Body parser middleware with increased limit and strict JSON parsing
app.use(express.json({ 
    limit: '10mb', 
    strict: false // Allow for more lenient JSON parsing
}));
app.use(express.urlencoded({ 
    extended: true, 
    limit: '10mb'
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// CORS middleware
app.use(cors());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handler for file uploads
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            message: 'File upload error: ' + err.message
        });
    } else if (err) {
        return res.status(500).json({
            message: 'Internal server error: ' + err.message
        });
    }
    next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

connectDB();

app.use('/api/users',userRoutes);
app.use('/api/package',packageRoute);
app.use('/api/bookings', bookingRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`http://localhost:${process.env.PORT}`);
})

