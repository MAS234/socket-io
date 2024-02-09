const path = require('path');
const express = require('express');
const app = express();


//static files
app.use(express.static(path.join(__dirname, 'public')));


// settings

app.set("port", process.env.PORT || 3000);

// START SERVER 
const serverIo =  app.listen(app.get('port'), () => {
    console.log('server port', app.get('port'))
})

// SOCKET 
const sockectIo = require('socket.io');
const io = sockectIo(serverIo);

//CONFIG WEB SOCKET
io.on('connection', (socket) => {
    console.log("new conection", socket.id)

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
})




