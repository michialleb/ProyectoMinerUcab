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
  static AgregarProyectoCompraCliente(proyecto, callback) {
    db.query(
      "insert into compra_cliente_proyecto (fk_compra_cliente, fk_proyecto) \
      values ($1, (select p.id_proyecto \
        from proyecto p, mineral_yacimiento my, yacimiento y\
        where p.fk_yacimiento = y.id_yacimiento\
        and my.fk_yacimiento =y.id_yacimiento\
        and my.cantidad>=$2\
        and my.fk_mineral= $3\
        and y.fk_tipo_status=7 limit 1)) returning fk_proyecto",
      [proyecto.compra_cliente,
      proyecto.cantidad,
      proyecto.id_mineral
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    )
  }
// recuerda rela parcial parcial compra cliente y proyecto
  static CompraClientePersona(compra, callback) {
    console.log("añadiendo compra al cliente");
    var f= new Date;
    var Fecha=f.getMonth()+'-'+f.getDate()+'-'+f.getFullYear();
    db.query(
      "insert into compra_cliente (cantidad, fecha_compra,\
      monto_total_compra, fk_persona, fk_tipo_status,fk_mineral_presentacion) \
      values ($1, $2, $3, (select id_cliente\
                           from persona \
                           where cedula_identidad = $4), $5, $6) returning id_compra_cliente;",
      [compra.cantidad,
      Fecha,
      compra.monto,
      compra.cliente,
      compra.status,
      compra.id_mineral_presentacion
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    )
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
    console.log(rif);
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
      "select e.id_cliente as id, e.nombre_persona as nombre,e.apellido_persona as apellido,\
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
  static delete(ced, callback) {
    db.query(
      `DELETE FROM persona where id_cliente=${ced}`,

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static deleteE(rif, callback) {
    db.query(
      `DELETE FROM empresa where rif=${rif}`,

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

  static updatePersona(persona, callback) {
    if (persona.nombre == "") {
      persona.nombre = null;
    }

    if (persona.apellido == "") {
      persona.apellido = null;
    }

    if (persona.fnac == "") {
      persona.fnac = null;
    }

    if (persona.telefono == "") {
      persona.telefono = null;
    }

    if (persona.correo == "") {
      persona.correo = null;
    }

    if (persona.cedula == "") {
      persona.cedula = null;
    }
    db.query(
      "UPDATE persona set nombre_persona=$1,apellido_persona=$2,fecha_nacimiento=$3,\
      fk_lugar= (select id_lugar from lugar where nombre_lugar = $4),\
       sexo=$5, telefono_persona = $6, correo_persona=$7, cedula_identidad=$8\
       where cedula_identidad= $9",
      [
        persona.nombre,
        persona.apellido,
        persona.fnac,
        persona.direccion,
        persona.sexo,
        persona.telefono,
        persona.correo,
        persona.cedula,
        persona.cedulaBuscada
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static updateEmpresa(empresa, callback) {
    db.query(
      "UPDATE empresa set nombre_empresa=$1,rif=$2,\
      fk_lugar= (select id_lugar from lugar where nombre_lugar = $3),\
       telefono_empresa = $4, correo_empresa=$5\
       where rif= $6",
      [
        empresa.nombre,
        empresa.rif,
        empresa.direccion,
        empresa.telefono,
        empresa.correo,
        empresa.rifBuscado
      ],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static retrieveMineralPresentacion(id_mineral_presentacion, callback) {
    db.query(
      "select mp.costo as costo , m.nombre_mineral as mineral, p.nombre_presentacion as presentacion\
      from mineral_presentacion mp, mineral m, presentacion p \
      where mp.id_mineral_presentacion=$1 \
      and mp.fk_mineral = m.id_mineral \
      and mp.fk_presentacion = p.id_presentacion", 
      [id_mineral_presentacion],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}

module.exports = Clientes;
