const db = require("../database");
var express = require("express");

class Lugar {
  static retrieveAll(callback) {
    db.query("SELECT * FROM lugar where tipo_lugar = 'ESTADO' ", function(
      err,
      res
    ) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveMunicipioProvincia(codigo, callback) {
    db.query(
      "SELECT id_lugar,nombre_lugar FROM lugar WHERE fk_lugar =$1",
      [codigo],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Lugar;
