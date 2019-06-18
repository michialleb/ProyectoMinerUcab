import React, { Component } from "react";
import Menu from "../components/Menu";
import Hero from "../components/Hero";
import Form from "../components/Form";
import FormCompraCliente from "../components/FormCompraCliente";

export default class Clientes extends Component {
  render() {
    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <FormCompraCliente />,
          id: 0
        },
        {
          form: <Form />,
          id: 1
        }
      ],
      a: <Hero />
    };

    return <Menu crud={crud} />;
  }
}
