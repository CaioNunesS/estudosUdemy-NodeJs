const Sequelize = require("sequelize")

const connection = new Sequelize('guiaperguntas', 'root', '985766Cn!',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection