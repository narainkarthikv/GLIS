const express = require('express');
const router = express.Router();
const BusStation = require('../Model/info.js');

// Get flood risk
router.get('/', async (req, res) => {
  try {
    const busStations = await BusStation.find({})
      .select('Name FloodRiskScore HistoricalFloodEvents FloodProtectionMeasures FloodZone')
      .sort({ FloodRiskScore: -1 })
      .limit(5);
    res.json(busStations);
  } catch (error) {
    console.error('Error fetching flood risk bus stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
