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
      "select m.nombre_mineral as nombre, m.id_mineral id\
       from mineral m, mineral_mineral mm\
       where  mm.fk_mineral_comp = m.id_mineral  \
       and mm.fk_mineral = $1",
      [id_mineral],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveCostoMineralCompuesto(id_mineral, callback) {
    db.query(
      "select m.nombre_mineral,p.nombre_presentacion,a.costo as costo, a.id_mineral_presentacion as id \
      from mineral m, presentacion p, mineral_presentacion a\
      where a.fk_mineral =m.id_mineral and\
      a.fk_presentacion=p.id_presentacion\
      and m.id_mineral=$1 and p.nombre_presentacion='Natural'",
      [id_mineral],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrievePresentacion(nombreMineral, callback) {
    console.log("entro al  model con nombre: " + nombreMineral);
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

  static retrievePresentaciones(callback) {
    db.query(
      "select p.nombre_presentacion, m.nombre_mineral  \
      from presentacion p, mineral m, mineral_presentacion mp\
      where mp.fk_mineral = m.id_mineral\
      and mp.fk_presentacion= p.id_presentacion",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static update(mineral, callback) {
    db.query(
      "UPDATE mineral set nombre_mineral=$1, descripccion_mineral=$2, valor_economico=$3,\
      fecha_nacionalizacion=$4, fecha_ini_explotacion=$5, tipo_mineral=$6\
        where nombre_mineral= $1",
      [
        mineral.nombre,
        mineral.descripcion,
        mineral.valor,
        mineral.nacionalizacion,
        mineral.explotacion,
        mineral.tipo
      ],
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
    if (mineral.nombre =="")
        mineral.nombre=null;
    db.query(
      "INSERT INTO mineral (nombre_mineral,tipo_mineral,valor_economico,\
        descripcion_mineral,fecha_ini_explotacion,fecha_nacionalizacion) \
        VALUES ($1,$2,$3,$4,$5,$6)",
      [
        mineral.nombre,
        mineral.tipo,
        mineral.valor,
        mineral.descripcion,
        mineral.inicio,
        mineral.nacionalizacion
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static delete(nombre, callback) {
    db.query(
      'DELETE FROM mineral where nombre_mineral=$1',[nombre],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
        
      }
    );
  }
}

module.exports = Minerales;
