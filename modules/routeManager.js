var db = require('./db');

module.exports = {
  setDB: function(newDb) {
    db = require(newDb);
  },

  addRoute: function(routeID, valid_bus_types){
    return db.query("INSERT INTO route VALUES ($1, $2) RETURNING *", [routeID, valid_bus_types]);
  },

  getValidBusTypes: function(routeID){
    return db.query("SELECT valid_bus_types FROM route WHERE number=$1", [routeID]);
  },

  getAllRoutes: function(){
    return db.query("SELECT * FROM route");
  },

  editValidBusTypes: function(routeID, new_bus_type){
    return db.query("UPDATE route SET valid_bus_types=$2 WHERE number=$1", [routeID, new_bus_type]);
  },

  deleteRoute: function(routeID){
    return db.query("DELETE FROM route WHERE number=$1 RETURNING $1 as id", [routeID]);
  }

}
