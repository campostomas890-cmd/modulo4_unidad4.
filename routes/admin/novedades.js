var express = require('express');
var router = express.Router();
var path = require('path');
var programadoresModel = require('../../models/programadoresModel');

// 1. Listar (Read)
router.get('/', async function (req, res, next) {
  try {
    var programadores = await programadoresModel.getProgramadores();
    res.render('admin/novedades', {
      layout: 'admin/layout',
      programadores,
      usuario: req.session.nombre
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 2. Agregar (Create)
router.post('/agregar', async function (req, res, next) {
  try {
    if (req.body.titulo && req.body.subtitulo && req.body.cuerpo) {
      let img_id = null;

      if (req.files && req.files.img_id) {
        const archivo = req.files.img_id;
        const nombreArchivo = Date.now() + '-' + archivo.name.replace(/\s+/g, '_');
        const ruta = path.join(__dirname, '../../public/images', nombreArchivo);

        await archivo.mv(ruta);
        img_id = nombreArchivo;
      }

      await programadoresModel.insertProgramador({
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        cuerpo: req.body.cuerpo,
        img_id: img_id
      });

      res.redirect('/admin/novedades');
    } else {
      var programadores = await programadoresModel.getProgramadores();
      res.render('admin/novedades', {
        layout: 'admin/layout',
        programadores,
        usuario: req.session.nombre,
        error: true,
        message: 'Todos los campos son requeridos'
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 3. Editar - cargar formulario de edición
router.get('/editar/:id', async function (req, res, next) {
  try {
    var id = req.params.id;
    var programador = await programadoresModel.getProgramadorById(id);
    var programadores = await programadoresModel.getProgramadores();

    res.render('admin/novedades', {
      layout: 'admin/layout',
      programadores,
      programador,
      usuario: req.session.nombre
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 3. Editar - procesar actualización (Update)
router.post('/editar/:id', async function (req, res, next) {
  try {
    var id = req.params.id;

    if (req.body.titulo !== "" && req.body.subtitulo !== "" && req.body.cuerpo !== "") {
      let img_id = req.body.img_id_actual || null;

      if (req.files && req.files.img_id) {
        const archivo = req.files.img_id;
        const nombreArchivo = Date.now() + '-' + archivo.name.replace(/\s+/g, '_');
        const ruta = path.join(__dirname, '../../public/images', nombreArchivo);

        await archivo.mv(ruta);
        img_id = nombreArchivo;
      }

      await programadoresModel.updateProgramadorById(id, {
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        cuerpo: req.body.cuerpo,
        img_id: img_id
      });

      res.redirect('/admin/novedades');
    } else {
      var programador = await programadoresModel.getProgramadorById(id);
      var programadores = await programadoresModel.getProgramadores();
      res.render('admin/novedades', {
        layout: 'admin/layout',
        programadores,
        programador,
        usuario: req.session.nombre,
        error: true,
        message: 'Todos los campos son requeridos'
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 4. Eliminar (Delete)
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