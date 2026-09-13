var express = require('express');
var router = express.Router();
var programadoresModel = require('../../models/programadoresModel');

// 1. Listar (Read)
router.get('/', async function (req, res, next) {
  try {
    var programadores = await programadoresModel.getProgramadores();
    res.render('admin/novedades', {
      layout: 'admin/layout',
      programadores
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 2. Agregar (Create)
router.post('/agregar', async function (req, res, next) {
  try {
    // Validamos que los campos de la tabla novedades (titulo, subtitulo, cuerpo) no vengan vacíos
    if (req.body.titulo !== "" && req.body.subtitulo !== "" && req.body.cuerpo !== "") {
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
    next(error);
  }
});

// 3. Eliminar (Delete)
router.get('/eliminar/:id', async function (req, res, next) {
  try {
    var id = req.params.id;
    await programadoresModel.deleteProgramadorById(id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;