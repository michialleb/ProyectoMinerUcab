import React, { Component } from "react";
import Menu from "../components/Menu";

export default class EmpresasAliadas extends Component {
  render() {
    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: null,
          id: 0
        },
        {
          form: null,
          id: 1
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
