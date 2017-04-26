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
    else if (typeof date === 'string') {
      date = new Date(date);
    }
    query = "SELECT s.id,s.start_time,s.end_time,s.start_location,s.end_location,s.driver_id,d.name as driver_name,s.bus_id,s.route FROM shift as s, driver as d WHERE date_trunc('day', start_time) = make_timestamptz($1,$2,$3,0,0,0) AND d.id = s.driver_id ORDER BY s.start_time";
    args = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return db.query(query, args);
  },
  getShift: function(shiftID) {
  	query = "SELECT * FROM shift WHERE id=$1";
  	args = [shiftID];
    return db.query(query, args);
  },
  setStartTime: function(shiftID, time) {
    query = "UPDATE shift SET start_time=$2 WHERE id=$1 RETURNING *;";
    args = [shiftID, time];
    return db.query(query, args);
  },
  setEndTime: function(shiftID, time) {
    query = "UPDATE shift SET end_time=$2 WHERE id=$1 RETURNING *;";
    args = [shiftID, time];
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
    query = "INSERT INTO incidents (shift_id,description) VALUES ($1,$2) RETURNING true AS success";
    return db.query(query,[shiftID,incidentStr]);
  },
  getIncident: function(shiftID){
    query = "SELECT * FROM incidents WHERE shift_id = $1";
    return db.query(query,[shiftID]);
  },
  deleteIncident: function(incidentID) {
    query = "DELETE FROM incidents WHERE id=$1 RETURNING $1 AS id";
    return db.query(query,incidentID);
  },
  editIncident: function(incidentID, incidentStr) {
    query = "UPDATE incidents SET description=$2 WHERE id=$1 RETURNING *";
    return db.query(query,[incidentID,incidentStr]);
  },
  addShift: function(startTime, endTime, startLoc, endLoc, driverID, busID, route) {
    query = "INSERT INTO shift (start_time, end_time, start_location, end_location, driver_id, bus_id, route) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    var args = [startTime,
    endTime,
    startLoc,
    endLoc,
    driverID,
    busID,
    route];
    return db.query(query, args);
  },
  driversAvailable: function(startTime, endTime) {
    query = "SELECT driver.id, driver.name FROM driver WHERE driver.id NOT IN \
    (SELECT driver_id FROM shift WHERE \
      (start_time <= $1 AND $1 < end_time) OR \
      (start_time < $2 AND $2 <= end_time) OR \
      ($1 <= start_time AND end_time <= $2));";
      args = [startTime, endTime]
    return db.query(query, args);
  },
};
