var express = require("express");
var Fases = require("../models/fases");

var router = express.Router();


router.post("/", function(req, res) {
  var fase = req.body.fase;

  Fases.insert(fase, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
  
});

router.post("/:id", function(req, res) {
  var id = req.body.id;

  Fases.update(id, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
  
});
router.post("/empleado/fase", function(req, res) {
  var empleado_fase = req.body.empleado_fase;
  Fases.insertEmpleadoFase(empleado_fase, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
  
});

router.post("/empleado/fase/horario", function(req, res) {
  var horario_emp = req.body.horario_emp;
  Fases.insertEmpleadoHorario(horario_emp, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
  
});


router.get("/get/proyecto/fase/empleados/cargos/:id_fase", function(req, res) {
  var id_fase = req.params.id_fase;
  Fases.retrieveFaseCargo(id_fase, function(err, fases) {
    if (err) return res.json(err);
    return res.json(fases);
  });
});

router.get("/proyecto/:id_proyecto", function(req, res) {
  var id_proyecto = req.params.id_proyecto;
  Fases.retrieveFaseProyecto(id_proyecto, function(err, fases) {
    if (err) return res.json(err);
    return res.json(fases);
  });
});


router.get("/cargo/fase/:id_fase", function(req, res) {
 
  var id_fase = req.params.id_fase;

  Fases.retrieveCargoFase(id_fase, function(err, cargos) {
    if (err) return res.json(err);
    return res.json(cargos);
  });
});

router.get("/get/maquinaria/fase/:id_fase", function(req, res) {
  var id_fase = req.params.id_fase;
  Fases.retrieveMaquinariaFase(id_fase, function(err, cargos) {
    if (err) return res.json(err);
    return res.json(cargos);
  });
});

router.get("/get/proyecto/empleados/cargos/:id_fase", function(req, res) {
  var id_fase = req.params.id_fase;
  Fases.retrieveFaseEmpleado(id_fase, function(err, cargos) {
    if (err) return res.json(err);
    return res.json(cargos);
  });
});

router.post("/modificar/status/proyecto/etapa/status/modificar/buscar", function(req, res) {
  var fase = req.body.fase;
  Fases.updateStatusFase(fase, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
