var pg = require('pg');

var timestampOID = 1114;
pg.types.setTypeParser(1114, function(stringValue) {
  return stringValue;
})
var config = {
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

//export the query method for passing queries to the pool
module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function (callback) {
  return pool.connect(callback);
};
