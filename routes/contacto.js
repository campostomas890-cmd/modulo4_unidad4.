var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  if (!req.body.nombre || !req.body.email || !req.body.mensaje) {
    return res.redirect('/?contacto=error#conocenos');
  }

  console.log('Nuevo contacto:', {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    tel: req.body.tel,
    mensaje: req.body.mensaje
  });

  res.redirect('/?contacto=enviado#conocenos');
});

module.exports = router;