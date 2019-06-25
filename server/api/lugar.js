var express = require("express");
var Lugar = require("../models/lugar");

var router = express.Router();

router.get("/", function(req, res) {
  Lugar.retrieveAll(function(err, lugar) {
    if (err) return res.json(err);
    return res.json(lugar);
  });
});

router.get("/:codigo", function(req, res) {
  var codigo = req.params.codigo;
  Lugar.retrieveMunicipioProvincia(codigo, function(err, lugar) {
    if (err) return res.json(err);
    return res.json(lugar);
  });
});

/*router.post("/", function(req, res) {
  var lugar = req.body.lugar;

  Lugar.insert(lugar, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});*/

module.exports = router;
