const db = require("../database");
var express = require("express");

class EmpresasAliadas {
  static retrieveNombre(nombre, callback) {
    db.query(
      "SELECT * FROM empresa_aliada WHERE nombre_empresa= $1",
      [nombre],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static retrieveMineralEmpresa(id_mineral_presentacion, callback) {
    
    db.query(
      " select e.nombre_empresa, e.rif, e.telefono_empresa \
      from empresa_aliada e, mineral_empresa me, mineral_presentacion \
      where me.fk_mineral_presentacion = $1 \
      and me.fk_empresa_aliada= e.id_empresa_aliada limit 1",
      [id_mineral_presentacion],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    ); 
  }
 

  static CompraAliado(compra, callback) {
    var f= new Date;
    var Fecha=f.getMonth()+'-'+f.getDate()+'-'+f.getFullYear();
    db.query(
      "insert into compra_aliado (cantidad, fecha_compra_aliado,\
      monto_total, fk_empresa_aliada, fk_proyecto,fk_tipo_status,fk_mineral_presentacion) \
      values ($1, $2, $3, (select id_empresa_aliada from empresa_aliada\
       where nombre_empresa=$4 ),(select p.id_proyecto \
      from proyecto p, mineral_yacimiento my, yacimiento y\
      where p.fk_yacimiento = y.id_yacimiento\
      and my.fk_yacimiento =y.id_yacimiento\
      and my.cantidad>=$5\
      and my.fk_mineral= $6\
      and y.fk_tipo_status=7 limit 1), $7, $8);",
      [compra.cantidad,
      Fecha,
      compra.monto,
      compra.empresas,
      compra.cantidad,
      compra.id_mineral,
      2,
      compra.id_mineral_presentacion
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    )
  }

  static retrieveAll(callback) {
    db.query("SELECT * FROM empresa_aliada", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }
}

module.exports = EmpresasAliadas;
