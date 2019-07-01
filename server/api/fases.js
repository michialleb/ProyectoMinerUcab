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

module.exports = router;
