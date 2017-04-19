var db = require('./db');

module.exports = {
  setDB: function(newDb) {
    db = require(newDb);
  },

  getallDrivers: function(){
    QUERY = "SELECT * From driver";
    return db.query(QUERY);
  },

  addDriver: function(name, phone, late_count){
    QUERY = "INSERT INTO driver (name, phone, late_count) VALUES ($1,$2,$3) RETURNING *";
    ARGS = [name, phone, late_count];
    return db.query(QUERY, ARGS);
  },

  removeDriver: function(driverID){
    QUERY = "DELETE FROM driver WHERE id=$1 RETURNING true AS success";
    ARGS = [driverID];
    return db.query(QUERY, ARGS);
  },

  updateDriver: function(driverID, name, phone, late_count){
    QUERY = "UPDATE driver SET name=$2 phone=$3 late_count=$4 WHERE id=$1 RETURNING *";
    ARGS = [driverID, name, phone, late_count];
    return db.query(QUERY,[driverID,Defect]);
  },

  getDriverByID: function(driverID){
    QUERY = "SELECT * FROM driver WHERE id=$1";
    ARGS = [driverID];
    return db.query(QUERY, ARGS);
  }
}
