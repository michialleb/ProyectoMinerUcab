const db = require("../database");
var express = require("express");

class Fases {

  static insert(fase, callback) {
    db.query(
      "insert into Fase (numero_fase, nombre_fase,duracion_fase,costo_fase,\
        fk_etapa_explotacion,fk_tipo_status) \
        values ($1, $2, $3,$4, (select id_etapa \
                                from etapa_explotacion\
                                where fk_proyecto= (select id_proyecto\
                                from proyecto \
                                where nombre_proyecto=$5)\
                                and numero_etapa= $6), 4) returning id_fase;",
      [
        fase.numeroFase,
        fase.nombreFase,
        fase.duracion,
        fase.costo,
        fase.nombreProyecto,
        fase.numeroEtapa
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Fases;
