import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import swal from "@sweetalert/with-react";
import ModalHorarios from "./ModalHorarios";

import { MDBDataTable, MDBBtn } from "mdbreact";

class ConsultTableEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empl: [],
      selected: false,
      horarioList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.consultarHorarios = this.consultarHorarios.bind(this);
    this.handleGetHorario = this.handleGetHorario.bind(this);
  }

  handleGetHorario = id => {
    fetch(`/api/empleados/empl/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res !== []) this.setState({ horarioList: res.map(r => r) });
      })
      .then(res => {
        swal(
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
        // this.setState({ selected : !this.state.selected});
      });
    console.log(this.state.horarioList);
  };

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    this.setState({
      cedula: value
    });
  }
  consultarHorarios(e, id) {
    e.preventDefault();
    console.log("seleccionee" + id);
    this.handleGetHorario(id);
    console.log(this.state.horarioList);
    // this.setState({ consulta: !this.state.consulta });
  }

  componentDidMount() {
    this.setState({ empl: this.props.empleados });
  }

  addBotton = empleados => {
    var empl = [];
    this.props.empleados.map(emp => {
      let e = {
        nombre: emp.nombre,
        apellido: emp.apellido,
        cedula: emp.cedula,
        fnac: emp.fnac,
        sexo: emp.sexo,
        cargo: emp.cargo,
        direccion: emp.estado + ", " + emp.municipio + ", " + emp.provincia,
        correo: emp.correo,
        telefono: emp.telefono,
        horario: (
          <button
            onClick={function(e) {
              this.handleGetHorario(emp.id);
            }.bind(this)}
          >
            {" "}
            Horario{" "}
          </button>
        )
      };
      empl.push(e);
    });
    return empl;
  };

  render() {
    const data = {
      columns: [
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
          width: 150
        },
        {
          label: "Apellido",
          field: "apellido",
          sort: "asc",
          width: 270
        },
        {
          label: "Cédula",
          field: "cedula",
          sort: "asc",
          width: 200
        },
        {
          label: "Fecha de nacimiento",
          field: "fnac",
          sort: "asc",
          width: 100
        },
        {
          label: "Sexo",
          field: "sexo",
          sort: "asc",
          width: 150
        },
        {
          label: "Cargo",
          field: "cargo",
          sort: "asc",
          width: 100
        },
        {
          label: "Direccion",
          field: "direccion",
          sort: "asc",
          width: 100
        },

        {
          label: "Correo",
          field: "correo",
          sort: "asc",
          width: 100
        },
        {
          label: "Telefono",
          field: "telefono",
          sort: "asc",
          width: 100
        },
        {
          label: "",
          field: "buttom",
          sort: "asc",
          width: 100
        }
      ],
      rows: this.addBotton(this.props.empleados)
    };

    return (
      <>
        <div>
          <MDBDataTable btn striped bordered hover data={data} />
        </div>
      </>
    );
  }
}
export default ConsultTableEmpleado;
