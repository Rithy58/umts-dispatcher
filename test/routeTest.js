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
			queryStr += "(30, 'short'), (31, 'long'), (34, 'short');";
			return db.query(queryStr);
		});

		it('should get all routes', function() {
			return route.getAllRoutes()
			.then(function(res) {
				assert(res.rowCount == 3, 'Result should contain 3 routes.');
			});
		});
	});


	describe('#addRoute()', function() {
		before(function() {
			return db.query("DELETE FROM route;");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should add the correct route number', function() {
			return route.addRoute(37, 'short')
			.then(function(res) {
				assert.deepEqual({
					number: 37,
					valid_bus_types: 'short',
				}, res.rows[0]);
			});
		});
	});



	describe('#getValidBusTypes()', function() {
		// Insert 1 row in the database
		before(function() {
			db.query("DELETE FROM route;");

			return db.query("INSERT INTO route (number,valid_bus_types) VALUES ('34', 'short')");

		});

		it('should retrieve the valid bus types string', function() {
			return route.getValidBusTypes(34)
			.then(function(res) {
				assert(res.rows[0].valid_bus_types == 'short', 'Result should be short.');

			});
		});
	});


	describe('#editValidBusTypes()', function() {

		before(function() {
			db.query("DELETE FROM route;");
			return db.query("INSERT INTO route (number,valid_bus_types) VALUES ('34', 'short')");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should edit the routes validBusTypes', function() {
			route.editValidBusTypes(34, 'any');
			return route.getValidBusTypes(34)
			.then(function(res) {
				assert(res.rows[0].valid_bus_types == 'any', 'Result should be any.');
			});
		});
	});

	describe('#deleteRoute()', function() {
		//Insert 3 entries into the database
		before(function() {
			db.query("DELETE FROM route;");
			var queryStr = "INSERT INTO route (number, valid_bus_types) VALUES ";
			queryStr += "(30, 'short'), (31, 'long'), (34, 'short');";
			return db.query(queryStr);
		});

		it('should delete a route', function() {
			route.deleteRoute(30);
			return route.getAllRoutes()
			.then(function(res) {
				assert(res.rowCount == 2, 'Result should contain 3 routes.');
			});
		});
	});

	describe('#getAllDetours()', function() {
		//Insert 3 entries into the database
		before(function() {
			db.query("DELETE FROM detour;");
			var queryStr = "INSERT INTO detour (path, is_active) VALUES ";
			queryStr += "('north', true), ('north', false), ('east', true);";
			return db.query(queryStr);
		});

		it('should get all detours', function() {
			return route.getAllDetours()
			.then(function(res) {
				assert(res.rowCount == 3, 'Result should contain 3 detours.');
			});
		});
	});


});
