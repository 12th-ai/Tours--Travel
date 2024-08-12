const TourPackage = require('../models/Tourpackage');

// Controller function to create a tour package
exports.createTourPackage = async (req, res) => {
    try {
        const { title, description, travelPlan, pricing, location } = req.body;

        const image1 = req.files?.image1 ? req.files.image1[0].filename : null;
        const image2 = req.files?.image2 ? req.files.image2[0].filename : null;
        const image3 = req.files?.image3 ? req.files.image3[0].filename : null;

        // Create the tour package in the database
        const tourPackage = await TourPackage.create({
            title,
            description,
            travelPlan,
            pricing,
            location,
            image1,
            image2,
            image3
        });

        res.status(201).json(tourPackage);
    } catch (error) {
        console.error('Error creating tour package:', error);
        res.status(500).json({ error: 'Failed to create tour package' });
    }
};

// Controller function to update a tour package
exports.updateTourPackage = async (req, res) => {
    try {
        const tourPackage = await TourPackage.findByPk(req.params.id);
        if (!tourPackage) {
            return res.status(404).json({ error: 'Tour package not found.' });
        }

        const { title, description, travelPlan, pricing, location } = req.body;

        const image1 = req.files?.image1 ? req.files.image1[0].filename : tourPackage.image1;
        const image2 = req.files?.image2 ? req.files.image2[0].filename : tourPackage.image2;
        const image3 = req.files?.image3 ? req.files.image3[0].filename : tourPackage.image3;

        await tourPackage.update({ title, description, travelPlan, pricing, location, image1, image2, image3 });

        res.status(200).json(tourPackage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tour package.' });
    }
};

// Controller function to get all tour packages
exports.getTourPackages = async (req, res) => {
    try {
        const tourPackages = await TourPackage.findAll({
            attributes: ['id', 'title', 'location', 'image1', 'image2', 'image3'],
        });
        res.status(200).json(tourPackages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tour packages.' });
    }
};

// Controller function to get a tour package by ID
exports.getTourPackageById = async (req, res) => {
    try {
        const tourPackage = await TourPackage.findByPk(req.params.id);
        if (!tourPackage) {
            return res.status(404).json({ error: 'Tour package not found.' });
        }
        res.status(200).json(tourPackage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tour package.' });
    }
};

// Controller function to delete a tour package
exports.deleteTourPackage = async (req, res) => {
    try {
        const tourPackage = await TourPackage.findByPk(req.params.id);
        if (!tourPackage) {
            return res.status(404).json({ error: 'Tour package not found.' });
        }

        await tourPackage.destroy();
        res.status(200).json({ message: 'Tour package deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tour package.' });
    }
};
