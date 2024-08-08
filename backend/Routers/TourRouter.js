// routes/tourRoutes.js
const express = require('express');
const { validateTour } = require('../Middleware/Validators/ToursValidator'); // Adjust the path to your validators
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require('../Controllers/TourController'); // Adjust the path to your controllers

const router = express.Router();

router.get('/', getAllTours);
router.get('/:id', getTourById);
router.post('/', validateTour, createTour);
router.put('/:id', validateTour, updateTour);
router.delete('/:id', deleteTour);

module.exports = router;
