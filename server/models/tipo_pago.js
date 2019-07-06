const db = require("../database");
var express = require("express");

class Pago {
  
  static retrieveAll(callback) {
    db.query("SELECT id_tipo_pago as id, tipo as pago, banco as banco \
              FROM tipo_pago", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
  
}
module.exports = Pago;
