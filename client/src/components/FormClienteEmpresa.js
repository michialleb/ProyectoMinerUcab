import React, { Component } from "react";
import "../styles/Form.css";
import Modal from "./popCompraCliente";
class FormCliente extends Component {
  constructor() {
    super();

    this.state = {
      empleadoList: [],
      nombre: "",
      apellido: "",
      fnac: "",
      cedula: "",
      direccion: "",
      telefono: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Persona = this.Persona.bind(this);
    this.Empresa = this.Empresa.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleAddEmpleado = () => {
    fetch("/api/empleados", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ empleado: this.state })
    }).then(res => res.json());
  };

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  Persona() {
    document.getElementById("persona").style.display = "block";
    document.getElementById("empresa").style.display = "none";
    if (document.getElementById("btn-p").style.background === "orange") {
      document.getElementById("btn-p").style.background = "#333";
      document.getElementById("btn-p").style.color = "orange";
    } else {
      document.getElementById("btn-p").style.background = "orange";
      document.getElementById("btn-p").style.color = "#333";
    }
  }
  Empresa() {
    document.getElementById("persona").style.display = "none";
    document.getElementById("empresa").style.display = "block";
    if (document.getElementById("btn-e").style.background === "orange") {
      document.getElementById("btn-e").style.background = "#333";
      document.getElementById("btn-e").style.color = "orange";
    } else {
      document.getElementById("btn-e").style.background = "orange";
      document.getElementById("btn-e").style.color = "#333";
    }
  }
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="buttonClienteshow">
            <button id="btn-p" type="submit" onClick={e => this.Persona(e)}>
              Ingresar Persona
            </button>
            <button id="btn-e" type="submit" onClick={e => this.Empresa(e)}>
              Ingresar Empresa
            </button>
          </div>
          <div id="persona" className="form-wrapper">
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Nombre:</label>
                <input
                  className=""
                  placeholder="Ingrese el nombre"
                  type="text"
                  name="nombre"
                  noValidate
                  value={this.state.nombre}
                  onChange={this.handleChange}
                />
              </div>
              <div className="secondName">
                <label htmlFor="secondName">Apellido:</label>
                <input
                  className=""
                  placeholder="Ingrese el apellido"
                  type="text"
                  name="apellido"
                  noValidate
                  value={this.state.apellido}
                  onChange={this.handleChange}
                />
              </div>
              <div className="ci">
                <label htmlFor="ci">C.I</label>
                <input
                  className=""
                  placeholder="Ingrese cédula"
                  type="number"
                  name="cedula"
                  noValidate
                  value={this.state.cedula}
                  onChange={this.handleChange}
                />
              </div>
              <div className="nacimiento">
                <label htmlFor="nacimiento">Fecha de nacimiento</label>
                <input
                  className=""
                  placeholder="xx/yy/zz"
                  type="date"
                  name="fnac"
                  noValidate
                  value={this.state.fnac}
                  onChange={this.handleChange}
                />
              </div>
              <div className="telefono">
                <label htmlFor="telefono">Número de teléfono</label>
                <input
                  className=""
                  placeholder="Ingrese nro telefónico"
                  type="number"
                  name="telefono"
                  noValidate
                  value={this.state.telefono}
                  onChange={this.handleChange}
                />
              </div>
              <div className="direccion">
                <label htmlFor="direccion">Dirección</label>
                <input
                  className=""
                  placeholder="Ingrese dirección"
                  type="text"
                  name="direccion"
                  noValidate
                  value={this.state.direccion}
                  onChange={this.handleChange}
                />
              </div>
              <Modal />
            </form>
          </div>

          <div id="empresa" className="form-wrapper">
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Nombre:</label>
                <input
                  className=""
                  placeholder="Ingrese el nombre"
                  type="text"
                  name="nombre"
                  noValidate
                  value={this.state.nombre}
                  onChange={this.handleChange}
                />
              </div>
              <div className="secondName">
                <label htmlFor="secondName">Direccion:</label>
                <input
                  className=""
                  placeholder="Ingrese el apellido"
                  type="text"
                  name="apellido"
                  noValidate
                  value={this.state.apellido}
                  onChange={this.handleChange}
                />
              </div>
              <div className="ci">
                <label htmlFor="ci">rif:</label>
                <input
                  className=""
                  placeholder="Ingrese cédula"
                  type="number"
                  name="cedula"
                  noValidate
                  value={this.state.cedula}
                  onChange={this.handleChange}
                />
              </div>
              <div className="nacimiento">
                <label htmlFor="nacimiento">Telefono:</label>
                <input
                  className=""
                  placeholder="xx/yy/zz"
                  type="number"
                  name="fnac"
                  noValidate
                  value={this.state.fnac}
                  onChange={this.handleChange}
                />
              </div>

              <Modal />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormCliente;
