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

let counter = 0;

// SOCKET IO 
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // broadcast current count to all connected clients
  socket.broadcast.emit('current-count', counter);
  
  // when client clicks btn
  socket.on('user-click', () => {
    // server sends info back to client with updated count
    io.emit('increment-click', counter++);

    console.log(`user ${socket.id} clicked ${counter} times`);
  });
  
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
