var express = require("express");
var Status = require("../models/status");

var router = express.Router();

router.get("/buscar", function(req, res) {
  Status.retrieveAll(function(err, status) {
    if (err) return res.json(err);
    return res.json(status);
  });
});


router.post("/modificarStatus", function(req, res) {
  var compra = req.body.compra;
  Status.updateCompraAliado(compra, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});


module.exports = router;
