const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
console.log('Sequelize instance in User model:', sequelize);

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    timestamps: true
});

module.exports = User;
