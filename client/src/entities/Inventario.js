import React, { Component } from "react";
import Menu from "../components/Menu";

import ConsultTableInventario from "../components/ConsultTableInventario";

export default class Clientes extends Component {
  constructor() {
    super();

    this.state = {
      inventarioList: []
    };
  }

  getInventario = () => {
    fetch("/api/inventario")
      .then(res => res.json())
      .then(res => {
        this.setState({ inventarioList: res.map(r => r) });
        console.log(this.state.inventarioList);
      });
  };

  componentDidMount() {
    this.getInventario();
  }

  render() {
    var crud = {
      options: [ "Minerales Disponibles"],
      content: [
       
        {
          form: (
            <ConsultTableInventario
              inventario={this.state.inventarioList}
            />
          ),
          id: 0
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
