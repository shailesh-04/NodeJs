try {
const express = require('express');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs'); 

require("./routes/api.route.js")(app);
require("./routes/item.route.js")(app);

app.listen(3000,()=>{
  console.log("server Is Start from 3000 Port");
}); 
} catch (e) {
  console.log("Server300 :- "+e);
}
