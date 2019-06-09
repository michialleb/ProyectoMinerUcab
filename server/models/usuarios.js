const db = require("../database");

class Usuarios {
  static retrieveAll(callback) {
    db.query("SELECT usuario_nombre FROM usuarios", function(err, res) {
      if (err.error) return callback(err);
      callback(res);
    });
  }

  static insert(usuario, callback) {
    db.query(
      "INSERT INTO usuarios (usuario_nombre) VALUES ($1)",
      [usuario],
      function(err, res) {
        if (err.error) return callback(err);
        callback(res);
      }
    );
  }
}
module.exports = Usuarios;
