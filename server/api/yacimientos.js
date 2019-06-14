var express = require("express");
var Yacimientos = require("../models/yacimientos");

var router = express.Router();

router.get("/", function(req, res) {
  Yacimientos.retrieveAll(function(err, yacimientos) {
    if (err) return res.json(err);
    return res.json(yacimientos);
  });
});

router.get("/:nombre", function(req, res) {
  var nombre = req.params.nombre;
  Yacimientos.retrieveNombre(nombre, function(err, yacimientos) {
    if (err) return res.json(err);
    return res.json(yacimientos);
  });
});

module.exports = router;
