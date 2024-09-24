try {
  const controller = require('./_controllers');
  const model = require('../models/chat.model');
  controller.index = (req,res)=>{
    if (req.session.user){
        res.render('app.html',{user:req.session.user});
    }
    else
        res.render('index.html');
  }
  controller.login = (req,res)=>{
    model.login(req.body,(err,result)=>{
      if(err) res.status(500).send({ err : err.sqlMessage});
      if (result.length > 0) {
            //req.session.user = result[0];
            //res.redirect('/');
            res.render('app.html',{user:result[0]});
        } else {
            res.send('Invalid email or password. <a href="/">Try again</a>');
        }
    });
  };
  controller.logout = (req,res)=>{
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/');
    });
  }
  module.exports = controller;
  
} catch (e) {console.error(" \x1b[1m error : ~/controllers/chat.controller.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e); }
  