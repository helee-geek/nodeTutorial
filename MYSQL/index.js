const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "geek8685",
});

con.connect((err) => {
  if (err) throw err;
  con.query("CREATE DATABASE IF NOT EXISTS demo", (err, result) => {
    if (err) throw err;
    console.log("Successfully Connected");
  });
  con.end();
});
