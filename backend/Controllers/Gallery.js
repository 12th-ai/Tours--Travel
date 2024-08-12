// controllers/GalleryController.js
const Gallery = require("../models/Gallery");

// Controller function to create a gallery entry
exports.createGallery = async (req, res) => {
  try {
    const image = req.files ? req.files[0].filename : null;

    const gallery = await Gallery.create({
      image
    });

    res.status(201).json(gallery);
  } catch (error) {
    console.error("Error creating gallery:", error);
    res.status(500).json({ error: "Failed to create gallery",error });
  }
};

// Controller function to update a gallery entry
exports.updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);

    const image = req.files ? req.files[0].filename : gallery.image;

    await gallery.update({ image });

    res.status(200).json(gallery);
  } catch (error) {
    console.error("Error updating gallery:", error);
    res.status(500).json({ error: "Failed to update gallery" });
  }
};

// Controller function to get all gallery entries
exports.getGallery = async (req, res) => {
  try {
    const galleries = await Gallery.findAll();
    res.status(200).json(galleries);
  } catch (error) {
    console.error("Error retrieving gallery:", error);
    res.status(500).json({ error: "Failed to retrieve gallery" });
  }
};

// Controller function to delete a gallery entry
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);

    if (!gallery) {
      return res.status(404).json({ error: "Gallery entry not found" });
    }

    await gallery.destroy();
    res.status(200).json({ message: "Gallery deleted successfully." });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res.status(500).json({ error: "Failed to delete gallery." });
  }
};
