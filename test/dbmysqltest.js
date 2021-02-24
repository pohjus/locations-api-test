const mysql = require("mysql");
const conf = require("../mariadbconfig.js");
const connection = mysql.createConnection(conf);

connection.connect();

connection.query(
  "INSERT INTO locations (latitude, longitude) values (?, ?)",
  [60, 60],
  (error, results, fields) => {
    console.log(error);
    console.log(results);
    console.log(fields);
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
  }
);

connection.query("select * from locations", (err, users) => {
  if (err) {
    throw err;
  }
  users.forEach((loc) => console.log(loc));
});

// will wait if previously enqueued queries
connection.end();
