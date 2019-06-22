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

app.use("/api/usuarios", require("./api/usuarios"));
app.use("/api/empleados", require("./api/empleados"));
app.use("/api/cargos", require("./api/cargos"));
app.use("/api/lugar", require("./api/lugar"));
app.use("/api/minerales", require("./api/minerales"));
app.use("/api/yacimientos", require("./api/yacimientos"));
app.use("/api/empresaAliada", require("./api/empresaAliada"));
app.use("/api/mineralYacimiento", require("./api/mineralYacimiento"));
app.use("/api/inventario", require("./api/inventario"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

db.query("SELECT NOW()", (err, res) => {
  if (err.error) return console.log(error);
  console.log(`PostgreSQL connected: ${res[0].now}.`);
});
module.express = app;
