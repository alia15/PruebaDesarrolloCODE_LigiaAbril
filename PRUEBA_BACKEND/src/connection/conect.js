const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Examenes",
});

var coneccion = con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports.insertar = function (str) {
  con.query(str, (err, res) => {
    console.log("Insertando registro...");
    if (err) throw err;
    console.log("Se inserto un registro");
  });
};

module.exports.select = function (str, callback) {
  con.query(str, (err, res, fields) => {
    console.log("Buscando registro...");
    if (err) throw err;
    /*    Object.keys(res).forEach(function(key) {
      var row = res[key];
      console.log(row.max)
    });*/
    console.log(res[0].max)
    return res[0].max;
    
    // callback(null, res[0].max)
  });
};
