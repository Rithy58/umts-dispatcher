var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var driver = require("../modules/driverManager");
var assert = require('assert');

// Point the driverManager DB reference to modules/testDB
// Note that the scope of the path is driverManager, NOT
// this file.
driver.setDB('./testDB');

describe('drivers', function(){

	// Remove everytihng from the drivers table after each test
	afterEach(function() {
			db.query("DELETE FROM driver;");
	});

	describe('#getAllDrivers()', function() {
		// Before the test, add 4 drivers
		before(function() {
				db.query("ALTER SEQUENCE driver_id_seq RESTART;");
				db.query("DELETE FROM driver;");
				var queryStr = "INSERT INTO driver (id, name, phone, late_count) VALUES ";
				queryStr += "('3213', 'Jane Smith','473-834-3847', 1), ('3735', 'Karl Marx','573-583-7586', 0), ('2749', 'Not Hitler','999-999-9999', 3), ('43', 'Not Jesus','4', 0);";
				return db.query(queryStr);
		});
		it('should get all drivers', function() {
			return driver.getAllDrivers()
			.then(function(res) {
				assert(res.rowCount == 4, 'Result should contain 4 drivers.');
			});
		});
	});

	describe('#getDriverByID()', function() {
		//Insert 42entries into the database, retrieve 1
		before(function() {
			db.query("ALTER SEQUENCE driver_id_seq RESTART;");
			db.query("DELETE FROM driver;");
			var queryStr = "INSERT INTO driver (name, phone, late_count) VALUES ('Not Hitler','999-999-9999', 3), ('Not Jesus','4', 0);";
			return db.query(queryStr);
		});
		it('should return a driver by id', function() {
			return driver.getDriverByID(1)
			.then(function(res) {
				assert.deepEqual(res.rows[0], {
					id: 1,
					name: 'Not Hitler',
					phone: '999-999-9999',
					late_count:'3'
				});
			})
		});
	});

	describe('#addDriver()', function() {
		before(function() {
			db.query("ALTER SEQUENCE driver_id_seq RESTART;");
			return db.query("DELETE FROM driver;");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should add the driver', function() {
			return driver.addDriver('Karl Marx','573-583-7586', '0')
			.then(function(res) {
				assert.deepEqual({
					id: '1',
					name: 'Karl Marx',
					phone: '573-583-7586',
					late_count:'0'
				}, res.rows[0]);
			});
		});
	});

	describe('#updateDriver()', function() {
		//Insert 4 entries into the database
		before(function() {
			db.query("ALTER SEQUENCE driver_id_seq RESTART;");
			db.query("DELETE FROM driver;");
			var queryStr = "INSERT INTO driver (name, phone, late_count) VALUES ('Jane Smith','473-834-3847', 1), ('Karl Marx','573-583-7586', 0), ('Not Hitler','999-999-9999', 3), ('Not Jesus','4', 0)";
			return db.query(queryStr);
		});

		it('should update the driver Karl Marx to have a new name, number and late count', function() {
			return driver.updateDriver(2, "Joseph Stalin", "685-738-5375", 6)
			.then(function(res) {
				assert.deepEqual({
					id: 2,
					name: 'Joseph Stalin',
					phone: '685-738-5375',
					late_count: 6
				}, res.rows[0]);
			})
		});
	});

	describe('#deleteDriver()', function() {
		//Insert 4 entries into the database
		before(function() {
			db.query("ALTER SEQUENCE driver_id_seq RESTART;");
			db.query("DELETE FROM driver;");
			var queryStr = "INSERT INTO driver (name, phone, late_count) VALUES ('Jane Smith','473-834-3847', 1), ('Karl Marx','573-583-7586', 0), ('Not Hitler','999-999-9999', 3), ('Not Jesus','4', 0)";
			return db.query(queryStr);
		});

		it('Should remove Karl Marx', function() {
			driver.deleteDriver(2).then(
				db.query("SELECT * FROM driver")
				.then(function(res) {
					assert.equal(res.rowCount, 3, 'Result should contain 3 drivers');
				})
			)}
		);
	});
});
