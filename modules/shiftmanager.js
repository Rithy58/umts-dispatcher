var db = require('./db');

module.exports = {

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
    return false;
  },
  setDate: function(shiftID, date) {
    return false;
  },
  setStartTime: function(shiftID, time) {
    return false;
  },
  setEndTime: function(shiftID, time) {
    return false;
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
    return false;
  },
  driverAvailable: function(driverID, time) {
    return false;
  },
};
