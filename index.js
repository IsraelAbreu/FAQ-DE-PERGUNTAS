/*
    # Stacks utilizadas no projeto! #
    Express
    EJS - template engine do JS - framework
    Nodemon
    Bootstrap - framework
    MySQL
    JS
*/


const express = require("express");
//instanciando o body-parser
const bodyParser = require("body-parser");
const app = express(); //cópia da instância do express.
//informando para o express usar o ejs como engine
app.set('view engine', 'ejs');

//definindo utilização de arquivos estáticos como, css, front e tals..
app.use(express.static('public'));

//linkando body-parser no express
app.use(bodyParser.urlencoded({extended: false})); //traduz os dados em uma estrutura javascript

app.use(bodyParser.json()); //permite que o javascript leia dados do formulário via Json.

const connection = require("./database/database"); //importando conexão.
const Pergunta = require("./database/Pergunta"); // ao importar aqui a tabela já é criada imediatamente.

const Resposta = require("./database/Reposta");

//Database - configruando promisse de conexão.
connection.authenticate()
    .then(() => {
        console.log("Conexão estabelecida");
    })
    .catch((msgErro) => {
        console.log("Erro ao conectar no banco");
});



//Iniciando servidor:
app.listen(8080, () => {
    console.log("Servidor iniciado com sucesso! http://localhost:8080");

});


//Rotas:
app.get("/", (req, res) => {
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC'] //ASC
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    }); //pegando a coleção de perguntas
    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {

        if (pergunta != undefined) { //pergunta encontrada

            Resposta.findAll({
              where: { id_pergunta: pergunta.id },
              order: [["id", "DESC"]],
            }).then((respostas) => {
              res.render("pergunta", {
                pergunta: pergunta,
                respostas: respostas,
              });
            });

            
        } else { //Não encontrada
            res.redirect("/");
        }
        
    });
    
})

//POST PERGUNTA
app.post("/salvar-pergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    }).catch(() => {
        console.log("Ocorreu um erro ao tentar adicionar a pergunta");
    });
});

//POST RESPOSTA
app.post("/salvar-resposta", (req, res) => {

    var corpo = req.body.corpo;
    var id_pergunta = req.body.id_pergunta;

    Resposta.create({
        corpo: corpo,
        id_pergunta: id_pergunta
    }).then(() => {
        res.redirect("/pergunta/"+id_pergunta);
    }).catch(() => {
         console.log("Ocorreu um erro ao responder a pergunta");
    })
})

