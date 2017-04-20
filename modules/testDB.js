var pg = require('pg');

var config = {
  max: 1, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  host: 'test.cwkw7lsddga2.us-east-1.rds.amazonaws.com',
  database: 'test',
};

var pool = new pg.Pool(config);

pool.query("DELETE FROM shift;")
pool.query("DELETE FROM driver;")
pool.query("DELETE FROM bus;");
pool.query("DELETE FROM route;");
pool.query("DELETE FROM incidents;");
pool.query("DELETE FROM detour;");
pool.query("ALTER SEQUENCE driver_id_seq RESTART;");
pool.query("ALTER SEQUENCE shift_id_seq RESTART;");
pool.query("ALTER SEQUENCE detour_id_seq RESTART;");
pool.query("ALTER SEQUENCE incidents_id_seq RESTART;");

//export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
  return pool.connect(callback);
};
