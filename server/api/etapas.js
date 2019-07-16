var express = require("express");
var Etapas = require("../models/etapas");

var router = express.Router();


router.post("/", function(req, res) {
  var etapa = req.body.etapa;

  Etapas.insert(etapa, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });

  
  
});

router.get("/status/:idEtapa", function(req, res) {

  var idEtapa = req.params.idEtapa;
  Etapas.retrieveStatusEtapa(idEtapa, function(err, etapas) {
    if (err) return res.json(err);
    return res.json(etapas);
  });
});


module.exports = router;
