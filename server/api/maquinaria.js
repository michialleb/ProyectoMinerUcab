var express = require("express");
var Maquinaria = require("../models/maquinaria");

var router = express.Router();

router.get("/", function(req, res) {
  Maquinaria.retrieveAll(function(err, maquina) {
    if (err) return res.json(err);
    return res.json(maquina);
  });

});

module.exports = router;
