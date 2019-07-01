const db = require("../database");
var express = require("express");

class Fases {

  static retrieveCargoFase(idFase,callback) {
    db.query(
      "select c.tipo_cargo  as cargo\
      from cargo c, cargo_fase cf, fase f \
      where f.id_fase=$1\
      and f.id_fase=cf.fk_fase\
      and cf.fk_cargo =c.id_cargo",[idFase],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static retrieveMaquinariaFase(idFase,callback) {
    db.query(
      " select m.nombre_maquinaria as maquinaria\
      from maquinaria m, fase f, maquinaria_fase mf\
      where f.id_fase=$1\
      and   mf.fk_fase=f.id_fase\
      and mf.fk_maquinaria=m.id_maquinaria",[idFase],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  
 
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
  

  static update(id_fase,callback){
    db.query(
        "update fase set costo_fase=(select ( f.costo_fase + SUM(fc.costo))\
        from cargo_fase fc, fase f \
        where f.id_fase=$1 and fc.fk_fase=f.id_fase \
        group by f.costo_fase) where id_fase=$2;",
        [id_fase,
        id_fase
        ],
        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }

    );
  }
}
module.exports = Fases;
