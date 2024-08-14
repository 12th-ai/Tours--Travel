const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Destination = require('./Destination')(sequelize, Sequelize.DataTypes);
const TourPackage = require('./Tourpackage')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);

module.exports = {
  Destination,
  TourPackage,
  Booking,
};
