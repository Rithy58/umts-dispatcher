var dotEnv = require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Import data access components
var shift = require('./modules/shiftmanager');
var bus = require('./modules/busManager');


app.set('port', process.env.PORT || 8080);

app.use(express.static('./dist'));

io.on('connection', function(socket){
  console.log('a user connected');

  // User Disconnected
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // User sends an example message
  socket.on('example message', function(msg){
    console.log(msg);
  });
});

var server = http.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});

module.exports = server;
