const db = require("../database");
var express = require("express");

class Fases {

  static retrieveCargoFase(idFase,callback) {
    db.query(
      "select c.tipo_cargo  as cargo, cf.id_cargo_fase as id, cf.cantidad as cantidad\
      from cargo c, cargo_fase cf, fase f \
      where f.id_fase=$1\
      and f.id_fase=cf.fk_fase\
      and cf.fk_cargo =c.id_cargo",[idFase],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static retrieveMaquinariaFase(idFase,callback) {
    db.query(
      " select m.nombre_maquinaria as maquinaria, mf.cantidad as cantidad, m.id_maquinaria id\
      from maquinaria m, fase f, maquinaria_fase mf\
      where f.id_fase=$1\
      and   mf.fk_fase=f.id_fase\
      and mf.fk_maquinaria=m.id_maquinaria",[idFase],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  
  static retrieveFaseProyecto(id_proyecto, callback) {
    db.query(
      " select f.id_fase id, f.nombre_fase nombre \
      from fase f, proyecto p, etapa_explotacion e \
      where f.fk_etapa_explotacion=e.id_etapa\
      and e.fk_proyecto=p.id_proyecto\
      and	p.id_proyecto=$1",
      [id_proyecto],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

   static retrieveFaseEmpleado(id_fase, callback) {
    db.query(
      "select e.id_empleado as id, e.nombre_empleado as nombre, e.apellido_empleado as apellido,\
      e.cedula_identidad as cedula, (select c.tipo_cargo from cargo c where c.id_cargo=e.fk_cargo) as cargo,\
      (select c.id_cargo from cargo c where c.id_cargo=e.fk_cargo) as id_cargo \
      from empleado e\
      where fk_cargo in (select fk_cargo from cargo_fase where fk_fase=$1)\
      and fk_tipo_status=7\
      order by fk_cargo;",
      [id_fase],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
 
  static retrieveFaseCargo(id_fase, callback) {
    db.query(
      "select c.id_cargo as cargo, cf.cantidad as cantidad\
      from cargo c, cargo_fase cf\
      where cf.fk_fase=$1\
      and cf.fk_cargo=c.id_cargo",
      [id_fase],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static updateStatusFase(fase, callback) {
    var f= new Date;
    var Fecha=f.getMonth()+'-'+f.getDate()+'-'+f.getFullYear();
    if (fase.id_status=="En ejecucion"){
      db.query(
        "UPDATE fase set fk_tipo_status=(select id_tipo_status \
                                                      from tipo_status \
                                                      where nombre_tipo_status=$1),\
                                                      fecha_inicio_fase=$3 \
         where id_fase=$2",
        [
          fase.id_status,
         fase.id_fase,
         Fecha
        ],
        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }
      );
    }else if(fase.id_status=="Finalizado"){
      db.query(
        "UPDATE fase set fk_tipo_status=(select id_tipo_status \
                                                      from tipo_status \
                                                      where nombre_tipo_status=$1),\
                                                      fecha_final_fase=$3\
         where id_fase=$2",
        [
          fase.id_status,
          fase.id_fase,
          Fecha
        ],
        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }
      );
    }else {
      db.query(
        "UPDATE fase set fk_tipo_status=(select id_tipo_status \
                                        from tipo_status \
                                         where nombre_tipo_status=$1)\
         where id_fase=$2",
        [
          fase.id_status,
         fase.id_fase
        ],
        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }
      );
    }
    
  }
  static insert(fase, callback) {
    db.query(
      "insert into Fase (numero_fase, nombre_fase,duracion_fase,costo_fase,\
        fk_etapa_explotacion,fk_tipo_status, fecha_estimada_fase) \
        values ($1, $2, $3,$4, (select id_etapa \
                                from etapa_explotacion\
                                where fk_proyecto= (select id_proyecto\
                                from proyecto \
                                where nombre_proyecto=$5)\
                                and numero_etapa= $6), 4, $7) returning id_fase;",
      [
        fase.numeroFase,
        fase.nombreFase,
        fase.duracion,
        fase.costo,
        fase.nombreProyecto,
        fase.numeroEtapa,
        fase.fecha_estimada_fase
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  static insertEmpleadoFase(emp_fase, callback) {
    db.query(
      "insert into empleado_fase_cargo (fk_empleado, fk_cargo_fase)\
      values ($1,(select id_cargo_fase\
             from cargo_fase\
             where fk_cargo=$2\
             and fk_fase=$3)) returning id_empleado_cargo_fase;",
      [
        emp_fase.id_empleado,
        emp_fase.id_cargo,
        emp_fase.id_fase
       
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }

  static insertEmpleadoHorario(horario_emp, callback) {
    db.query(
      "insert into horario_empleado (fk_horario, fk_empl_horario_fase)\
      values ($1,$2);",
      [
        horario_emp.id_horario,
        horario_emp.id_empleado
      ],

      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
  
  
  static update(id_fase,callback){
    db.query(
        "update fase set costo_fase=(select ( f.costo_fase + SUM(fc.costo))\
        from cargo_fase fc, fase f \
        where f.id_fase=$1 and fc.fk_fase=f.id_fase \
        group by f.costo_fase) where id_fase=$2;",
        [id_fase,
        id_fase
        ],
        function(err, res) {
          if (err.error) return callback(err);
          callback(res);
        }

    );
  }
}
module.exports = Fases;
