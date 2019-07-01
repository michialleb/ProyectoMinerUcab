const db = require("../database");
var express = require("express");

class EmpresasAliadas {
  static retrieveNombre(nombre, callback) {
    db.query(
      "SELECT * FROM empresa_aliada WHERE nombre_empresa= $1",
      [nombre],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static retrieveMineralEmpresa(id_mineral_presentacion, callback) {
    
    db.query(
      " select e.nombre_empresa, e.rif, e.telefono_empresa \
      from empresa_aliada e, mineral_empresa me, mineral_presentacion \
      where me.fk_mineral_presentacion = $1 \
      and me.fk_empresa_aliada= e.id_empresa_aliada limit 1",
      [id_mineral_presentacion],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

 

  static retrieveAll(callback) {
    db.query("SELECT * FROM empresa_aliada", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}

module.exports = EmpresasAliadas;
