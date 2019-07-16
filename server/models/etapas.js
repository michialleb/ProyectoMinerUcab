const db = require("../database");
var express = require("express");

class Etapas {

  static insert(etapa, callback) {
   console.log(etapa.nombre);
   console.log(etapa.numero);
   console.log(etapa.nombreProyecto)
    db.query(
      "INSERT INTO etapa_explotacion(nombre_etapa,numero_etapa,fk_proyecto,\
        fk_tipo_status,duracion_etapa,costo_etapa) VALUES ($1,$2,(SELECT id_proyecto FROM proyecto\
        WHERE nombre_proyecto=$3),4,$4,$5) returning id_etapa",
      [
        etapa.nombre,
        etapa.numero,
        etapa.nombreProyecto,
        etapa.duracionEtapa,
        etapa.costoEtapa
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveStatusEtapa(idEtapa, callback) {
    db.query(
      "select s.nombre_tipo_status as status\
       from tipo_status s, etapa_explotacion e \
       where e.fk_tipo_status= s.id_tipo_status\
       and e.id_etapa= $1",
      [idEtapa],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

 


}
module.exports = Etapas;
