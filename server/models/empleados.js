const db = require("../database");
var express = require("express");

class Empleados {
  static retrieveAll(callback) {
    db.query(
      "select e.nombre_empleado as nombre,e.apellido_empleado as apellido,\
    e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, \
    e.fk_lugar as direccion,c.tipo_cargo as cargo \
    from empleado e,cargo c\
    where e.fk_cargo=c.id_cargo",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static update(empleado, callback) {
    db.query(
      "UPDATE empleado set nombre_empleado=$1,apellido_empleado=$2,cedula_empleado=$3,\
      fecha_nacimiento=$4, fk_lugar=$5, sexo=$6, fk_cargo=$7 \
      where cedula_identidad= $3",
      [
        empleado.nombre,
        empleado.apellido,
        empleado.cedula,
        empleado.fnac,
        empleado.direccion,
        empleado.sexo,
        empleado.fk_cargo
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveCedula(cedula, callback) {
    db.query(
      "select e.nombre_empleado as nombre,e.apellido_empleado as apellido,\
      e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, \
      e.fk_lugar as lugar,c.tipo_cargo as cargo, c.salario_empleado as salario \
      from empleado e,cargo c\
      where e.fk_cargo=c.id_cargo and e.cedula_identidad=$1",
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
       fecha_nacimiento,fk_lugar,sexo,fk_cargo) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        empleado.nombre,
        empleado.apellido,
        empleado.cedula,
        empleado.fnac,
        empleado.fk_lugar,
        empleado.sexo,
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
