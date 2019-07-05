const db = require("../database");
var express = require("express");

class Horarios {
  static retrieveAll(callback) {
    db.query("SELECT * FROM horario", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}
module.exports = Horarios;
