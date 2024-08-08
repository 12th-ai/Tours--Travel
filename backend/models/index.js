const { Sequelize } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('hanio', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' 
});

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Tour = require('./Tour')(sequelize, Sequelize.DataTypes);

// Create an object to hold the Sequelize instance and models
const db = {
  sequelize,
  Sequelize,  
  User,
  Tour
};

// Sync the models with the database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database', err));

module.exports = db;
