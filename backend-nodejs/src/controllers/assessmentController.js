const Assessment = require('../models/Assessment');
const logger = require('../utils/logger');

// @desc    Create assessment
// @route   POST /api/assessments
// @access  Private
const createAssessment = async (req, res, next) => {
  try {
    const {
      roofArea,
      annualRainfall,
      soilType,
      roofType,
      numberOfPeople,
      location,
    } = req.body;

    // Calculate feasibility and other metrics
    const calculations = calculateFeasibility({
      roofArea,
      annualRainfall,
      soilType,
      roofType,
      numberOfPeople,
    });

    const assessment = await Assessment.create({
      userId: req.user._id,
      roofArea,
      annualRainfall,
      soilType,
      roofType,
      numberOfPeople,
      location,
      ...calculations,
    });

    res.status(201).json({
      success: true,
      message: 'Assessment created successfully',
      data: assessment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user assessments
// @route   GET /api/assessments
// @access  Private
const getAssessments = async (req, res, next) => {
  try {
    const assessments = await Assessment.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single assessment
// @route   GET /api/assessments/:id
// @access  Private
const getAssessment = async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found',
      });
    }

    // Check ownership
    if (assessment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this assessment',
      });
    }

    res.status(200).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to calculate feasibility
function calculateFeasibility(data) {
  const { roofArea, annualRainfall, soilType, roofType, numberOfPeople } = data;

  // Runoff coefficient based on roof type
  const runoffCoefficients = {
    concrete: 0.9,
    tile: 0.85,
    sheet: 0.8,
    thatched: 0.6,
  };

  const runoffCoefficient = runoffCoefficients[roofType] || 0.8;

  // Calculate potential harvest volume (liters)
  const potentialHarvestVolume = Math.round(roofArea * annualRainfall * runoffCoefficient);

  // Calculate recharge potential based on soil type
  const rechargeFactors = {
    sandy: 0.7,
    loamy: 0.5,
    clayey: 0.3,
    rocky: 0.2,
    mixed: 0.4,
  };

  const rechargePotential = Math.round(potentialHarvestVolume * (rechargeFactors[soilType] || 0.4));

  // Water saved (considering household consumption)
  const dailyConsumptionPerPerson = 135; // liters (average)
  const annualConsumption = dailyConsumptionPerPerson * numberOfPeople * 365;
  const waterSaved = Math.min(potentialHarvestVolume, Math.round(annualConsumption * 0.6));

  // Calculate feasibility score (0-100)
  let feasibilityScore = 0;
  feasibilityScore += Math.min((roofArea / 100) * 20, 20); // Roof area component
  feasibilityScore += Math.min((annualRainfall / 1000) * 30, 30); // Rainfall component
  feasibilityScore += (rechargeFactors[soilType] || 0.4) * 25; // Soil component
  feasibilityScore += runoffCoefficient * 25; // Roof type component
  feasibilityScore = Math.round(feasibilityScore);

  // Determine feasibility status
  let feasibilityStatus;
  if (feasibilityScore >= 80) feasibilityStatus = 'highly_feasible';
  else if (feasibilityScore >= 60) feasibilityStatus = 'feasible';
  else if (feasibilityScore >= 40) feasibilityStatus = 'moderately_feasible';
  else feasibilityStatus = 'not_feasible';

  // Estimate costs (simplified)
  const costPerLiter = 0.5; // INR
  const installationCost = Math.round(potentialHarvestVolume * costPerLiter * 0.1);
  const maintenanceCost = Math.round(installationCost * 0.05); // 5% annual
  const totalCost = installationCost + maintenanceCost;

  // Calculate ROI
  const waterCostPerLiter = 0.05; // INR (municipal water)
  const savingsPerYear = Math.round(waterSaved * waterCostPerLiter);
  const roiYears = savingsPerYear > 0 ? Math.round(totalCost / savingsPerYear) : 0;

  // Generate recommendations
  const recommendations = generateRecommendations({
    feasibilityScore,
    roofArea,
    annualRainfall,
    soilType,
    potentialHarvestVolume,
  });

  // System design
  const tankCapacity = Math.round(potentialHarvestVolume * 0.2); // 20% of annual harvest
  const systemDesign = {
    tankCapacity,
    filterType: tankCapacity > 10000 ? 'Multi-stage filtration' : 'Basic sand filter',
    pipeSize: roofArea > 200 ? '4 inch' : '3 inch',
    components: ['Gutters', 'First flush diverter', 'Storage tank', 'Filter', 'Distribution pipes'],
  };

  return {
    feasibilityScore,
    feasibilityStatus,
    potentialHarvestVolume,
    rechargePotential,
    waterSaved,
    estimatedCost: {
      installation: installationCost,
      maintenance: maintenanceCost,
      total: totalCost,
    },
    roi: {
      years: roiYears,
      savingsPerYear,
    },
    recommendations,
    systemDesign,
  };
}

function generateRecommendations(data) {
  const recommendations = [];

  if (data.feasibilityScore >= 80) {
    recommendations.push({
      title: 'Excellent Potential',
      description: 'Your property has excellent rainwater harvesting potential. We highly recommend installation.',
      priority: 'high',
    });
  }

  if (data.roofArea > 200) {
    recommendations.push({
      title: 'Large Roof Area',
      description: 'Your large roof area can collect significant rainwater. Consider a larger storage tank.',
      priority: 'medium',
    });
  }

  if (data.soilType === 'sandy' || data.soilType === 'loamy') {
    recommendations.push({
      title: 'Good Soil for Recharge',
      description: 'Your soil type is ideal for groundwater recharge. Include a recharge pit in your system.',
      priority: 'high',
    });
  }

  if (data.annualRainfall < 500) {
    recommendations.push({
      title: 'Low Rainfall Area',
      description: 'Focus on maximizing collection efficiency with proper gutter systems and first flush diverters.',
      priority: 'high',
    });
  }

  return recommendations;
}

module.exports = {
  createAssessment,
  getAssessments,
  getAssessment,
};
