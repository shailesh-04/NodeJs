try {
  const router = require('express').Router();
  const controller = require('../controllers/api.controller');
  
  router.get('/get',controller.get);
  
  module.exports = router;
  
} catch (e) {
    console.error(" \x1b[1m error : ~/route/api.route.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e); 
}