
module.exports = (io) => {
  let onlineUID = {};
  io.on('connection', (socket) => {
    console.log("New User Is Active :- ", socket.id);
    
    socket.on('Login', ({uid,userName}) => {
      onlineUID[uid] = {
        socket:socket.id,
        userName:userName
        };
        
      io.emit('user',Object.keys(onlineUID));
      
    });
    socket.on('chat message', ({to,message,data}) => {
      io.to(onlineUID[to].socket).emit('chat message', {
        data:onlineUID[data.id].userName,
        sender:false,
        message
      })
      io.to(onlineUID[data.id].socket).emit('chat message', {
        data:data.userName,
        sender:true,
        message
      })
    });
    socket.on('disconnect', () => {
      delete onlineUID[Object.keys(onlineUID).find(id=>
        onlineUID[id].socket === socket.id)];
        io.emit('user',Object.keys(onlineUID));
        
      console.log('A user disconnected:', socket.id);
    });
  });
};
