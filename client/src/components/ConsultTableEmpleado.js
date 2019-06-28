import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import swal from "sweetalert";

import { MDBDataTable, MDBBtn } from "mdbreact";

class ConsultTableEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empl: [],
      consulta: false,
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
        console.log(res);
        //  this.setState({ horarioList: res.map(r => r) });
      });
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
              this.consultarHorarios(e, emp.id);
            }.bind(this)}
          >
            {" "}
            Horario{" "}
          </button>
        ),
        id: emp.id
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

    const selectRowProp = {
      mode: "checkbox",

      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected

      hideSelectColumn: true, // enable hide selection column.

      clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
    };
    const options = {
      // ---------------------------------
      // detects click on each row
      //---------------------------------
      onRowClick: function(row) {
        console.log("holaa");
      }
    };

    return (
      <>
        <div>
          <MDBDataTable
            btn
            striped
            bordered
            hover
            data={data}
            selectRow={selectRowProp}
            options={options}
          />
          {console.log(this.state.consulta)}
        </div>
      </>
    );
  }
}
export default ConsultTableEmpleado;
