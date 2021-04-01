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

module.exports.select = function (id) {
  
  return new Promise(function(cb, err) { 
    var qri =
    "SELECT e.examen examen, e.nombre nombre, e.num_preguntas num, p.pregunta numP, p.texto pregunta, r.respuesta numR, r.texto respuesta, r.correcta cor " +
    "  FROM examenes e " +
    " INNER JOIN preguntas p ON e.examen = p.examen " +
    " INNER JOIN respuestas r ON r.examen = e.examen " +
    ` WHERE e.examen = '${id}' ` +
    " AND p.pregunta = r.pregunta " +
    " ORDER BY numP, pregunta, numR;";
    console.log(qri)
  con.query(qri, (err, res, fields) => {
    var array, i =0;
    console.log("Buscando registro...");
    if (err) throw err;
    // done: call callback with results
    cb(res);
    /* if (err) throw err;
     Object.keys(res).forEach(function(key) {
      var row = res[key];
    });
    console.log(res)
    console.log(array)*/
    
    // callback(null, res[0].max)
  });
});
};
