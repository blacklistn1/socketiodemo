const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

const port = 3000;
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', socket => {
  console.log('User ' + socket.id + ' connected.');

  socket.on('broadcast', message => socket.broadcast.emit('message', message));
})

server.listen(port, () => {
  console.log(`Listening for clients on port ${port}...`)
})



