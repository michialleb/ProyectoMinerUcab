const db = require("../database");
var express = require("express");

class Yacimientos {
  static retrieveNombre(nombre, callback) {
    db.query(
      "select t.nombre_tipo_status as nombre_status,\
      y.nombre_yacimiento as nombre_yacimiento,y.kilometros as kilometros,\
      y.descripcion_yacimiento as descripcion\
      from yacimiento y,tipo_status t \
      where y.fk_status=t.id_tipo_status and y.nombre_yacimiento=$1",
      [nombre],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveAll(callback) {
    db.query(
      "select t.nombre_tipo_status as nombre_status,\
    y.nombre_yacimiento as nombre_yacimiento,y.kilometros as kilometros,\
    y.descripcion_yacimiento as descripcion\
    from yacimiento y,tipo_status t \
    where y.fk_status=t.id_tipo_status",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

 
  static insert(yacimiento, callback) {
    db.query(
      "INSERT INTO yacimiento (nombre_yacimiento,kilometros,descripcion_yacimiento,fk_status) \
      VALUES ($1,$2,$3,2)",
      [yacimiento.nombre, yacimiento.kilometros, yacimiento.descripcion],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  // insertar por defecto status acttivo al ingresar yac (muchos a muchos)
  /*static insertstatusdefault(yacimiento,callback){
  db.query(
    `INSERT INTO status_yacimiento(fk_yacimiento,fk_tipo_status) \
    VALUES ((SELECT id_yacimiento from yacimiento\
    where nombre_yacimiento=$1),2)`, 
    [
      yacimiento.nombre
    ],

    function(err, res) {
      if (err.error) return callback(err);
    }
          );
}*/
}
module.exports = Yacimientos;
