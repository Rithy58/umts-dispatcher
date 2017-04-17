var db = require('./db');

module.exports = {

  // Returns an array of shifts that occur on a given day.
  // @param {Date} date
  getShiftByDay: function(date) {
    if(!date) {  // If no date is passed, return todays info
      date = new Date();
    }
    query = "SELECT * FROM shift WHERE date_trunc('day', start_time) = make_timestamptz($1,$2,$3,0,0,0)";
    args = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return queryDb(query, args);
    db.query(query, args)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error('error running query', err);
    });
  },
};
