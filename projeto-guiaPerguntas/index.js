const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db.js");
const modelPergunta = require("./database/model.pergunta.js")
const modelResposta = require("./database/model.resposta.js")
//Database
connection.authenticate().then(() =>
    console.log("MySql Connection Success !")
).catch((error) => console.log(error))

// Estou dizendo para o Express usar o EJS como View engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
    modelPergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
        // console.log(perguntas)
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    modelPergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => res.redirect("/"));
});

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;

    modelPergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) {

            modelResposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [["id", "DESC"]]
            }).then(respostas => {

                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta

    modelResposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)
    });
});

app.listen(8080, () => console.log("App rodando!"));