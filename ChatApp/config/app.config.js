try {
  const session = require('express-session');
  const express = require('express');
  const app = express();
  const path  = require('path');
  require('dotenv').config();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.engine('html', require('ejs').renderFile);
  app.set('views', path.join(__dirname, '../','view/'));
    app.use(session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 24*60*60*1000 }
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

module.exports = app;

}catch (e) {
  console.error(" \x1b[1m error : ~/config/app.config.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e);
}

 