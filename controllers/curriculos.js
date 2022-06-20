const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken")
const routes = express.Router();

const Curriculo = require('../db/Curriculo');
const adminAuth = require('../middleware/adminAuth')

dotenv.config({path: './.env'})

routes.get("/curriculo", adminAuth, (req, res) => {
    Curriculo.findAll().then(curriculo => {
        res.render("admin/curriculo/curriculo", {curriculo:curriculo, token:req.session.token, message:null});
    })
});

routes.get("/curriculo/new", adminAuth, (req, res) => {
    res.render("admin/curriculo/new",{token:req.session.token, message:null});
});

routes.post("/curriculo/new", adminAuth, (req,res) => {

    var {name, email, password, passwordCheck, about, ability, experience, course} = req.body;

    if(password == passwordCheck){

        Curriculo.findOne({where:{email: email}}).then(curriculo => {

            if(curriculo == undefined){
                
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password,salt);

                Curriculo.create({
                    name: name,
                    email: email,
                    password: hash,
                    about: about,
                    ability: ability,
                    experience: experience,
                    course: course
                }).then(() => {
                    Curriculo.findAll().then(curriculo => {
                        res.render("admin/curriculo/curriculo", {token:req.session.token, curriculo:curriculo, message:true, title:'Criado com sucesso'});
                    })
                }).catch((err) => {
                    Curriculo.findAll().then(curriculo => {
                        res.render("admin/curriculo/curriculo", {token:req.session.token, curriculo:curriculo, message:false, error:err});
                    })
                });

            }else{
                res.render("admin/curriculo/new", {token:req.session.token, message:false, error:'O e-mail já existe'});
            }
        })
    }else{
        res.render("admin/curriculo/new", {token:req.session.token, message:false, error:'As senhas precisam ser idênticas'});
    }
});

routes.get("/curriculo/edit/:id", adminAuth,(req,res) => {

    var id = req.params.id;

    Curriculo.findByPk(id).then(curriculo => { //Search curriculo by its ID
        if(curriculo != undefined){
            res.render("admin/curriculo/edit", {token:req.session.token, curriculo: curriculo, message:null});
        }else{
            res.render("admin/curriculo/curriculo", {token:req.session.token, message:false, error:'Curriculo não encontrado'});
        }
    }).catch(err => {
        res.render("admin/curriculo/curriculo", {token:req.session.token, message:false, error:'Curriculo não encontrado'});
    });
});

routes.post("/curriculo/update", adminAuth, (req,res) => {

    var {id, name, email, password, passwordCheck, about, ability, experience, course} = req.body;

    if(password == passwordCheck){

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password,salt);

        Curriculo.update({
            name: name, 
            email: email, 
            password: hash,
            about: about,
            ability:ability, 
            experience:experience,
            course:course
        },{
            where: {
                id:id
            }
        }).then(() => {
            Curriculo.findAll().then(curriculo => {
                res.render("admin/curriculo/curriculo", {token:req.session.token, message:true, title:'Atualizado com sucesso', curriculo:curriculo});
            })
        }).catch(err => {
            Curriculo.findAll().then(curriculo => {
                res.render("admin/curriculo/edit", {token:req.session.token, curriculo:curriculo, message:false, error:err});
            });
        });
    }else{
        Curriculo.findAll().then(curriculo => {
            res.render("admin/curriculo/edit", {token:req.session.token, curriculo:curriculo, message:false, error:'As senhas precisam ser idênticas'});
        });
    }
});

routes.get("/login", (req,res) => {
    res.render("login", {token:req.session.token, message:true, error:null});
}); 

routes.post("/login", (req, res) => {

    var {email, password} = req.body;

    if(email != undefined) {

        Curriculo.findOne({where: {email: email}}).then(curriculo => {

            if(curriculo != undefined){

                if( bcrypt.compareSync(password, curriculo.password)){

                    jwt.sign({id:curriculo.id, email:curriculo.email}, process.env.JWT_TOKEN, {expiresIn:'10h'}, (err, token) =>{
                        if(err){
                            res.redirect("/login");
                        }else{
                            req.session.token = token
                            res.redirect("/curriculo");   
                        }
                    });
                }else{
                    res.render("login", {token:req.session.toke, message:false, error:'Senha ou e-mail inválidos'});
                }
            }else{
                res.render("login", {token:req.session.toke, message:false, error:'Usuário não encontrado'});
            }
        });
    }else{
        res.render("login", {token:req.session.toke, message:false, error:'Usuário não encontrado'});
    }
});

routes.get("/logout", (req,res) => {
    req.session.token = undefined;
    res.render("login", {token:req.session.token, message:true, error:false});
});

module.exports = routes;