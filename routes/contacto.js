/*codigo coregido falta de (const express = require('express'); , const router = express.Router(); y module.exports=router;*/
const express = require('express');
const router = express.Router();
router.post('/contacto',async(req,res,next) => {
  const obj={
    to:'tomas@gmail.com',
    subject:'contacto desde la web',
    html:`${req.body.nombre} te mando este mensaje: ${req.body.mensaje}`
  };
    //var transporter = nodemailer.createTransport({
    var transporter=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    outh:{
    user:proces.env.SMTP_user,
    pass:proces.env.SMTP_pass
  }   
  });
await transporter.sendMail(obj);//<--este codigo manda todos los mensajes al mail vinculado a la cuenta de gmail que creaste para el proyecto.

res.redirect('/contacto=enviado)');
  });
  module.exports=router; 