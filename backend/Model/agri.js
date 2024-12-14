// models/Land.js
const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
    ownerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    landSize: { type: String, required: true },
    soilType: { type: String, required: true },
    cropCultivated: { type: String, required: true },
    agriculturalLoan: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    cropPrice: { type: String, required: true }
},
{
  collection: 'land',
});

module.exports = mongoose.model("Land", landSchema);
