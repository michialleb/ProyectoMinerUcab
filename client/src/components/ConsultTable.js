import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";

class ConsultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cedula: ""
      // empleado: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGetEmpleado = this.handleGetEmpleado.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      cedula: value
    });
  }

  handleGetEmpleado(e) {
    this.props.getEmpleado(this.state.cedula);
    console.log(this.props.empleados);
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
              name="cedula"
              value={this.state.cedula}
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
                <td>{empleado.nombre_empleado}</td>
                <td>{empleado.apellido_empleado}</td>
                <td>{empleado.fecha_nacimiento_empleado}</td>
                <td>{empleado.cedula_empleado}</td>
                <td>{empleado.telefono_empleado}</td>
                <td>{empleado.direccion_empleado}</td>
                <td>{empleado.sexo_empleado}</td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}
export default ConsultTable;
