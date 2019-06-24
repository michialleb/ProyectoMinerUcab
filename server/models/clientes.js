const db = require("../database");
var express = require("express");

class Clientes {
  static insertPersona(persona, callback) {
    db.query(
      "INSERT INTO persona (nombre_persona,apellido_persona,cedula_identidad,\
       fecha_nacimiento,fk_lugar,sexo,correo_persona,telefono_persona)\
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        persona.nombre,
        persona.apellido,
        persona.cedula,
        persona.fnac,
        persona.direccion,
        persona.sexo,
        persona.correo,
        persona.telefono
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static insertEmpresa(empresa, callback) {
    db.query(
      "INSERT INTO empresa (nombre_empresa,rif,\
        fk_lugar,correo_empresa,telefono_empresa)\
        VALUES ($1,$2,$3,$4,$5)",
      [
        empresa.nombre,
        empresa.rif,
        empresa.direccion,
        empresa.correo,
        empresa.telefono
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Clientes;
