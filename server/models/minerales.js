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
  static insert(mineral, callback) {
    db.query(
      "INSERT INTO mineral (nombre_mineral,tipo_mineral,valor_economico,\
        descripcion_mineral,fecha_inicio_mineral,fecha_nacionalizacion_mineral,industria_mineral) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        mineral.nombre,
        mineral.tipo,
        mineral.valor,
        mineral.descripcion,
        mineral.inicio,
        mineral.nacionalizacion,
        mineral.industria
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Minerales;
