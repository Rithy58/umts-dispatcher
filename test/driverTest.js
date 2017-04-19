var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var driver = require("../modules/driverManager");
var assert = require('assert');

// Point the driverManager DB reference to modules/testDB
// Note that the scope of the path is driverManager, NOT
// this file.
driver.setDB('./testDB');

describe('driver', function(){

	describe('#getallDrivers()', function() {
		//Insert 4 entries into the database
		before(function() {
			db.query("DELETE FROM driver;");
			var queryStr = "INSERT INTO driver (id, name, phone, late_count) VALUES ";
			queryStr += "('3213', 'Jane Smith','473-834-3847', 1), ('3735', 'Karl Marx','573-583-7586', 0), ('2749', 'Not Hitler','999-999-9999', 3), ('43', 'Not Jesus','4', 0);";
			return db.query(queryStr);
		});

		it('should gets all drivers', function() {
			return driver.getallDrivers()
			.then(function(res) {
				assert(res.rowCount == 4, 'Result should contain 4 drivers.');
			});
		});
	});

	describe('#getDriverByID()', function() {
		//Insert 42entries into the database, retrieve 1
		before(function() {
			db.query("DELETE FROM driver;");
			var queryStr = "INSERT INTO driver (id, name, phone, late_count) VALUES ";
			queryStr += "('2749', 'Not Hitler','999-999-9999', 3), ('43', 'Not Jesus','4', 0);";

        	it('should return a driver by id', function() {
			return driver.getDriverByID('2749')
			.then(function(res) {
				assert.deepEqual({
					id: '2749',
					name: 'Not Hitler',
					PhoneNumber: '999-999-9999',
                    lateCount:'3'
				}, res.rows[0]);
		    	})
	    	});
        });
    });

	describe('#addDriver()', function() {
		before(function() {
			return db.query("DELETE FROM driver;");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should add the driver', function() {
			return driver.addDriver('3735', 'Karl Marx','573-583-7586', '0')
			.then(function(res) {
				assert.deepEqual({
					id: '3735',
					name: 'Karl Marx',
					PhoneNumber: '573-583-7586',
                    lateCount:'0'
				}, res.rows[0]);
			});
		});
	});




});