var dotEnv = require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Import data access components
var shift = require('./modules/shiftManager');
var bus = require('./modules/busManager');


app.set('port', process.env.PORT || 8080);

app.use(express.static('./dist'));

// For now lets redirect everyone to the homepage
app.get('*', function (req, res) {
    res.redirect('/');
});

io.on('connection', function(socket){
  console.log('a user connected');

  // User sends an example message
  socket.on('getShiftByDay', function(date){
    console.log(date);
    shift.getShiftByDay(new Date(date))
    .then(function(res) {
      io.emit('update shifts', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

});

var server = http.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});

module.exports = server;
