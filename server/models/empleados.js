const db = require("../database");
var express = require("express");

class Empleados {
  static retrieveAll(callback) {
    db.query("SELECT * FROM empleados", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveCedula(cedula,callback) {
    db.query("SELECT * FROM empleados WHERE cedula= ?",[cedula], function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }


  static insert(empleado, callback) {
    db.query(
      "INSERT INTO empleados (empleado_nombre,empleado_apellido,empleado_cedula,\
        empleado_fnac,empleado_telefono,empleado_direccion) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        empleado.nombre,
        empleado.apellido,
        empleado.cedula,
        empleado.fnac,
        empleado.telefono,
        empleado.direccion
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Empleados;