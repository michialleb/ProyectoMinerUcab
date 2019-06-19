import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableYacimientos from "../components/ConsultTableYacimientos";
import FormYacimiento from "../components/FormYacimiento";

export default class Yacimientos extends Component {
  constructor() {
    super();

    this.state = {
      yacimientosList: ""
    };
  }

  getYacimiento = nombre => {
    fetch(`/api/yacimientos/${nombre}`)
      .then(res => res.json())
      .then(res => {
        var yacimientosList = res.map(r => r);
        this.setState({ yacimientosList });
      });
  };

  getYacimientosList = () => {
    fetch("/api/yacimientos")
      .then(res => res.json())
      .then(res => {
        var yacimientosList = res.map(r => r);
        this.setState({ yacimientosList });
      });
  };

  componentDidMount() {
    this.getYacimientosList();
  }
  render() {
    var yacimientos = this.state.yacimientosList;
    var consult = {
      consult: ["Nombre", "Kilometros","Status"]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <FormYacimiento/>, //colocar formato de ingreso
          id: 0
        },
        {
          form: (
            <ConsultTableYacimientos
              yacimientos={yacimientos}
              consult={consult}
              getYacimiento={this.getYacimiento}
            />
          ),
          id: 1
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
