const db = require("../database");
var express = require("express");

class Yacimientos {
  static retrieveNombre(nombre, callback) {
    db.query(
      "SELECT * FROM yacimiento WHERE yacimiento_nombre= $1",
      [nombre],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveAll(callback) {
    db.query("SELECT * FROM yacimiento", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }


static insert(yacimiento, callback) {
  db.query(
    "INSERT INTO yacimiento (yacimiento_nombre,kilometros) VALUES ($1,$2)",
    [
      yacimiento.nombre,
      yacimiento.kilometros
    ],

    function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    }
  );
}
}
module.exports = Yacimientos;
