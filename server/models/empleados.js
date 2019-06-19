const db = require("../database");
var express = require("express");

class Empleados {
  static retrieveAll(callback) {
    db.query("select e.empleado_nombre as nombre,e.empleado_apellido as apellido,\
    e.empleado_cedula as cedula ,e.empleado_fnac as fnac,e.empleado_telefono as telefono,\
    e.empleado_direccion as direccion,c.tipo_cargo as cargo \
    from empleados e,cargo c\
    where e.fk_cargo=c.id_cargo;", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveCedula(cedula, callback) {
    db.query(
      "select e.empleado_nombre as nombre,e.empleado_apellido as apellido,\
      e.empleado_cedula as cedula ,e.empleado_fnac as fnac,e.empleado_telefono as telefono,\
      e.empleado_direccion as direccion,c.tipo_cargo as cargo \
      from empleados e,cargo c\
      where e.fk_cargo=c.id_cargo and e.empleado_cedula=$1",
      [cedula],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static insert(empleado, callback) {
    db.query(
      "INSERT INTO empleados (empleado_nombre,empleado_apellido,empleado_cedula,\
        empleado_fnac,empleado_telefono,empleado_direccion,fk_cargo) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        empleado.nombre,
        empleado.apellido,
        empleado.cedula,
        empleado.fnac,
        empleado.telefono,
        empleado.direccion,
        empleado.fk_cargo
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Empleados;
