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

<<<<<<< HEAD
=======
  editRouteNumber: function(routeID, new_number){
    return db.query("UPDATE route SET number = $1 WHERE id=$2", [new_number, routeID]);
  }

}
/*
>>>>>>> origin/routemanager
  editValidBusTypes: function(routeID, new_bus_types){
    return db.query("UPDATE route SET valid_bus_types = $1 WHERE id=$1", [new_bus_types, routeID]);
  },

<<<<<<< HEAD
  deleteRoute: function(routeID){
    return db.query("DELETE * FROM route WHERE id=$1", [routeID]);
=======
  deleteDetour: function(routeID, detourID){
    return db.query("DELETE FROM detour WHERE id = $1 AND route = $2", [detourID, routeID])
  },

  createDetour: function(routeID, detourID){
    return db.query("INSERT INTO detour (id, routes) VALUES ($1, $2)", [detourID, routeID]);
  },

  avtiveDetour: function(routeID, detourID, state){
    return db.query("UPDATE detour SET is_avtive = $1 WHERE id = $2 AND routes = $3", [state, detourID, routeID]);
  },

  editDetourPath: function(routeID, detourID, new_path){
    return db.query("UPDATE detour SET path = $1 WHERE id = $2 AND routes = $3", [new_path, detourID, routeID]);
>>>>>>> origin/routemanager
  }
}
<<<<<<< HEAD
=======
*/
>>>>>>> origin/routemanager
