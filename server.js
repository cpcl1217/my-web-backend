const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'https://localhost:3000'
}));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg); // 添加调试日志
    io.emit('chat message', { message: msg, id: socket.id }); // 包含发送者的 ID
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
