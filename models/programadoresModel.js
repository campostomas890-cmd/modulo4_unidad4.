var pool = require('./bd');

// READ: Obtener todos los programadores
async function getProgramadores() {
  var query = 'SELECT * FROM usuarioycontraseñaprogramadores ORDER BY id DESC';
  var rows = await pool.query(query);
  return rows;
}

// CREATE: Insertar un programador
async function insertProgramador(obj) {
  try {
    var query = 'INSERT INTO usuarioycontraseñaprogramadores SET ?';
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// DELETE: Eliminar por ID
async function deleteProgramadorById(id) {
  var query = 'DELETE FROM usuarioycontraseñaprogramadores WHERE id = ?';
  var rows = await pool.query(query, [id]);
  return rows;
}

module.exports = { getProgramadores, insertProgramador, deleteProgramadorById };
