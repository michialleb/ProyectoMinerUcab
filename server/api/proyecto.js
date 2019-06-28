var express = require("express");
var Proyecto = require("../models/proyecto");

var router = express.Router();

router.get("/", function(req, res) {
  Proyecto.retrieveAll(function(err, proyectos) {
    if (err) return res.json(err);
    return res.json(proyectos);
  });
});

router.post("/", function(req, res) {
  var proyecto = req.body.proyecto;

  Proyecto.insert(proyecto, function(err, result) {
    if (err) return res.status(404).json('oh nooooo');
    return res.json(result);
  });
  
});

module.exports = router;
