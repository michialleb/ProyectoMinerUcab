import React, { Component } from "react";
import "../styles/Form.css";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import Factura from "./Factura";
import ActivarProyecto from "./ActivarProyecto";
import CompraAliadoAuto from "./CompraAliadoAuto";
import Services from "./Services";
import swal from "sweetalert";

function ChangeCompra(props) {
  const mineralDisponible = true;
  if (mineralDisponible) {
    return <Services />;
  }
  return null;
}

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
      mineral: "",
      presentacion: "",
      mineral2: "",
      nombreMineral: [],
      tipoCliente: "",
      presentaciones: [],
      inventario: [],
      mineralDisponible: false,
      procesarCompra: false,
      mineralNoDisponible: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetCliente = this.handleGetCliente.bind(this);
    this.Persona = this.Persona.bind(this);
    this.Empresa = this.Empresa.bind(this);
    this.revisarInventario = this.revisarInventario.bind(this);
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

  revisarInventario(e) {
    e.preventDefault();
    console.log("inventario");
    fetch(`/api/inventario`)
      .then(res => res.json())
      .then(res => {
        this.setState({ inventario: res.map(r => r) });
      })
      .then(res => {
        this.setState({
          mineralDisponible: false,
          procesarCompra: true
        });
      })
      .then(res => {
        this.state.inventario.map(inv => {
          if (inv.mineral == this.state.mineral) {
            if (inv.presentacion == this.state.presentacion) {
              let c = inv.cantidad - this.state.cantidad;
              if (c > 0) {
                this.setState({
                  mineralDisponible: true
                });
              }
            }
          }
        });
        if (!this.state.mineralDisponible) {
          this.setState({
            mineralNoDisponible: true
          });
          swal(
            "No tenemos los minerales ahora!",
            "Comienza el proceso de explotacion",
            "warning"
          );
        } else {
          swal("Minerales Disponibles!", "Procede a ver tu factura", "success");
        }
      });
  }

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

  getIdMineral = mineral => {
    let id = 0;
    this.props.minerales.map(m => {
      console.log("m: " + m.nombre_mineral);
      if (m.nombre_mineral == mineral) {
        id = m.id_mineral;
      }
    });
    console.log(id);
    return id;
  };

  render() {
    return (
      <>
        <div
          className={
            this.state.procesarCompra ? "wrapper-c_no_show" : "wrapper-c"
          }
        >
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
                  <option />
                  {this.props.minerales_presentacion.map((presentacion, i) => {
                    if (presentacion.nombre_mineral == this.state.mineral) {
                      return (
                        <option
                          value={presentacion.nombre_presentacion}
                          key={i}
                        >
                          {presentacion.nombre_presentacion}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>
              </div>

              <div className="ci">
                <label htmlFor="ci">Cantidad</label>
                <input
                  className=""
                  placeholder="Cantidad que desea comprar (toneladas)"
                  type="number"
                  name="cantidad"
                  noValidate
                  value={this.state.cantidad}
                  onChange={this.handleChange}
                />
              </div>

              <div className="ingresarUsuario">
                <button
                  type="submit"
                  onClick={function(e) {
                    this.revisarInventario(e);
                  }.bind(this)}
                >
                  Generar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          {this.state.mineralDisponible ? <Factura /> : null}
          {this.state.mineralNoDisponible ? (
            <CompraAliadoAuto
              id_mineral={this.getIdMineral(this.state.mineral)}
              cantidad={this.state.cantidad}
            />
          ) : null}
        </div>
      </>
    );
  }
}

export default FormCompraCliente;
