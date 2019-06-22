const db = require("../database");
var express = require("express");

class mineralYacimiento {
  static insertMineralYacimiento(yacimiento, callback) {
    let mineralYacimiento = yacimiento;
    yacimiento.mineralList.map((mineral, i) => {
      db.query(
        "INSERT INTO mineral_yacimiento (fk_yacimiento, fk_mineral,cantidad) \
        VALUES ((SELECT id_yacimiento FROM yacimiento WHERE nombre_yacimiento=$1), \
        (SELECT id_mineral FROM mineral WHERE nombre_mineral=$2), $3)",
        [mineralYacimiento.nombre, mineral, mineralYacimiento.cantidadList[i]],

        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }
      );
    });
  }
}
module.exports = mineralYacimiento;
