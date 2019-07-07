const db = require("../database");
var express = require("express");

class Usuarios {
  static retrieveAll(callback) {
    db.query("SELECT usuario_nombre FROM usuarios", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveAllPersonas(callback) {
    db.query("SELECT * from personas_sistema", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveUsuariosPorCedula(cedula, callback) {
    console.log("entro en query con cedula: " + cedula);
    db.query(
      "SELECT usuario,nombre from usuariospersonas where cedula= $1",
      [cedula],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static insert(user, callback) {
    var tipo = user.nombre_persona.split([":"], [1]);
    if (tipo == "Cliente") {
      db.query(
        "INSERT INTO usuario (nombre_usuario,contraseña ,fk_cliente_persona, fk_rol)\
       VALUES ($1,$2, (select id_cliente from persona where cedula_identidad = $3),$4)",
        [user.nombre_usuario, user.contraseña, user.cedula_persona, user.rol],

        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }
      );
    } else {
      db.query(
        "INSERT INTO usuario (nombre_usuario,contraseña ,fk_empleado, fk_rol)\
         VALUES ($1,$2, (select id_empleado from empleado where cedula_identidad = $3),$4)",
        [user.nombre_usuario, user.contraseña, user.cedula_persona, user.rol],

        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }
      );
    }
  }
}
module.exports = Usuarios;
