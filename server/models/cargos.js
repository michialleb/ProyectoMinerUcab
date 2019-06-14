const db = require("../database");
var express = require("express");

class Cargos {
  static retrieveAll(callback) {
    db.query("SELECT * FROM cargo", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}
module.exports = Cargos;
