const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Gallery = sequelize.define('Gallery', {
    gallery: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
  
});

module.exports = Gallery;
