// routes/testimonialRoutes.js
const express = require('express');
const router = express.Router();
const TestimonialController = require('../Controllers/TestimonialController');

// Import any necessary middlewares (like for file uploads)
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure this according to your setup

// CRUD routes
router.post('/', upload.array('image', 1), TestimonialController.createTestimonial);
router.put('/:id', upload.array('image', 1), TestimonialController.updateTestimonial);
router.get('/', TestimonialController.getTestimonials);
router.delete('/:id', TestimonialController.deleteTestimonial);

module.exports = router;
