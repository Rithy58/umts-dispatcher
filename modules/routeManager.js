var db = require('./db');

module.exports = {
  setDB: function(newDb) {
    db = require(newDb);
  },

  addRoute: function(routeID){
    QUERY = "INSERT INTO route "
  },

  getRouteNumber: function(routeID){
    return db.query("SELECT number FROM route WHERE id=$1", [routeID]);
  },

  getAvailableDetours: function(routeID){

  },

  getCurrentDetours: function(routeID){

  },

  getValidBusTrpes: function(routeID){
    return db.query("SELECT valid_bus_types FROM route WHERE id=$1", [routeID]);
  },

  getAllRoutes: function(){
    return db.query("SELECT * FROM route");
  },

  editRouteNumber: function(routeID, new_number){
    return db.query("UPDATE route SET number = new_number WHERE id=$1", [routeID]);
  }.

  editValidBusTypes: function(routeID, new_bus_types){
    return db.query("UPDATE route SET valid_bus_types = new_bus_types WHERE id=$1", [routeID]);
  },

  deleteDetour: function(routeID, detourID){

  },

  createDetour: function(routeID, detour){

  },

  avtiveDetour: function(routeID, detourID, state){

  },

  editDetourPath: function(routeID, detourID, path){

  }





}
