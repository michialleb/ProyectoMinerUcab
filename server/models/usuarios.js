const db = require("../database");
var express = require("express");

class Usuarios {
  static retrieveAll(callback) {
    db.query("SELECT usuario_nombre FROM usuarios", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static insert(usuario, callback) {
    db.query(
      "INSERT INTO usuarios (usuario_nombre,usuario_apellido,usuario_user,usuario_cedula,usuario_password,usuario_correo)\
       VALUES ($1,$2,$3,$4,$5,$6)",
      [
        usuario.name,
        usuario.apellido,
        usuario.usuario,
        usuario.cedula,
        usuario.password,
        usuario.email
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Usuarios;
