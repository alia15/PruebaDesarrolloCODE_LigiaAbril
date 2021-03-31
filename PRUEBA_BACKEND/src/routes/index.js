const { query } = require("express");
var express = require("express");
var conn = require("../connection/conect.js");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index.html", { title: "EXAMEN" });
});

/* GET users listing. */
router.get("/examen", function (req, res, next) {
  res.render("errorExamen.html", {
    title: "ERROR",
    cuerpo: "CODIGO DE EXAMEN NO PROPORCIONADO",
  });
});

/* GET users listing. */
router.get("/examen/:id", function (req, res, next) {
  res.render("index.html", { title: "EXAMEN " + req.params.id, cuerpo: "" });
});

/* GET users listing. */
router.get("/crear", function (req, res, next) {
  var nombre = req.query.nombre;
  var num = req.query.num;
  var id = req.query.id;
  res.render("editarExamen.html",  { title: `${nombre} - ${id}`, num: `${num}` });
});

/* REDIRECT TO CREATE */
router.get("/sendDetail", function (req, res, next) {
  try {
    var nombre = req.query.nombreExamen;
    var num = req.query.num;
    var id = "";
    var length = nombre.length;
    console.log(id);
    for (var i = 0; i < length; i++) id += nombre.charCodeAt(i).toString(16);
    var insert =
      "INSERT INTO examenes (examen, nombre, num_preguntas) VALUES ('" +
      id +
      "', '" +
      nombre +
      "','" +
      num +
      "') ON DUPLICATE KEY UPDATE examen = '" +
      id +
      "', nombre = '" +
      nombre +
      "', num_preguntas = '" +
      num +
      "';";
    console.log(insert);
    conn.insertar(insert);

    res.redirect(`/crear?nombre=${nombre}&num=${num}&id=${id}`);
    //res.render('index.html', { title: 'EXAMEN ' + req.params.id, cuerpo: '' });
  } catch (err) {
    console.errror(err);
  }
});

module.exports = router;
