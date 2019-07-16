var express = require("express");
var Horarios = require("../models/horarios");

var router = express.Router();



router.get("/horario", function(req, res) {
  Horarios.retrieveAll(function(err, horarios) {
    if (err) return res.json(err);
    return res.json(horarios);
  });
});

module.exports = router;