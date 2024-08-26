try {
const apiModel = require("../models/api.models.js");  
const api = function(){}

api.getAll = (req,res)=>{
  apiModel.getAll((err,result)=>{
    if(err) res.status(500).send({ err : err.sqlMessage});
    else res.json(result);
  });
}
api.findOne = (req,res)=>{
  const id = req.params.id;
  apiModel.findOne(id,(err,result)=>{
    if(err) res.status(500).send({ err : err.sqlMessage});
    else res.json(result);
  });
}
module.exports = api;
} catch (e) {console.log("api.controller ERORR :- "+e);}