import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";

class ConsultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      horario: ""
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
    var id_empleado = 4;
    this.props.getHorarios(id_empleado);
    console.log(this.props.empleados);
    console.log(this.props.horarios);
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
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido}</td>
                <td>{empleado.cedula}</td>
                <td>{empleado.fnac}</td>
                <td>{empleado.telefono}</td>
                <td>
                  {"Estado: " +
                    empleado.estado +
                    ", Municipio: " +
                    empleado.municipio +
                    ", Provincia: " +
                    empleado.provincia}
                </td>
                <td>{empleado.sexo}</td>
                <td>{empleado.cargo}</td>
              </tr>
            );
          })}
        </table>

        <table id="t01">
          <tr>
            <th>Dia de semana</th>
            <th>Hora de inicio</th>
            <th>Hora de salida</th>
          </tr>

          {this.props.horarios.map((horario, i) => {
            return (
              <tr key={i}>
                <td>{horario.dia}</td>
                <td>{horario.inicio}</td>
                <td>{horario.salida}</td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}
export default ConsultTable;
