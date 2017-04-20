var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var shift = require("../modules/shiftManager");
var assert = require('assert');

shift.setDB('./testDB');

describe('shiftManager', function(){
  // Gross chain of SQL inserts... If we can clean this up, we should.
  before(function() {
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
    return db.query(insertShift);
  });

  describe('#getShiftByDay()', function() {
    before(function() {
      d = new Date(); //Insert a shift with todays date
      var insertShift = `INSERT INTO shift (start_time, end_time, start_location,
        end_location, driver_id, bus_id, route) VALUES
        (make_timestamptz($1, $2, $3, 8, 0, 0),
        make_timestamptz($1, $2, $3, 10, 0, 0),
        'EXAMPLE', 'end location 1', 1,'bus1', 30);`;
      return db.query(insertShift, [d.getFullYear(), d.getMonth() + 1, d.getDate()]);
    });

    it('should return the shifts given a date.', function() {
      date = new Date(2017,3,17,8,0,0,0);
      return shift.getShiftByDay(date)
      .then(function(res) {
        assert.equal(1,res.rowCount);
      });
    });

    it('should not return anything if there are no shifts on the provided date.', function() {
      date = new Date(2015,5,21,9,0,0,0);
      return shift.getShiftByDay(date)
      .then(function(res) {
        assert.equal(0,res.rowCount);
      });
    });

    it('should get todays shifts if no date is passed.', function() {
      return shift.getShiftByDay()
      .then(function(res) {
        assert.equal(1,res.rowCount);
      });
    });

    after(function() {
      return db.query("DELETE FROM shift WHERE start_location = 'EXAMPLE' ");
    });
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
		it('should set bus for shift #1 to 2', function() {
			return shift.setBus('1', '2')
			.then(function(res) {
				assert.equal('2', res.rows[0].bus_id);
			});
		});
	});

  describe('#setRoute()', function() {
    it('should set route for shift #1 to 95', function() {
      return shift.setRoute('1', '95')
      .then(function(res) {
        assert.equal('95', res.rows[0].route);
      });
    });
  });

  describe('#getShift()', function() {
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

    it('should return true with a successful insert.', function() {
      return shift.addIncident(11,'Bus Crash')
      .then(function(res) {
        assert.equal(true, res.rows[0].success);
      });
    });
    it('should add new incidents values properly.', function() {
      return shift.getIncident(11)
      .then(function(res){
        assert.deepEqual({
        id: 2,
        shift_id: 11,
        description: 'Bus Crash'
        }, res.rows[0]);
      });
    });

    after(function(){
      return db.query("DELETE FROM incidents;");
    });
  });

  describe('#addShift()', function() {
    // insert entry into database
    before(function() {
      db.query("ALTER SEQUENCE shift_id_seq RESTART;")
      db.query("DELETE FROM shift;");
    });

    it('should add the shift', function() {
      var start = new Date(2017, 3, 1, 8, 0, 0, 0);
      var end = new Date(2017, 3, 1, 10, 0, 0, 0);
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
            route: 1
          }, {
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

  describe('#driversAvailable()', function() {
    // insert entry into database
    before(function() {
      db.query("ALTER SEQUENCE shift_id_seq RESTART;")
      db.query("ALTER SEQUENCE driver_id_seq RESTART;")
      db.query("DELETE FROM shift;");
      db.query("DELETE FROM driver;");
      db.query("INSERT INTO driver (name,phone,late_count) \
        VALUES ('kazi','phone',0),('matt','phone',0),('colin','phone',0),('rithy','phone',0);");
      var queryStr = "INSERT INTO shift (start_time, end_time, start_location, end_location, driver_id, bus_id, route) VALUES \
      (make_timestamptz(2017, 4, 1, 8, 0, 0), \
      make_timestamptz(2017, 4, 1, 10, 0, 0), \
      'EXAMPLE', 'end location 1',1,'bus1', 30);";
      return db.query(queryStr);
    });

    it('should exclude a driver who is booked for a shift that starts during the time period.', function() {
      var start = new Date(2017, 3, 1, 9, 0, 0, 0);
      var end = new Date(2017, 3, 1, 12, 0, 0, 0);
      return shift.driversAvailable(start, end)
      .then(function(res) {
        assert.equal(3, res.rowCount);
      });
    });
    it('should include a driver who has a shift that ends on the start time.', function() {
      var start = new Date(2017, 3, 1, 7, 0, 0, 0);
      var end = new Date(2017, 3, 1, 8, 0, 0, 0); //start of matts shift
      return shift.driversAvailable(start, end)
      .then(function(res) {
        assert.equal('kazi', res.rows[0].name);
      });
    });
    it('should include a driver who is booked for a shift that starts on the end time.', function() {
      var start = new Date(2017, 3, 1, 10, 0, 0, 0); // end of matts shift
      var end = new Date(2017, 3, 1, 12, 0, 0, 0);
      return shift.driversAvailable(start, end)
      .then(function(res) {
        assert.equal('kazi', res.rows[0].name);
      });
    });
  });

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
