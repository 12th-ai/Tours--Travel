const Booking  = require('../models/Booking'); // Correct import
const nodemailer = require('nodemailer');
const TourPackage = require('../models/Tourpackage')

const createBooking = async (req, res) => {
    const { tourPackageId, fullName, email, amount, message } = req.body;

    try {
        // Create a new booking linked to the tour package
        const booking = await Booking.create({
            tourPackageId,
            fullName,
            email,
            amount,
            message,
            status: 'Approved', // Automatically approve for now
        });

        // Fetch the tour package to include in the email (if needed)
        const tourPackage = await TourPackage.findByPk(tourPackageId);

        // // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Booking Confirmation',
            text: `Dear ${fullName},\n\nYour booking for tour package  has been successfully approved.\n\nThank you for choosing our service!\n\nBest regards,\nYour Company`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: 'Booking successful and confirmation email sent!',
            booking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createBooking };
