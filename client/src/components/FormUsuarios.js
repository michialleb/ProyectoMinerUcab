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
      nombre: "pedro",
      usuario: "",
      contrasena: "",
      fk_empleado: "",
      fk_cliente: "",
      fk_rol: ""
      // permisosList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetUsuarios = this.handleGetUsuarios.bind(this);
    this.handleCrearUsuario = this.handleCrearUsuario.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleGetUsuarios = (cedula, nombre) => {
    console.log("entro en el handel de usuarios con " + cedula + nombre);
    fetch(`/api/usuarios/${cedula}`)
      .then(res => res.json())
      .then(res => {
        if (res !== []) this.setState({ usuariosList: res.map(r => r) });
      })
      .then(res => {
        swal(
          <div>
            <label> Usuarios asociados a {nombre} </label>
            <ListGroup>
              {this.state.usuariosList.map(user => {
                return <ListGroup.Item>{user.usuario}</ListGroup.Item>;
              })}
            </ListGroup>
          </div>
        );
      });
    //  console.log(this.state.permisosList);
  };

  handleCrearUsuario = () => {

    swal(
      <>
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
                value={this.state.nombre}
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
                value={this.state.usuario}
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
                value={this.state.contrasena}
                onChange={this.handleChange}
              />
            </div>

            <div className="cargo">
              <label htmlFor="cargo">Rol</label>
              <select
                name="fk_cargo"
                type="number"
                id="selected"
                value={this.state.fk_rol}
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
              <button type="submit" onClick={this.handleAddUsuario}>
                Ingresar Usuario
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };

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
            <button onClick={this.handleCrearUsuario}> Crear Usuario</button>
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
