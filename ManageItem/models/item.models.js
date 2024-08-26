try{
const db = require("../config/db.config.js");
const Model = function(){}

Model.show=(res)=>{
  db.query("SELECT * FROM items",(res));
}
Model.create = (data,res)=>{
 db.query("INSERT INTO items(name,description) VALUES(?,?)",[data.name,data.description],(res)); 
};
Model.findId = (id,res)=>{
  db.query("SELECT * FROM items WHERE id = ?",id,((res)));
}
Model.update = (id,data,res)=>{
  console.log("modell");
  db.query("update items set name = ?, description = ? where id = ?",[data.name,data.description,id],((res)));
}
Model.delete = (id,res)=>{
  db.query("DELETE FROM items WHERE id = ?",id,(res));
  
}
module.exports = Model;

}catch(e){
  console.log("item.model.create ERRO =>: "+e);
}