var express = require("express");
var Roles = require("../models/roles");

var router = express.Router();

router.get("/", function(req, res) {
  Roles.retrieveAll(function(err, rol) {
    if (err) return res.json(err);
    return res.json(rol);
  });
});

router.get("/permisos/:id_rol", function(req, res) {
  var id_rol = req.params.id_rol;
  console.log("esta en el api y el id del rol es:" + id_rol);
  Roles.retrievePermisos(id_rol, function(err, rol) {
    if (err) return res.json(err);
    return res.json(rol);
  });
});

router.get("/permisos/noAsignado/:id_Rol", function(req, res) {
  var id_Rol = req.params.id_Rol;
  console.log("esta en el api y el id del rol es:" + id_Rol);
  Roles.retrievePermisosNoAsignados(id_Rol, function(err, rol) {
    if (err) return res.json(err);
    return res.json(rol);
  });
});

router.get("/allPermisos", function(req, res) {
  Roles.retrieveAllPermisos(function(err, rol) {
    if (err) return res.json(err);
    return res.json(rol);
  });
});

router.post("/", function(req, res) {
  var rol = req.body.rol;
  Roles.insert(rol, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/permisoRol", function(req, res) {
  var rol = req.body.rol;
  Roles.insertPermisoRol(rol, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/modificar", function(req, res) {
  var rol = req.body.rol;
  Roles.update(rol, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.delete("/eliminarPermisos", function(req, res) {
  var permiso = req.body.permiso;
  Roles.deletePermiso(permiso, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.delete("/eliminarRol/:idRol", function(req, res) {
  var idRol = req.params.idRol;
  console.log("entro api eliminar con " + idRol);

  Roles.deleteRol(idRol, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});
module.exports = router;
