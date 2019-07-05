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
  static updateCompraAliado(compra, callback) {
    db.query(
      "UPDATE compra_aliado set fk_tipo_status=$1 \
       where id_compra_aliado=$2",
      [
        compra.id_status,
        compra.id_compra, 
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static updateCompraCliente(compra, callback) {
    db.query(
      "UPDATE compra_cliente set fk_tipo_status=$1 \
       where id_compra_cliente=$2",
      [
        compra.id_status,
        compra.id_compra, 
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static updateStatusYacimiento(yacimiento, callback) {
    db.query(
      "UPDATE yacimiento set fk_tipo_status=$1 \
       where id_yacimiento=$2",
      [
        yacimiento.id_status,
        yacimiento.id_yacimiento, 
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Status;
