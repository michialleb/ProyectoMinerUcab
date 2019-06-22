import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";

class ConsultTableMinerales extends Component {
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
              placeholder="Ingrese mineral"
              name="nombreMineral"
              value={this.state.nombre}
              onChange={this.handleChange}
            />
            <button
              className="search"
              type="button"
              onClick={this.props.getMineral(this.state.nombre)}
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
          {this.props.minerales.map((mineral, i) => {
            return (
              <tr key={i}>
                <td>{mineral.nombre_mineral}</td>
                <td>{mineral.tipo_mineral}</td>
                <td>{mineral.valor_economico}</td>
                <td>{mineral.descripcion_mineral}</td>
                <td>{mineral.industria_mineral}</td>
                <td>{mineral.fecha_inicio_mineral}</td>
                <td>{mineral.fecha_nacionalizacion_mineral}</td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}
export default ConsultTableMinerales;
