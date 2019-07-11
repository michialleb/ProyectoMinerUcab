import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sesion from "./Sesion";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      id_usuario: 5,
      nombre: "",
      tipo_rol: "",
      cedula: 0,
      ing: true,
      resp: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ingresar = this.ingresar.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  ingresar(e) {
    e.preventDefault();
    var nombre_usuario = this.state.email;
    fetch(`/api/usuarios/log/in/${nombre_usuario}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res[0].contraseña != this.state.password) {
          res[0].id_usuario = null;
        }
        this.setState({
          id_usuario: res[0].id_usuario,
          nombre: res[0].nombre,
          tipo_rol: res[0].tipo_rol,
          cedula: res[0].cedula
        });
        this.forceUpdate();
      })
      .then(res => {});
  }

  render() {
    return (
      <>
        <div className="FormCenter">
          <form
            onSubmit={this.handleSubmit}
            className="FormFields"
            onSubmit={this.handleSubmit}
          >
            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">
                Correo Electronico
              </label>
              <input
                type="text"
                id="email"
                className="FormField__Input"
                placeholder="Introduce tu usuario"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>

            <div className="FormField">
              <label className="FormField__Label" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Introduce tu contraseña"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <div className="FormField">
              <button
                className="FormField__Button mr-20"
                onClick={this.ingresar}
              >
                <Link to={`/protected/${this.state.id_usuario}/7/6/6`}>
                  Iniciar Sesion
                </Link>
              </button>
              <Link to="/" className="FormField__Link">
                Crear cuenta
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default SignInForm;
