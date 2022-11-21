'use strict';

require('dotenv').config();
const { MongoDB } = require('./database');
const express = require('express');
const routes = require('./routes');
const bp = require('body-parser')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const cors = require('cors');

const PORT = process.env.PORT;
const db = new MongoDB();
db.main()
    .then(() => console.log('conectado a mongo'))
    .catch(err => console.log(err));

app.use(cors({ origin: '*' }));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/api', routes);
  
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ PORT }`);
});

io.on('connection', (socket) => {
    io.to(socket.id).emit('private-id', socket.id);
    
    io.emit('refresh-contacts', 'refresh-contacts');
    
    socket.on('set-connection-id', (data) => {
        db.connections.saveConnection(data.socketId, data.userKey);
        db.users.saveConnId(data.userKey, data.socketId);
    });

    // receive a message from the client
    socket.on("new-message", (data) => {
        //db.users.getSocketIdByUserKey(data.userKeyReceiver);
        const socketIdReceiver = db.connections.getSocketIdByUserKey(data.userKeyReceiver);
        
        db.conversation.find(data)
            .then(async conKey => {
                if (conKey == null) {
                    await db.conversation.save(data).then(async key => {
                        data.conversationKey = key;
                        await db.chat.save(data.userKeySender, data);
                        //io.to(socket.id).emit('send-conversation-key', key);
                        if (socketIdReceiver != null)
                            io.to(socketIdReceiver).emit('send-message', data);
                    });
                } else {
                    data.conversationKey = conKey;
                    await db.chat.save(data.userKeySender, data);
                    //io.to(socket.id).emit('send-conversation-key', conKey);
                    if (socketIdReceiver != null)
                        io.to(socketIdReceiver).emit('send-message', data);
                }
            }
        );
    });

    socket.on('disconnect', function () {
        db.connections.deleteConnection(socket.id);
    })
});