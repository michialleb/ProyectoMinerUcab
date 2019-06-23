const db = require("../database");
var express = require("express");

class Etapas {

  static insert(etapa, callback) {
    db.query(
      "INSERT INTO etapa_explotacion(nombre_etapa,numero_etapa,fk_proyecto,\
        fk_tipo_status) VALUES ($1,$2,(SELECT id_proyecto FROM proyecto\
        WHERE nombre_proyecto=$3),1)",
      [
        etapa.nombreEtapa,
        etapa.numeroEtapa,
        etapa.nombreProyecto
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Etapas;
