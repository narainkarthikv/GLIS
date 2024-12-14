const express = require('express');
const router = express.Router();
const BusStation = require('../Model/info.js');

// Get environmental safety
router.get('/', async (req, res) => {
  try {
    const busStations = await BusStation.find({})
      .select('Name AQI BicycleInfrastructure EnvironmentalFeatures VegetationCover')
      .sort('AQI')
      .limit(5);
    res.json(busStations);
  } catch (error) {
    console.error('Error fetching environmental safety bus stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
