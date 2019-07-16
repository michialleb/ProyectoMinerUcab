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

  static insertPago(pago, callback) {
    db.query("INSERT INTO pago (fecha_pago,monto_total_pagado, fk_compra_cliente, fk_tipo_pago) \
              VALUES ($1,$2,$3,$4)",
            [ pago.fecha,pago.total, pago.id_compra,pago.id_tipo_pago],
              function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
  
}
module.exports = Pago;
