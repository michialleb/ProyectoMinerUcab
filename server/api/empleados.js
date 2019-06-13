var express = require("express");
var Empleados = require("../models/empleados");

var router = express.Router();

router.get("/", function(req, res) {
  Empleados.retrieveAll(function(err, empleados) {
    if (err) return res.json(err);
    return res.json(empleados);
  });
});

router.get("/update/:empleado_cedula", function(req, res) {
  Empleados.empleadoXcedula(function(err, empleados) {
    if (err) return res.json(err);
    return res.json(empleados);
  });
});

router.post("/update/:empleado_cedula", function(req, res) {
  var empleado = req.body.empleado;
  Empleados.update(empleado, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/add", function(req, res) {
  var empleado = req.body.empleado;

  Empleados.insert(empleado, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
