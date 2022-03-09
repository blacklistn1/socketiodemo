const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const Message = require('./src/Message');
const {joinRoom, getCurrentUser} = require('./src/joinRoom');
const httpServer = createServer(app);
const chatBot = 'Chat bot';
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

httpServer.listen(3000);
io.on('connection', socket => {
  socket.on('joinRoom', ({username, room}) => {
    const user = joinRoom(socket.id, username, room);
    socket.emit('message', new Message(chatBot, 'Welcome to the room'));
    socket.join(user.room);
    socket.to(user.room).emit('message', new Message(chatBot, `${user.username} has joined the chat room`));
    socket.on('chat-message', message => {
      io.to(user.room).emit('message', new Message(getCurrentUser(socket.id).username, message));
    })
    socket.on('disconnect', message => {
      socket.to(user.room).emit('message', new Message(chatBot, `${user.username} has left the chat room`));
    })
  })
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.raw());
app.get('/', (req, res) => {
  res.render('index');
})

const users = [];
app.get('/chat', (req, res) => {

  res.render('chat');
})
