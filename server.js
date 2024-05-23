const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

const port = process.env.PORT || 5000;

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed request methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true // If cookies need to be sent
}));

const CHAT_PASSWORD = "your_passwd";  // Set chat room password

// Login route for password verification
app.get('/login', (req, res) => {
  const password = req.query.password;
  if (password === CHAT_PASSWORD) {
    res.send('Authorized');
  } else {
    res.status(401).send('Unauthorized');
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg); // Add debug log
    io.emit('chat message', { message: msg, id: socket.id }); // Broadcast message to all clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
