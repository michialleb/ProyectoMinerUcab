var express = require("express");
var Empleados = require("../models/empleados");

var router = express.Router();

router.get("/", function(req, res) {
  Empleados.retrieveAll(function(err, empleados) {
    if (err) return res.json(err);
    return res.json(empleados);
  });
});
router.get("/:cedula", function(req, res) {
  var cedula = req.params.cedula;
  Empleados.retrieveCedula(cedula, function(err, empleados) {
    if (err) return res.json(err);
    return res.json(empleados);
  });
});

router.post("/", function(req, res) {
  var empleado = req.body.empleado;

  Empleados.insert(empleado, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
  
});

module.exports = router;
