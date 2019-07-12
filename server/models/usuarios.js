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
      "SELECT usuario,contraseña, nombre, tipo_rol, id_rol \
      from usuariospersonas  \
       where cedula= $1",
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

  static update(user, callback) {
    db.query(
      "UPDATE usuario set nombre_usuario = $1 , contraseña=$2 , \
        fk_rol = (select id_rol from rol where tipo_rol = $3) \
        WHERE nombre_usuario = $4  ",
      [
        user.nombre_usuario,
        user.contraseña,
        user.rol,
        user.nombre_usuario_viejo
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static ingresarUsuario(user, callback) {
    db.query(
      "SELECT * FROM usuariospersonas where usuario= $1",
      [user],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static delete(id, callback) {
    console.log("entro en el model con nombre: " + id);
    db.query(`DELETE FROM usuario where nombre_usuario=$1`, [id], function(
      err,
      res
    ) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}

module.exports = Usuarios;
