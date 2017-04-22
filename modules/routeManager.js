var db = require('./db');

module.exports = {
  setDB: function(newDb) {
    db = require(newDb);
  },

  addRoute: function(routeNumber, valid_bus_types){
    return db.query("INSERT INTO route VALUES ($1, $2) RETURNING *", [routeNumber, valid_bus_types]);
  },

  getValidBusTypes: function(routeNumber){
    return db.query("SELECT valid_bus_types FROM route WHERE number=$1", [routeNumber]);
  },

  getAllRoutes: function(){
    return db.query("SELECT * FROM route");
  },

  editValidBusTypes: function(routeNumber, new_bus_type){
    return db.query("UPDATE route SET valid_bus_types=$2 WHERE number=$1", [routeNumber, new_bus_type]);
  },

  deleteRoute: function(routeNumber){
    return db.query("DELETE FROM route WHERE number=$1 RETURNING $1 as id", [routeNumber]);
  }

}
