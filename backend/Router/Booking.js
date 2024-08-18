const express = require('express');
const router = express.Router();

const {createBooking}= require('../Controllers/Booking');

router.post('/booking',createBooking);

module.exports = router;