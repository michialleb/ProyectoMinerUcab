import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";

class ConsultTableEmpresas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      nombre: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      nombre: value
    });
  }

  render() {
    return (
      <>
        <div>
          <span className="searching">
            <input
              className="inp-search"
              type="search"
              placeholder="Ingrese nombre de empresa"
              name="nombreEmpresa"
              value={this.state.nombre}
              onChange={this.handleChange}
            />
            <button
              className="search"
              type="button"
              onClick={this.props.getEmpresa(this.state.nombre)}>
              {<FaSistrix />}
            </button>
          </span>
        </div>
        <table id="t01">
          <tr>
            {this.props.consult.consult.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
          {this.props.empresas.map((empresa, i) => {
            return (
              <tr key={i}>
                <td>{empresa.empresa_nombre}</td>
                <td>{empresa.empresa_fecha_creacion}</td>
                <td>{empresa.empresa_descripcion}</td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}
export default ConsultTableEmpresas;
