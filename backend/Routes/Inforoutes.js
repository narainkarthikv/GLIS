const express = require('express');
const router = express.Router();
const BusStation = require('../Model/info.js');

// Get all bus stations
router.get('/', async (req, res) => {
  try {
    const busStations = await BusStation.find({});
    res.json(busStations);
  } catch (error) {
    console.error('Error fetching bus stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get bus station by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const busStation = await BusStation.findOne({ ID: id });
    if (!busStation) {
      return res.status(404).json({ error: 'Bus station not found' });
    }
    return res.json(busStation);
  } 
  catch (error) {
    console.error('Error fetching bus station by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
