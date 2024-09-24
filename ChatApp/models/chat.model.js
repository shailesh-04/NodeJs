try {
  const model = require('./_models.js');
  const db = require('../config/db.config.js');
  
  model.login= ({email,password},res)=>{
    db.query("SELECT * FROM users WHERE email = ?",[email],res);
  };
  
  module.exports = model;
} catch (e) {console.error(" \x1b[1m error : ~/models/chat.model \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e); }