const db = require("../database");
var express = require("express");

class Status {
  
  static retrieveAll(callback) {
  console.log("entro en el model de status")
    db.query("SELECT * FROM tipo_status", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}
module.exports = Status;
