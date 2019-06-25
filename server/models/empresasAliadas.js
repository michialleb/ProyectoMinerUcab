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

  static retrieveAll(callback) {
    db.query("SELECT * FROM empresa_aliada", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}

module.exports = EmpresasAliadas;
