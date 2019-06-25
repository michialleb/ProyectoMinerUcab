import React, { Component } from "react";
import Menu from "../components/Menu";

import ConsultTableInventario from "../components/ConsultTableInventario";

export default class Clientes extends Component {
  constructor() {
    super();

    this.state = {
      inventarioClienteList: [],
      inventarioAliadoList: [],
      inventarioList: []
    };
  }

  getInventarioCliente = () => {
    fetch("/api/inventario/cliente")
      .then(res => res.json())
      .then(res => {
        this.setState({ inventarioClienteList: res.map(r => r) });
        console.log(this.state.inventarioClienteList);
      });
  };

  getInventarioAliado = () => {
    fetch("/api/inventario/aliado")
      .then(res => res.json())
      .then(res => {
        this.setState({ inventarioAliadoList: res.map(r => r) });
        
      });
  };

  componentDidMount() {
    this.getInventarioCliente();
    this.getInventarioAliado();
  }

  render() {
    var inventarioCliente = this.state.inventarioClienteList;
    var inventarioAliado = this.state.inventarioAliadoList;
    var consult = {
      consult: ["Mineral", "Presentación", "Cantidad"]
    };
    var crud = {
      options: [ "Minerales Disponibles"],
      content: [
       
        {
          form: (
            <ConsultTableInventario
              inventarioCliente={inventarioCliente}
              inventarioAliado={inventarioAliado}
              consult={consult}
            />
          ),
          id: 0
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
