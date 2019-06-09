var express = require("express");
var Usuarios = require("../models/usuarios");

var router = express.Router();

router.get("/", function(req, res) {
  Usuarios.retrieveAll(function(err, usuarios) {
    if (err) return res.json(err);
    return res.json(usuarios);
  });
});

router.post("/", function(req, res) {
  var usuario = req.body.usuario;

  Usuarios.insert(usuario, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
