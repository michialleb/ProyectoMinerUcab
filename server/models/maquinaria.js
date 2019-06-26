const db = require("../database");
var express = require("express");

class Maquinaria{

  static retrieveAll(callback) {
    db.query("SELECT * FROM maquinaria", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static insertMaquinariaFase(maquinariaFase, callback) {
    db.query(
      "INSERT INTO maquinaria_fase (cantidad, costo, fk_maquinaria,fk_fase) \
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
       maquinariaFase.cantidad,
       maquinariaFase.costo,
       maquinariaFase.id_maquinaria,
       maquinariaFase.numero_fase,
       maquinariaFase.numero_etapa,
       maquinariaFase.nombre_proyecto
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  
}

module.exports = Maquinaria;
