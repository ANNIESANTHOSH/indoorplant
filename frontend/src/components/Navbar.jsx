import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">PlantaE</div>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/catalog">portfolio</Link>
        <Link to="/" onClick={() => {
          localStorage.removeItem('token');
        }}>Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
