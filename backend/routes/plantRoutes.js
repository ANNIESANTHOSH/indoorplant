const express = require('express');
const { Plant } = require('../models/usermodel');
const router = express.Router();

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single plant by ID
router.get('/:plantId', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.plantId);
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.status(200).json(plant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new plant
router.post('/', async (req, res) => {
  try {
    const newPlant = new Plant(req.body);
    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a plant's details
router.put('/:plantId', async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.plantId, req.body, { new: true });
    res.status(200).json(updatedPlant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a plant
router.delete('/:plantId', async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.plantId);
    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
