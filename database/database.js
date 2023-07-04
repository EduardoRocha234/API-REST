const Sequelize = require('sequelize');

const connection = new Sequelize('gamesapi', 'root', '123dev', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection