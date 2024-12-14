const mongoose = require('mongoose');

const info = new mongoose.Schema({
  ID: { type: Number, required: true },
  Name: { type: String, required: true },
  Local: { type: String, required: true },
  Reg: { type: String, required: true },
  Rev: { type: String, required: true },
  Zone_type: { type: String, required: true },
  Year: { type: Number, required: true },
  FootTraffic: { type: Number, required: true },
  Acc_Score: { type: Number, required: true },
  PopulationDensity: { type: Number, required: true },
  NeAme: { type: String, required: true },
  TrafficCongestion: { type: String, required: true },
  AQI: { type: Number, required: true },
  CrimeRate: { type: String, required: true },
  DemographicData: { type: String, required: true },
  TODScore: { type: Number, required: true },
  MarketInfrastructure: { type: String, required: true },
  EnvironmentalFeatures: { type: String, required: true },
  FloodRiskScore: { type: Number, required: true },
  FloodZone: { type: String, required: true },
  Elevation: { type: Number, required: true },
  DistanceToWaterBodies: { type: Number, required: true },
  HistoricalFloodEvents: { type: Number, required: true },
  FloodProtectionMeasures: { type: String, required: true },
  SoilType: { type: String, required: true },
  VegetationCover: { type: String, required: true },
  UrbanizationLevel: { type: String, required: true },
  ClimateData: { type: String, required: true },
  lat:{type: Number,require:true},
  long:{type:Number,required:true}
},
{
  collection: 'glis',
});

const DataModel = mongoose.model('Data', info);

module.exports = DataModel;
