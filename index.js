const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const Message = require('./src/Message');
const httpServer = createServer(app);
const chatBot = 'Chat bot';
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

httpServer.listen(3000);
io.on('connection', socket => {
  //Broadcast to other users: a user has joined
  socket.broadcast.emit('message', new Message(chatBot, 'A user has joined the chat room'));
  socket.emit('message', new Message(chatBot, 'Welcome to the chat room'));
  socket.on('chat-message', message => {
    io.emit('message', new Message('User', message));
  })

})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.raw());
app.get('/', (req, res) => {

  if (req.query['room']) {
    const room = req.query['room'];
    res.render('chat');
  }
  else res.render('index');
})

