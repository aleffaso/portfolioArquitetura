const express = require('express');
const routes = express.Router();
const slugify = require('slugify');

const Project = require('../db/Project');
const adminAuth = require('../middleware/adminAuth')

routes.get("/projects", adminAuth, (req, res) => {
    Project.findAll().then(project => {
        res.render("admin/projects/project", {project:project, token:req.session.token, message:null});
    })
});

routes.get("/project/new", adminAuth, (req, res) => {
    res.render("admin/projects/new",{token:req.session.token, message:null});
});

routes.post("/project/new", adminAuth, (req,res) => {

    var {title, cover, body} = req.body;

        Project.create({
            title: title,
            slug: slugify(title),
            cover:cover,
            body: body
        }).then(() => {
            Project.findAll().then(project => {
                res.render("admin/projects/project", {token:req.session.token, project:project, message:true, title:'Criado com sucesso'});
            })
        }).catch((err) => {
            Project.findAll().then(project => {
                res.render("admin/projects/project", {token:req.session.token, project:project, message:false, error:err});
            });
        });
});

routes.get("/project/edit/:id", adminAuth, (req,res) => {

    var id = req.params.id;

    Project.findByPk(id).then(project => { //Search curriculo by its ID
        if(project != undefined){
            res.render("admin/projects/edit", {token:req.session.token, project: project, message:null});
        }else{
            Project.findAll().then(project => {
                res.render("admin/projects/project", {token:req.session.token, project: project, message:false, error:'Projeto não encontrado'});
            });
        }
    }).catch(err => {
        Project.findAll().then(project => {
            res.render("admin/projects/project", {token:req.session.token, project: project, message:false, error:'projeto não encontrado'});
        });
    });
});

routes.post("/project/update", adminAuth, (req,res) => {

    var {id, title, cover, body } = req.body;

        Project.update({
            title: title, 
            slug: slugify(title),
            cover: cover,
            body:body
        },{
            where: {
                id:id
            }
        }).then(() => {
            Project.findAll().then(project => {
                res.render("admin/projects/project", {token:req.session.token, message:true, title:'Atualizado com sucesso', project:project});
            })
        }).catch(err => {
            Project.findAll().then(project => {
                res.render("admin/projects/edit", {token:req.session.token, project:project, message:false, error:err});
            });
        });
});

routes.post('/project/delete', adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){ //is it a number or not?
            Project.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                Project.findAll().then(project => {
                    res.render("admin/projects/project", {token:req.session.token, message:true, title:'Deletado com sucesso', project:project});
                })
            });
        }else{
            Project.findAll().then(project => {
                res.render("admin/projects/project", {token:req.session.token, message:true, title:'Projeto não encontrado', project:project});
            })
        }
    }else{
        Project.findAll().then(project => {
            res.render("admin/projects/project", {token:req.session.token, message:true, title:'Projeto não encontrado', project:project});
        })
    }
});

module.exports = routes;