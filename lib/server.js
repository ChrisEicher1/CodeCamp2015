'use strict';

let express = require('express');

let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = 8080

app.use(express.static('static'));

server.listen(port, function() {
  console.log('listening on http://localhost:%s', port);
});

io.on('connection', function (socket) {
  console.log('someone joined');
})
