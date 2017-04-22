var db = require('./db');

module.exports = {
  setDB: function(newDb) {
    db = require(newDb);
  },

  getAllDrivers: function(){
    QUERY = "SELECT * From driver";
    return db.query(QUERY);
  },

  addDriver: function(name, phone, late_count){
    QUERY = "INSERT INTO driver (name, phone, late_count) VALUES ('" + name + "', '" + phone + "', " + late_count + ") RETURNING *";
    return db.query(QUERY);
  },

  deleteDriver: function(driverID){
    QUERY = "DELETE FROM driver WHERE id=$1 RETURNING $1 AS id";
    ARGS = [driverID];
    return db.query(QUERY, ARGS);
  },

  updateDriver: function(driverID, name, phone, late_count){
    QUERY = "UPDATE driver SET name='" + name + "', phone='" + phone + "', late_count=" + late_count + " WHERE id=" + driverID + " RETURNING *";
    // ARGS = [driverID, name, phone, late_count];
    return db.query(QUERY);
  },

  getDriverByID: function(driverID){
    return db.query("SELECT * FROM driver WHERE id=$1",[driverID]);
  }
}
