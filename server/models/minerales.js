const db = require("../database");
var express = require("express");

class Minerales {


  static retrieveNombre(nombre, callback) {
    db.query(
      "SELECT * FROM mineral WHERE nombre_mineral= $1",
      [nombre],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveMineralCompuesto(id_mineral, callback) {
    db.query(
      "select m.nombre_mineral as nombre from mineral m, mineral_mineral mm\
       where  mm.fk_mineral_comp = m.id_mineral  \
       and mm.fk_mineral = $1",
      [id_mineral],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrievePresentacion(nombreMineral, callback) {
    console.log("entro al  model con nombre: "+ nombreMineral);
    db.query(
      "select p.nombre_presentacion \
      from presentacion p, mineral m, mineral_presentacion mp\
      where mp.fk_mineral = (select m.id_mineral from mineral m\
                             where m.nombre_mineral=$1)\
      and mp.fk_presentacion= p.id_presentacion\
      group by p.nombre_presentacion",
      [nombreMineral],
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
        descripcion_mineral,fecha_inicio_mineral,fecha_nacionalizacion_mineral,industria_mineral) \
        VALUES ($1,$2,$3,$4,$5,$6,$7)",
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
