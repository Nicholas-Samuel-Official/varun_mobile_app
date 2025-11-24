const express = require('express');
const { body } = require('express-validator');
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.use(protect); // All routes are protected

const appointmentValidation = [
  body('preferredDate').isISO8601().withMessage('Valid date is required'),
  body('preferredTime').notEmpty().withMessage('Preferred time is required'),
  body('location.address').notEmpty().withMessage('Address is required'),
  body('contactName').notEmpty().withMessage('Contact name is required'),
  body('contactPhone').matches(/^[0-9]{10}$/).withMessage('Valid 10-digit phone number is required'),
];

router.post('/', appointmentValidation, validate, createAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', cancelAppointment);

module.exports = router;
