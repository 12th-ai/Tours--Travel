const express = require('express');
const router = express.Router();
const TourPackageController = require('../Controllers/TourpackagesContol');
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

router.post('/', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), TourPackageController.createTourPackage);

router.put('/tour-packages/:id', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), TourPackageController.updateTourPackage);

router.get('/', TourPackageController.getTourPackages);

router.get('/:id', TourPackageController.getTourPackageById);

router.delete('/:id', TourPackageController.deleteTourPackage);

module.exports = router;
