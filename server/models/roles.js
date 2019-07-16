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
      "select p.nombre_permiso, p.descripcion_permiso, p.id_permiso \
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
    db.query("select * from permiso", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
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

  static retrievePermisosNoAsignados(id_rol, callback) {
    db.query(
      "  select r.id_rol, p.id_permiso, p.nombre_permiso\
      from rol r, permiso p \
      where p.id_permiso not in (select fk_permiso\
                     from permiso_rol\
                     where r.id_rol = fk_rol)\
        and r.id_rol = $1",
      [id_rol],
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

  static update(rol, callback) {
    if (rol.tipo_rol == "") rol.tipo_rol = null;

    db.query(
      "UPDATE rol set tipo_rol=$1 , descripcion_rol=$2 where id_rol = $3",
      [rol.tipo_rol, rol.descripcion_rol, rol.id_rol],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static deletePermiso(permiso, callback) {
    db.query(
      `DELETE FROM permiso_rol where fk_rol=$1 and fk_permiso=$2`,
      [permiso.id_rol, permiso.id_permiso],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static deleteRol(idRol, callback) {
    console.log("entro en model eliminar con " + idRol);
    db.query(`DELETE FROM rol where id_rol=$1`, [idRol], function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}

module.exports = Roles;
