const express = require('express');
const { body } = require('express-validator');
const {
  createAssessment,
  getAssessments,
  getAssessment,
} = require('../controllers/assessmentController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.use(protect); // All routes are protected

const assessmentValidation = [
  body('roofArea').isNumeric().withMessage('Roof area must be a number'),
  body('annualRainfall').isNumeric().withMessage('Annual rainfall must be a number'),
  body('soilType').isIn(['sandy', 'loamy', 'clayey', 'rocky', 'mixed']).withMessage('Invalid soil type'),
  body('location.latitude').isNumeric().withMessage('Latitude must be a number'),
  body('location.longitude').isNumeric().withMessage('Longitude must be a number'),
];

router.post('/', assessmentValidation, validate, createAssessment);
router.get('/', getAssessments);
router.get('/:id', getAssessment);

module.exports = router;
