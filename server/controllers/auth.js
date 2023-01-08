const mysql = require('mysql');

exports.register=(req,res)=>{
    console.log(req.body);
    res.render('signup');
}