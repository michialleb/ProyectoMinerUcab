import React, { Component } from "react";
import Menu from "../components/Menu";
import Hero from "../components/Hero";
import Form from "../components/Form";
import FormCliente from "../components/FormClienteEmpresa";
import FormCompraCliente from "../components/FormCompraCliente";
export default class Clientes extends Component {
  constructor() {
    super();

    this.state = {
      mineralesList: [],
      lugarList: []
    };
  }
  getMineralesList = () => {
    fetch("/api/minerales")
      .then(res => res.json())
      .then(res => {
        var mineralesList = res.map(r => r);
        this.setState({ mineralesList });
      });
  };
  getLugarList = () => {
    fetch("/api/lugar")
      .then(res => res.json())
      .then(res => {
        var lugarList = res.map(r => r);
        this.setState({ lugarList });
      });
  };

  componentDidMount() {
    this.getMineralesList();
    this.getLugarList();
  }
  render() {
    var minerales = this.state.mineralesList;
    var lugares = this.state.lugarList;
    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar", "Compra"],
      content: [
        {
          form: <FormCliente lugares={lugares} />,
          id: 0
        },
        {
          form: "",
          id: 1
        },
        {
          form: "",
          id: 2
        },
        {
          form: "",
          id: 3
        },
        {
          form: <FormCompraCliente minerales={minerales} />,
          id: 4
        }
      ],
      a: <Hero />
    };

    return <Menu crud={crud} />;
  }
}
