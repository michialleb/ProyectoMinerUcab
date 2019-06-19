import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";

class ConsultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      cedula: ""
      // empleado: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      cedula: value
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
              placeholder="Ingrese nro de cédula"
              name="empleadoCedula"
              value={this.state.cedula}
              onChange={this.handleChange}
            />
            <button
              className="search"
              type="button"
              onClick={this.props.getEmpleado(this.state.cedula)}
            >
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
          {this.props.empleados.map((empleado, i) => {
            return (
              <tr key={i}>
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido}</td>
                <td>{empleado.cedula}</td>
                <td>{empleado.fnac}</td>
                <td>{empleado.telefono}</td>
                <td>{empleado.direccion}</td>
                <td>{empleado.cargo}</td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}
export default ConsultTable;
