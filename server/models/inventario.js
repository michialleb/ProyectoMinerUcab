const db = require("../database");
var express = require("express");

class Inventario {

  static retrieveInventario(callback) {
    db.query(
      "SELECT todo.nom AS mineral,todo.pre AS presentacion, sum(todo.sum) AS cantidad \
       FROM ((SELECT  M.nombre_mineral  AS nom, P.nombre_presentacion  AS pre, SUM(dca.Cantidad) \
            FROM Mineral M  \
            INNER JOIN Mineral_Presentacion MP \
            ON   M.id_mineral  = MP.fk_mineral \
            INNER JOIN Presentacion P  \
            ON P.ID_PRESENTACION =  MP.FK_PRESENTACION  \
            INNER JOIN Compra_aliado DCA  \
            ON MP.id_mineral_presentacion = DCa.fk_mineral_presentacion \
            GROUP BY  M.nombre_mineral, P.nombre_presentacion)   \
            UNION ALL  \
            (SELECT M.nombre_mineral  AS nom, P.nombre_presentacion AS pre, (-1)*SUM(dcc.Cantidad) \
            FROM Mineral M  \
            INNER JOIN Mineral_Presentacion MP \
            ON  M.id_mineral = MP.fk_mineral  \
            INNER JOIN Presentacion P\
            ON P.ID_PRESENTACION =  MP.FK_PRESENTACION  \
            INNER JOIN Compra_cliente DCC \
            ON MP.id_mineral_presentacion  = DCC.fk_mineral_presentacion \
            GROUP BY  M.nombre_mineral,  P.nombre_presentacion) )  AS todo \
            GROUP BY todo.nom,todo.pre ",
           function(err, res) {
               if (err.error) return callback(err);
            callback(res);
           }
    );
  }
}
module.exports = Inventario;
