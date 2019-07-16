const db = require("../database");
var express = require("express");

class Empleados {
  static retrieveAll(callback) {
    db.query(
      "select e.id_empleado as id, e.nombre_empleado as nombre,e.apellido_empleado as apellido,\
      e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, e.telefono_empleado as telefono \
      ,c.tipo_cargo as cargo,uno.nombre_lugar as estado,dos.nombre_lugar as municipio\
      ,tres.nombre_lugar as provincia, (select s.nombre_tipo_status from tipo_status s, empleado em \
                      where em.id_empleado=e.id_empleado\
                      and em.fk_tipo_status= s.id_tipo_status) as status\
      from empleado e,cargo c,lugar uno, lugar dos, lugar tres\
      where e.fk_cargo=c.id_cargo and tres.id_lugar=e.fk_lugar and tres.fk_lugar=dos.id_lugar \
      and dos.fk_lugar=uno.id_lugar",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  //fecha_nacimiento=$4, fk_lugar=$5, sexo=$6, fk_cargo=$7
  static update(empleado, callback) {
    if (empleado.nombre == "") {
      empleado.nombre = null;
    }

    if (empleado.apellido == "") {
      empleado.apellido = null;
    }

    if (empleado.fnac == "") {
      empleado.fnac = null;
    }

    if (empleado.telefono == "") {
      empleado.telefono = null;
    }

    if (empleado.correo == "") {
      empleado.correo = null;
    }

    if (empleado.cedula == "") {
      empleado.cedula = null;
    }

    db.query(
      "UPDATE empleado set nombre_empleado=$1,apellido_empleado=$2,fecha_nacimiento=$3,fk_lugar=$4,\
       sexo=$5, fk_cargo=$6, telefono_empleado = $7, correo_empleado=$8, cedula_identidad= $9, fk_tipo_status=$11\
       where cedula_identidad= $10",
      [
        empleado.nombre,
        empleado.apellido,
        empleado.fnac,
        empleado.fk_lugar,
        empleado.sexo,
        empleado.fk_cargo,
        empleado.telefono,
        empleado.correo,
        empleado.cedula,
        empleado.cedulaBuscada,
        7
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static updateStatusEmpleado(empleado, callback) {
    db.query(
      "UPDATE empleado set fk_tipo_status=(select id_tipo_status \
                                                    from tipo_status \
                                                    where nombre_tipo_status=$1) \
       where id_empleado=$2",
      [
        empleado.id_status,
        empleado.id_empleado
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveHorarioSalario(id, callback) {
    db.query(
      "select h.dia_de_semana as dia, h.hora_inicio as inicio, h.hora_salida as salida, info.costo as salario \
      from Horario h, horario_empleado he, (select efc.id_empleado_cargo_fase as id_, fc.costo as costo\
                                     from empleado_fase_cargo efc, cargo_fase fc\
                                     where efc.fk_empleado =$1 \
                  and efc.fk_cargo_fase=fc.id_cargo_fase) as info\
       where he.fk_empl_horario_fase in (info.id_)\
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
      e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, e.correo_empleado as correo, \
      c.tipo_cargo as cargo, c.salario_empleado as salario, e.telefono_empleado as telefono, \
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

  static retrieveEmpleadoFaseActual(id_empleado, callback) {
    db.query(
      "select f.nombre_fase  as nombre_fase\
      from fase f, empleado_fase_cargo efc, cargo_fase fc\
      where efc.fk_empleado=$1\
      and fc.id_cargo_fase = efc.fk_cargo_fase\
      and fc.fk_fase= f.id_fase\
      and f.fk_tipo_status=$2",
      [id_empleado, 2],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }


  static insert(empleado, callback) {
    if (empleado.nombre == "") empleado.nombre = null;
    else if (empleado.apellido == "") empleado.apellido = null;
    else if (empleado.cedula == "") empleado.cedula = null;
    else if (empleado.fnac == "") empleado.fnac = null;
    db.query(
      "INSERT INTO empleado (nombre_empleado,apellido_empleado,cedula_identidad,\
       fecha_nacimiento,fk_lugar,sexo,fk_cargo,telefono_empleado,correo_empleado, fk_tipo_status)\
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        empleado.nombre,
        empleado.apellido,
        empleado.cedula,
        empleado.fnac,
        empleado.fk_lugar,
        empleado.sexo,
        empleado.fk_cargo,
        empleado.telefono,
        empleado.correo,
        7
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static delete(ced, callback) {
    db.query(
      `DELETE FROM empleado where =${ced}`,

      console.log(ced + " de diego"),
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Empleados;
