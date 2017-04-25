var dotEnv = require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Import data access components
var shift = require('./modules/shiftManager');
var bus = require('./modules/busManager');
var driver = require('./modules/driverManager');
var route = require('./modules/routeManager');

app.set('port', process.env.PORT || 8080);
app.use(express.static('./dist'));

// For now lets redirect everyone to the homepage
app.get('*', function (req, res) {
    res.redirect('/');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  // Request all shifts that occured on a given @date
  socket.on('getShiftByDay', function(date) {
    shift.getShiftByDay(date)
    .then(function(res) {
      socket.emit('update shifts', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User changes start time of a given shift
  // Send to all clients
  socket.on('setStartTime', function(params) {
    shift.setStartTime(params.shiftID, params.time)
    .then(function(res) {
      io.emit('update shifts', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User changes end time of a given shift
  // Send to all clients
  socket.on('setEndTime', function(params) {
    shift.setEndTime(params.shiftID, params.time)
    .then(function(res) {
      io.emit('update shifts', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User gets a shift
  // Send to specific client
  socket.on('getShift', function(params) {
    shift.getShift(params.shiftID)
    .then(function(res) {
      socket.emit('get shift', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User sets driver of a shift
  // Send to every client
  socket.on('setDriver', function(params) {
      shift.setDriver(params.shiftID,  params.driverID)
      .then(function(res) {
          io.emit('update shifts', res.rows);
      })
      .catch(function(err) {
          console.error(err);
      })
  });

  // User sets bus of a shift
  // Send to every client
  socket.on('setBus', function(params) {
      shift.setBus(params.shiftID,  params.busID)
      .then(function(res) {
          io.emit('update buses', res.rows);
      })
      .catch(function(err) {
          console.error(err);
      })
  });

  // User sets route of a shift
  // Send to every client
  socket.on('setRoute', function(params) {
      shift.setRoute(params.shiftID,  params.route)
      .then(function(res) {
          io.emit('update routes', res.rows);
      })
      .catch(function(err) {
          console.error(err);
      })
  });

  //User gets an incident
  //Send to a specific client
  socket.on('getIncident',function(incidentID) {
  	shift.getIncident(incidentID)
  	.then(function(res){
  		socket.emit('update incidents', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  //User gets an incident
  //Send to all clients
  socket.on('addIncident',function(params) {
  	shift.addIncident(params.shiftID,params.incidentStr)
  	.then(function(res){
  		io.emit('update incidents', res.rows);
    })
    .catch(function(err) {
   		console.error(err);
  	})
  });

  //User edits an incident
  //Send to all clients
  socket.on('editIncident',function(params) {
  	shift.editIncident(params.incidentID,params.incidentStr)
  	.then(function(res){
  		io.emit('update incidents', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });


  //User deletes an incident
  //Send to all clients
  socket.on('deleteIncident',function(incidentID) {
  	shift.deleteIncident(incidentID)
  	.then(function(res){
  		io.emit('delete incident', res.rows[0].id);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User adds a shift
  // Send to all client
  socket.on('addShift', function(params) {
    shift.addShift(params.startTime, params.endTime, params.startLoc,
      params.endLoc, params.driverID, params.busID, params.route)
    .then(function(res) {
      io.emit('update shifts', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User gets list of available drivers
  // Send to specific client
  socket.on('driversAvailable', function(params) {
    shift.driversAvailable(params.startTime, params.endTime)
    .then(function(res) {
      socket.emit('update available drivers', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

// User requests all bus data
// Send to specific client
  socket.on('getAllBuses', function() {
    bus.getAllBuses()
    .then(function(res) {
      socket.emit('update buses', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User gets defects
  // Send to specific client
  socket.on('getDefects', function(busID) {
    bus.getDefects(busID)
    .then(function(res) {
      socket.emit('get defects', res.rows[0]);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User adds a bus
  // Send to specific client
  socket.on('addBus', function(params) {
    bus.addBus(params.busID,params.Type)
    .then(function(res) {
      io.emit('update buses', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User edits defects
  // Send to specific client
  socket.on('editDefects', function(params){
    bus.editDefects(params.busID, params.Defects)
    .then(function(res) {
      io.emit('update buses', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User removes a bus
  // Send to all clients
  socket.on('removeBus', function(busID) {
    bus.removeBus(busID)
    .then(function(res) {
      io.emit('delete bus', res.rows[0].id);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User gets a bus by ID
  // Send to specific client
  socket.on('getBusByID', function(busID) {
    bus.getBusByID(busID)
    .then(function(res) {
      socket.emit('get bus', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  // User adds a route
  // Send to specific client
  socket.on('addRoute', function(params) {
    route.addRoute(params.routeID,params.validBusTypes)
    .then(function(res) {
      io.emit('update routes', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  //User gets valid bus types
  //Send to a specific client
  socket.on('getValidBusTypes', function(routeID) {
    route.getValidBusTypes(routeID)
    .then(function(res) {
      socket.emit('get valid bus types', res.rows[0]);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

//User gets all routes
//Send to a specific client
 socket.on('getAllRoutes', function() {
    route.getAllRoutes()
    .then(function(res) {
      socket.emit('update routes', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

// User edit valid bus types
// Send to specific client
  socket.on('editValidBusTypes', function(params){
    route.editValidBusTypes(params.routeID,params.validBusTypes)
    .then(function(res) {
      io.emit('update routes', res.rows);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  //User delete a route
  //Send to a specific client
  socket.on('deleteRoute', function(routeID) {
    route.deleteRoute(routeID)
    .then(function(res) {
      io.emit('delete route', res.rows[0].id);
    })
    .catch(function(err) {
      console.error(err);
    })
  });

  //user gets all drivers
  //send to specific client
  socket.on('getAllDrivers', function() {
    driver.getAllDrivers()
    .then(function(res){
        socket.emit('update drivers', res.rows);
    })
    .catch(function(err){
        console.error(err);
    })
  });

  //user adds a driver
  //send to all clients
  socket.on('addDriver', function(params) {
     driver.addDriver(params.name, params.phone, params.late_count)
     .then(function(res){
         io.emit('update drivers', res.rows);
     })
     .catch(function(err){
         console.error(err);
     })
  });

  //user removes a driver
  //send to all clients
  socket.on('deleteDriver', function(driverID){
      driver.deleteDriver(driverID)
      .then(function(res){
          io.emit('delete driver', res.rows[0].id);
      })
      .catch(function(err){
          console.error(err);
      })
  });

  //Gets Driver by ID
  //send to specific client
  socket.on('getDriverByID', function(driverID){
      driver.getDriverByID(driverID)
      .then(function(res){
          socket.emit('get Driver By ID', res.rows[0]);
      })
      .catch(function(err){
          console.error(err);
      })
  });

  //Update Driver
  //send to all clients
  socket.on('updateDriver', function(params){
      driver.updateDriver(params.driverID, params.name, params.phone, params.late_count)
      .then(function(res){
          io.emit('update drivers', res.rows);
      })
      .catch(function(err){
          console.error(err);
      })
  });

});

var server = http.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});

module.exports = server;
