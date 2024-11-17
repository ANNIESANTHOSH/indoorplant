const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  services: [{
    serviceType: { type: String, enum: ['Indoor', 'Outdoor', 'Wall', 'Maintenance'], required: true },
    serviceDetails: { type: String, required: true },
    reminderDate: { type: Date },
    reminderSent: { type: Boolean, default: false }
  }],
  bookings: [{
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
  }],
}, { timestamps: true });

// Plant Schema
const plantSchema = new mongoose.Schema({
  imageUrl: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  careInstructions: { type: String, required: true },
  plantType: { type: String, enum: ['Indoor', 'Outdoor', 'Wall'], required: true },
}, { timestamps: true });

// Service Schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  serviceType: { type: String, enum: ['Indoor', 'Outdoor', 'Wall', 'Maintenance'], required: true },
  featured: { type: Boolean, default: false } // Optional field for featured services
}, { timestamps: true });

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Booking Schema
const bookingSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailId: { type: String, required: true },
  serviceDuration: { type: Number, required: true },
  specialInstructions: { type: String }
});

// Models
const User = mongoose.model('User', userSchema);
const Plant = mongoose.model('Plant', plantSchema);
const Service = mongoose.model('Service', serviceSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { User, Plant, Service, Admin, Booking };
