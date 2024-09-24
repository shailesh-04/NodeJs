try {
  const model = require('../models/api.model');
  const controller = require('./_controllers');
  
  controller.get = (req,res)=>{
    model.get((err,result)=>{
      if(err) res.status(500).send({ err : err.sqlMessage});
      else res.json(result);
    });
  }
  module.exports = controller;
} catch (e) {
 console.error(" \x1b[1m error : ~/controllers/api.controller.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e); 
}