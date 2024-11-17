import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import HomePage from './components/home'
import AddServiceForm from './components/service'
import CatalogPage from './components/catalog'

function App() {
  const location = useLocation(); // To get the current route

  return (
    <>
      {/* Render Navbar only on non-login, non-register routes */}
      {location.pathname !== '/' && location.pathname !== '/register' && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/services" element={<AddServiceForm />} />
        <Route path="/catalog" element={<CatalogPage />} />
      </Routes>
    </>
  )
}

export default App
