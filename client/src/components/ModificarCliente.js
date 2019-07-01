import React, { Component } from "react";
import "../styles/Form.css";
import swal from "sweetalert";
import { FaSistrix } from "react-icons/fa";

class UpdateCliente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //empleadoList: [],
      nombre: "",
      apellido: "",
      fnac: "",
      cedula: "",
      direccion: "",
      sexo: "",
      telefono: "",
      correo: "",
      cedulaBuscada: "",
      ////////////////////////////////////
      nombreEmpresa: "",
      rif: "",
      direccionEmpresa: "",
      telefonoEmpresa: "",
      correoEmpresa: "",
      rifBuscado: "",

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
    this.handleGetPersona = this.handleGetPersona.bind(this);
    this.handleGetEmpresa = this.handleGetEmpresa.bind(this);
    this.handleUpdateEmpresa = this.handleUpdateEmpresa.bind(this);
    this.handleUpdatePersona = this.handleUpdatePersona.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  Persona() {
    document.getElementById("persona").style.display = "block";
    document.getElementById("empresa").style.display = "none";
    if (document.getElementById("btn-p").style.backgroundColor === "orange") {
      document.getElementById("btn-p").style.backgroundColor = "#333";
      document.getElementById("btn-p").style.color = "orange";
      document.getElementById("btn-e").style.backgroundColor = "orange";
    } else {
      document.getElementById("btn-p").style.background = "orange";
      document.getElementById("btn-p").style.color = "#333";
      document.getElementById("btn-e").style.backgroundColor = "#333";
    }
  }
  Empresa() {
    document.getElementById("persona").style.display = "none";
    document.getElementById("empresa").style.display = "block";
    if (document.getElementById("btn-e").style.backgroundColor === "orange") {
      document.getElementById("btn-e").style.backgroundColor = "#333";
      document.getElementById("btn-e").style.color = "orange";
      document.getElementById("btn-p").style.backgroundColor = "orange";
    } else {
      document.getElementById("btn-e").style.backgroundColor = "orange";
      document.getElementById("btn-e").style.color = "#333";
      document.getElementById("btn-p").style.backgroundColor = "#333";
    }
  }

  handleUpdatePersona = e => {
    console.log(this.state);
    e.preventDefault();
    fetch(`/api/clientes/update/persona`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ persona: this.state })
    })
      .then(res => res.json())
      .catch(res => {})
      .then(res => {
        if (res.error)
          swal("Error. Uno o mas campos vacios!", "Intente de nuevo!", "error");
        else swal("Persona modificada!", "Satisfactoriamente!", "success");
      });
  };

  handleUpdateEmpresa = e => {
    console.log("Entroo");
    e.preventDefault();
    fetch(`/api/empleados/update/empresa`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ empresa: this.state })
    }).then(res => res.json());
  };

  addInfoPersona(persona) {
    persona.map(perso => {
      var date = perso.fnac.split(["T"], [1]);
      this.setState({
        nombre: perso.nombre,
        direccion: perso.provincia,
        apellido: perso.apellido,
        fnac: date,
        cedula: perso.cedula,
        telefono: perso.telefono,
        sexo: perso.sexo,
        estadoAnterior: perso.estado,
        municipioAnterior: perso.municipio,
        provinciaAnteriror: perso.provincia,
        correo: perso.correo
      });
    });
  }

  addInfoEmpresa(empresa) {
    empresa.map(empre => {
      this.setState({
        nombreEmpresa: empre.nombre,
        direccionEmpresa: empre.provincia,
        rif: empre.rif,
        telefonoEmpresa: empre.telefono,
        estadoAnterior: empre.estado,
        municipioAnterior: empre.municipio,
        provinciaAnteriror: empre.provincia,
        correoEmpresa: empre.correo
      });
    });
  }

  handleGetPersona(e) {
    e.preventDefault();
    this.props.getPersonaCedula(this.state.cedulaBuscada);
    this.addInfoPersona(this.props.personas);
  }

  handleGetEmpresa(e) {
    console.log("Buscando empresas");
    e.preventDefault();
    this.props.getEmpresaRif(this.state.rifBuscado);
    this.addInfoEmpresa(this.props.empresas);
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="buttonClienteshow">
            <button id="btn-p" type="submit" onClick={e => this.Persona(e)}>
              Modificar Cliente Persona
            </button>
            <button id="btn-e" type="submit" onClick={e => this.Empresa(e)}>
              Modificar Cliente Empresa
            </button>
          </div>
          <div id="persona" className="form-wrapper">
            <span className="searching">
              <input
                className="inp-search"
                type="search"
                placeholder="Ingrese nro de cédula"
                name="cedulaBuscada"
                value={this.state.cedulaBuscada}
                onChange={this.handleChange}
              />
              <button
                className="search"
                type="button"
                onClick={this.handleGetPersona}
              >
                {<FaSistrix />}
              </button>
            </span>
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
                  placeholder="mm/dd/yyyy"
                  type="text"
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
                <label htmlFor="direccion">
                  {" "}
                  Dirección: <br />
                  {this.state.estadoAnterior +
                    ", " +
                    this.state.municipioAnterior +
                    ", " +
                    this.state.provinciaAnteriror}
                </label>
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
                    <option value={lugar.nombre_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sexo">
                <label htmlFor="sexo">Sexo</label>
                <select
                  name="sexo"
                  value={this.state.sexo}
                  onChange={this.handleChange}
                >
                  <option />
                  <option>M</option>
                  <option>F</option>
                </select>
              </div>

              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleUpdatePersona}>
                  Modificar Cliente Persona
                </button>
              </div>
            </form>
          </div>

          <div id="empresa" className="form-wrapper">
            <span className="searching">
              <input
                className="inp-search"
                type="search"
                placeholder="Ingrese nro de rif"
                name="rifBuscado"
                value={this.state.rifBuscado}
                onChange={this.handleChange}
              />
              <button
                className="search"
                type="button"
                onClick={this.handleGetEmpleado}
              >
                {<FaSistrix />}
              </button>
            </span>
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Nombre:</label>
                <input
                  className=""
                  placeholder="Ingrese el nombre"
                  type="text"
                  name="nombreEmpresa"
                  noValidate
                  value={this.state.nombreEmpresa}
                  onChange={this.handleChange}
                />
              </div>
              <div className="ci">
                <label htmlFor="ci">Rif:</label>
                <input
                  className=""
                  placeholder="Ingrese el rif"
                  type="text"
                  name="rif"
                  noValidate
                  value={this.state.rif}
                  onChange={this.handleChange}
                />
              </div>
              <div className="telefono">
                <label htmlFor="telefono">Telefono:</label>
                <input
                  className=""
                  placeholder="Ingrese numero telefonico"
                  type="number"
                  name="telefonoEmpresa"
                  noValidate
                  value={this.state.telefonoEmpresa}
                  onChange={this.handleChange}
                />
              </div>
              <div className="correo">
                <label htmlFor="correo">Correo Electronico</label>
                <input
                  className=""
                  placeholder="Ingrese su correo electronico"
                  type="email"
                  name="correoEmpresa"
                  value={this.state.correoEmpresa}
                  onChange={this.handleChange}
                />
              </div>
              <div className="direccion">
                <label htmlFor="direccion">
                  {" "}
                  Dirección: <br />
                  {this.state.estadoAnterior +
                    ", " +
                    this.state.municipioAnterior +
                    ", " +
                    this.state.provinciaAnteriror}
                </label>
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
                  name="direccionEmpresa"
                  value={this.state.direccionEmpresa}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.state.provinciaList.map((lugar, i) => (
                    <option value={lugar.nombre_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleUpdateEmpresa}>
                  Modificar Empresa Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateCliente;
