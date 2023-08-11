//Model da tabela de perguntas do banco de dados
const Sequelize = require("sequelize"); // importando sequelize

const connection = require("./database"); //importando conexão

//Definindo a Model
const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//executando criação no banco
Pergunta.sync({ force: false}).then(() => {
  // não força criação tabela caso a tabela já exista no banco
  console.log("Tabela de perguntas criada");
});  

module.exports = Pergunta;