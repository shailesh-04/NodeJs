try {
  const router = require("express").Router();   
  const contraller = require('../controllers/_controllers');
  module.exports = (app) => {
    
    app.use("/",require('./chat.route.js')); 
    app.use("/api/",require('./api.route'));
    
  }
} catch(e){
  console.error(" \x1b[1m error : ~/routes/route.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e);
}

