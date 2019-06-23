const db = require("../database");
var express = require("express");

class Empleados {
  static retrieveAll(callback) {
    db.query(
      "select e.nombre_empleado as nombre,e.apellido_empleado as apellido,\
    e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, \
    c.tipo_cargo as cargo,uno.nombre_lugar as estado,dos.nombre_lugar as municipio\
    ,tres.nombre_lugar as provincia \
    from empleado e,cargo c,lugar uno, lugar dos, lugar tres\
    where e.fk_cargo=c.id_cargo and tres.id_lugar=e.fk_lugar and tres.fk_lugar=dos.id_lugar\
    and dos.fk_lugar=uno.id_lugar",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  //fecha_nacimiento=$4, fk_lugar=$5, sexo=$6, fk_cargo=$7
  static update(empleado, callback) {
    db.query(
      "UPDATE empleado set nombre_empleado=$1,apellido_empleado=$2,fecha_nacimiento=$3,fk_lugar=$4,\
       sexo=$5, fk_cargo=$6\
       where cedula_identidad= $7",
      [
        empleado.nombre,
        empleado.apellido,
        empleado.fnac,
        empleado.fk_lugar,
        empleado.sexo,
        empleado.fk_cargo,
        empleado.cedula
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveCedula(cedula,callback) {
    db.query("SELECT * FROM empleados_cedula WHERE cedula= ?",[cedula], function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static retrieveCedula(cedula, callback) {
    db.query(
      "select e.id_empleado as id, e.nombre_empleado as nombre,e.apellido_empleado as apellido,\
      e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, \
      c.tipo_cargo as cargo, c.salario_empleado as salario,  \
      uno.nombre_lugar as estado,dos.nombre_lugar as municipio,tres.nombre_lugar as provincia\
      from empleado e,cargo c,lugar uno, lugar dos, lugar tres\
      where e.fk_cargo=c.id_cargo and e.cedula_identidad=$1 and tres.id_lugar=e.fk_lugar and tres.fk_lugar=dos.id_lugar\
      and dos.fk_lugar=uno.id_lugar",
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
