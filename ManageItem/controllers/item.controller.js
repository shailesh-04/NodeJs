try {
const itemsModel= require("../models/item.models");
const Controller= function(){}

Controller.show = (req,res) =>{
  itemsModel.show((err,data)=>{
    if(err) res.status(500).send({ err : err.sqlMessage});
    else res.render("item/index",{data:data});
  });
}
Controller.new = (req,res)=>{
  res.render("item/New");
}
Controller.create = (req,res)=>{
  const data = {
    name: req.body.name,
    description: req.body.description
  };
  itemsModel.create(data,(err,success)=>{
    if(err){console.log(err);res.status(500).send({ err : err.sqlMessage});}
    else res.send({message:"Inputed Value successfuly Inser"});
  });
}
Controller.edit = (req,res)=>{
  const id = req.params.id;
  itemsModel.findId(id,(err,data)=>{
    if(err) res.status(500).send({ err : err.sqlMessage});
    else res.render("item/Edit",{data:data });
  });
}
Controller.update = (req,res)=>{
  const id = req.params.id;
 const data = {
    name: req.body.name,
    description: req.body.description
  };
 itemsModel.update(id,data,(err,data)=>{
    if(err) res.status(500).send({ err : err.sqlMessage});
    else res.send({message:"successfuly"});
 });
}
Controller.delete = (req,res)=>{
  const id = req.params.id;
  itemsModel.delete(id,(err,result)=>{
    if(err)res.status(500).send({ err:err.sqlMessage});
    else res.send({message:"successfuly"});  
  });
}
module.exports = Controller; 
} catch (e) {
  console.log("item.Contraller ERROR =>:"+e);
}
  