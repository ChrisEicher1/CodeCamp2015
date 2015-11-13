'use strict';

let express = require('express');

let app = express();
app.use(express.static('static'));

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening on http://localhost:%s', port);
});
