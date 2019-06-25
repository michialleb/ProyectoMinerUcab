import React, { Component } from "react";
import "../styles/Form.css";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";

class FormCompraCliente extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      apellido: "",
      ci: "",
      cantidad: "",
      fechaentrega: "",
      mineral: "",
      nombreMineral: [],
      1: "",
      2: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetCliente = this.handleGetCliente.bind(this);
    this.add = this.add.bind(this);
  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleGetCliente(e) {
    this.props.getPersonaCedula(this.state.ci);
    this.props.personas.map(persona => {
      this.setState({
        ci: persona.cedula,
        nombre: persona.nombre,
        apellido: persona.apellido
      });
    });
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
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <div className="title-compra">
              <div className="infocompra">
                <div>
                  <span className="searching">
                    <input
                      className="inp-search"
                      type="text"
                      placeholder="Ingrese nro de cédula"
                      name="ci"
                      value={this.state.ci}
                      onChange={this.handleChange}
                    />

                    <button
                      className="search"
                      type="button"
                      onClick={this.handleGetCliente}
                    >
                      {<FaSistrix />}
                    </button>
                  </span>
                </div>

                <td>Nombre: {this.state.nombre}</td>
                <td>Apellido: {this.state.apellido}</td>
                <td>Ci: {this.state.ci}</td>
              </div>
              <div>
                
              </div>
            </div>
            <form id="compra" className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Mineral a comprar:</label>
                <input
                  className=""
                  id="cant"
                  placeholder="Seleccione el mineral"
                  type="number"
                  name="cantidad"
                  noValidate
                  value={this.state.cantidad}
                  onChange={this.handleChange}
                />
              </div>
              <div className="secondName">
                <label htmlFor="secondName">Fecha estimada de entrega:</label>
                <input
                  className=""
                  id="cant"
                  placeholder="xx/xx/xxxx"
                  type="date"
                  name="fechaentrega"
                  noValidate
                  value={this.state.fechaentrega}
                  onChange={this.handleChange}
                />
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
