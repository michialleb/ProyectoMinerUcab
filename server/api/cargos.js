var express = require("express");
var Cargos = require("../models/cargos");

var router = express.Router();

router.get("/", function(req, res) {
  Cargos.retrieveAll(function(err, cargos) {
    if (err) return res.json(err);
    return res.json(cargos);
  });
});

router.post("/", function(req, res) {
  var cargo = req.body.cargo;

  Cargos.insert(cargo, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
