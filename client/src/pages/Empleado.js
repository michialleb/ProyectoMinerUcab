import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import Services from "../components/Services";
import Minerales from "../components/Minerales";
import Hero from "../components/Hero";

export default class Empleado extends Component {
  render() {
    var crud = {
      options: ["Ingresar Empleado", "Consultar Empleado", "Eliminar Empleado"],
      content:[
        { 
         form:<Hero/>,
         id:0
        },
        {
          form:<Services/>,
          id:1
        }
      ],
      a:<Hero/>
    };
    
    return <Menu crud={crud} />;
  }
}
