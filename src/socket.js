const { Server } = require('socket.io');

exports.initializeSocket = (httpServer) => {
    const io = new Server(httpServer)

    io.on('connection', socket => {
        console.log(`User ${socket.id} connected`);
    
        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });
    
        socket.on('chat-req', data => {
            console.log('Received: ', data);
            io.sockets.emit('chat-res', data);
        });
    
        socket.on('typing-req', data => {
            socket.broadcast.emit('typing-res', data);
        });
    });
};
