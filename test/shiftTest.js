var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var bus = require("../modules/busManager");
var assert = require('assert');

// Point the busManager DB reference to modules/testDB
// Note that the scope of the path is busManager, NOT
// this file.
bus.setDB('./testDB');

describe('shiftManager', function(){

  after(function(){
    return db.query("DELETE FROM bus;");
  });
  

});
