const connection = require('./database')
const Sequelize = require('sequelize')


Answer = connection.define('answers' ,{
    body_content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    answerid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({force: false})

module.exports = Answer