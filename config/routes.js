const express = require("express");
const routes = express.Router();
const dotenv = require('dotenv');

const Curriculo = require('../db/Curriculo');

//main page
routes.get("/", (req, res) => {
    Curriculo.findAll().then(curriculo => {
        res.render("index", {curriculo:curriculo, token:req.session.token});
    })
});

module.exports = routes;