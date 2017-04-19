var db = require('./db');

module.exports = {
  setDB: function(newDb) {
    db = require(newDb);
  },

  addRoute: function(routeID, valid_bus_types){
    return db.query("INSERT INTO route VALUES ($1, $2) RETURNING *", [routeID, valid_bus_types]);
  },

  getValidBusTrpes: function(routeID){
    return db.query("SELECT valid_bus_types FROM route WHERE id=$1", [routeID]);
  },

  getAllRoutes: function(){
    return db.query("SELECT * FROM route");
  },

  editValidBusTypes: function(routeID, new_bus_types){
    return db.query("UPDATE route SET valid_bus_types = new_bus_types WHERE id=$1", [routeID]);
  },

  deleteRoute: function(routeID){
    return db.query("DELETE * FROM route WHERE id=$1", [routeID]);
  }
}
