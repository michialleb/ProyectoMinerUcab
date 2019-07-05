import React, { Component } from "react";
import "../styles/ConsultTable.css";
import swal from "@sweetalert/with-react";
import { MDBDataTable } from "mdbreact";

class ConsultTableEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empl: [],
      horarioList: []
    };

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

  componentDidMount() {
    this.setState({ empl: this.props.empleados });
  }

  addBotton = empleados => {
    var empl = [];
    this.props.empleados.map(emp => {
      var date = emp.fnac.split(["T"], [1]);
      let e = {
        nombre: emp.nombre,
        apellido: emp.apellido,
        cedula: emp.cedula,
        fnac: date,
        sexo: emp.sexo,
        cargo: emp.cargo,
        direccion: emp.estado + ", " + emp.municipio + ", " + emp.provincia,
        correo: emp.correo,
        telefono: emp.telefono,
        horario: (
          <div className="horario">
          <button 
            onClick={function(e) {
              this.handleGetHorario(emp.id);
            }.bind(this)}
          >
            {" "}
            Horario{" "}
          </button>
          </div>
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
