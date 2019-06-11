import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";

export default class Empleado extends Component {
  render() {
    var consult = {
      consult: [
        "ID",
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
          form: <ConsultTable consult={consult} />,
          id: 1
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
