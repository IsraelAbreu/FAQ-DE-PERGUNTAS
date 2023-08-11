// Conexão com o Sequelize

const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection; //exportando conexão para usa-la em outras partes do código