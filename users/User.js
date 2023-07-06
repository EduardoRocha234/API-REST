const Sequelize = require('sequelize');
const connection = require('../database/database')

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allownNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allownNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allownNull: false,
    }
})

User.sync({force:false})
    .then(() => {})

module.exports = User