import React, { Component } from "react";
import "../styles/Form.css";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";

class FormCompraCliente extends Component {
  constructor() {
    super();
    this.state = {
      nombrePersona: "",
      apellidoPersona: "",
      nombreEmpresa: "",
      documento: "",
      rif: "",
      ci: "",
      cantidad: "",
      fechaentrega: "",
      mineral: "",
      nombreMineral: [],
      tipoCliente: "",
      presentaciones:[],
      1: "",
      2: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetCliente = this.handleGetCliente.bind(this);
    this.Persona = this.Persona.bind(this);
    this.Empresa = this.Empresa.bind(this);
    this.add = this.add.bind(this);
    this.getPresentacionList = this.getPresentacionList.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  getPresentacionList = (nombreMineral) => {
    fetch(`/api/minerales/presentacion/:${nombreMineral}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        var presentaciones = res.map(r => r);
          this.setState({ presentaciones });
        
      });

      console.log("estas son las presentaciones "+ this.state.presentaciones);
  };

  Persona(e) {
    e.preventDefault();

    document.getElementById("persona").style.display = "block";
    document.getElementById("empresa").style.display = "none";
  }

  Empresa(e) {
    e.preventDefault();

    document.getElementById("persona").style.display = "none";
    document.getElementById("empresa").style.display = "block";
  }

  handleGetCliente(e) {
    e.preventDefault();
    console.log(this.state.tipoCliente);
    if ((this.state.tipoCliente = "Persona")) {
      this.props.getPersonaCedula(this.state.documento);
      this.props.personas.map(persona => {
        this.setState({
          ci: persona.cedula,
          nombrePersona: persona.nombre,
          apellidoPersona: persona.apellido
        });
      });
    } else {
      this.props.getEmpresaRif(this.state.documento);
      this.props.empresas.map(empresa => {
        this.setState({
          rif: empresa.rif,
          nombreEmpresa: empresa.nombre
        });
      });
    }
  }

  add = cantidad => {
    let inputs = [];

    for (let i = 1; i <= cantidad; i++) {
      inputs.push(
        <div className="min-compra">
          <div>
            <label>Mineral {i}</label>
            <select
              name="nombre"
              value={this.state.mineral}
              onChange={this.handleChange}
            >
              <option />
              {this.props.minerales.map((mineral, i) => (
                <option value={mineral.id_mineral} key={i}>
                  {mineral.mineral_nombre}{" "}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Presentacion</label>
            <input />
          </div>
          <div>
            <label>Cantidad</label>
            <input type="number" />
          </div>
        </div>
      );
    }
    return inputs;
  };

componentDidMount(){
 this.getPresentacionList();
}

  render() {
    return (
      <>
        <div className="wrapper-c">
          <div className="titulo">
            <form className="form" noValidate>
              <h5 id="ordenTitulo">Orden de Compra</h5>
            </form>
          </div>

          <div className="form-wrapper">
            <div className="title-compra">
              <div className="infocompra">
                <div>
                  <div className="tipoCliente">
                    <label htmlFor="tipoCliente">Tipo de Cliente</label>
                    <select
                      name="tipoCliente"
                      value={this.state.tipoCliente}
                      onChange={this.handleChange}
                    >
                      <option />
                      <option onClick={e => this.Persona(e)}>Persona</option>
                      <option onClick={e => this.Empresa(e)}>Empresa</option>
                    </select>
                  </div>

                  <span className="searching">
                    <input
                      className="inp-search"
                      placeholder="CI / RIF"
                      name="documento"
                      value={this.state.documento}
                      onChange={this.handleChange}
                    />

                    <button
                      className="search"
                      type="button"
                      onClick={e => this.handleGetCliente(e)}
                    >
                      {<FaSistrix />}
                    </button>
                  </span>
                </div>

                <div id="persona" className="firstName">
                  <label htmlFor="persona">Nombre Persona:</label>
                  <input value={this.state.nombrePersona} disabled />

                  <label htmlFor="apellido"> Apellido:</label>
                  <input value={this.state.apellidoPersona} disabled />

                  <label htmlFor="ci">Cedula:</label>
                  <input value={this.state.ci} disabled />
                </div>

                <div id="empresa" className="secondName">
                  <label htmlFor="empresa">Nombre Empresa:</label>
                  <input value={this.state.nombreEmpresa} disabled />

                  <label htmlFor="ci">Rif:</label>
                  <input value={this.state.rif} disabled />
                </div>
              </div>
              <div />
            </div>
            <form id="compra" className="form" noValidate>
              <div className="firstName">
                <label>Seleccione el mineral que desea comprar: </label>
                <select
                  name="mineral"
                  value={this.state.mineral}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.props.minerales.map((mineral, i) => (
                    <option value={mineral.nombre_mineral} key={i}>
                      {mineral.nombre_mineral}
                    </option>
                  ))}
                </select>
              </div>

              <div className="firstName">
                <label>Presentacion: </label>
                <select
                  name="presentacion"
                  value={this.state.presentacion}
                  onChange={this.handleChange}
                >
                  {console.log("aca papi " +this.state.mineral)}
                  <option />
                  {this.getPresentacionList(this.state.mineral)}
                  {this.state.presentaciones.map((presentacion, i) => (
                    <option value={presentacion.nombre_presentacion} key={i}>
                      {presentacion.nombre_presentacion}
                    </option>
                  ))}
                </select>
              </div>

              <div>{this.add(this.state.cantidad)}</div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleAddMineral}>
                  Generar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormCompraCliente;
