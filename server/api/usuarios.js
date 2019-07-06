var express = require("express");
var Usuarios = require("../models/usuarios");

var router = express.Router();

router.get("/", function(req, res) {
  Usuarios.retrieveAll(function(err, usuarios) {
    if (err) return res.json(err);
    return res.json(usuarios);
  });
});

router.get("/allPersonas", function(req, res) {
  Usuarios.retrieveAllPersonas(function(err, usuarios) {
    if (err) return res.json(err);
    return res.json(usuarios);
  });
});

router.get("/:cedula", function(req, res) {
  var cedula = req.paramas.cedula;
  console.log("entro en el api con la cedula: " + cedula);
  Usuarios.retrieveUsuariosPorCedula(cedula, function(err, usuarios) {
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
