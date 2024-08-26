const db = require("../config/db.config.js");
const api = function(){}
api.getAll = (res)=>{
  db.query("SELECT * FROM items",res);
};
api.findOne = (id,res)=>{
  db.query("SELECT * FROM items WHERE id = ?",id,res);
};
module.exports = api;