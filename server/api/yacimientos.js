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

router.post("/actualizar/update", function(req, res) {
  var yacim = req.body.yacim;
  console.log("entro en el api yacimiento");
  console.log(yacim);
  Yacimientos.update(yacim, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/", function(req, res) {
  var yacimiento = req.body.yacimiento;
  if (yacimiento.nombre != "") {
    Yacimientos.insert(yacimiento, function(err, result) {
      if (err) return res.json(err);
      return res.json(result);
    });
  }
  /*Yacimientos.insertstatusdefault(yacimiento,function(err,result){
    if (err) return res.json(err);
    return res.json(result);
  })*/
});
router.delete("/:nombre", function(req, res) {
  var nombre = req.params.nombre;
  console.log(nombre + " de diego 1");
  Yacimientos.delete(nombre, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});
module.exports = router;
