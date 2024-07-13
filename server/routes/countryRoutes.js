const express = require('express');
const { getCountries, getCountry, updateCountry } = require('../controllers/countryController');

const router = express.Router();

// Define routes
router.get('/', getCountries); // get all countries
router.get('/:name', getCountry); // get a country by name
router.put('/:name', updateCountry); // update a country by name

module.exports = router;
