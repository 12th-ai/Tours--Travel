// controllers/TestimonialController.js
const Testimonial = require('../models/Testimonial');

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
    try {
        const { name, content } = req.body;
        const image = req.files && req.files[0] ? req.files[0].filename : null;

        const testimonial = await Testimonial.create({ name, content, image });
        res.status(201).json(testimonial);
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({ error: 'Failed to create testimonial', details: error });
    }
};

// Update an existing testimonial
exports.updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        const { name, content } = req.body;
        const image = req.files && req.files[0] ? req.files[0].filename : testimonial.image;

        await testimonial.update({ name, content, image });
        res.status(200).json(testimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ error: 'Failed to update testimonial', details: error });
    }
};

// Get all testimonials
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();
        res.status(200).json(testimonials);
    } catch (error) {
        console.error('Error retrieving testimonials:', error);
        res.status(500).json({ error: 'Failed to retrieve testimonials', details: error });
    }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByPk(req.params.id);

        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        await testimonial.destroy();
        res.status(200).json({ message: 'Testimonial deleted successfully.' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ error: 'Failed to delete testimonial', details: error });
    }
};
