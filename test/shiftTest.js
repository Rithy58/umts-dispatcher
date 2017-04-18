var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var shift = require("../modules/shiftManager");
var assert = require('assert');

// Point the busManager DB reference to modules/testDB
// Note that the scope of the path is busManager, NOT
// this file.
shift.setDB('./testDB');

describe('shiftManager', function(){

  // Reset the id generator back to 1
  beforeEach(function() {
    return db.query("ALTER SEQUENCE shift_id_seq RESTART;");
  })

  after(function(){
    return db.query("DELETE FROM bus;");
  });
  

});
