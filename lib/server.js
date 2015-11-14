'use strict';

let _ = require('lodash');
let express = require('express');

let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let gm = require('./gameMaster.js')(io);
let port = 8080
let lookingForMatch = []

app.use(express.static('static'));

server.listen(port, function() {
  console.log('listening on http://localhost:%s', port);
});

io.on('connection', function (socket) {
  socket.on('disconnect', function () {
    lookingForMatch = _.filter(lookingForMatch, function (curr) {
    	return curr.id != socket.id;
    })
  })
  socket.on('new_gif', function (msg) {
    msg.player = socket.id
    gm.sendSearchGif(msg)
  }
  lookingForMatch.push(socket);
  if (lookingForMatch.length > 2){
  	gm.createGame(lookingForMatch);
  	lookingForMatch = [];
  }
})
