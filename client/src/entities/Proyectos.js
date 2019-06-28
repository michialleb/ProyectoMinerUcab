import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableProyectos from "../components/ConsultTableProyectos";

export default class Proyectos extends Component {
  constructor() {
    super();
    this.state= {
      proyectos:[]
    }
  }

  getProyectos = () => {
    fetch("/api/proyectos")
      .then(res => res.json())
      .then(res => {
        var proyectos = res.map(r => r);
        this.setState({ proyectos });
      });
  };

  componentDidMount() {
    this.getProyectos();
  }

  render() {

    var crud = {
      options: [ "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: (
            <ConsultTableProyectos
              proyectos={this.state.proyectos}
            />
          ),
          id: 0
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
