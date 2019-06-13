import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";
import ModiEmpleado from "../components/ModiEmpleado";

export default class Empleado extends Component {
  constructor() {
    super();

    this.state = {
      empleadoList: []
    };
  }

  getEmpleadoList = () => {
    fetch("/api/empleados")
      .then(res => res.json())
      .then(res => {
        var empleadoList = res;
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
        },
        {
          form: <ModiEmpleado consult={consult} empleados={empleados} />,
          id: 2
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
