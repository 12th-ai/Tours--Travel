// models/TourGuide.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TourGuide = sequelize.define('TourGuide', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    facebookUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    instagramUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    twitterUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = TourGuide;
