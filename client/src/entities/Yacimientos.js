import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableYacimientos from "../components/ConsultTableYacimientos";
import FormYacimiento from "../components/FormYacimiento";
import FormEtapa from "../components/FormEtapa";
export default class Yacimientos extends Component {
  constructor() {
    super();

    this.state = {
      yacimientosList: [],
      mineralList: [],
      cargosList:[],
      maquinariaList: [],
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
  getCargosList = () => {
    fetch("/api/cargos")
      .then(res => res.json())
      .then(res => {
        var cargosList = res.map(r => r);
        this.setState({ cargosList });
      });
  };

  getMaquinariaList =() => {
    fetch("/api/maquinaria")
      .then(res => res.json())
      .then(res => {
        var maquinariaList = res.map(r => r);
        this.setState({ maquinariaList });
      });
  }
  componentDidMount() {
    this.getYacimientosList();
    this.getMineralList();
    this.getCargosList();
    this.getMaquinariaList();
    this.getLugarList();
  }

  
  render() {
    var yacimientos = this.state.yacimientosList;
    var minerales = this.state.mineralList;
    var cargos= this.state.cargosList;
    var maquinaria= this.state.maquinariaList;
    var lugares = this.state.lugarList;
    var consult = {
      consult: ["Nombre", "Kilometros", "Direccion", "Status"]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <FormYacimiento 
                   minerales={minerales} 
                   cargos={cargos}
                    maquinaria={maquinaria}
                    lugares={lugares} />, //colocar formato de ingreso
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
          form:<FormEtapa/>,
          id:2
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
