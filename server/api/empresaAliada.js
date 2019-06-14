var express = require("express");
var EmpresasAliadas = require("../models/empresasAliadas");

var router = express.Router();

router.get("/", function(req, res) {
  EmpresasAliadas.retrieveAll(function(err, empresasAliadas) {
    if (err) return res.json(err);
    return res.json(empresasAliadas);
  });
});

router.get("/:nombre", function(req, res) {
  var nombre = req.params.nombre;
  EmpresasAliadas.retrieveNombre(nombre, function(err, empresasAliadas) {
    if (err) return res.json(err);
    return res.json(empresasAliadas);
  });
});

module.exports = router;
