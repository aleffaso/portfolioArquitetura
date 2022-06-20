const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');

dotenv.config({path: './.env'})

function adminAuth(req, res, next){

    const authToken = req.session.token;

    if(authToken != undefined){       
        jwt.verify(authToken, process.env.JWT_TOKEN, (err, user) => {
            if(err){
                res.render("login", {token:req.session.token, message:false, error:err});
            }else{
                next();
            }
        })
    }else{
        res.render("login", {token:req.session.token, message:false, error:"Você precisa estar logado"});
    }
};

module.exports = adminAuth;