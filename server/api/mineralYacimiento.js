var express = require("express");
var MineralYacimiento = require("../models/mineralYacimiento");

var router = express.Router();

router.post("/", function(req, res) {
  var yacimiento = req.body.yacimiento;

  MineralYacimiento.insertMineralYacimiento(yacimiento, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
