var pool=require(',/bd');
var md5=require('md5');

// READ: Obtener todos los usuarios
async function gerUsernameAndPassword(user,password){
  try{
    var query='SELECT * FROM usuarioycontraseñaprogramadores WHERE usuario=? AND contraseña=?';
    var rows=await pool.query(query,[user,md5(password)]);
    return rows[0];
  }catch(error){
    console.log(error);
  }
}
module.exports={gerUsernameAndPassword};