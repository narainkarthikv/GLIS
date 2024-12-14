const express = require('express');
const router = express.Router();
const BusStation = require('../Model/info.js');

// Get top revenue
router.get('/', async (req, res) => {
  try {
    const busStations = await BusStation.find({})
      .select('Name Rev Zone_type Size Acc_Score')
      .sort({ Rev: -1 })
      .limit(5);
    res.json(busStations);
  } catch (error) {
    console.error('Error fetching top revenue bus stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
