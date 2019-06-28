import React, { Component } from "react";
import swal from "@sweetalert/with-react";
import "../styles/ConsultTable.css";

class ModalHorario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horarioList: []
    };
  }

  componentDidMount() {
    this.setState({ horarioList: this.props.horarios });
  }

  render() {
    return (
      <table id="t02">
        <label>Horario del empleado </label>
        <tr>
          <th>Dia de semana</th>
          <th>Hora de inicio</th>
          <th>Hora de salida</th>
        </tr>

        {this.state.horarioList.map((horario, i) => {
          return (
            <tr key={i}>
              <td>{horario.dia}</td>
              <td>{horario.inicio}</td>
              <td>{horario.salida}</td>
            </tr>
          );
        })}
      </table>
    );
  }
}
export default ModalHorario;
