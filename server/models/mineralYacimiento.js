const db = require("../database");
var express = require("express");

class MineralYacimiento {
  static insertMineralYacimiento(yacimiento, callback) {
    
      console.log("esta ingresando el mineral");
     
      db.query(
        "INSERT INTO mineral_yacimiento (fk_yacimiento, fk_mineral,cantidad) \
        VALUES ((SELECT id_yacimiento FROM yacimiento WHERE nombre_yacimiento=$1), \
        (SELECT id_mineral FROM mineral WHERE nombre_mineral=$2), $3)",
        [yacimiento.nombre, yacimiento.min, yacimiento.cant],

        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }
      );
    
  }
}
module.exports = MineralYacimiento;
