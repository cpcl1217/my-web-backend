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
  origin: '*', // 允许所有来源
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的头
  credentials: true // 如果需要发送cookie
}));

const CHAT_PASSWORD = "your_passwd";  // 设定聊天室密码

// 登录路由，用于验证密码
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
    console.log('message: ' + msg); // 添加调试日志
    io.emit('chat message', { message: msg, id: socket.id }); // 广播消息给所有客户端
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
