import app from './lib/app.js';

// SERVER SETUP
// wrap app in an http server
import http from 'http';
const server = http.createServer(app);
// wrap the http server with a socketio server
import { Server } from 'socket.io';
// add cors - https://socket.io/docs/v4/handling-cors/
const io = new Server(server, { 
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
    credentials: true
  }
});

// SERVER PORT
const PORT = process.env.PORT || 7890;

const allMessages = [];

// SOCKET IO 
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  
  // broadcast current messages to all connected clients including the sender
  io.emit('current-messages', allMessages);
  
  // when sends a message
  socket.on('send-new-msg', (msgContent) => {
    // add new msg to all msg arr
    // current-messages emit sends it to all connected clients 
    allMessages.push(msgContent);
    // send new msg to all connected clients
    io.emit('new-message', msgContent);
  });

  // disconnect socket 
  socket.on('disconnect', () => {
    console.log(`BE: ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
