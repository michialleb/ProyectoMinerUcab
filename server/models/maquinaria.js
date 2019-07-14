const db = require("../database");
var express = require("express");

class Maquinaria {
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
  static insertMaquinariaActiva(maqui, callback) {
    console.log("maqui act")
    db.query(
      "INSERT INTO maquinaria_activa (fk_maquinaria, fk_fase, fk_tipo_status) \
      VALUES ($1,$2,$3)",
      [maqui.id_maquinaria, maqui.id_fase, maqui.id_tipo_status],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  
}

  static updateStatusMaquinariaActiva(maqui, callback) {
  db.query(
    "update maquinaria_activa set fk_tipo_status=(select id_tipo_status\
                                                  from tipo_status \
                                                  where nombre_tipo_status=$1)\
     where fk_fase=$2 ",
    [maqui.id_status, maqui.id_fase],

    function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    }
  );

}

static updateStatusMaquinariaActivaManual(maqui, callback) {
  console.log(maqui.id_status +" "+ maqui.id_fase+ " "+ maqui.id_maquinaria);
  db.query(
    "update maquinaria_activa set fk_tipo_status=(select id_tipo_status\
                                                  from tipo_status \
                                                  where nombre_tipo_status=$1)\
     where fk_fase=$2 and fk_maquinaria=$3 returning id_maquinaria_activa",
    [maqui.id_status, maqui.id_fase, maqui.id_maquinaria],

    function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    }
  );

}

  static getMaquinariaFaseCantidad(id_fase, callback) {
    db.query(
      "select fk_maquinaria as maquinaria, cantidad  as cantidad\
      from maquinaria_fase\
      where fk_fase= $1",
      [
       id_fase
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static getMaquinariaActivaFase(maq, callback) {
    db.query(
      "select m.nombre_maquinaria as nombre, (select nombre_tipo_status\
        from tipo_status \
        where id_tipo_status= ma.fk_tipo_status) as status\
        from maquinaria_activa ma, maquinaria m\
        where ma.fk_maquinaria= m.id_maquinaria\
        and ma.fk_maquinaria= $1\
        and ma.fk_fase =$2",
      [
       maq.id_maquinaria, maq.id_fase
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  
  

}

module.exports = Maquinaria;
