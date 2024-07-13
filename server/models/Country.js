const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name: String,
  capital: String,
  region: String,
  subregion: String,
  population: Number,
  timezone: String,
  continent: String,
  flag: String,
}, { collection: 'countries' });

module.exports = mongoose.model('Country', CountrySchema);
