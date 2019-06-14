const db = require("../database");
var express = require("express");

class Minerales {
  static retrieveNombre(nombre, callback) {
    db.query(
      "SELECT * FROM mineral WHERE mineral_nombre= $1",
      [nombre],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveAll(callback) {
    db.query("SELECT * FROM mineral", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}

module.exports = Minerales;
