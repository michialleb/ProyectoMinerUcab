var express = require("express");
var Inventario = require("../models/inventario");

var router = express.Router();

router.get("/cliente", function(req, res) {
  Inventario.retrieveInventarioCliente(function(err, inventario) {
    if (err) return res.json(err);
    return res.json(inventario);
  });
});

router.get("/aliado", function(req, res) {
  Inventario.retrieveInventarioAliado(function(err, inventario) {
    if (err) return res.json(err);
    return res.json(inventario);
  });
});

module.exports = router;
