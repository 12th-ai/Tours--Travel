// controllers/TourGuideController.js
const TourGuide = require('../models/TourGuide');

// Create a new tour guide
exports.createTourGuide = async (req, res) => {
    try {
        const { name, email, phone, facebookUrl, instagramUrl, twitterUrl } = req.body;
        const image = req.file ? req.file.filename : null;

        const tourGuide = await TourGuide.create({
            name,
            email,
            phone,
            image,
            facebookUrl,
            instagramUrl,
            twitterUrl,
        });

        res.status(201).json(tourGuide);
    } catch (error) {
        console.error('Error creating tour guide:', error);
        res.status(500).json({ error: 'Failed to create tour guide' });
    }
};

// Get all tour guides
exports.getAllTourGuides = async (req, res) => {
    try {
        const tourGuides = await TourGuide.findAll();
        res.status(200).json(tourGuides);
    } catch (error) {
        console.error('Error retrieving tour guides:', error);
        res.status(500).json({ error: 'Failed to retrieve tour guides' });
    }
};

// Get a single tour guide by ID
exports.getTourGuideById = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findByPk(req.params.id);
        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }
        res.status(200).json(tourGuide);
    } catch (error) {
        console.error('Error retrieving tour guide:', error);
        res.status(500).json({ error: 'Failed to retrieve tour guide' });
    }
};

// Update a tour guide
exports.updateTourGuide = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findByPk(req.params.id);
        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }

        const { name, email, phone, facebookUrl, instagramUrl, twitterUrl } = req.body;
        const image = req.file ? req.file.filename : tourGuide.image;

        await tourGuide.update({
            name,
            email,
            phone,
            image,
            facebookUrl,
            instagramUrl,
            twitterUrl,
        });

        res.status(200).json(tourGuide);
    } catch (error) {
        console.error('Error updating tour guide:', error);
        res.status(500).json({ error: 'Failed to update tour guide' });
    }
};

// Delete a tour guide
exports.deleteTourGuide = async (req, res) => {
    try {
        const tourGuide = await TourGuide.findByPk(req.params.id);
        if (!tourGuide) {
            return res.status(404).json({ error: 'Tour guide not found' });
        }

        await tourGuide.destroy();
        res.status(200).json({ message: 'Tour guide deleted successfully' });
    } catch (error) {
        console.error('Error deleting tour guide:', error);
        res.status(500).json({ error: 'Failed to delete tour guide' });
    }
};
