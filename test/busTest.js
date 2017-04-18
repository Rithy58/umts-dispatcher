var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var bus = require("../modules/busManager");
var assert = require('assert');

// Point the busManager DB reference to modules/testDB
// Note that the scope of the path is busManager, NOT
// this file.
bus.setDB('./testDB');

describe('busManager', function(){

	// Reset bus table after testing each function.
	afterEach(function() {
		return db.query("DELETE FROM bus;");
	});

	describe('#getAllBuses()', function() {

		before(function() {
			var queryStr = "INSERT INTO bus (id,type,defects) VALUES ";
			queryStr += "('123', 'long','none'), ('456', 'old','none'), ('789', 'new','none');";
			return db.query(queryStr);
		});

		it('should gets all buses', function() {
			return bus.getAllBuses()
			.then(function(res) {
				assert(res.rowCount == 3, 'Result should contain 3 buses.');
			});
		});
	});

	describe('#getDefects()', function() {

		before(function() {
			var queryStr = "INSERT INTO bus (id,type,defects) VALUES ";
			queryStr += "('123', 'long','none'), ('456', 'old','none'), ('789', 'new','none');";
			return db.query(queryStr);
		});

		it('should retrieve the defect string', function() {
			return bus.getDefects(123)
			.then(function(res) {
				assert(res.rows[0].defects == 'none', "Result should have defect string say 'none'.");
			});
		});
	});

});
