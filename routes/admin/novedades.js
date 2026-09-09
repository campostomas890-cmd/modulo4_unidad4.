var express = require('express');
var router = express.Router();
var programadoresModel = require('../../models/programadoresModel');

// Listar (Read)
router.get('/', async function (req, res, next) {
  var programadores = await programadoresModel.getProgramadores();
  res.render('admin/novedades', {
    layout: 'admin/layout',
    programadores
  });
});

// Agregar (Create)
router.post('/agregar', async function (req, res, next) {
  try {
    if (req.body.usuario != "" && req.body.contraseña != "") {
      await programadoresModel.insertProgramador(req.body);
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/novedades', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Eliminar (Delete)
router.get('/eliminar/:id', async function (req, res, next) {
  var id = req.params.id;
  await programadoresModel.deleteProgramadorById(id);
  res.redirect('/admin/novedades');
});

module.exports = router;