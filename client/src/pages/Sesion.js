import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from "react-router-dom";
import Menu from "../components/Menu";
import Services from "../components/Services";
import Minerales from "../components/Minerales";

class Sesion extends Component {
  render() {
    var crud = {
      options: ["Ingresar Empleado", "Consultar Empleado", "Eliminar Empleado"],
      content: [
        {
          form: <Minerales />,
          id: 0
        },
        {
          form: <Services />,
          id: 1
        }
      ]
    };
    return <Menu crud={crud} />;
  }
}

export default Sesion;
