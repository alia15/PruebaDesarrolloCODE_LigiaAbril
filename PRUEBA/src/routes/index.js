var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

/* GET users listing. */
router.get('/examen', function(req, res, next) {
  res.render('error.html', { title: 'ERROR', cuerpo: 'ERROR, CODIGO DE EXAMEN NO PROPORCIONADO' });
});

module.exports = router;
