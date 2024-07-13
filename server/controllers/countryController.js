const Country = require('../models/Country');

// get all countries
exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a specific country by name
exports.getCountry = async (req, res) => {
  try {
    const country = await Country.findOne({ name: req.params.name });
    if (!country) return res.status(404).json({ message: 'Country not found' });
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a country by name
exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );
    if (!country) return res.status(404).json({ message: 'Country not found' });
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
