const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination')
const TourPackage = require('../models/Tourpackage');
const Booking = require('../models/Booking');
    

router.get('/summary', async (req, res) => {
  try {
    const destinations = await Destination.findAll({ limit: 5 });
    const tourPackages = await TourPackage.findAll({ limit: 5 });
    const bookings = await Booking.findAll({ limit: 5 });

    res.json({
      destinations,
      tourPackages,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
});

module.exports = router;
