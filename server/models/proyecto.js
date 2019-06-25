const db = require("../database");
var express = require("express");

class Proyectos {



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
}
module.exports = Proyectos;
