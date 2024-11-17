const express = require('express');
const { Booking, Service, User } = require('../models/usermodel'); // Importing the Booking, Service, and User models
const router = express.Router();
const jwt = require('jsonwebtoken');
// Create a booking
router.post('/book', async (req, res) => {
  const { serviceType, date, location, address, phoneNumber, emailId, serviceDuration, specialInstructions } = req.body;
  
  try {
    const newBooking = new Booking({
      serviceType,
      date,
      location,
      address,
      phoneNumber,
      emailId,
      serviceDuration,
      specialInstructions,
    });

    await newBooking.save();
    res.status(200).json({ message: 'Booking successful!' });
  } catch (err) {
    res.status(400).json({ error: 'Error booking service' });
  }
});

// Get all bookings for an admin (optional)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('serviceType');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Get all bookings for an admin
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user serviceType');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Get bookings for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('service');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings for this user' });
  }
});

// Update the status of a booking (e.g., marking it as completed or cancelled)
router.put('/:bookingId', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.bookingId, { status }, { new: true });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
