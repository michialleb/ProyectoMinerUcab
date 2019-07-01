import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableYacimientos from "../components/ConsultTableYacimientos";
import FormYacimiento from "../components/FormYacimiento";
import FormEtapa from "../components/FormEtapa";
import EliminarYacimiento from "../components/EliminarYacimiento";
import ModificarYacimiento from "../components/ModificarYacimiento";

export default class Yacimientos extends Component {
  constructor() {
    super();
    this.state = {
      yacimientosList: [],
      mineralList: [],
      cargosList: [],
      yacimientoUnico: [],
      maquinariaList: [],
      lugarList: [],
      statusList: []
    };
  }

  getYacimiento = nombre => {
    fetch(`/api/yacimientos/${nombre}`)
      .then(res => res.json())
      .then(res => {
        var yacimientoUnico = res.map(r => r);
        this.setState({ yacimientoUnico });
      })
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

    console.log("entro en el yacimiento list")
    fetch("/api/yacimientos")
      .then(res => res.json())
      .then(res => {
        var yacimientosList = res.map(r => r);
        this.setState({ yacimientosList });
      });
  };
  getCargosList = () => {
    fetch("/api/cargos")
      .then(res => res.json())
      .then(res => {
        var cargosList = res.map(r => r);
        this.setState({ cargosList });
      });
  };

  getMaquinariaList = () => {
    fetch("/api/maquinaria")
      .then(res => res.json())
      .then(res => {
        var maquinariaList = res.map(r => r);
        this.setState({ maquinariaList });
      });
  };

  getStatusList = () => {
    fetch("/api/status/buscar")
      .then(res => res.json())
      .then(res => {
        var statusList = res.map(r => r);
        this.setState({ statusList });
      });
  };

  componentDidMount() {
    this.getStatusList();
    this.getYacimientosList();
    this.getMineralList();
    this.getCargosList();
    this.getMaquinariaList();
    this.getLugarList();
  }

  render() {
    var yacimientos = this.state.yacimientosList;
    var yacimiento = this.state.yacimientoUnico;
    var minerales = this.state.mineralList;
    var cargos = this.state.cargosList;
    var maquinaria = this.state.maquinariaList;
    var lugares = this.state.lugarList;
    var status = this.state.statusList;

    var consult = {
      consult: ["Nombre", "Kilometros", "Direccion", "Status"]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: (
            <FormYacimiento
              minerales={minerales}
              cargos={cargos}
              maquinaria={maquinaria}
              lugares={lugares}
            />
          ), //colocar formato de ingreso
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
        },
        {
          form: <EliminarYacimiento consult={consult} />,
          id: 2
        },
        {
          form: (
            <ModificarYacimiento
              minerales={minerales}
              status={status}
              lugares={lugares}
              yacimiento={yacimiento}
              getYacimiento={this.getYacimiento}
            />
          ),
          id: 3
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
