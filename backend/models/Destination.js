const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Destination = sequelize.define('Destination', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image1: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable
    },
    image2: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable
    },
    image3: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable
    },
});

module.exports = Destination;
