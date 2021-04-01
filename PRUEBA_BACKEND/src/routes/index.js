const { query } = require("express");
var express = require("express");
var conn = require("../connection/conect.js");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index.html", { title: "EXAMEN" });
});

router.get("/examen", function (req, res, next) {
  res.render("errorExamen.html", {
    title: "ERROR",
    cuerpo: "CODIGO DE EXAMEN NO PROPORCIONADO",
  });
});

router.get("/examen/:id", function (req, res, next) {
  res.render("muestraExamen.html", {
    title: "EXAMEN " + req.params.id,
    cuerpo: "",
  });
});

/* GET users listing. */
router.get("/mostrarGenerado/examen/:id", function (req, res, next) {
  var qri =
    "SELECT e.examen examen, e.nombre nombre, p.pregunta numP, p.texto pregunta, r.respuesta numR, r.texto respuesta, r.correcta cor " +
    "  FROM examenes e " +
    " INNER JOIN preguntas p ON e.examen = p.examen " +
    " INNER JOIN respuestas r ON r.examen = e.examen " +
    ` WHERE e.examen = '${req.params.id}' ` +
    " AND p.pregunta = r.pregunta " +
    " ORDER BY numP, pregunta, numR;";

  console.log(qri);
  
  var respuesta;
  conn.select(qri, (err, resp) => {
    if (err) throw(err);
    respuesta = resp;
    console.log(respuesta)
    //res.send(resp)
  
  res.render("generaExamen.html", {
    title: req.params.id,
    url: req.get("host"),
    id: "/examen/" + req.params.id,
  });
  })
  console.log(respuesta)

});

router.get("/sendDetail", function (req, res, next) {
  try {
    var nombre = req.query.nombreExamen;
    var num = req.query.num;
    var id = "";
    var length = nombre.length;
    console.log(id);
    for (var i = 0; i < length; i++) {
      if (Number(nombre.charCodeAt(i).toString(10)) == NaN) id += 0;
      else id += nombre.charCodeAt(i).toString(10);
      console.log(id);
    }
    id = id.substr(0, 19);
    console.log(id);
    var insert =
      "INSERT INTO examenes (examen, nombre, num_preguntas) VALUES ('" +
      id +
      "', '" +
      nombre +
      "','" +
      num +
      "') ON DUPLICATE KEY UPDATE  nombre = '" +
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

router.get("/crear", function (req, res, next) {
  var nombre = req.query.nombre;
  var num = req.query.num;
  var id = req.query.id;
  res.render("editarExamen.html", {
    title: `${nombre} - ${id}`,
    num: `${num}`,
    nombre: `${nombre}`,
    id: `${id}`,
  });
});

router.get("/guardarPreguntas", function (req, res, next) {
  var nombre = req.query.nombre,
    num = req.query.num,
    id = req.query.id,
    impreso = true,
    insert = " ",
    pregunta = 1,
    texto = "",
    respuesta = 1,
    i = i;
  console.log(req.query);
  for (var param in req.query) {
    if (param == "nombre") continue;
    else if (param == "num") continue;
    else if (param == "id") continue;
    else if (param.substr(0, 4) == "preg") {
      if (!impreso) {
        insert +=
          `'0') ON DUPLICATE KEY UPDATE ` +
          `pregunta='${pregunta}', examen='${id}', respuesta='${respuesta}', texto='${texto}', correcta='0'; `;
        conn.insertar(insert);
        impreso = true;
      }
      reini = 1;
      pregunta = param.substr(8, 9);
      texto = req.query[param];
      insert =
        "INSERT INTO preguntas (pregunta, examen, texto)  VALUES ( " +
        `'${pregunta}',` +
        `'${id}',` +
        `'${texto}') ON DUPLICATE KEY UPDATE ` +
        `pregunta='${pregunta}', examen='${id}', texto='${texto}'; `;
      conn.insertar(insert);
      console.log(insert);
      continue;
    } else if (param.substr(0, 4) == "resp") {
      if (!impreso) {
        insert +=
          `'0') ON DUPLICATE KEY UPDATE ` +
          `pregunta='${pregunta}', examen='${id}', respuesta='${respuesta}', texto='${texto}', correcta='0';`;
        conn.insertar(insert);
        impreso = true;
      }
      respuesta = param[4];
      texto = req.query[param];
      insert =
        " INSERT INTO respuestas (pregunta, examen, respuesta, texto, correcta) VALUES ( " +
        `'${pregunta}', ` +
        `'${id}', ` +
        `'${respuesta}',` +
        `'${texto}', `;
      impreso = false;
      continue;
    } else if (param.substr(0, 4) == "corr") {
      insert +=
        `'1') ON DUPLICATE KEY UPDATE ` +
        `pregunta='${pregunta}', examen='${id}', respuesta='${respuesta}', texto='${texto}', correcta='1'; `;
      conn.insertar(insert);
      impreso = true;
      continue;
    }

    console.log(param, req.query[param]);
    console.log(insert);
    correcto = 0;
  }
  insert +=
    `'1') ON DUPLICATE KEY UPDATE ` +
    `pregunta='${pregunta}', examen='${id}', respuesta='${respuesta}', texto='${texto}', correcta='0'; `;
  conn.insertar(insert);
  res.redirect(`/mostrarGenerado/examen/${id}`);
});

module.exports = router;
