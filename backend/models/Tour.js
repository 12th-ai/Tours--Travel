'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Tour extends Model {}

  Tour.init({
    tour_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tourDetail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gallery: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [
        'default1.jpg',
        'default2.jpg',
        'default3.jpg'
      ]
    }
  }, {
    sequelize,
    modelName: 'Tour',
    timestamps: true,
    tableName: 'tours'
  });

  return Tour;
};
