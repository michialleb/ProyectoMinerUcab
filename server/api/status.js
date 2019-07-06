var express = require("express");
var Status = require("../models/status");

var router = express.Router();

router.get("/buscar", function(req, res) {
  Status.retrieveAll(function(err, status) {
    if (err) return res.json(err);
    return res.json(status);
  });
});


router.post("/modificarStatus", function(req, res) {
  var compra = req.body.compra;
  Status.updateCompraAliado(compra, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/modificarStatus/cliente", function(req, res) {
  var compra = req.body.compra;
  Status.updateCompraCliente(compra, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/modificar/status/yacimiento", function(req, res) {
  var yacimiento = req.body.yacimiento;
  Status.updateStatusYacimiento(yacimiento, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/modificar/status/proyecto/etapa", function(req, res) {
  var proyecto = req.body.proyecto;
  Status.updateStatusEtapaUno(proyecto, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});
 
router.post("/modificar/status/proyecto/etapa/fase", function(req, res) {
  var fase = req.body.fase;
  Status.updateStatusFaseUno(fase, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});
router.post("/modificar/status/proyecto/etapa/fase/empleados", function(req, res) {
  var fase = req.body.fase;
  Status.updateStatusEmpleados(fase, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});


router.post("/modificar/status/proyecto/etapa/status/modificar/manual", function(req, res) {
  var etapa = req.body.etapa;
  Status.updateStatusEtapa(etapa, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});


module.exports = router;
