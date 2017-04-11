var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Import data access components
var shift = require('./shiftmanager');


app.set('port', process.env.PORT);

app.use(express.static('./public'));

app.get('/home', function(req, res) {
  res.send("<p>Hello World</p>");
});

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
