try{
const db = require("../config/db.config");
const model = require('./_models.js');
model.get=(res)=>{
  db.query("SELECT * FROM users",(res));
}
module.exports = model;

}catch(e){
  console.error(" \x1b[1m error : ~/models/api.modes.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e);
}