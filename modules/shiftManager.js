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
    query = "INSERT INTO shift (start_time, end_time, start_location, end_location, driver_id, bus_id, route) VALUES (make_timestamptz($1,$2,$3,$4,$5,0),make_timestamptz($6,$7,$8,$9,$10,0),$11,$12,$13,$14,$15) RETURNING *";
    var args = [startTime.getFullYear(),
    startTime.getMonth() + 1,
    startTime.getDate(),
    startTime.getHours(),
    startTime.getMinutes(),

    endTime.getFullYear(),
    endTime.getMonth() + 1,
    endTime.getDate(),
    endTime.getHours(),
    endTime.getMinutes(),

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
      (start_time <= make_timestamptz($1, $2, $3, $4, $5, 0) AND make_timestamptz($1, $2, $3, $4, $5, 0) < end_time) OR \
      (start_time < make_timestamptz($6, $7, $8, $9, $10, 0) AND make_timestamptz($6, $7, $8, $9, $10, 0) <= end_time) OR \
      (make_timestamptz($1, $2, $3, $4, $5, 0) <= start_time AND end_time <= make_timestamptz($6, $7, $8, $9, $10, 0)));";
      args = [startTime.getFullYear(),
      startTime.getMonth() + 1,
      startTime.getDate(),
      startTime.getHours(),
      startTime.getMinutes(),
      endTime.getFullYear(),
      endTime.getMonth() + 1,
      endTime.getDate(),
      endTime.getHours(),
      endTime.getMinutes()
      ]
    return db.query(query, args);
  },
};
