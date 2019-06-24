import React, { Component } from "react";
import "../styles/Form.css";

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
      telefono: "",
      correo: "",
      estado: 0,
      estado2: -1,
      municipio: 0,
      municipio2: -1,
      municipioList: [],
      provinciaList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Persona = this.Persona.bind(this);
    this.Empresa = this.Empresa.bind(this);
    this.getMunicipio = this.getMunicipio.bind(this);
    this.getProvincia = this.getProvincia.bind(this);
    this.handleAddCliente = this.handleAddCliente.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }
  getMunicipio = codigo => {
    fetch(`/api/lugar/${codigo}`)
      .then(res => res.json())
      .then(res => {
        var municipioList = res.map(r => r);
        this.setState({ municipioList });
      });
  };

  buscarMunicipios = (codigo, codigo2) => {
    if (codigo != codigo2) {
      this.getMunicipio(codigo2);
      this.setState({ estado: codigo2, municipio2: "" });
    }
  };

  getProvincia = codigo => {
    fetch(`/api/lugar/${codigo}`)
      .then(res => res.json())
      .then(res => {
        var provinciaList = res.map(r => r);
        this.setState({ provinciaList });
      });
  };

  buscarProvincias = (codigo, codigo2) => {
    if (codigo != codigo2) {
      this.getProvincia(codigo2);
      this.setState({ municipio: codigo2 });
    }
  };

  handleAddCliente = () => {
    fetch("/api/clientes", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ cliente: this.state })
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

              <div className="correo">
                <label htmlFor="correo">Correo Electronico</label>
                <input
                  className=""
                  placeholder="Ingrese su correo electronico"
                  type="email"
                  name="correo"
                  value={this.state.correo}
                  onChange={this.handleChange}
                />
              </div>

              <div className="direccion">
                <label htmlFor="direccion">Dirección</label>
                <select
                  className="lugares"
                  type="number"
                  name="estado2"
                  value={this.state.estado2}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.props.lugares.map((lugar, i) => (
                    <option value={lugar.id_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
                {this.buscarMunicipios(this.state.estado, this.state.estado2)}
                <select
                  className="lugares"
                  type="number"
                  name="municipio2"
                  value={this.state.municipio2}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.state.municipioList.map((lugar, i) => (
                    <option value={lugar.id_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
                {this.buscarProvincias(
                  this.state.municipio,
                  this.state.municipio2
                )}
                <select
                  className="lugares"
                  type="number"
                  name="direccion"
                  value={this.state.direccion}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.state.provinciaList.map((lugar, i) => (
                    <option value={lugar.id_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleAddCliente}>
                  Ingresar Cliente
                </button>
              </div>
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

              <div className="correo">
                <label htmlFor="correo">Correo Electronico</label>
                <input
                  className=""
                  placeholder="Ingrese su correo electronico"
                  type="email"
                  name="correo"
                  value={this.state.correo}
                  onChange={this.handleChange}
                />
              </div>

              <div className="direccion">
                <label htmlFor="direccion">Dirección</label>
                <select
                  className="lugares"
                  type="number"
                  name="estado2"
                  value={this.state.estado2}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.props.lugares.map((lugar, i) => (
                    <option value={lugar.id_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
                {this.buscarMunicipios(this.state.estado, this.state.estado2)}
                <select
                  className="lugares"
                  type="number"
                  name="municipio2"
                  value={this.state.municipio2}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.state.municipioList.map((lugar, i) => (
                    <option value={lugar.id_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
                {this.buscarProvincias(
                  this.state.municipio,
                  this.state.municipio2
                )}
                <select
                  className="lugares"
                  type="number"
                  name="direccion"
                  value={this.state.direccion}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.state.provinciaList.map((lugar, i) => (
                    <option value={lugar.id_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleAddCliente}>
                  Ingresar Empresa Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormCliente;
