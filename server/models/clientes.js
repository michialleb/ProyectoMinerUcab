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
    ("esta en el model ");
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

  static retrieveEmpresa(callback) {
    db.query(
      "select e.id_cliente as id, e.nombre_empresa as nombre, e.rif as rif, e.correo_empresa as correo,e.telefono_empresa as telefono, \
     uno.nombre_lugar as estado,dos.nombre_lugar as municipio ,tres.nombre_lugar as provincia  \
    from empresa e,lugar uno, lugar dos, lugar tres\
    where tres.id_lugar=e.fk_lugar and tres.fk_lugar=dos.id_lugar\
    and dos.fk_lugar=uno.id_lugar",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveEmpresaRif(rif, callback) {
    db.query(
      "select e.nombre_empresa as nombre, e.rif as rif, e.correo_empresa as correo,e.telefono_empresa as telefono, \
     uno.nombre_lugar as estado,dos.nombre_lugar as municipio ,tres.nombre_lugar as provincia  \
    from empresa e,lugar uno, lugar dos, lugar tres\
    where tres.id_lugar=e.fk_lugar and tres.fk_lugar=dos.id_lugar\
    and dos.fk_lugar=uno.id_lugar and e.rif=$1",
      [rif],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrievePersona(callback) {
    db.query(
      "select e.id_cliente as id, e.nombre_persona as nombre,e.apellido_persona as apellido,\
      e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, \
      uno.nombre_lugar as estado,dos.nombre_lugar as municipio\
      ,tres.nombre_lugar as provincia, e.correo_persona as correo,e.telefono_persona as telefono \
      from Persona e,lugar uno, lugar dos, lugar tres\
      where tres.id_lugar=e.fk_lugar and tres.fk_lugar=dos.id_lugar\
      and dos.fk_lugar=uno.id_lugar",
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrievePersonaCedula(cedula, callback) {
    db.query(
      "select e.nombre_persona as nombre,e.apellido_persona as apellido,\
      e.cedula_identidad as cedula ,e.fecha_nacimiento as fnac, e.sexo as sexo, \
      uno.nombre_lugar as estado,dos.nombre_lugar as municipio\
      ,tres.nombre_lugar as provincia, e.correo_persona as correo,e.telefono_persona as telefono \
      from Persona e,lugar uno, lugar dos, lugar tres\
      where tres.id_lugar=e.fk_lugar and tres.fk_lugar=dos.id_lugar\
      and dos.fk_lugar=uno.id_lugar and e.cedula_identidad=$1",
      [cedula],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static retrieveCompraCliente(id_cliente, callback) {
    db.query(
      "select m.nombre_mineral as mineral, p.nombre_presentacion as presentacion,\
       c.cantidad as cantidad, c.monto_total_compra as total,  c.fecha_compra as fecha\
     from mineral m, presentacion p, mineral_presentacion mp, compra_cliente c \
     where (c.fk_persona = $1 or c.fk_empresa =$1) \
     and  c.fk_mineral_presentacion  = mp.id_mineral_presentacion \
     and mp.fk_mineral = m.id_mineral \
     and mp.fk_presentacion = p.id_presentacion",
      [id_cliente],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  
  static retrieveCompraClienteEmpresa(id_cliente, callback) {
    db.query(
      "select m.nombre_mineral as mineral, p.nombre_presentacion as presentacion, \
      c.cantidad as cantidad, c.monto_total_compra as total, c.fecha_compra as fecha\
     from mineral m, presentacion p, mineral_presentacion mp, compra_cliente c \
     where (c.fk_empresa = $1) \
     and  c.fk_mineral_presentacion  = mp.id_mineral_presentacion \
     and mp.fk_mineral = m.id_mineral \
     and mp.fk_presentacion = p.id_presentacion",
      [id_cliente],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Clientes;
