var express = require("express");
var Minerales = require("../models/minerales");

var router = express.Router();

router.get("/", function(req, res) {
  Minerales.retrieveAll(function(err, minerales) {
    if (err) return res.json(err);
    return res.json(minerales);
  });
});

router.get("/:nombre", function(req, res) {
  var nombre = req.params.nombre;
  Minerales.retrieveNombre(nombre, function(err, yacimientos) {
    if (err) return res.json(err);
    return res.json(yacimientos);
  });
});

router.get("/presentacion/:nombreMineral", function(req, res) {
  console.log("entro en el api con mineral");
  var nombreMineral = req.params.nombreMineral;
  Minerales.retrievePresentacion(nombreMineral, function(err, presentaciones) {
    if (err) return res.json(err);
    return res.json(presentaciones);
  });
});

router.get("/mineralCompuesto/:id_mineral", function(req, res) {
  var id_mineral = req.params.id_mineral;
  Minerales.retrieveMineralCompuesto(id_mineral, function(err, minerales) {
    if (err) return res.json(err);
    return res.json(minerales);
  });
});

router.post("/", function(req, res) {
  var minerales = req.body.minerales;

  Minerales.insert(minerales, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
