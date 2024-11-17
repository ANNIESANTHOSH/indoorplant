import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Paper, Container, MenuItem } from '@mui/material';
import './Service.css';

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [bookingData, setBookingData] = useState({
    serviceType: '',
    date: '',
    location: '',
    address: '',
    phoneNumber: '',
    emailId: '',
    serviceDuration: 1,
    specialInstructions: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Assuming the logged-in user's email is stored in local storage
  const loggedInUserEmail = localStorage.getItem('userEmail'); // Adjust this according to your app
  console.log("Logged-in Email:", loggedInUserEmail); // Debugging

  // Fetch available services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { serviceType, date, location, address, phoneNumber, emailId, serviceDuration } = bookingData;
    const newErrors = {};

    if (!serviceType) newErrors.serviceType = 'Please select a service type';
    if (!date) newErrors.date = 'Please select a date';
    if (!location) newErrors.location = 'Please enter the location';
    if (!address) newErrors.address = 'Please enter the address';
    if (!phoneNumber) newErrors.phoneNumber = 'Please enter the phone number';
    if (!emailId) newErrors.emailId = 'Please enter your email';

    // Check if the date is in the future
    const today = new Date();
    const selectedDate = new Date(date);
    if (date && selectedDate <= today) {
      newErrors.date = 'Please select a future date';
    }

    // Validate phone number (basic check for digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailId && !emailRegex.test(emailId)) {
      newErrors.emailId = 'Please enter a valid email address';
    }

    // Check if logged-in user's email matches the booking email
    if (loggedInUserEmail && emailId && emailId.toLowerCase().trim() !== loggedInUserEmail.toLowerCase().trim()) {
      newErrors.emailId = 'The email entered does not match your logged-in email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Validation failed. Form will not submit.");
      return; // Stop form submission if validation fails
    }

    try {
      const response = await axios.post('http://localhost:3000/api/bookings/book', bookingData);
      setErrors({});

      // Reset the form after successful booking
      setBookingData({
        serviceType: '',
        date: '',
        location: '',
        address: '',
        phoneNumber: '',
        emailId: '',
        serviceDuration: 1,
        specialInstructions: '',
      });

      // Add the window alert here after successful booking
      alert('Booking completed successfully!');

      // Optionally, show a success message on the page
      setSuccessMessage('Your booking has been successfully completed.');

    } catch (error) {
      setErrors({ general: 'Error booking service. Please try again later.' });
      setSuccessMessage('');
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Available Services
      </Typography>
      {services.length === 0 ? (
        <Typography variant="body1" align="center">
          No services available
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service._id}>
              <Paper elevation={3} className="service-card">
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2">{service.description}</Typography>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#a9e18b', color: '#ffffff' }}  // Olive green background and white text color
                  onClick={() => setBookingData({ ...bookingData, serviceType: service.serviceType })}
                  fullWidth
                   >
  Book this service
</Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="h5" className="mt-5" align="center">
        Book a Service
      </Typography>
      <form onSubmit={handleBooking}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              select
              label="Service Type"
              name="serviceType"
              value={bookingData.serviceType || ''}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.serviceType}
              helperText={errors.serviceType}
            >
              {services.map((service) => (
                <MenuItem key={service._id} value={service.serviceType}>
                  {service.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={bookingData.date || ''}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={bookingData.location || ''}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={bookingData.address || ''}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={bookingData.phoneNumber || ''}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="emailId"
              value={bookingData.emailId || ''}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.emailId}
              helperText={errors.emailId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Service Duration (hours)"
              type="number"
              name="serviceDuration"
              value={bookingData.serviceDuration || 1}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.serviceDuration}
              helperText={errors.serviceDuration}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Special Instructions"
              name="specialInstructions"
              value={bookingData.specialInstructions || ''}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              error={!!errors.specialInstructions}
              helperText={errors.specialInstructions}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="success"
          type="submit"
          fullWidth
          className="mt-3"
        >
          Submit Booking
        </Button>

        {errors.general && (
          <Typography color="error" align="center" className="mt-3">
            {errors.general}
          </Typography>
        )}
        {successMessage && (
          <Typography color="primary" align="center" className="mt-3">
            {successMessage}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default ServicePage;
