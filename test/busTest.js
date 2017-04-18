var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var bus = require("../modules/busManager");
var assert = require('assert');

// Point the busManager DB reference to modules/testDB
// Note that the scope of the path is busManager, NOT
// this file.
bus.setDB('./testDB');

describe('busManager', function(){

	before(function() {
		var queryStr = ""
		queryStr += "DELETE FROM bus;";
		queryStr += "INSERT INTO bus (id,type,defects) VALUES ('123', 'long','none'), ('456', 'old','none'), ('789', 'new','none');";
		db.query(queryStr);
	});

	describe('#getAllBuses()', function() {
		it('should gets all buses', function() {
			return bus.getAllBuses()
			.then(function(res) {
				assert(res.rowCount == 3, 'Result should contain 3 buses.');
			});
		});
	});

});
