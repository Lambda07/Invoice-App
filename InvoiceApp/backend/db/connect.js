// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

// db.connect();

// module.exports = db;

var mysql = require("mysql2");
// Initialize pool
var db = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  debug: false,
});
module.exports = db;
