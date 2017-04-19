var db = require('./db');

module.exports = {
  setDB: function(newDb) {
    db = require(newDb);
  },

  getallDrivers: function(){
  },

  addDriver: function(busID, Type){
  },

  removeDriver: function(busID){
  },

  getDriverByID: function(busID){
  }
}
