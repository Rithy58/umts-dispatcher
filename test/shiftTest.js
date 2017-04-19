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

  describe('#setDriver()', function() {
		//Insert entry into the database
		before(function() {
      db.query("ALTER SEQUENCE {tablename}_id_seq RESTART;")
			db.query("DELETE FROM shift;");
			var queryStr = "INSERT INTO shift (id, start_time, end_time, start_location, end_location, driver_id, bus_id, route) VALUES ";
			queryStr += "('1', '2012-02-18 14:28:32','2012-02-18 14:28:33', 'Campus Center', 'CS Building', '12', '123', '1');";
			return db.query(queryStr);
		});

		it('should set driver for shift #1 to 13', function() {
			return shift.setDriver('1', '13')
			.then(function(res) {
				assert.equal('13', res.rows[0].driver_id);
			});
		});
	});

  describe('#setBus()', function() {
    // insert entry into database
		before(function() {
      db.query("ALTER SEQUENCE {tablename}_id_seq RESTART;")
			db.query("DELETE FROM shift;");
			var queryStr = "INSERT INTO shift (id, start_time, end_time, start_location, end_location, driver_id, bus_id, route) VALUES ";
			queryStr += "('1', '2012-02-18 14:28:32','2012-02-18 14:28:33', 'Campus Center', 'CS Building', '12', '123', '1');";
			return db.query(queryStr);
		});

		it('should set bus for shift #1 to 2', function() {
			return shift.setBus('1', '2')
			.then(function(res) {
				assert.equal('2', res.rows[0].bus_id);
			});
		});
	});

  describe('#setRoute()', function() {
    // insert entry into database
    before(function() {
      db.query("ALTER SEQUENCE {tablename}_id_seq RESTART;")
      db.query("DELETE FROM shift;");
      var queryStr = "INSERT INTO shift (id, start_time, end_time, start_location, end_location, driver_id, bus_id, route) VALUES ";
      queryStr += "('1', '2012-02-18 14:28:32','2012-02-18 14:28:33', 'Campus Center', 'CS Building', '12', '123', '1');";
      return db.query(queryStr);
    });

    it('should set route for shift #1 to 95', function() {
      return shift.setRoute('1', '95')
      .then(function(res) {
        assert.equal('95', res.rows[0].route);
      });
    });
  });
});
