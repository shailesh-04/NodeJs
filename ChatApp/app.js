try {
  const app = require('./config/app.config');
  const io = require('./config/ws.config')(app);
  
  require("./routes/webSocket")(io);
  require("./routes/_routes")(app);
  
} catch (e) {
  console.error(" \x1b[1m error : ~/app.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e);
}
