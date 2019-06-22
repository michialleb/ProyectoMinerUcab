const db = require("../database");
var express = require("express");

class Empleados {
  static retrieveAll(callback) {
    db.query(
      "select e.nombre_empleado as nombre,e.apellido_empleado as apellido,\
    e.cedula_identidad as cedula ,e.fnac_empleado as fnac,e.telefono_empleado as telefono,\
    e.direccion_empleado as direccion,c.tipo_cargo as cargo \
    from empleado e,cargo c\
    where e.fk_cargo=c.id_cargo;",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveCedula(cedula, callback) {
    db.query(
      "select e.nombre_empleado as nombre,e.apellido_empleado as apellido,\
      e.cedula_identidad as cedula ,e.fnac_empleado as fnac,e.telefono_empleado as telefono,\
      e.direccion_empleado  as direccion,c.tipo_cargo as cargo \
      from empleado e,cargo c\
      where e.fk_cargo=c.id_cargo  \
      and e.cedula_identidad=$1",
      [cedula],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static insert(empleado, callback) {
    db.query(
      "INSERT INTO empleado (nombre_empleado,apellido_empleado,cedula_identidad,\
        fnac_empleado,telefono_empleado,direccion_empleado,fk_cargo) VALUES ($1,$2,$3,$4,$5,$6,$7)",
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
