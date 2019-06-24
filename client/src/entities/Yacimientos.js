import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableYacimientos from "../components/ConsultTableYacimientos";
import FormYacimiento from "../components/FormYacimiento";

export default class Yacimientos extends Component {
  constructor() {
    super();

    this.state = {
      yacimientosList: [],
      mineralList: [],
      lugarList: []
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

  getLugarList = () => {
    fetch("/api/lugar")
      .then(res => res.json())
      .then(res => {
        var lugarList = res.map(r => r);
        this.setState({ lugarList });
      });
  };
  getMineralList = () => {
    fetch("/api/minerales")
      .then(res => res.json())
      .then(res => {
        var mineralList = res.map(r => r);
        this.setState({ mineralList });
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
    this.getMineralList();
    this.getLugarList();
  }
  render() {
    var yacimientos = this.state.yacimientosList;
    var minerales = this.state.mineralList;
    var lugares = this.state.lugarList;
    var consult = {
      consult: ["Nombre", "Kilometros", "Direccion", "Status"]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <FormYacimiento minerales={minerales} lugares={lugares} />, //colocar formato de ingreso
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
