import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableRol from "../components/ConsultTableRol";
import FormRol from "../components/FormRol";
//import ModificarMineral from "../components/ModificarMineral";
//import EliminarEmpleado from "../components/EliminarEmpleado";
//import EliminarMineral from "../components/EliminarMineral";

export default class Roles extends Component {
  constructor() {
    super();

    this.state = {
      rolesList: [],
      permisosList: []
    };
  }

  
  getPermisosList = () => {
    fetch("/api/roles/allPermisos")
      .then(res => res.json())
      .then(res => {
        var permisosList = res.map(r => r);
        this.setState({ permisosList });
      });
  };

  getRolesList = () => {
    fetch("/api/roles")
      .then(res => res.json())
      .then(res => {
        var rolesList = res.map(r => r);
        this.setState({ rolesList });
      });
  };

  componentDidMount() {
    this.getRolesList();
    this.getPermisosList();
  }

  render() {
    var roles = this.state.rolesList;
    var permisos = this.state.permisosList;
    var consult = {
      consult: ["TipoRol", "Descripción"]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <FormRol permisos= {permisos} />,
          id: 0
        },
        {
          form: <ConsultTableRol roles={roles}/>,
          id: 1
        },
        {
          form: "",
          id: 2
        },
        {
          form: "",
          id: 3
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
