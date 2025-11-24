const express = require('express');
const {
  getSensors,
  getSensor,
  addSensorReading,
  getSensorReadings,
} = require('../controllers/iotController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.get('/sensors', protect, getSensors);
router.get('/sensors/:id', protect, getSensor);
router.post('/sensors/:id/readings', addSensorReading); // Public for IoT devices
router.get('/sensors/:id/readings', protect, getSensorReadings);

module.exports = router;
