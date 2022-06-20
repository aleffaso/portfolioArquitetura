const express = require("express");
const routes = express.Router();

const Curriculo = require('../db/Curriculo');
const Project = require('../db/Project');

//main page
routes.get("/", (req, res) => {
    Curriculo.findAll().then(curriculo => {
        Project.findAll().then(project => {
            res.render("index", {curriculo:curriculo, project:project, message:true, token:req.session.token});
        });
    });
});

module.exports = routes;