const db = require("../database");
var express = require("express");

class Maquinaria{

  static retrieveAll(callback) {
    db.query("SELECT * FROM maquinaria", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
  
}

module.exports = Maquinaria;
