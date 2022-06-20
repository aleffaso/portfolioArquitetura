const Sequelize = require("sequelize");

const connection = require("./db");

const Project = connection.define('projects', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cover:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Project.sync({force:false}).then(() => {}); //Create table in case of it dos not exist

module.exports = Project;

