const db = require("../database");
var express = require("express");

class Empleados {
  static retrieveAll(callback) {
    db.query("SELECT * FROM empleados", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

<<<<<<< HEAD
  static empleadoXcedula(empleado, callback) {
    // const {empleado_cedula}=empelado.cedula;
    db.query(
      "SELECT * FROM empleados WHERE empleado_cedula = ?",
      [empleado.cedula],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static update(empleado, callback) {
    const newEmpleado = req.body;
    db.query(
      "UPDATE empleados set empleado_nombre=?,empleado_apellido=?,empleado_cedula=?,\
      empleado_fnac=?,empleado_telefono=?,empleado_direccion=? where empleado_cedula = ?)",
      [
        empleado.nombre,
        empleado.apellido,
        empleado.cedula,
        empleado.fnac,
        empleado.telefono,
        empleado.direccion,
        empleado_cedula
      ],
=======
  static retrieveCedula(cedula, callback) {
    db.query(
      "SELECT * FROM empleados WHERE empleado_cedula= $1",
      [cedula],
>>>>>>> michialleb
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
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
