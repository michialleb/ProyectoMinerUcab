var express = require("express");
var Clientes = require("../models/clientes");

var router = express.Router();

router.get("/getEmpresa", function(req, res) {
  Clientes.retrieveEmpresa(function(err, empresas) {
    if (err) return res.json(err);
    return res.json(empresas);
  });
});

router.get("/consultar/compras/:id_cliente", function(req, res) {
  var id_cliente = req.params.id_cliente;
  Clientes.retrieveCompraCliente(id_cliente, function(err, compras) {
    if (err) return res.json(err);
    return res.json(compras);
  });
});

router.get("/consultar/compras/empresa/:id_cliente", function(req, res) {
  var id_cliente = req.params.id_cliente;
  Clientes.retrieveCompraClienteEmpresa(id_cliente, function(err, compras) {
    if (err) return res.json(err);
    return res.json(compras);
  });
});

router.get("/getPersona", function(req, res) {
  Clientes.retrievePersona(function(err, personas) {
    if (err) return res.json(err);
    return res.json(personas);
  });
});

router.get("/:cedula", function(req, res) {
  var cedula = req.params.cedula;
  Clientes.retrievePersonaCedula(cedula, function(err, per) {
    if (err) return res.json(err);
    return res.json(per);
  });
});

router.get("/empresa/:rif", function(req, res) {
  var rif = req.params.rif;
  Clientes.retrieveEmpresaRif(rif, function(err, empre) {
    if (err) return res.json(err);
    return res.json(empre);
  });
});

/*router.get("/:cedula", function(req, res) {
  var cedula = req.params.cedula;
  Clientes.retrieveCedula(cedula, function(err, clientes) {
    if (err) return res.json(err);
    return res.json(clientes);
  });
});

router.post("/:update", function(req, res) {
  var cliente = req.body.cliente;
  Clientes.update(cliente, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});*/

router.post("/", function(req, res) {
  var cliente = req.body.cliente;
  Clientes.insertPersona(cliente, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.post("/empresas", function(req, res) {
  var empresa = req.body.empresa;
  Clientes.insertEmpresa(empresa, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});
router.delete("/persona/:ced",function(req,res) {
  console.log('entro');
  var ced = req.params.ced;
  Clientes.delete(ced, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});
router.delete("/empresa/:rif",function(req,res) {
  console.log('entro');
  var rif = req.params.rif;
  Clientes.deleteE(rif, function(err, result) {
    if (err) return res.json(err);
    return res.json(result);
  });
});
module.exports = router;
