var db = require('./db');

module.exports = {
  setDB: function(newDb) {
    db = require(newDb);
  },

  // Returns an promise for querying the database for
  // shifts occuring on a given day.
  // @param {Date} date
  getShiftByDay: function(date) {
    if(!date) {  // If no date is passed, return todays info
      date = new Date();
    }
    query = "SELECT * FROM shift WHERE date_trunc('day', start_time) = make_timestamptz($1,$2,$3,0,0,0)";
    args = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return db.query(query, args);
  },
  getShift: function(shiftID) {
  	query = "SELECT * FROM shift WHERE id=$1";
  	args = [shiftID];
    return db.query(query, args);
  },
  setStartTime: function(shiftID, time) {
    query = "UPDATE shift SET start_time=make_timestamptz($2,$3,$4,$5,$6,0) WHERE id=$1 RETURNING *;";
    args = [shiftID, time.getFullYear(), time.getMonth() + 1,
       time.getDate(), time.getHours(), time.getMinutes()];
    return db.query(query, args);
  },
  setEndTime: function(shiftID, time) {
    query = "UPDATE shift SET end_time=make_timestamptz($2,$3,$4,$5,$6,0) WHERE id=$1 RETURNING *;";
    args = [shiftID, time.getFullYear(), time.getMonth() + 1,
       time.getDate(), time.getHours(), time.getMinutes()];
    return db.query(query, args);
  },
  setDriver: function(shiftID, driverID) {
    query = "UPDATE shift SET driver_id = $2 WHERE id = $1 RETURNING *";
    args = [shiftID, driverID];
    return db.query(query, args);
  },
  setBus: function(shiftID, busID) {
    query = "UPDATE shift SET bus_id = $2 WHERE id = $1 RETURNING *";
    args = [shiftID, busID];
    return db.query(query, args);
  },
  setRoute: function(shiftID, route) {
    query = "UPDATE shift SET route = $2 WHERE id = $1 RETURNING *";
    args = [shiftID, route]
    return db.query(query, args);
  },
  addIncident: function(shiftID, incidentStr) {
    return false;
  },
  deleteIncident: function(incidentID) {
    return false;
  },
  editIncident: function(incidentID, incidentStr) {
    return false;
  },
  addShift: function(startTime, endTime, startLoc, endLoc, driverID, busID, route) {
    query = "ADD shift WHERE startTime=$1, endTime=$2, startLoc=$3, endLoc=$4, driverID=$5, busID=$6, route=$7"
    args = [startTime, endTime, startLoc, endLoc, driverID, busID, route];
    return db.query(query, args);
  },
  driverAvailable: function(driverID, time) {
    query = "SELECT shift FROM date_trunc('day', start_time) = make_timestamptz($1,$2,$3,0,0,0) WHERE id=$1 RETURNING *;";
  	args = [driverID, time];
    return db.query(query, args);
  },
};
