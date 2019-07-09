// route server file
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

var db = require("./database");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/inventario", require("./api/inventario"));
app.use("/api/usuarios", require("./api/usuarios"));
app.use("/api/empleados", require("./api/empleados"));
app.use("/api/clientes", require("./api/clientes"));
app.use("/api/cargos", require("./api/cargos"));
app.use("/api/status", require("./api/status"));
app.use("/api/lugar", require("./api/lugar"));
app.use("/api/minerales", require("./api/minerales"));
app.use("/api/yacimientos", require("./api/yacimientos"));
app.use("/api/empresaAliada", require("./api/empresaAliada"));
app.use("/api/mineralYacimiento", require("./api/mineralYacimiento"));
app.use("/api/inventario", require("./api/inventario"));
app.use("/api/maquinaria", require("./api/maquinaria"));
app.use("/api/proyecto", require("./api/proyecto"));
app.use("/api/etapas", require("./api/etapas"));
app.use("/api/fases", require("./api/fases"));
app.use("/api/horarios", require("./api/horarios"));
app.use("/api/tipo_pago", require("./api/tipo_pago"));
app.use("/api/roles", require("./api/roles"));


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

db.query("SELECT NOW()", (err, res) => {
  if (err.error) return console.log(error);
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});
module.express = app;
