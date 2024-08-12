// routes/gallery.js
const express = require('express');
const multer = require('multer');
const { createGallery, updateGallery, getGallery, deleteGallery } = require('../Controllers/Gallery');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create a new gallery entry
router.post('/', upload.array('image', 1), createGallery);

// Update an existing gallery entry
router.put('/:id', upload.array('image', 1), updateGallery);

// Get all gallery entries
router.get('/', getGallery);

// Delete a gallery entry
router.delete('/:id', deleteGallery);

module.exports = router;
