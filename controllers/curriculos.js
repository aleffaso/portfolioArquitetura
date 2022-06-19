const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const routes = express.Router();

const Curriculo = require('../db/Curriculo');

dotenv.config({path: './.env'})

routes.get("/curriculo", (req, res) => {
    res.render("admin/curriculo/curriculo");
});

routes.get("/curriculo/new", (req, res) => {
    res.render("admin/curriculo/new");
});

routes.post("/curriculo/new", (req,res) => {

    var {name, email, password, passwordCheck, about, ability, experience, course} = req.body;

    if(password != passwordCheck){
        res.send("É necessário informar a mesma senha");
    };

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
            }).then((data) => {
                res.render("admin/curriculo/curriculo", {message:data});
            }).catch((err) => {
                res.render("admin/curriculo/curriculo", {message:err});
            });

        }else{
            res.send("O e-mail já existe");
        }
    })
});

// routes.post("/curriculo/delete", adminAuth, (req, res) => {

//     var id = req.body.id;

//     if(id != undefined){
//         if(!isNaN(id)){ //is it a number or not?
//             User.destroy({
//                 where: {
//                     id: id
//                 }
//             }).then(() => {
//                 res.redirect("/admin/users");
//             });
//         }else{
//             res.redirect("/admin/users");
//         }
//     }else{
//         res.redirect("/admin/users");
//     }
// });

// routes.get("/curriculo/edit/:id", (req,res) => {

//     var id = req.params.id;

//     if(isNaN(id)){
//         res.redirect("/admin/users");
//     };

//     User.findByPk(id).then(user => { //Search user by its ID
//         if(user != undefined){
//             res.render("admin/users/edit", {user: user});
//         }else{
//             res.redirect("/admin/users");
//         }
//     }).catch(err => {
//         res.redirect("/admin/users");
//     });
// });

// routes.post("/curriculo/update", (req,res) => {

//     var {id, name, email, password, passwordCheck, about, ability, experience, course} = req.body;

//     if(password != passwordCheck){
//         res.send("É necessário informar a mesma senha");
//     };

//     var salt = bcrypt.genSaltSync(10);
//     var hash = bcrypt.hashSync(password,salt);

//     User.update({
//         name: name, 
//         email: email, 
//         password: hash,
//         about: about,
//         ability:ability, 
//         experience:experience,
//         course:course
//     },{
//         where: {
//             id:id
//         }
//     }).then(() => {
//         res.redirect("/admin/users");
//     }).catch(err => {
//         res.redirect("/admin/users");
//     });
// });

module.exports = routes;