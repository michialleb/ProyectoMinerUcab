import React, { Component } from "react";
import Menu from "../components/Menu";
//import ConsultTableMinerales from "../components/ConsultTableMinerales";
import FormUsuario from "../components/FormUsuarios";
//import ModificarMineral from "../components/ModificarMineral";
//import EliminarEmpleado from "../components/EliminarEmpleado";
//import EliminarMineral from "../components/EliminarMineral";

export default class Roles extends Component {
  constructor() {
    super();

    this.state = {
      personasList: [],
      rolesList: []
    };
  }

  getRolesList = () => {
    fetch("/api/roles")
      .then(res => res.json())
      .then(res => {
        var rolesList = res.map(r => r);
        this.setState({ rolesList });
      });
  };

  getPersonasList = () => {
    fetch("/api/usuarios/allPersonas")
      .then(res => res.json())
      .then(res => {
        var personasList = res.map(r => r);
        this.setState({ personasList });
      });
  };

  componentDidMount() {
    this.getRolesList();
    this.getPersonasList();
  }

  render() {
    var personas = this.state.personasList;
    var roles = this.state.rolesList;
    var consult = {
      consult: ["TipoRol", "Descripción"]
    };

    var crud = {
      options: ["Gestionar"],
      content: [
        {
          form: <FormUsuario personas={personas} roles={roles} />,
          id: 0
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
