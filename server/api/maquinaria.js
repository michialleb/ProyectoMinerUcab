var express = require("express");
var Maquinaria = require("../models/maquinaria");

var router = express.Router();

router.get("/", function(req, res) {
  Maquinaria.retrieveAll(function(err, maquina) {
    if (err) return res.json(err);
    return res.json(maquina);
  });

});

router.post("/maquinariaFase", function(req, res) {
  var maquinariaFase = req.body.maquinariaFase;

  Maquinaria.insertMaquinariaFase(maquinariaFase, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
