var express = require("express");
var Clientes = require("../models/clientes");

var router = express.Router();

/*router.get("/", function(req, res) {
  Clientes.retrieveAll(function(err, clientes) {
    if (err) return res.json(err);
    return res.json(clientes);
  });
});*/

/*router.get("/:cedula", function(req, res) {
  var cedula = req.params.cedula;
  Clientes.retrieveCedula(cedula, function(err, clientes) {
    if (err) return res.json(err);
    return res.json(clientes);
  });
});

router.post("/:update", function(req, res) {
  var cliente = req.body.cliente;
  Clientes.update(cliente, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});*/

router.post("/", function(req, res) {
  var cliente = req.body.cliente;
  Clientes.insertPersona(cliente, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/empresas/", function(req, res) {
  var cliente = req.body.cliente;
  Clientes.insertEmpresa(cliente, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
