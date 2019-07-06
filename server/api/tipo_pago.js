var express = require("express");
var Tipo_pago= require("../models/tipo_pago");

var router = express.Router();

router.get("/buscar", function(req, res) {
  Tipo_pago.retrieveAll(function(err, tipo_pago) {
    if (err) return res.json(err);
    return res.json(tipo_pago);
  });
});




module.exports = router;
