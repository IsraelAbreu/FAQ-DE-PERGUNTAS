//Model da tabela de perguntas do banco de dados
const Sequelize = require("sequelize"); // importando sequelize

const connection = require("./database"); //importando conexão

//Definindo a Model
const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    id_pergunta:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//executando criação no banco
Resposta.sync({ force: false}).then(() => {
  // não força criação tabela caso a tabela já exista no banco
  console.log("Tabela de respostas criada");
});  

module.exports = Resposta;