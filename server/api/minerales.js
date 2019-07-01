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
  var nombreMineral = req.params.nombreMineral;
  console.log("entro en el api con mineral" + nombreMineral);
  Minerales.retrievePresentacion(nombreMineral, function(err, presentaciones) {
    if (err) return res.json(err);
    return res.json(presentaciones);
  });
});

router.get("/present/minerales", function(req, res) {
  console.log("entro en el api con mineral");
  Minerales.retrievePresentaciones(function(err, presentaciones) {
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



router.post("/modificar", function(req, res) {
  var mineral = req.body.mineral;
  Minerales.update(mineral, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/", function(req, res) {
  var minerales = req.body.minerales;

  Minerales.insert(minerales, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.delete("/:nombre",function(req,res) {
  var nombre= req.params.nombre;
  console.log(nombre+ ' hjjhb de diego 1');
  Minerales.delete(nombre, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});
module.exports = router;
