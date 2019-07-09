const db = require("../database");
var express = require("express");

class Roles {
  static retrieveAll(callback) {
    db.query(
      "select r.id_rol , r.tipo_rol  , r.descripcion_rol  from rol r",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrievePermisos(id_rol, callback) {
    db.query(
      "select p.nombre_permiso, p.descripcion_permiso \
     from permiso p inner join permiso_rol pr on pr.fk_permiso=p.id_permiso\
     inner join rol r on pr.fk_rol = r.id_rol\
     where id_rol = $1",
      [id_rol],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  
  static retrieveAllPermisos(callback) {
    db.query(
      "select * from permiso",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static insertPermisoRol(rol, callback) {
    
      db.query(
        "INSERT INTO permiso_rol (fk_permiso, fk_rol) \
        VALUES ((SELECT id_permiso FROM permiso WHERE nombre_permiso=$1), $2)",
        [rol.permiso, rol.id_rol],

        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }
      );
    
  }

  static insert(rol, callback) {
    if (rol.tipo_rol == "") rol.tipo_rol = null;

    db.query(
      "INSERT INTO rol (tipo_rol,descripcion_rol) VALUES ($1,$2) returning id_rol",
      [rol.tipo_rol, rol.descripcion],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Roles;
