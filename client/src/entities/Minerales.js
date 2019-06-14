import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableMinerales from "../components/ConsultTableMinerales";

export default class Minerales extends Component {
  constructor() {
    super();

    this.state = {
      mineralesList: ""
    };
  }

  getMineral = nombre => {
    fetch(`/api/minerales/${nombre}`)
      .then(res => res.json())
      .then(res => {
        var mineralesList = res.map(r => r);
        this.setState({ mineralesList });
      });
  };

  getMineralesList = () => {
    fetch("/api/minerales")
      .then(res => res.json())
      .then(res => {
        var mineralesList = res.map(r => r);
        this.setState({ mineralesList });
      });
  };

  componentDidMount() {
    this.getMineralesList();
  }
  render() {
    var minerales = this.state.mineralesList;
    var consult = {
      consult: [
        "Nombre",
        "Tipo",
        "Valor",
        "Descripción",
        "Industria",
        "Inicio de Explotación",
        "Fecha Nacionalización"
      ]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: null, //colocar formato de ingreso
          id: 0
        },
        {
          form: (
            <ConsultTableMinerales
              minerales={minerales}
              consult={consult}
              getMineral={this.getMineral}
            />
          ),
          id: 1
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
