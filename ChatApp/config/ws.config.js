try{
  const http = require('http');
  const { Server } = require('socket.io');
  module.exports = (app)=>{
    const server = http.createServer(app);
    const io = new Server(server);
    
    server.listen(process.env.PORT,()=>{
      console.log(`server Is Start from \n  \x1b[1m \x1b[33m http://localhost:${process.env.PORT} \x1b[22m`);
    }); 
    return io;
  }
} catch (e) {
  console.error(" \x1b[1m error : ~/config/ws.config.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m"+e);

}