const db = require("../database");
var express = require("express");

class Clientes {
  static insert(persona, callback) {
    db.query(
      "INSERT INTO persona (nombre_persona,apellido_persona,cedula_identidad,\
       fecha_nacimiento,fk_lugar,sexo,fk_cargo,correo_persona,telefono_persona\
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        persona.nombre,
        persona.apellido,
        persona.cedula,
        persona.fnac,
        persona.fk_lugar,
        persona.sexo,
        persona.fk_cargo,
        persona.correo,
        persona.telefono
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
