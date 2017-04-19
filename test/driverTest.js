var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var driver = require("../modules/driverManager");
var assert = require('assert');

// Point the driverManager DB reference to modules/testDB
// Note that the scope of the path is driverManager, NOT
// this file.
bus.setDB('./testDB');

describe('drivers', function(){

	describe('#getAllDrivers()', function() {
		//Insert 4 entries into the database
		before(function() {
			db.query("DELETE FROM drivers;");
			var queryStr = "INSERT INTO drivers (id, driverName, PhoneNumber, latCount) VALUES ";
			queryStr += "('3213', 'Jane Smith','473-834-3847', 1), ('3735', 'Karl Marx','573-583-7586', 0), ('2749', 'Not Hitler','999-999-9999', 3), ('43', 'Not Jesus','4', 0);";
			return db.query(queryStr);
		});

		it('should gets all drivers', function() {
			return bus.getAllDrivers()
			.then(function(res) {
				assert(res.rowCount == 4, 'Result should contain 4 drivers.');
			});
		});
	});
});