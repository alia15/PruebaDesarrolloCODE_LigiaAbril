const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'Examenes'
});

var coneccion = con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = coneccion;