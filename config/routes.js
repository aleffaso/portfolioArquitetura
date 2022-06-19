const express = require("express");
const routes = express.Router();
const dotenv = require('dotenv');

//main page
routes.get("/", (req, res) => {
    res.render("index");
});

//Login
routes.get("/login", (req, res) => {
    res.render("login");
});

module.exports = routes;