const express = require('express');
const router = express.Router();
const destinationController = require('../Controllers/Destination');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


router.post('/destinations', 
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
    ]), 
    destinationController.createDestination
);


// Route to get all destinations
router.get('/destinations', destinationController.getDestinations);

// Route to get a specific destination by ID
router.get('/destinations/:id', destinationController.getDestinationById);

// Route to update a specific destination by ID
router.put(
    '/destinations/:id',
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
    ]),
    destinationController.updateDestination
);

// Route to delete a specific destination by ID
router.delete('/destinations/:id', destinationController.deleteDestination);

module.exports = router;
