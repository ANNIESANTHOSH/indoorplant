const express = require('express');
const { User, Booking } = require('../models/usermodel');
const bcrypt = require('bcrypt'); // for hashing passwords if they're stored hashed
const jwt = require('jsonwebtoken'); // for generating tokens if you’re using JWTs for session management
const router = express.Router();

// Secret key for JWT token, store securely in environment variables for production
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register a new user
router.post('/register', async (req, res) => {
  console.log(req.body);  // Log the request body

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Email, username, and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error occurred. Please try again later.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');  // Log if the user is not found
      return res.status(400).json({ error: 'Register your account' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);  // Log the result of password comparison
    if (!isMatch) {
      return res.status(400).json({ error: 'Register your account' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({
      message: 'Login successful',
      token,
      user: { email: user.email, username: user.username },
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a user
router.delete('/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bookings for a user
router.get('/:userId/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('plant service');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
