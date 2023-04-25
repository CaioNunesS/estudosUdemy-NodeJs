const Sequelize = require("sequelize");
const connection = require("./db.js");

const modelPergunta = connection.define("perguntas", {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

modelPergunta.sync({force: false}).then(()=> console.log("Table created!"))

module.exports = modelPergunta;