const db = require("../database");
var express = require("express");

class Empleados {
  static retrieveAll(callback) {
    db.query(
      "select e.id_empleado as id, e.nombre_empleado as nombre,e.apellido_empleado as apellido,\
    e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, \
    c.tipo_cargo as cargo,uno.nombre_lugar as estado,dos.nombre_lugar as municipio\
    ,tres.nombre_lugar as provincia\
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
    console.log(empleado.nombre);
    console.log(empleado.apellido);
    console.log(empleado.fnac);
    console.log(empleado.fk_lugar);
    console.log(empleado.sexo);
    console.log(empleado.fk_cargo);
    console.log(empleado.cedula);
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

  static retrieveHorarioSalario(id, callback) {
    db.query(
      "select h.dia_de_semana as dia, h.hora_inicio as inicio, h.hora_salida as salida\
       from Horario h, horario_empleado he\
        where he.fk_empl_horario_fase= (select efc.id_empleado_cargo_fase\
                                      from empleado_fase_cargo efc\
                                      where efc.fk_empleado =$1)\
      and he.fk_horario=h.id_horario",
      [id],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveCedula(cedula, callback) {
    db.query(
      "select e.id_empleado as id, e.nombre_empleado as nombre,e.apellido_empleado as apellido,\
      e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, \
      c.tipo_cargo as cargo, c.salario_empleado as salario, \
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
       fecha_nacimiento,fk_lugar,sexo,fk_cargo)\
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        empleado.nombre,
        empleado.apellido,
        empleado.cedula,
        empleado.fnac,
        empleado.fk_lugar,
        empleado.sexo,
        empleado.fk_cargo,
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

   static delete(ced, callback) {
    db.query(
      `DELETE FROM empleado where id_empleado=${ced}`,
      
      console.log(ced + ' de diego'),
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  
}
module.exports = Empleados;
