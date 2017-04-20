var dotEnv = require('dotenv').config();
var db = require("../modules/testDB");
var bus = require("../modules/busManager");
var assert = require('assert');

// Point the busManager DB reference to modules/testDB
// Note that the scope of the path is busManager, NOT
// this file.
bus.setDB('./testDB');

describe('busManager', function(){

	describe('#getAllBuses()', function() {
		//Insert 3 entries into the database
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
		// Insert 1 row in the database
		before(function() {
			db.query("DELETE FROM bus;");
			return db.query("INSERT INTO bus (id,type,defects) VALUES ('123', 'long','none')");
		});

		it('should retrieve the defect string', function() {
			return bus.getDefects(123)
			.then(function(res) {
				assert(res.rows[0].defects == 'none', "Result should have defect string say 'none'.");
			});
		});
	});

	describe('#addBus()', function() {
		before(function() {
			return db.query("DELETE FROM bus;");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should add the correct bus id', function() {
			return bus.addBus('test1', 'type1')
			.then(function(res) {
				assert.deepEqual({
					id: 'test1',
					type: 'type1',
					defects: 'none'
				}, res.rows[0]);
			});
		});
	});

	describe('#editDefects()', function() {

		before(function() {
			db.query("DELETE FROM bus;");
			return db.query("INSERT INTO bus (id,type,defects) VALUES ('123', 'long','none')");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should edit the defect string given a busID', function() {
			return bus.editDefects('123', 'new defect')
			.then(function(res) {
				assert.equal('new defect', res.rows[0].defects);
			});
		});
	});

	describe('#removeBus()', function() {

		before(function() {
			db.query("DELETE FROM bus;");
			return db.query("INSERT INTO bus (id,type,defects) VALUES ('123', 'long','none')");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should remove the bus given an id', function() {
			return bus.removeBus('123')
			.then(function(res) {
				assert.equal(true, res.rows[0].success);
			})
		});
	});

	describe('#getBusByID()', function() {

		before(function() {
			db.query("DELETE FROM bus;");
			return db.query("INSERT INTO bus (id,type,defects) VALUES ('123', 'long','none')");
		});
		// Uses an assert.deepEqual to check JSON equality
		it('should return a bus by id', function() {
			return bus.getBusByID('123')
			.then(function(res) {
				assert.deepEqual({
					id: '123',
					type: 'long',
					defects: 'none'
				}, res.rows[0]);
			})
		});
	});

	after(function() {
		return db.query("DELETE FROM bus");
	});
});
