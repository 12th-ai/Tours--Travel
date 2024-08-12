// routes/tourGuideRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const TourGuideController = require('../Controllers/TourGuideController');

// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Routes for tour guides
router.post('/', upload.single('image'), TourGuideController.createTourGuide);
router.get('/', TourGuideController.getAllTourGuides);
router.get('/:id', TourGuideController.getTourGuideById);
router.put('/:id', upload.single('image'), TourGuideController.updateTourGuide);
router.delete(':id', TourGuideController.deleteTourGuide);

module.exports = router;
