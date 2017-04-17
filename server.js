var dotEnv = require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Import data access components
var shift = require('./modules/shiftmanager');


app.set('port', process.env.PORT || 8080);

app.use(express.static('./dist'));

app.get('/home', function(req, res) {
  res.send("<p>Hello World</p>");
});

io.on('connection', function(socket){
  console.log('a user connected');

  // Handle promises on function call, not in function itself.
  var a = shift.getShiftByDay();
  a.then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error('error running query', err);
  });

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
