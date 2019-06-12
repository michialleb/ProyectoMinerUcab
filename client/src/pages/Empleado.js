import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";

export default class Empleado extends Component {
  constructor() {
    super();

    this.state = {
      empleadoList: [],
      empleadoCedula: []
    };
  }

  /*handleGetEmpleado = (empleadoCedula, empleado) => {
    fetch("/api/empleados/:cedula", {
      method: "get",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ cedula: empleadoCedula })
    }).then(res => res.json())
      .then(res => {
        empleado =res.map(r => r);
      });
  };*/
  
  /*getEmpleadoListCedula = (empleadoListCedula) => {
    fetch("/api/empleados/:cedula")
      .then(res => res.json())
      .then(res => {
        var empleadoList = res.map(r => r);
        empleadoListCedula = empleadoList;
      });
  }; */
  getEmpleadoList = () => {
    fetch("/api/empleados")
      .then(res => res.json())
      .then(res => {
        var empleadoList = res.map(r => r);
        this.setState({ empleadoList });
      });
  };

  componentDidMount() {
    this.getEmpleadoList();
  }
  render() {
    var empleados = this.state.empleadoList;
    var consult = {
      consult: [
        "Nombre",
        "Apellido",
        "Nacimiento",
        "Cedula",
        "Telefono",
        "Direccion"
      ]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <Form />,
          id: 0
        },
        {
          form: <ConsultTable consult={consult} empleados={empleados} />,
          id: 1
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
