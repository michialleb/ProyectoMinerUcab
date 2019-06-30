const db = require("../database");
var express = require("express");

class Cargos {
  static retrieveAll(callback) {
    console.log('model cargos');
    db.query("SELECT * FROM cargo", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static insertCargoFase(cargoFase, callback) {
    db.query(
      "INSERT INTO cargo_fase (cantidad, costo, fk_cargo,fk_fase) \
      VALUES ($1,$2,$3,(SELECT id_fase \
                        FROM fase  \
                        WHERE numero_fase= $4 \
                        AND fk_etapa_explotacion =(SELECT id_etapa \
                                                   FROM etapa_explotacion \
                                                   WHERE numero_etapa= $5 \
                                                   AND fk_proyecto=(SELECT id_proyecto \
                                                   FROM proyecto \
                                                   WHERE nombre_proyecto=$6))))",
      [
        cargoFase.cantidad,
        cargoFase.costo,
        cargoFase.id_cargo,
        cargoFase.numero_fase,
        cargoFase.numero_etapa,
        cargoFase.nombre_proyecto
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Cargos;
