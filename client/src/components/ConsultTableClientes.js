import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";

class ConsultTableClientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      rif: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetPersona = this.handleGetPersona.bind(this);
    this.handleGetEmpresa = this.handleGetEmpresa.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      cedula: value
    });
  }

  handleGetPersona(e) {
    this.props.getPersonaCedula(this.state.cedula);
  }

  handleGetEmpresa(e) {
    this.props.getEmpresaRif(this.state.rif);
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
              Consultar Cliente Persona
            </button>
            <button id="btn-e" type="submit" onClick={e => this.Empresa(e)}>
              Consultar Cliente Empresa
            </button>
          </div>

          <div id="persona">
            <div>
              <span className="searching">
                <input
                  className="inp-search"
                  type="search"
                  placeholder="Ingrese nro de cédula del cliente"
                  name="cedula"
                  value={this.state.cedula}
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
            </div>

            <table id="t02">
              <tr>
                {this.props.consultaPersona.consultaPersona.map((item, i) => (
                  <th key={i}>{item}</th>
                ))}
              </tr>
              {this.props.personas.map((persona, i) => {
                return (
                  <tr key={i}>
                    <td>{persona.nombre}</td>
                    <td>{persona.apellido}</td>
                    <td>{persona.cedula}</td>
                    <td>{persona.fnac}</td>
                    <td>{persona.telefono}</td>
                    <td>
                      {"Estado: " +
                        persona.estado +
                        ", Municipio: " +
                        persona.municipio +
                        ", Provincia: " +
                        persona.provincia}
                    </td>
                    <td>{persona.sexo}</td>
                    <td>{persona.correo}</td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div id="empresa">
            <div>
              <span className="searching">
                <input
                  className="inp-search"
                  type="search"
                  placeholder="Ingrese nro de rif del cliente"
                  name="rif"
                  value={this.state.rif}
                  onChange={this.handleChange}
                />
                <button
                  className="search"
                  type="button"
                  onClick={this.handleGetEmpresa}
                >
                  {<FaSistrix />}
                </button>
              </span>
            </div>

            <table id="t02">
              <tr>
                {this.props.consultaEmpresa.consultaEmpresa.map((item, i) => (
                  <th key={i}>{item}</th>
                ))}
              </tr>
              {this.props.empresas.map((empresa, i) => {
                return (
                  <tr key={i}>
                    <td>{empresa.nombre}</td>
                    <td>{empresa.rif}</td>
                    <td>
                      {"Estado: " +
                        empresa.estado +
                        ", Municipio: " +
                        empresa.municipio +
                        ", Provincia: " +
                        empresa.provincia}
                    </td>
                    <td>{empresa.telefono}</td>
                    <td>{empresa.correo}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default ConsultTableClientes;
