import React, { Component } from "react";
import Menu from "../components/Menu";
import Hero from "../components/Hero";
import Form from "../components/Form";
import FormCliente from "../components/FormClienteEmpresa";

export default class Clientes extends Component {
  render() {
    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <FormCliente />,
          id: 0
        },
        {
          form: "",
          id: 1
        }
      ],
      a: <Hero />
    };

    return <Menu crud={crud} />;
  }
}
