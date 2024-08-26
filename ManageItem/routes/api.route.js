try {
const router = require("express").Router();   
const api = require("../controllers/api.controller.js");
module.exports = (app)=> {
  router.get("/",api.getAll);
  router.route("/:id")
  .get(api.findOne);
  app.use("/api",router); 
}

} catch (e) {
  console.log("api.route :-"+e);
}