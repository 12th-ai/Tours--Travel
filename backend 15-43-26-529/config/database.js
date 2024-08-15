const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(

    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
    }
);

module.exports = { sequelize };
