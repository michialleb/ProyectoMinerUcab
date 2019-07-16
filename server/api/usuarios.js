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

router.get("/all/usuarios/users/passwords", function(req, res) {
  Usuarios.retrieveDatosUsuariosView(function(err, usuarios) {
    if (err) return res.json(err);
    return res.json(usuarios);
  });
});


router.get("/usuario/:cedula", function(req, res) {
  var cedula = req.params.cedula;
  console.log("entro en el api con la cedula: " + cedula);
  Usuarios.retrieveUsuariosPorCedula(cedula, function(err, usuarios) {
    if (err) return res.json(err);
    return res.json(usuarios);
  });
});

router.get("/log/in/:nombre_usuario", function(req, res) {
  var nombre_usuario = req.params.nombre_usuario;

  Usuarios.ingresarUsuario(nombre_usuario, function(err, usuarios) {
    if (err) return res.json(err);
    return res.json(usuarios);
  });
});

router.post("/insertar", function(req, res) {
  var user = req.body.user;
  Usuarios.insert(user, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.get("/log/in/permisos/:id_usuario", function(req, res) {
  var id_usuario = req.params.id_usuario;

  Usuarios.retrievePermisosUsuario(id_usuario,  function(err, usuarios) {
    if (err) return res.json(err);
    return res.json(usuarios);
  });
});

router.post("/modificar/upd", function(req, res) {
  var user = req.body.user;
  Usuarios.update(user, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.delete("/eliminar/:id", function(req, res) {
  var id = req.params.id;
  console.log("entro en el api con nombre: " + id);
  Usuarios.delete(id, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
