var express = require("express");
var Inventario = require("../models/inventario");

var router = express.Router();

router.get("/", function(req, res) {
  Inventario.retrieveInventario(function(err, inventario) {
    if (err) return res.json(err);
    return res.json(inventario);
  });
});

module.exports = router;
