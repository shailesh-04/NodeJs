try {
const router = require("express").Router();   
const itemContraller = require('../controllers/item.controller');
module.exports = (app)=>{
  router.get('/',itemContraller.show);
  router.get('/New',itemContraller.new);
  router.post('/Create',itemContraller.create);
  router.route('/:id')
  .get(itemContraller.edit)
  .put(itemContraller.update)
  .delete(itemContraller.delete);
  app.use("/",router); 
}
  
} catch (e) {console.log("Item.route ERROR =>:"+e)}

