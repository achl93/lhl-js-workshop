const express = require('express');
const app     = express();

const http    = require('http');
const server  = http.Server(app);
const io      = require('socket.io')(server);

app.use(express.static('client'));

var messageArr = [];

io.on('connection', (socket) => {
  messageArr.forEach((msg) => {
    io.emit('catchup', msg);
  });
  socket.on('message', (msg) => {
    io.emit('message', msg);
    messageArr.push(msg);
  });
  socket.on('catchup', (msg) => {
    io.emit('catchup', msg);
  })
});

server.listen(8080, function() {
  console.log('Chat server running');
});