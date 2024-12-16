const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  ID: { type: Number },
  Crops: [
    {
      Name: { type: String, required: true },
      Price: {type: Number, required: true},
      Quantity: { type: Number, required: true }
    }
  ]
},
{
  collection: 'market',timestamps: true,
});

const Market = mongoose.model('market', marketSchema);

module.exports = Market;
