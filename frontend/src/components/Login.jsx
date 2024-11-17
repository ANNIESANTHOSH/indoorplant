import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email: userEmail, password });
      const { token, user } = response.data;

      if (token && user.email) {
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', user.email);

        alert('Login successful');
        navigate('/home');
      }
    } catch (error) {
      alert(error.response?.data.error || 'Login failed. Please check your credentials.');
      navigate('/register');
    }
  };

  return (
    <div className="login-page">
      <Box className="login-box">
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: '10px', marginTop: 2 }}>
            Login
          </Button>
        </form>

        {/* Link to Create a New Account */}
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account?{' '}
          <Link href="/register" underline="hover">
            Create a new account
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
