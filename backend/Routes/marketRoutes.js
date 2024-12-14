const express = require('express');
const router = express.Router();
const Market = require('../Model/market.js');

router.get('/', async (req, res) => {
    try {
      const marketsData = await Market.find({});
      res.json(marketsData);
    } catch (error) {
      console.error('Error fetching crops data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const marketData = await Market.findOne({ ID: id });
    if (!marketData) {
      return res.status(404).json({ error: 'Market data not found for this ID.' });
    }
    return res.json(marketData);
  } 
  catch (error) {
    console.error('Error fetching market data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:id?/crops', async (req, res) => {
  let { id } = req.params;

  if (!id) {
    const urlParts = req.url.split('/');
    id = urlParts[3];
  }

  const { Name, Quantity, Price } = req.body; 
  try {
    const marketData = await Market.findOne({ ID: id });
    if (!marketData) {
      return res.status(404).json({ message: 'Market data not found for this ID.' });
    }
    marketData.Crops.push({ Name, Quantity, Price }); 
    await marketData.save();
    res.status(201).json(marketData);
  } catch (error) {
    console.error('Error adding crop:', error);
    res.status(500).json({ message: 'Error adding crop to the database.' });
  }
});

router.delete('/:id/crops/:cropId', async (req, res) => {
  const { id, cropId } = req.params;
  try {
    const marketsData = await Market.findOne({ ID: id });
    if (!marketsData) {
      return res.status(404).json({ message: 'Market data not found for this ID.' });
    }
    const cropIndex = marketsData.Crops.findIndex(crop => crop._id == cropId); // Update property name
    if (cropIndex === -1) {
      return res.status(404).json({ message: 'Crop not found in market data.' });
    }
    marketsData.Crops.splice(cropIndex, 1);
    await marketsData.save();
    res.json({ message: 'Crop deleted successfully.' });
  } catch (error) {
    console.error('Error deleting crop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update the quantity of a crop
router.put('/:id/crops/:cropId', async (req, res) => {
  const { id, cropId } = req.params;
  const { Quantity } = req.body; // New quantity

  try {
    const marketData = await Market.findOne({ ID: id });
    if (!marketData) {
      return res.status(404).json({ message: 'Market data not found for this ID.' });
    }
    const crop = marketData.Crops.id(cropId);
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found in market data.' });
    }
    crop.Quantity = Quantity; // Update quantity
    await marketData.save();
    res.json({ message: 'Crop quantity updated successfully.' });
  } catch (error) {
    console.error('Error updating crop quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
