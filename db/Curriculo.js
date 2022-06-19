const Sequelize = require("sequelize");

const connection = require("./db");

const Curriculo = connection.define('curriculo', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    about: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ability: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    experience: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    course: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Curriculo.sync({force:false}).then(() => {}); //Create table in case of it dos not exist

module.exports = Curriculo;

