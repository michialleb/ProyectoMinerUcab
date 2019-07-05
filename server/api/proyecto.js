var express = require("express");
var Proyecto = require("../models/proyecto");

var router = express.Router();

router.get("/", function(req, res) {
  Proyecto.retrieveAll(function(err, proyectos) {
    if (err) return res.json(err);
    return res.json(proyectos);
  });
});
router.get("/etapa/fase/:id_proyecto", function(req, res) {
  var id_proyecto=req.params.id_proyecto;
  Proyecto.retrieveEtapaFase(id_proyecto,function(err, proyectos) {
    if (err) return res.json(err);
    return res.json(proyectos);
  });
});

router.get("/buscar/proyecto/mineral/:obj", function(req, res) {
 
  var obj=req.params.obj;
  console.log("en api" + obj)
  Proyecto.buscarProyecto(obj,function(err, proyecto) {
    if (err) return res.json(err);
    return res.json(proyecto);
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
