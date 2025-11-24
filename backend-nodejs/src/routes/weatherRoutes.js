const express = require('express');
const {
  getCurrentWeather,
  getAQI,
  getCombinedWeather,
} = require('../controllers/weatherController');

const router = express.Router();

// All weather routes are public
router.get('/current', getCurrentWeather);
router.get('/aqi', getAQI);
router.get('/combined', getCombinedWeather);

module.exports = router;
