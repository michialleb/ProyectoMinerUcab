import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";

class ConsultTableYacimientos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      nombre: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGetYacimiento = this.handleGetYacimiento.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      nombre: value
    });
  }

  handleGetYacimiento(e) {
    this.props.getYacimiento(this.state.nombre);
  }

  render() {
    return (
      <>
        <div>
          <span className="searching">
            <input
              className="inp-search"
              type="search"
              placeholder="Ingrese el yacimiento"
              name="nombreYacimiento"
              value={this.state.nombre}
              onChange={this.handleChange}
            />
            <button
              className="search"
              type="button"
              onClick={this.handleGetYacimiento}
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
          {this.props.yacimientos.map((yacimiento, i) => {
            return (
              <tr key={i}>
                <td>{yacimiento.nombre_yacimiento}</td>
                <td>{yacimiento.kilometros}</td>
                <td>
                  {"Estado: " +
                    yacimiento.estado +
                    ", Municipio: " +
                    yacimiento.municipio +
                    ", Provincia: " +
                    yacimiento.provincia}
                </td>
                <td>{yacimiento.nombre_status}</td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}
export default ConsultTableYacimientos;
