var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var shift = require("../modules/shiftManager");
var assert = require('assert');

// Point the busManager DB reference to modules/testDB
// Note that the scope of the path is busManager, NOT
// this file.
shift.setDB('./testDB');

describe('shiftManager', function(){
  // Gross chain of SQL inserts... If we can clean this up, we should.
  before(function() {
    db.query("ALTER SEQUENCE driver_id_seq RESTART;");
    db.query("ALTER SEQUENCE shift_id_seq RESTART;");
    db.query("DELETE FROM shift;")
    db.query("DELETE FROM driver;")
    db.query("DELETE FROM bus;");
    db.query("DELETE FROM route;");
    var insertRoute = "INSERT INTO route (number, valid_bus_types) VALUES (30, ARRAY['a', 'b']);";
    db.query(insertRoute);
    var insertBus = "INSERT INTO bus (id, type, defects) VALUES ('bus1', 'type1', 'none');";
    db.query(insertBus);
    var insertDriver = "INSERT INTO driver (name, phone, late_count) VALUES ('andrew', '1234567890', 0);";
    db.query(insertDriver);

    var insertShift = "INSERT INTO shift (start_time, end_time, start_location, \
      end_location, driver_id, bus_id, route) VALUES \
      (make_timestamptz(2017, 4, 17, 8, 0, 0), make_timestamptz(2017, 4, 17, 12, 0, 0), \
      'start location 1', 'end location 1', 1,'bus1', 30);";
    db.query(insertShift);

    var insertIncidents = "INSERT INTO incidents (name, phone, late_count) VALUES ('andrew', '1234567890', 0);"
  });

  describe('#getShiftByDay()', function() {
    it('should return the shifts given a day', function() {
      date = new Date(2017,3,17,8,0,0,0);
      return shift.getShiftByDay(date)
      .then(function(res) {
        assert.equal(1,res.rowCount);
      });
    });
  });

  describe('#getShiftByDay()', function() {
    it('should not return anything if there are no shifts today', function() {
      date = new Date(2015,5,21,9,0,0,0);
      return shift.getShiftByDay(date)
      .then(function(res) {
        assert.equal(0,res.rowCount);
      });
    });
  });

  describe('#getShiftByDay()', function() {
    before(function() {
      d = new Date();
      var insertShift = `INSERT INTO shift (start_time, end_time, start_location,
        end_location, driver_id, bus_id, route) VALUES
        (make_timestamptz($1, $2, $3, 8, 0, 0),
        make_timestamptz($1, $2, $3, 10, 0, 0),
        'EXAMPLE', 'end location 1', 1,'bus1', 30);`;
      return db.query(insertShift, [d.getFullYear(), d.getMonth() + 1, d.getDate()]);
    });

    it('should get todays shifts by default', function() {
      return shift.getShiftByDay()
      .then(function(res) {
        assert.equal(1,res.rowCount);
      });
    });

    after(function() {
      db.query("DELETE FROM shift WHERE start_location = 'EXAMPLE' ")
    })
  });

  describe('#setStartTime()', function() {
		it('should change the start time of a shift', function() {
      time = new Date(2017,3,1,8,0,0,0);
      return shift.setStartTime(1, time)
      .then(function(res) {
        var res_start_time = res.rows[0].start_time;
        assert.equal('2017-04-01T08:00:00.000Z',res_start_time.toISOString());
      });
		});
	});

  describe('#setEndTime()', function() {
		it('should change the end time of a shift', function() {
      time = new Date(2017,3,1,8,0,0,0);
      return shift.setEndTime(1, time)
      .then(function(res) {
        var res_end_time = res.rows[0].end_time;
        assert.equal('2017-04-01T08:00:00.000Z',res_end_time.toISOString());
      });
		});
	});

  describe('#setDriver()', function() {
		//Insert entry into the database
		before(function() {
      db.query("ALTER SEQUENCE shift_id_seq RESTART;")
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
      db.query("ALTER SEQUENCE shift_id_seq RESTART;")
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
      db.query("ALTER SEQUENCE shift_id_seq RESTART;")
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

    describe('#getShift()', function() {
    // insert entry into database
    before(function() {
      db.query("ALTER SEQUENCE shift_id_seq RESTART;");
      db.query("DELETE FROM shift;");
      var queryStr = "INSERT INTO shift (id, start_time, end_time, start_location, end_location, driver_id, bus_id, route) VALUES ";
      queryStr += "('1', '2012-02-18 14:28:32','2012-02-18 14:28:33', 'Campus Center', 'CS Building', '12', '123', '1');";
      return db.query(queryStr);
    });

    it('should get the shift', function() {
      return shift.getShift('1')
      .then(function(res) {
        assert.equal('1', res.rows[0].id);
      });
    });
  });

  describe ('#addIncident()',function(){
    before(function(){
        db.query("ALTER SEQUENCE incidents_id_seq RESTART;");
        db.query("DELETE FROM incidents;");
        var queryStr = "INSERT INTO incidents (shift_id,description) VALUES (10, 'Bus crash')";
        return db.query(queryStr);
    });

    it('should add new incidents', function() {
      console.log('Line 183\n')
      return shift.addIncident(11,'Bus Crash')
      .then(function(res) {
        assert.equal(true, res.rows[0].success);
        return shift.getIncident(11)
        .then(function(res){
          assert.deepEqual({
          id: 2,
          shift_id: 11,
          description: 'Bus Crash'
          }, res.rows[0]);
        });
      });
    });
    after(function(){
      db.query("DELETE FROM incidents;");
    })


  });

  describe('#addShift()', function() {
    // insert entry into database
    before(function() {
      db.query("ALTER SEQUENCE shift_id_seq RESTART;")
      db.query("DELETE FROM shift;");
      /**var queryStr = "INSERT INTO shift (id, start_time, end_time, start_location, end_location, driver_id, bus_id, route) VALUES ";
      queryStr += "('1', '2012-02-18 14:28:32','2012-02-18 14:28:33', 'Campus Center', 'CS Building', '12', '123', '1');";
      var args = [start, end ]
      return db.query(queryStr);*/
    });

    it('should add the shift', function() {
      start = new Date(2017, 3, 1, 8, 0, 0, 0);
      end = new Date(2017, 3, 1, 10, 0, 0, 0);
      return shift.addShift(start, end, 'Campus Center', 'CS Building', '12', '123', '1')
        .then(function(res) {
          var actual = res.rows[0];
          assert.deepEqual({
            id: 1, 
            start_time: '2017-04-01T08:00:00.000Z',
            end_time: '2017-04-01T10:00:00.000Z', 
            start_location: 'Campus Center', 
            end_location: 'CS Building', 
            driver_id: 12, 
            bus_id: '123', 
            route: 1}, 
            {
              id: actual.id,
              start_time: actual.start_time.toISOString(),
              end_time: actual.end_time.toISOString(),
              start_location: actual.start_location, 
              end_location: actual.end_location, 
              driver_id: actual.driver_id, 
              bus_id: actual.bus_id, 
              route: actual.route
            });
        });
      });
    });
  /**describe('#driverAvailable()', function() {
    // insert entry into database
    before(function() {
      db.query("ALTER SEQUENCE shift_id_seq RESTART;")
      db.query("DELETE FROM shift;");
      var queryStr = "INSERT INTO shift (id, start_time, end_time, start_location, end_location, driver_id, bus_id, route) VALUES ";
      queryStr += "('2', '2012-02-18 14:28:32','2012-02-18 14:28:33', 'Campus Center', 'CS Building', '12', '123', '1');";
      return db.query(queryStr);
    });

    it('should get time from a driver', function() {
      time = new Date(2017,3,1,8,0,0,0);
      return shift.driverAvailable(12, time)
      .then(function(res) {
        var res_start_time = res.rows[0].start_time;
        assert.equal('2017-04-01T08:00:00.000Z', res_start_time.toISOString());
      });
    });
  });*/

  after(function() {
    return db.query("DELETE FROM shift;")
    .then(function() {
      return db.query("DELETE FROM driver;")
      .then(function() {
        return db.query("DELETE FROM bus;")
        .then(function() {
          return db.query("DELETE FROM route")
        })
      })
    })
  });
});
