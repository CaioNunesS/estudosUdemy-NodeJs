const Sequelize = require("sequelize");
const connection = require("./db.js");

const modelResposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

modelResposta.sync({force: false});

module.exports = modelResposta;