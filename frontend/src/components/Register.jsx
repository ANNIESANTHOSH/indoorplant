import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import { AppBar, Toolbar, Typography, TextField, Button, CircularProgress, Box } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/users/register', formData);
      setSuccessMessage(response.data.message || 'User registered successfully!');
      setFormData({ username: '', email: '', password: '' });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An error occurred during registration.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#a9e18b' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PlantaE
          </Typography>
          <Button component={Link} to="/" sx={{ color: 'white' }}>login</Button>

        </Toolbar>
      </AppBar>

      {/* Registration Form */}
      <Box className="container">
        <Typography variant="h4" className="form-title">Register</Typography>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{ backgroundColor: '#a9e18b', color: 'white', '&:hover': { backgroundColor: '#98d178' } }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </Box>
    </>
  );
};

export default Register;
