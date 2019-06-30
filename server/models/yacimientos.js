const db = require("../database");
var express = require("express");

class Yacimientos {
  static retrieveNombre(nombre, callback) {
    db.query(
      "select t.nombre_tipo_status as nombre_status,\
      y.nombre_yacimiento as nombre_yacimiento,y.kilometros as kilometros,\
      uno.nombre_lugar as estado,dos.nombre_lugar as municipio, tres.nombre_lugar as provincia \
      from yacimiento y,tipo_status t, lugar uno, lugar dos, lugar tres \
      where y.fk_tipo_status=t.id_tipo_status and y.nombre_yacimiento=$1\
      and tres.id_lugar=y.fk_lugar and tres.fk_lugar=dos.id_lugar\
      and dos.fk_lugar=uno.id_lugar",
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
    uno.nombre_lugar as estado,dos.nombre_lugar as municipio, tres.nombre_lugar as provincia \
    from yacimiento y,tipo_status t, lugar uno, lugar dos, lugar tres \
    where y.fk_tipo_status=t.id_tipo_status and tres.id_lugar=y.fk_lugar and tres.fk_lugar=dos.id_lugar\
    and dos.fk_lugar=uno.id_lugar",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static insert(yacimiento, callback) {
    if (yacimiento.nombre == "") yacimiento.nombre = null;
    else if (yacimiento.kilometros == "") yacimiento.kilometros = null;
    db.query(
      "INSERT INTO yacimiento (nombre_yacimiento,kilometros,fk_tipo_status,fk_lugar) \
      VALUES ($1,$2,7,$3)",
      [yacimiento.nombre, yacimiento.kilometros, yacimiento.direccion],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static update(yacim, callback) {
    db.query(
      "UPDATE yacimiento set nombre_yacimiento=$1, kilometros=$2, fk_tipo_status=$3, fk_lugar=$4\
       where nombre_yacimiento = $1",
      [yacim.nombre, yacim.kilometros, yacim.status, yacim.direccion],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  // SI NO SIRVE EL DELETE YACIMIENTO CAMBIAR FORMA DE PARAMETROS ``
  static delete(nombre, callback) {
    console.log(nombre + " tete");
    db.query(
      "DELETE FROM yacimiento where nombre_yacimiento=$1",
      [nombre],
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
