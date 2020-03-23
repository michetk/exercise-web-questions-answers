const Sequelize = require('sequelize')

connection = new Sequelize('questionguide', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection