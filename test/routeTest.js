var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var route = require("../modules/routeManager");
var assert = require('assert');

// Point the routeManager DB reference to modules/testDB
// Note that the scope of the path is busManager, NOT
// this file.
route.setDB('./testDB');

describe('routeManager', function(){

	describe('#getAllRoutes()', function() {
		//Insert 3 entries into the database
		before(function() {
			db.query("DELETE FROM route;");
			var queryStr = "INSERT INTO route (number, valid_bus_types) VALUES ";
			queryStr += "(30, ARRAY['short']), (31, ARRAY['long']), (34, ARRAY['short']);";
			return db.query(queryStr);
		});

		it('should gets all routes', function() {
			return route.getAllRoutes()
			.then(function(res) {
				assert(res.rowCount == 3, 'Result should contain 3 routes.');
			});
		});
	});

});
/*
	describe('#addRoute()', function() {
		before(function() {
			return db.query("DELETE FROM route;");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should add the correct route number', function() {
			return route.addRoute(37, ['short'])
			.then(function(res) {
				assert.deepEqual({
					id: 37,
					type: ['short'],
				}, res.rows[0]);
			});
		});
	});




	describe('#getValidBusTypes()', function() {
		// Insert 1 row in the database
		before(function() {
			db.query("DELETE FROM route;");
			return db.query("INSERT INTO route (num,type) VALUES ('34', 'short')");
		});

		it('should retrieve the valid bus types JSON', function() {
			return route.getValidBusTypes(34)
			.then(function(res) {
				assert.deepEqual({
					type: 'short'
				}, res);
			});
		});
	});

	describe('#editValidBusTypes()', function() {

		before(function() {
			db.query("DELETE FROM route;");
			return db.query("INSERT INTO bus (id,type) VALUES (34, 'short')");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should edit the routes validBusTypes', function() {
			return route.editValidBusTypes(34, 'long')
			.then(function(res) {
				assert.equal('long, short', res.rows[0].validBusTypes);
			});
		});
	});
*/