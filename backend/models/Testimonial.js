// models/Testimonial.js
const { DataTypes } = require('sequelize');
const {sequelize } = require('../config/database'); // Adjust the path as necessary

const Testimonial = sequelize.define('Testimonial', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Testimonial;
