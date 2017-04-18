var db = require("./testDB");
var bus = require("../modules/busManager");

describe('busManager', function(){

	before(function() {
		var queryStr = ""
		queryStr += "DELETE FROM bus;";
		queryStr += "INSERT INTO bus (id,type,defects) VALUES ('123', 'long','none'), ('456', 'old','none'), ('789', 'new','none');";
		db.query(queryStr);
	});

	describe('#getAllBuses()', function(){

		it('should gets all buses', function(){
			bus.getAllBuses().then((res) => {
				return res.rowCount == 3;
			});
		});

	});

});