try {
  const router = require('express').Router();
  const controller = require('../controllers/chat.controller');
  
  router.get('/',controller.index);
  router.post('/login',controller.login);
  router.get('/logout',controller.logout);
  
  module.exports = router;
  
} catch (e) {
    console.error(" \x1b[1m error : ~/route/chat.route.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e); 
}