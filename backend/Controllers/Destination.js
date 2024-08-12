const Destination = require('../models/Destination');



// Controller function to create a destination
exports.createDestination = async (req, res) => {
    try {
        const { title, description, place } = req.body;



        const image1 = req.files.image1 ? req.files.image1[0].filename : null;
        const image2 = req.files.image2 ? req.files.image2[0].filename : null;
        const image3 = req.files.image3 ? req.files.image3[0].filename : null;


        // Create the destination in the database
        const destination = await Destination.create({
            title,
            description,
            place,
            image1,
            image2,
            image3
        });

        res.status(201).json(destination);
    } catch (error) {
        console.error('Error creating destination:', error);
        res.status(500).json({ error: 'Failed to create destination' });
    }
};


exports.updateDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found.' });
        }

        const { title, description, place } = req.body;

        const image1 = req.files.image1 ? req.files.image1[0].filename : null;
        const image2 = req.files.image2 ? req.files.image2[0].filename : null;
        const image3 = req.files.image3 ? req.files.image3[0].filename : null;

        await destination.update({ title, description, place, image1, image2, image3 });

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update destination.' });
    }
};


exports.getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll({
            attributes: ['id', 'title', 'place', 'image1','image2','image3'],
        });
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve destinations.' });
    }
};

exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found.' });
        }
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve destination.' });
    }
};

exports.updateDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found.' });
        }

        const { title, description, place } = req.body;
        const image1 = req.files?.image1 ? req.files.image1[0].path : destination.image1;
        const image2 = req.files?.image2 ? req.files.image2[0].path : destination.image2;
        const image3 = req.files?.image3 ? req.files.image3[0].path : destination.image3;

        await destination.update({ title, description, place, image1, image2, image3 });

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update destination.' });
    }
};

exports.deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found.' });
        }

        await destination.destroy();
        res.status(200).json({ message: 'Destination deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete destination.' });
    }
};


