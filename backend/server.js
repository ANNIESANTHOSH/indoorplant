const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the DB connection function
const userRoutes = require('./routes/userRoutes');
const plantRoutes = require('./routes/plantRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // Adjust path if necessary

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Middleware
app.use(bodyParser.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
connectDB(); // Initialize the database connection

// Routes
app.use('/api/users', userRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);// Prefix routes with /api/users

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Plant Service API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
