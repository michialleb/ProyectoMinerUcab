var express = require("express");
var Maquinaria = require("../models/maquinaria");

var router = express.Router();

router.get("/", function(req, res) {
  Maquinaria.retrieveAll(function(err, maquina) {
    if (err) return res.json(err);
    return res.json(maquina);
  });

});


router.get("/maquinariaCantidad/:id_fase", function(req, res) {
  var id_fase = req.params.id_fase;
  Maquinaria.getMaquinariaFaseCantidad(id_fase,function(err, maquina) {
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

router.post("/maquinaria/activa", function(req, res) {
  var maqui = req.body.maqui

  Maquinaria.insertMaquinariaActiva(maqui, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.get("/maquinaria/activa/fase/:id_fase/:id_maquinaria", function(req, res) {
  console.log("entro en lo de maq")
  var maq = {
    id_fase: req.params.id_fase,
    id_maquinaria: req.params.id_maquinaria
  }

  Maquinaria.getMaquinariaActivaFase(maq,function(err, maquina) {
    if (err) return res.json(err);
    return res.json(maquina);
  });
});

router.post("/update/maquinaria/activa", function(req, res) {
  var maqui = req.body.maqui

  Maquinaria.updateStatusMaquinariaActiva(maqui, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/update/maquinaria/maquinaria/activa/manual", function(req, res) {
  console.log("cambiando status maqui holisss")
  var maqui = req.body.maqui

  Maquinaria.updateStatusMaquinariaActivaManual(maqui, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});



module.exports = router;
