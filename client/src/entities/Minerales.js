import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableMinerales from "../components/ConsultTableMinerales";
import FormMineral from "../components/FormMineral";
import ModificarMineral from "../components/ModificarMineral";
import EliminarEmpleado from "../components/EliminarEmpleado";
import EliminarMineral from "../components/EliminarMineral";

export default class Minerales extends Component {
  constructor() {
    super();

    this.state = {
      mineralesList: "",
      mineralBuscado: ""
    };
  }

  getMineral = nombre => {
    fetch(`/api/minerales/${nombre}`)
      .then(res => res.json())
      .then(res => {
        var mineralBuscado = res.map(r => r);
        this.setState({ mineralBuscado });
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
    var mineralBuscado = this.state.mineralBuscado;
    var consult = {
      consult: [
        "Nombre",
        "Valor",
        "Descripción",
        "Inicio de Explotación",
        "Fecha Nacionalización",
        "Tipo",

      ]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <FormMineral />,
          id: 0
        },
        {
          form: <ConsultTableMinerales minerales={minerales} />,
          id: 1
        },
        {
          form:(<EliminarMineral consult={consult}/>),
          id:2
        },
        {
          form: (
            <ModificarMineral
              minerales={minerales}
              getMinerales={this.getMineral}
            />
          ),
          id: 3
        }]
    };

    return <Menu crud={crud} />;
  }
}
