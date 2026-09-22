var pool = require('./bd');

// READ: Obtener todos los programadores
async function getProgramadores() {
  var query = 'SELECT * FROM novedades ORDER BY id DESC';
  var rows = await pool.query(query);
  return rows;
}

// READ: Obtener un programador por ID
async function getProgramadorById(id) {
  var query = 'SELECT * FROM novedades WHERE id = ? LIMIT 1';
  var rows = await pool.query(query, [id]);
  return rows[0];
}
// CREATE: Insertar un programador
async function insertProgramador(obj) {
  var query = 'INSERT INTO novedades (titulo, subtitulo, cuerpo, img_id) VALUES (?, ?, ?, ?)';
  var rows = await pool.query(query, [obj.titulo, obj.subtitulo, obj.cuerpo, obj.img_id || null]);
  return rows;
}

// UPDATE: Modificar un programador por ID
async function updateProgramadorById(id, obj) {
  var query = 'UPDATE novedades SET titulo = ?, subtitulo = ?, cuerpo = ?, img_id = ? WHERE id = ?';
  var rows = await pool.query(query, [obj.titulo, obj.subtitulo, obj.cuerpo, obj.img_id || null, id]);
  return rows;
}

// DELETE: Eliminar por ID
async function deleteProgramadorById(id) {
  var query = 'DELETE FROM novedades WHERE id = ?';
  var rows = await pool.query(query, [id]);
  return rows;
}

module.exports = { getProgramadores, getProgramadorById, insertProgramador, updateProgramadorById, deleteProgramadorById };
