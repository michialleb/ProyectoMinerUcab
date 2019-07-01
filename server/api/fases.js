var express = require("express");
var Fases = require("../models/fases");

var router = express.Router();


router.post("/", function(req, res) {
  var fase = req.body.fase;

  Fases.insert(fase, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
  
});

router.post("/:id", function(req, res) {
  var id = req.body.id;

  Fases.update(id, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
  
});

router.get("/cargo/fase/:id_fase", function(req, res) {
 
  var id_fase = req.params.id_fase;
  console.log("aqui llego con" +id_fase);

  Fases.retrieveCargoFase(id_fase, function(err, cargos) {
    if (err) return res.json(err);
    return res.json(cargos);
  });
});

router.get("/get/maquinaria/fase/:id_fase", function(req, res) {
  var id_fase = req.params.id_fase;
  Fases.retrieveMaquinariaFase(id_fase, function(err, cargos) {
    if (err) return res.json(err);
    return res.json(cargos);
  });
});


module.exports = router;
