const express = require('express');
const { Service } = require('../models/usermodel'); // Importing the service model
const router = express.Router();

// Create a new service
router.post('/', async (req, res) => {
  try {
    const { name, description, serviceType } = req.body;

    const newService = new Service({
      name,
      description,
      serviceType,
    });

    await newService.save();
    res.status(201).json({ message: 'Service created successfully', service: newService });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching services' });
  }
});

// Get a specific service by ID
router.get('/:serviceId', async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching service' });
  }
});

module.exports = router;
