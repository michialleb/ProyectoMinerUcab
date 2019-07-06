import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableProyectos from "../components/ConsultTableProyectos";

export default class Proyectos extends Component {
  constructor() {
    super();
    this.state= {
      proyectos:[],
      statusList:[]
    }
  }

  getProyectos = () => {
    fetch("/api/proyecto")
      .then(res => res.json())
      .then(res => {
        var proyectos = res.map(r => r);
        this.setState({ proyectos });
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
    this.getProyectos();
    this.getStatusList();
  }

  render() {

    var crud = {
      options: [ "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: (
            <ConsultTableProyectos
              proyectos={this.state.proyectos}
              status={this.state.statusList}
            />
          ),
          id: 0
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
