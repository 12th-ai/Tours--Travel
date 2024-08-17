const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tours_and_travel', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Package = sequelize.define('Package', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

sequelize.sync();

module.exports = { Package };
