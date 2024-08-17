const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');  // Adjust the path based on your project structure

const TourPackage = sequelize.define('TourPackage', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    travelPlan: {
        type: DataTypes.DATE, // Assuming travel plan includes dates, locations, etc.
        allowNull: false,
    },
    pricing: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image1: {
        type: DataTypes.STRING,
    },
    image2: {
        type: DataTypes.STRING,
    },
    image3: {
        type: DataTypes.STRING,
    }
});

module.exports = TourPackage;
