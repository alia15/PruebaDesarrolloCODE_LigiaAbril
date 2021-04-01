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

module.exports.select = function (str, cb) {
  con.query(str, (err, res, fields) => {
    var array, i =0;
    console.log("Buscando registro...");
    // done: call callback with results
    cb(err, res);
    /* if (err) throw err;
     Object.keys(res).forEach(function(key) {
      var row = res[key];
    });
    console.log(res)
    console.log(array)*/
    
    // callback(null, res[0].max)
  });
};
