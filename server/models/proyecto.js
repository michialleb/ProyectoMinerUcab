const db = require("../database");
var express = require("express");

class Proyectos {

  static retrieveAll(callback) {
    db.query("SELECT p.id_proyecto as id, p.nombre_proyecto as proyecto, y.nombre_yacimiento as yacimiento, p.duracion_proyecto as duracion, s.nombre_tipo_status as status \
              from proyecto p, yacimiento y, tipo_status s \
              where p.fk_yacimiento= y.id_yacimiento \
              and p.fk_tipo_status= s.id_tipo_status", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
  static insert(proyecto, callback) {
      console.log(proyecto.nombre);
    db.query(
      "INSERT INTO proyecto (nombre_proyecto,fk_yacimiento,fk_tipo_status, duracion_proyecto)\
       VALUES ($1,(SELECT id_yacimiento FROM yacimiento \
        WHERE  nombre_yacimiento=$2),4, $3)",
      [
        'Proyecto ' + proyecto.nombre,
        proyecto.nombre,
        proyecto.duracion_proyecto
 
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveEtapaFase(id_proyecto,callback) {
    db.query(
    "select p.nombre_proyecto as proyecto, e.nombre_etapa as etapa, f.nombre_fase  as fase,\
    e.id_etapa as idEtapa, f.id_fase as idFase \
    from proyecto p, etapa_explotacion e,  fase f \
    where e.fk_proyecto=$1\
    and p.id_proyecto=e.fk_proyecto\
    and f.fk_etapa_explotacion=e.id_etapa",[
      id_proyecto
    ], function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}
module.exports = Proyectos;
