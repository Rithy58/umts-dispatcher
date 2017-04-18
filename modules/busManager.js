var db = require('./db');

module.exports = {

  getAllBuses: function(){
    return db.query("SELECT * From bus").rows;
  },

  getDefects: function(){
    return db.query("SELECT defects FROM bus.");
  },

  addBus: function(busID, Type){
    return db.query("INSERT INTO bus (id,type,defects) VALUES ($1,$2,'none')",[busID,Type]);
  },

  editDefects: function(busID, Defect){
    return db.query("UPDATE bus SET defects=$2 WHERE id=$1",[busID,Defect]);
  },

  removeBus: function(busID){
    return db.query("DELETE FROM bus WHERE id=$1",[busID]);
  },

  getBusByID: function(busID){
    return db.query("SELECT * FROM bus WHERE id=$1",[busID]);
  }
}
