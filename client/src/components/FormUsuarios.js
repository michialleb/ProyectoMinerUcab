import React, { Component } from "react";
import "../styles/ConsultTable.css";
import "../styles/Form.css";
import { MDBDataTable } from "mdbreact";
import swal from "@sweetalert/with-react";
import { ListGroup } from "react-bootstrap";
import CrearUsuario from "../components/CrearUsuario";

class FormUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuariosList: [],
      nombre: "",
      usuario: "",
      contrasena: "",
      fk_empleado: "",
      fk_cliente: "",
      fk_rol: 0,
      nuevoUsuario: "",
      nuevaContra: "",
      nuevoFkRol: ""
      // permisosList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetUsuarios = this.handleGetUsuarios.bind(this);
    this.handleCrearUsuario = this.handleCrearUsuario.bind(this);
    this.handleAddUsuario = this.handleAddUsuario.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    console.log("el state esta cambiando:" + value);

    this.setState({
      [name]: value
    });
  }

  handleAddUsuario(nombre, cedula, e) {
    e.preventDefault();
    let user = {
      nombre_usuario: this.state.usuario,
      contraseña: this.state.contrasena,
      rol: parseInt(this.state.fk_rol),
      nombre_persona: nombre,
      cedula_persona: cedula
    };
    fetch(`/api/usuarios/insertar`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ user: user })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log("error es: " + res.error);
          swal("Datos invalidos", "Intente de nuevo!", "error");
        } else {
          swal("Usuario ingresado!", "Satisfactoriamentes!", "success");
          this.setState({
            nombre: "",
            usuario: "",
            contrasena: "",
            fk_rol: 0
          });
        }
      });
  }

  deleteUsuario(i, e) {
    e.preventDefault();
    let id = "";
    this.state.usuariosList.map((user, n) => {
      if (n == i) {
        id = user.usuario;
      }
    });

    fetch(`/api/usuarios/eliminar/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
        } else {
          swal("Usuario eliminado", "Satisfactoriamentes!", "success");
        }
      });
  }

  handleGetUsuarios = (cedula, nombre) => {
    console.log("entro en el handel de usuarios con " + cedula);
    fetch(`/api/usuarios/usuario/${cedula}`)
      .then(res => res.json())
      .then(res => {
        if (res !== []) this.setState({ usuariosList: res.map(r => r) });
      })
      .then(res => {
        swal(
          <div>
            <label> Usuarios asociados a {nombre} </label>

            {this.state.usuariosList.map((user, i) => {
              return (
                <>
                  <button
                    key={i}
                    className="btn_Usuarios"
                    onClick={function(e) {
                      this.handleModificarUsuario(i, e);
                    }.bind(this)}
                  >
                    {user.usuario}
                  </button>
                  <button
                    key={i}
                    className="btn_eliminar"
                    onClick={function(e) {
                      this.deleteUsuario(i, e);
                    }.bind(this)}
                  >
                    {" "}
                    eliminar{" "}
                  </button>
                </>
              );
            })}
          </div>
        );
      });
    //  console.log(this.state.permisosList);
  };

  handleCrearUsuario = (nombre, cedula) => {
    swal(
      <div>
        <div className="form-wrapper">
          <h5>Creacion de usuario </h5>
          <form className="form" noValidate>
            <div className="firstName">
              <label htmlFor="firstName">Nombre Persona</label>
              <input
                className=""
                type="text"
                name="nombre"
                disabled
                value={nombre}
              />
            </div>
            <div className="secondName">
              <label htmlFor="secondName">Nombre de usuario</label>
              <input
                className=""
                placeholder="Ingrese el nombre de usuario"
                type="text"
                name="usuario"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="secondName">
              <label htmlFor="secondName">Contraseña</label>
              <input
                className=""
                placeholder="Ingrese la Contraseña"
                type="password"
                name="contrasena"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="cargo">
              <label htmlFor="cargo">Rol</label>
              <select
                name="fk_rol"
                type="number"
                id="selected"
                onChange={this.handleChange}
              >
                <option />
                {this.props.roles.map((rol, i) => (
                  <option value={rol.id_rol} key={i}>
                    {rol.tipo_rol}
                  </option>
                ))}
              </select>
            </div>

            <div className="ingresarUsuario">
              <button
                type="submit"
                onClick={function(e) {
                  this.handleAddUsuario(nombre, cedula, e);
                }.bind(this)}
              >
                Ingresar Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  handleModificarUsuario = (i, e) => {
    e.preventDefault();
    //console.log("esta es la key: " + i);
    //console.log(this.state);
    let usuario = "";
    let nombre = "";
    this.state.usuariosList.map((user, n) => {
      if (n == i) {
        nombre = user.nombre;

        this.setState({
          nombre: user.nombre,
          nuevoUsuario: user.usuario,
          nuevaContra: user.contraseña,
          nuevoFkRol: user.tipo_rol,
          usuario: user.usuario,
          contrasena: user.contraseña,
          fk_rol: user.tipo_rol
        });
      }
    });

    console.log("usuarios buscados en la lista: " + usuario + " " + nombre);

    swal(
      <div>
        <div className="form-wrapper">
          <h5>Modificacion de usuario </h5>
          <form className="form" noValidate>
            <div className="firstName">
              <label htmlFor="firstName">Nombre Persona</label>
              <input
                className=""
                type="text"
                name="nombre"
                disabled
                value={nombre}
              />
            </div>

            <div className="secondName">
              <label htmlFor="secondName">Nombre de usuario</label>
              <input
                className=""
                placeholder={this.state.nuevoUsuario}
                type="text"
                name="nuevoUsuario"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="secondName">
              <label htmlFor="secondName">Contraseña</label>
              <input
                className=""
                placeholder={this.state.nuevaContra}
                type="password"
                name="nuevaContra"
                noValidate
                onChange={this.handleChange}
              />
            </div>

            <div className="cargo">
              <label htmlFor="cargo">Rol: {this.state.nuevoFkRol} </label>
              <select
                name="nuevoFkRol"
                type="number"
                id="selected"
                onChange={this.handleChange}
              >
                <option />
                {this.props.roles.map((rol, i) => (
                  <option value={rol.tipo_rol} key={i}>
                    {rol.tipo_rol}
                  </option>
                ))}
              </select>
            </div>

            <div className="ingresarUsuario">
              <button
                onClick={function(e) {
                  this.handleUpdateUsuario(e);
                }.bind(this)}
              >
                Modificar Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  handleUpdateUsuario(e) {
    if (this.state.nuevoUsuario == "")
      this.setState({ nuevoUsuario: this.state.usuario });
    if (this.state.nuevaContra == "")
      this.setState({ nuevaContra: this.state.contrasena });
    if (this.state.nuevoFkRol == "")
      this.setState({ nuevoFkRol: this.state.fk_rol });

    console.log("rol: " + this.state.nuevoFkRol);
    //console.log("contra a pone: " + this.state.contrasena);
    e.preventDefault();
    let user = {
      nombre_persona: this.state.nombre,
      nombre_usuario_viejo: this.state.usuario,
      nombre_usuario: this.state.nuevoUsuario,
      contraseña: this.state.nuevaContra,
      rol: this.state.nuevoFkRol
    };
    fetch(`/api/usuarios/modificar/upd`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ user: user })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log("error es: " + res.error);
          swal("Datos invalidos", "Intente de nuevo!", "error");
        } else {
          swal("Usuario Modificado!", "Satisfactoriamentes!", "success");
          this.setState({
            nombre: "",
            usuario: "",
            contrasena: "",
            nuevoUsuario: "",
            nuevaContra: "",
            nuevoFkRol: "",
            fk_rol: 0
          });
        }
      });
  }

  addBotton = () => {
    var personas = [];
    this.props.personas.map(pers => {
      let m = {
        nombre: pers.nombre,
        cedula: pers.cedula,
        usuarios: (
          <div className="horario">
            <button
              onClick={function(e) {
                this.handleGetUsuarios(pers.cedula, pers.nombre);
              }.bind(this)}
            >
              {" "}
              Usuarios
            </button>
          </div>
        ),
        crear_usuario: (
          <div className="horario">
            <button
              onClick={function(e) {
                this.handleCrearUsuario(pers.nombre, pers.cedula);
              }.bind(this)}
            >
              {" "}
              Crear Usuario
            </button>
          </div>
        )
      };
      personas.push(m);
    });
    return personas;
  };

  render() {
    const data = {
      columns: [
        {
          label: "Nombre y apellido",
          field: "nombre",
          sort: "asc",
          width: 1000
        },
        {
          label: "Cedula",
          field: "cedula",
          sort: "asc",
          width: 1000
        },
        {
          label: "Usuarios",
          field: "usuarios",
          sort: "asc",
          width: 1000
        }
      ],
      rows: this.addBotton(this.props.personas)
    };
    return (
      <>
        <div>
          <MDBDataTable btn striped bordered hover data={data} />
        </div>
      </>
    );
  }
}
export default FormUsuarios;
